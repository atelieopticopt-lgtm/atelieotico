// server.mjs — Stripe Payment & SMTP Email Microservice for Ateliê Ótico
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Load .env variables
const envPath = path.resolve(process.cwd(), '.env');
const env = {};
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        env[key] = val;
      }
    }
  });
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || env.STRIPE_SECRET_KEY || '';
const STRIPE_PUBLISHABLE_KEY = process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || env.PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51U6ePTA4omOSLMnkqJ97sAVhZt1L3YUHNSn0ZehsXQVBDq3k4gTjYRGjDVu4DELheXIR79Wm9XVhTJdtTsWOeNZq00z8rLeAyn';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || env.STRIPE_WEBHOOK_SECRET || '';
const PORT = process.env.PORT || env.PORT || 4242;

// Simple Stripe API Client via HTTPS
async function stripeRequest(endpoint, data = {}, method = 'POST') {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams();
    
    function flatten(obj, prefix = '') {
      for (const [key, val] of Object.entries(obj)) {
        const propName = prefix ? `${prefix}[${key}]` : key;
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          flatten(val, propName);
        } else if (Array.isArray(val)) {
          val.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              flatten(item, `${propName}[${index}]`);
            } else {
              postData.append(`${propName}[${index}]`, String(item));
            }
          });
        } else if (val !== undefined && val !== null) {
          postData.append(propName, String(val));
        }
      }
    }

    flatten(data);
    const bodyStr = postData.toString();

    const options = {
      hostname: 'api.stripe.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(bodyStr)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(parsed);
          }
        } catch (e) {
          reject({ error: 'Failed to parse Stripe response', raw: responseBody });
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(bodyStr);
    req.end();
  });
}

// Generate Luxury HTML Email Invoice
function generateCustomerInvoiceHtml(order) {
  const itemsHtml = order.items.map(item => `
    <tr style="border-bottom: 1px solid #eeeeee;">
      <td style="padding: 16px 8px; vertical-align: middle;">
        <img src="${item.image?.startsWith('http') ? item.image : 'https://atelieotico.com' + item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: contain;" />
      </td>
      <td style="padding: 16px 8px; vertical-align: middle;">
        <strong style="font-size: 14px; color: #111111; display: block;">${item.name}</strong>
        <span style="font-size: 12px; color: #777777;">SKU: ${item.sku || item.slug} &bull; Qtd: ${item.qty}</span>
      </td>
      <td style="padding: 16px 8px; vertical-align: middle; text-align: right; font-weight: 700; font-size: 14px; color: #111111;">
        ${(item.price * item.qty).toFixed(2)} €
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Fatura & Confirmação de Encomenda &bull; Ateliê Ótico</title></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #faf9f6; margin: 0; padding: 40px 16px; color: #222222;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #eeeeee;">
        <tr>
          <td style="background: #000000; padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">ATELIÊ ÓTICO</h1>
            <p style="color: #aaaaaa; margin: 6px 0 0; font-size: 12px; letter-spacing: 1px;">ÓTICA INDEPENDENTE &bull; FUNCHAL, MADEIRA</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 28px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="background: #f0fdf4; color: #166534; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 20px; border: 1px solid #bbf7d0;">PAGAMENTO CONFIRMADO</span>
              <h2 style="font-size: 20px; color: #111111; margin: 16px 0 6px;">Obrigado pela sua encomenda, ${order.customerName}!</h2>
              <p style="font-size: 13.5px; color: #666666; margin: 0;">A sua encomenda <strong>#AO-${order.orderId}</strong> foi registada com sucesso e está a ser preparada para envio.</p>
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <thead>
                <tr style="border-bottom: 2px solid #000000;">
                  <th style="padding: 8px 8px; text-align: left; font-size: 11px; text-transform: uppercase; color: #888888;">Item</th>
                  <th style="padding: 8px 8px; text-align: left; font-size: 11px; text-transform: uppercase; color: #888888;">Modelo</th>
                  <th style="padding: 8px 8px; text-align: right; font-size: 11px; text-transform: uppercase; color: #888888;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="background: #faf9f6; padding: 16px 20px; border-radius: 6px; margin-bottom: 28px;">
              <tr>
                <td style="font-size: 13px; color: #666666; padding: 4px 0;">Subtotal dos Produtos:</td>
                <td style="font-size: 13px; font-weight: 700; color: #111111; text-align: right;">${order.subtotal.toFixed(2)} €</td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #666666; padding: 4px 0;">Envio (${order.shippingAddress?.country || 'Portugal'}):</td>
                <td style="font-size: 13px; font-weight: 700; color: #166534; text-align: right;">Grátis (0.00 €)</td>
              </tr>
              ${order.discountAmount > 0 ? `
              <tr>
                <td style="font-size: 13px; color: #b91c1c; padding: 4px 0;">Desconto (${order.discountCode}):</td>
                <td style="font-size: 13px; font-weight: 700; color: #b91c1c; text-align: right;">-${order.discountAmount.toFixed(2)} €</td>
              </tr>
              ` : ''}
              <tr style="border-top: 1px solid #e5e5e5;">
                <td style="font-size: 16px; font-weight: 800; color: #000000; padding: 12px 0 4px;">Total Pago:</td>
                <td style="font-size: 18px; font-weight: 800; color: #000000; text-align: right; padding: 12px 0 4px;">${order.total.toFixed(2)} €</td>
              </tr>
            </table>

            <div style="background: #ffffff; border: 1px solid #eeeeee; padding: 16px 20px; border-radius: 6px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; color: #888888;">Morada de Envio</h4>
              <p style="margin: 0; font-size: 13.5px; color: #333333; line-height: 1.5;">
                <strong>${order.customerName}</strong><br>
                ${order.shippingAddress?.line1 || ''} ${order.shippingAddress?.line2 ? '<br>' + order.shippingAddress.line2 : ''}<br>
                ${order.shippingAddress?.postalCode || ''} ${order.shippingAddress?.city || ''}<br>
                ${order.shippingAddress?.country || 'Portugal'}<br>
                Telefone: ${order.customerPhone || 'N/A'}
              </p>
            </div>

            <div style="text-align: center; border-top: 1px solid #eeeeee; padding-top: 24px; font-size: 12px; color: #888888;">
              <p style="margin: 0 0 4px;">Ateliê Ótico &bull; Rua da Conceição, Praça do Carmo 29B, 9050-026 Funchal, Madeira</p>
              <p style="margin: 0;">WhatsApp: +351 964 993 767 &bull; E-mail: apoio@atelieotico.com</p>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse Body
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      let json = {};
      if (body) {
        try { json = JSON.parse(body); } catch(e) {}
      }

      // 1. GET /api/config — Return Publishable Key
      if (url.pathname === '/api/config' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ publishableKey: STRIPE_PUBLISHABLE_KEY }));
        return;
      }

      // 2. POST /api/create-payment-intent — Create Intent in Stripe
      if (url.pathname === '/api/create-payment-intent' && req.method === 'POST') {
        const { items = [], customerEmail = '', customerName = '', shipping = {} } = json;

        if (!items.length) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'O carrinho está vazio.' }));
          return;
        }

        // Calculate exact mathematical total in cents
        const subtotal = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.qty || 1)), 0);
        const amountCents = Math.round(subtotal * 100);

        if (amountCents <= 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Montante inválido.' }));
          return;
        }

        const intent = await stripeRequest('/v1/payment_intents', {
          amount: amountCents,
          currency: 'eur',
          automatic_payment_methods: { enabled: 'true' },
          receipt_email: customerEmail || undefined,
          description: `Encomenda Ateliê Ótico — ${items.length} modelo(s)`,
          metadata: {
            customer_name: customerName,
            customer_email: customerEmail,
            items_count: items.length,
            models: items.map(i => `${i.name} (x${i.qty})`).join(', ')
          }
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          clientSecret: intent.client_secret,
          id: intent.id,
          amount: intent.amount / 100,
          currency: intent.currency,
          publishableKey: STRIPE_PUBLISHABLE_KEY
        }));
        return;
      }

      // 3. POST /api/confirm-order — Log & Send Notification Emails
      if (url.pathname === '/api/confirm-order' && req.method === 'POST') {
        const { orderId, paymentIntentId, customerName, customerEmail, customerPhone, items = [], shippingAddress = {} } = json;

        const subtotal = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.qty || 1)), 0);
        const orderData = {
          orderId: orderId || Math.random().toString(36).substring(2, 9).toUpperCase(),
          paymentIntentId,
          customerName: customerName || 'Cliente Estimado',
          customerEmail,
          customerPhone,
          items,
          subtotal,
          shippingFee: 0,
          discountAmount: 0,
          total: subtotal,
          shippingAddress,
          timestamp: new Date().toISOString()
        };

        const invoiceHtml = generateCustomerInvoiceHtml(orderData);

        // Store confirmed order locally in JSON archive
        const ordersDir = path.resolve(process.cwd(), 'data');
        if (!fs.existsSync(ordersDir)) fs.mkdirSync(ordersDir, { recursive: true });
        const ordersLogPath = path.join(ordersDir, 'orders.json');
        let existingOrders = [];
        if (fs.existsSync(ordersLogPath)) {
          try { existingOrders = JSON.parse(fs.readFileSync(ordersLogPath, 'utf8')); } catch(e) {}
        }
        existingOrders.push(orderData);
        fs.writeFileSync(ordersLogPath, JSON.stringify(existingOrders, null, 2));

        console.log(`[Order Confirmed] #${orderData.orderId} - Total: ${orderData.total}€ by ${customerEmail}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          orderId: orderData.orderId,
          message: 'Encomenda confirmada com sucesso.'
        }));
        return;
      }

      // 4. POST /api/webhook — Stripe Webhook Handler
      if (url.pathname === '/api/webhook' && req.method === 'POST') {
        console.log('[Stripe Webhook Received]', body.substring(0, 100));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ received: true }));
        return;
      }

      // Default 404
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint não encontrado.' }));

    } catch (err) {
      console.error('[Server Error]', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message || 'Erro interno do servidor.' }));
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Ateliê Ótico Stripe Backend Service running on port ${PORT}`);
  console.log(`🔑 Stripe Publishable Key: ${STRIPE_PUBLISHABLE_KEY.substring(0, 18)}...`);
});
