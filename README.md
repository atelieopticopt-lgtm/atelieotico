# Ateliê Ótico — Luxury Eyewear & Boutique Ótica de Autor

<p align="center">
  <img src="public/SVG-Logo-Atelie.svg" alt="Ateliê Ótico" width="280" />
</p>

<p align="center">
  <strong>Curadoria Independente &bull; Precisão Ótica &bull; Funchal, Madeira</strong><br>
  Plataforma oficial de comércio eletrónico e consultoria ótica de autor do <strong>Ateliê Ótico</strong>.
</p>

---

## 🌟 Visão Geral

O **Ateliê Ótico** é uma ótica de referência sediada no Funchal (Madeira), especializada em armações oftálmicas de fabrico independente, óculos de sol de luxo com lentes de alta precisão (ZEISS) e consultoria de imagem personalizada.

Este repositório contém a infraestrutura web completa, incluindo o catálogo digital interativo com mais de 370 modelos, estúdio de personalização visual (CMS), pasarela de pagamentos segura via **Stripe Elements**, emissão de faturas digitais por e-mail (SMTP) e gestão de encomendas.

---

## 💎 Marcas de Autor

- **SNOB Milano** (Milão, Itália &bull; Clip-on Magnético Solar ZEISS)
- **Ørgreen Optics** (Copenhaga, Dinamarca &bull; Titânio Japonês)
- **Einstoffen** (Suíça &bull; Madeira Nobre &amp; Acetato Orgânico)
- **Rodenstock** (Munique, Alemanha &bull; Precisão Biométrica)
- **Eyepetizer** (Itália &bull; Aço Cirúrgico Ultraleve)
- **Longchamp** (Paris, França &bull; Elegância &amp; Couro)
- **Maison Bensimon** (França &bull; Estilo Descontraído)

---

## 🛠️ Stack Tecnológico

- **Framework:** [Astro](https://astro.build/) (Static Site Generation de Alta Velocidade)
- **Design System & CSS:** Vanilla CSS Luxury Editorial System (`public/premium.css`)
- **Gateway de Pagamento:** [Stripe Elements](https://stripe.com/) (PCI-DSS Nível 1, MB WAY, Cartão de Crédito/Débito, Apple Pay / Link)
- **Backend & APIs:** Node.js Microservice (`server.mjs`) sob Nginx Reverse Proxy
- **Faturação & E-mail:** Template de Fatura HTML de Autor + Nodemailer SMTP
- **Bilingual System:** Motor de Tradução Dinâmica Universal (Português &amp; English)

---

## 🚀 Como Executar Localmente

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente (`.env`)
```env
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=4242
ADMIN_EMAIL=geral@atelieotico.com
```

### 3. Iniciar Servidor de Desenvolvimento
```bash
# Iniciar frontend Astro
npm run dev

# Iniciar backend de pagamentos Stripe (opcional para testar checkout)
node server.mjs
```

### 4. Compilar para Produção
```bash
npm run build
```

---

## 🔐 Painel Administrativo

Aceda ao estúdio de gestão de banners, catálogo e marcas em:
👉 `https://atelieotico.com/admin`

---

## 📍 Localização & Contactos

- **Morada:** Rua da Conceição, Praça do Carmo 29B, 9050-026 Funchal, Região Autónoma da Madeira
- **WhatsApp:** [+351 964 993 767](https://wa.me/351964993767)
- **E-mail:** [apoio@atelieotico.com](mailto:apoio@atelieotico.com)
- **Website Oficial:** [https://atelieotico.com](https://atelieotico.com)

---

&copy; 2026 Ateliê Ótico. Todos os direitos reservados.
