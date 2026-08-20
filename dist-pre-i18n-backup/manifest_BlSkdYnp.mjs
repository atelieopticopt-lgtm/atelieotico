import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_1IIrW8fW.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/","cacheDir":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/node_modules/.astro/","outDir":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/","srcDir":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/src/","publicDir":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/public/","buildClientDir":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/client/","buildServerDir":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/server/","adapterName":"","routes":[{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/admin/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Bngw1Q4T.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/carreiras/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/carreiras","isIndex":false,"type":"page","pattern":"^\\/carreiras\\/?$","segments":[[{"content":"carreiras","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/carreiras.astro","pathname":"/carreiras","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/catalogo/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/catalogo","isIndex":false,"type":"page","pattern":"^\\/catalogo\\/?$","segments":[[{"content":"catalogo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/catalogo.astro","pathname":"/catalogo","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/collections/new-arrivals/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/collections/new-arrivals","isIndex":false,"type":"page","pattern":"^\\/collections\\/new-arrivals\\/?$","segments":[[{"content":"collections","dynamic":false,"spread":false}],[{"content":"new-arrivals","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/collections/new-arrivals.astro","pathname":"/collections/new-arrivals","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/condicoes-gerais-venda/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/condicoes-gerais-venda","isIndex":false,"type":"page","pattern":"^\\/condicoes-gerais-venda\\/?$","segments":[[{"content":"condicoes-gerais-venda","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/condicoes-gerais-venda.astro","pathname":"/condicoes-gerais-venda","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/conta/index.html","links":[],"scripts":[],"styles":[{"type":"inline","content":".account-page[data-astro-cid-nodojmyq]{max-width:1280px;margin:auto;padding:80px 5vw 120px}.account-page[data-astro-cid-nodojmyq] header[data-astro-cid-nodojmyq]{text-align:center;margin-bottom:60px}.account-page[data-astro-cid-nodojmyq] h1[data-astro-cid-nodojmyq]{font-size:clamp(38px,5vw,64px);margin:8px 0}.account-grid[data-astro-cid-nodojmyq]{display:grid;grid-template-columns:1fr 1fr;gap:8vw}.account-grid[data-astro-cid-nodojmyq] form[data-astro-cid-nodojmyq]{display:grid;gap:18px}.account-grid[data-astro-cid-nodojmyq] input[data-astro-cid-nodojmyq]{height:52px;border:0;border-bottom:1px solid #999;padding:0 4px}.account-grid[data-astro-cid-nodojmyq] button[data-astro-cid-nodojmyq]{height:50px;background:#000;color:#fff;border:0;font-weight:700}@media(max-width:700px){.account-grid[data-astro-cid-nodojmyq]{grid-template-columns:1fr}}\n"},{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/conta","isIndex":false,"type":"page","pattern":"^\\/conta\\/?$","segments":[[{"content":"conta","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/conta.astro","pathname":"/conta","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/contactos/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/contactos","isIndex":false,"type":"page","pattern":"^\\/contactos\\/?$","segments":[[{"content":"contactos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contactos.astro","pathname":"/contactos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/cookies/index.html","links":[],"scripts":[],"styles":[{"type":"inline","content":".legal-article[data-astro-cid-6xh23lug]{max-width:860px;margin:40px auto 80px;padding:0 24px;font-family:Plus Jakarta Sans,sans-serif;color:#111;line-height:1.7}.legal-header[data-astro-cid-6xh23lug]{margin-bottom:48px;border-bottom:1px solid rgba(0,0,0,.08);padding-bottom:28px}.legal-tag[data-astro-cid-6xh23lug]{font-size:11px;font-weight:700;letter-spacing:1.5px;color:#888;text-transform:uppercase;display:block;margin-bottom:10px}.legal-header[data-astro-cid-6xh23lug] h1[data-astro-cid-6xh23lug]{font-size:clamp(28px,4vw,42px);font-weight:800;margin:0 0 12px;letter-spacing:-.5px}.legal-meta[data-astro-cid-6xh23lug]{font-size:13px;color:#777;margin:0}.legal-section[data-astro-cid-6xh23lug]{margin-bottom:36px}.legal-section[data-astro-cid-6xh23lug] h2[data-astro-cid-6xh23lug]{font-size:18px;font-weight:700;margin:0 0 12px;color:#0a0a0a}.legal-section[data-astro-cid-6xh23lug] p[data-astro-cid-6xh23lug]{font-size:15px;color:#444;margin:0 0 12px}.cookie-types-grid[data-astro-cid-6xh23lug]{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:20px}.cookie-card[data-astro-cid-6xh23lug]{background:#fff;border:1px solid rgba(0,0,0,.08);padding:20px;border-radius:8px}.cookie-card[data-astro-cid-6xh23lug] h3[data-astro-cid-6xh23lug]{font-size:15px;font-weight:700;margin:0 0 8px;color:#0a0a0a}.cookie-card[data-astro-cid-6xh23lug] p[data-astro-cid-6xh23lug]{font-size:13.5px;color:#555;margin:0;line-height:1.5}\n"},{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/cookies","isIndex":false,"type":"page","pattern":"^\\/cookies\\/?$","segments":[[{"content":"cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookies.astro","pathname":"/cookies","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/envios/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/envios","isIndex":false,"type":"page","pattern":"^\\/envios\\/?$","segments":[[{"content":"envios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/envios.astro","pathname":"/envios","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/marcas/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/marcas","isIndex":false,"type":"page","pattern":"^\\/marcas\\/?$","segments":[[{"content":"marcas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/marcas.astro","pathname":"/marcas","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/pesquisa/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/pesquisa","isIndex":false,"type":"page","pattern":"^\\/pesquisa\\/?$","segments":[[{"content":"pesquisa","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pesquisa.astro","pathname":"/pesquisa","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/privacidade/index.html","links":[],"scripts":[],"styles":[{"type":"inline","content":".legal-article[data-astro-cid-ztibjfmw]{max-width:860px;margin:40px auto 80px;padding:0 24px;font-family:Plus Jakarta Sans,sans-serif;color:#111;line-height:1.7}.legal-header[data-astro-cid-ztibjfmw]{margin-bottom:48px;border-bottom:1px solid rgba(0,0,0,.08);padding-bottom:28px}.legal-tag[data-astro-cid-ztibjfmw]{font-size:11px;font-weight:700;letter-spacing:1.5px;color:#888;text-transform:uppercase;display:block;margin-bottom:10px}.legal-header[data-astro-cid-ztibjfmw] h1[data-astro-cid-ztibjfmw]{font-size:clamp(28px,4vw,42px);font-weight:800;margin:0 0 12px;letter-spacing:-.5px}.legal-meta[data-astro-cid-ztibjfmw]{font-size:13px;color:#777;margin:0}.legal-section[data-astro-cid-ztibjfmw]{margin-bottom:36px}.legal-section[data-astro-cid-ztibjfmw] h2[data-astro-cid-ztibjfmw]{font-size:18px;font-weight:700;margin:0 0 12px;color:#0a0a0a}.legal-section[data-astro-cid-ztibjfmw] p[data-astro-cid-ztibjfmw]{font-size:15px;color:#444;margin:0 0 12px}.legal-section[data-astro-cid-ztibjfmw] ul[data-astro-cid-ztibjfmw]{padding-left:20px;margin:0 0 16px}.legal-section[data-astro-cid-ztibjfmw] li[data-astro-cid-ztibjfmw]{font-size:14.5px;color:#444;margin-bottom:8px}\n"},{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/privacidade","isIndex":false,"type":"page","pattern":"^\\/privacidade\\/?$","segments":[[{"content":"privacidade","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacidade.astro","pathname":"/privacidade","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/saco/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/saco","isIndex":false,"type":"page","pattern":"^\\/saco\\/?$","segments":[[{"content":"saco","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/saco.astro","pathname":"/saco","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/sobre/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/sobre","isIndex":false,"type":"page","pattern":"^\\/sobre\\/?$","segments":[[{"content":"sobre","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sobre.astro","pathname":"/sobre","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/termos/index.html","links":[],"scripts":[],"styles":[{"type":"inline","content":".legal-article[data-astro-cid-jw35do7h]{max-width:860px;margin:40px auto 80px;padding:0 24px;font-family:Plus Jakarta Sans,sans-serif;color:#111;line-height:1.7}.legal-header[data-astro-cid-jw35do7h]{margin-bottom:48px;border-bottom:1px solid rgba(0,0,0,.08);padding-bottom:28px}.legal-tag[data-astro-cid-jw35do7h]{font-size:11px;font-weight:700;letter-spacing:1.5px;color:#888;text-transform:uppercase;display:block;margin-bottom:10px}.legal-header[data-astro-cid-jw35do7h] h1[data-astro-cid-jw35do7h]{font-size:clamp(28px,4vw,42px);font-weight:800;margin:0 0 12px;letter-spacing:-.5px}.legal-meta[data-astro-cid-jw35do7h]{font-size:13px;color:#777;margin:0}.legal-section[data-astro-cid-jw35do7h]{margin-bottom:36px}.legal-section[data-astro-cid-jw35do7h] h2[data-astro-cid-jw35do7h]{font-size:18px;font-weight:700;margin:0 0 12px;color:#0a0a0a}.legal-section[data-astro-cid-jw35do7h] p[data-astro-cid-jw35do7h]{font-size:15px;color:#444;margin:0 0 12px}\n"},{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/termos","isIndex":false,"type":"page","pattern":"^\\/termos\\/?$","segments":[[{"content":"termos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/termos.astro","pathname":"/termos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/carreiras.DHV62yiJ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/carreiras.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/catalogo.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/condicoes-gerais-venda.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/conta.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/contactos.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/cookies.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/envios.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/marcas.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/pesquisa.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/privacidade.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/produtos/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/saco.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/sobre.astro",{"propagation":"none","containsHead":true}],["C:/Users/enman/Desktop/Ateliê_Otico/src/pages/termos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/carreiras@_@astro":"pages/carreiras.astro.mjs","\u0000@astro-page:src/pages/catalogo@_@astro":"pages/catalogo.astro.mjs","\u0000@astro-page:src/pages/collections/new-arrivals@_@astro":"pages/collections/new-arrivals.astro.mjs","\u0000@astro-page:src/pages/condicoes-gerais-venda@_@astro":"pages/condicoes-gerais-venda.astro.mjs","\u0000@astro-page:src/pages/conta@_@astro":"pages/conta.astro.mjs","\u0000@astro-page:src/pages/contactos@_@astro":"pages/contactos.astro.mjs","\u0000@astro-page:src/pages/cookies@_@astro":"pages/cookies.astro.mjs","\u0000@astro-page:src/pages/envios@_@astro":"pages/envios.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/marcas@_@astro":"pages/marcas.astro.mjs","\u0000@astro-page:src/pages/pesquisa@_@astro":"pages/pesquisa.astro.mjs","\u0000@astro-page:src/pages/privacidade@_@astro":"pages/privacidade.astro.mjs","\u0000@astro-page:src/pages/produtos/[slug]@_@astro":"pages/produtos/_slug_.astro.mjs","\u0000@astro-page:src/pages/saco@_@astro":"pages/saco.astro.mjs","\u0000@astro-page:src/pages/sobre@_@astro":"pages/sobre.astro.mjs","\u0000@astro-page:src/pages/termos@_@astro":"pages/termos.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astrojs-manifest":"manifest_BlSkdYnp.mjs","C:/Users/enman/Desktop/Ateliê_Otico/src/components/AuthGate.astro?astro&type=script&index=0&lang.ts":"_astro/AuthGate.astro_astro_type_script_index_0_lang.CHRBPQri.js","C:/Users/enman/Desktop/Ateliê_Otico/src/components/LanguageSwitcher.astro?astro&type=script&index=0&lang.ts":"_astro/LanguageSwitcher.astro_astro_type_script_index_0_lang.CmZqtr57.js","C:/Users/enman/Desktop/Ateliê_Otico/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CWjwCM-H.js","C:/Users/enman/Desktop/Ateliê_Otico/src/pages/conta.astro?astro&type=script&index=0&lang.ts":"_astro/conta.astro_astro_type_script_index_0_lang.Bg_tH-Gg.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/admin/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/carreiras/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/catalogo/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/collections/new-arrivals/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/condicoes-gerais-venda/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/conta/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/contactos/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/cookies/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/envios/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/marcas/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/pesquisa/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/privacidade/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/saco/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/sobre/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/termos/index.html","/file:///C:/Users/enman/Desktop/Ateli%C3%AA_Otico/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"mm3vhnCKoETlbVpL5Lg9+DBtq6pjnZeQ+Mvt2Jg4FBQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
