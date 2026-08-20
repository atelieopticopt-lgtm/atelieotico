(function loadScript() {
  const shopId = window.ps_extension_shop_id;
  if (!shopId) {
    return;
  }

  // This hostname will be replaced at build time based on environment
  const hostname = 'https://sdk.postscript.io';

  // IMPORTANT! This id must match the id that's used in postscript-sdk
  // Otherwise you can end up with two SDKs on the page
  const scriptId = 'ps-sdk-loader';
  const scriptSrc = `${hostname}/sdk.bundle.js?shopId=${shopId}&src=sdkAppEmbed`;

  if (document.getElementById(scriptId)) return null;

  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.id = scriptId;
  script.src = scriptSrc;
  document.getElementsByTagName('head')[0].appendChild(script);
})();
