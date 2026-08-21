// cookie-consent.js — Ateliê Ótico Cookie Management & Analytics Engine
(function() {
  const STORAGE_KEY = 'atelie_cookie_consent_v1';
  const ANALYTICS_ENDPOINT = '/api/analytics/cookies';

  function getConsent() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch(e) {
      return null;
    }
  }

  function setConsent(prefs, actionType) {
    const consentData = {
      consented: true,
      timestamp: new Date().toISOString(),
      action: actionType,
      preferences: {
        necessary: true,
        analytics: Boolean(prefs.analytics),
        marketing: Boolean(prefs.marketing),
        functional: Boolean(prefs.functional)
      }
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    } catch(e) {}

    // Dispatch event for other scripts (Google Analytics, Pixel, etc.)
    window.dispatchEvent(new CustomEvent('atelie_cookie_consent_updated', {
      detail: consentData
    }));

    // Send anonymous telemetry to backend API
    try {
      fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          preferences: consentData.preferences,
          url: window.location.pathname
        })
      }).catch(() => {});
    } catch(e) {}

    hideBanner();
    hideModal();
  }

  function trackImpression() {
    try {
      fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'impression',
          url: window.location.pathname
        })
      }).catch(() => {});
    } catch(e) {}
  }

  const banner = document.getElementById('atelie-cookie-banner');
  const modal = document.getElementById('atelie-cookie-modal');

  function showBanner() {
    if (banner) {
      banner.classList.remove('is-hidden');
      banner.setAttribute('aria-hidden', 'false');
      trackImpression();
    }
  }

  function hideBanner() {
    if (banner) {
      banner.classList.add('is-hidden');
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  function showModal() {
    if (modal) {
      const consent = getConsent();
      const prefs = consent ? consent.preferences : { analytics: true, marketing: false, functional: true };
      
      const elAnalytics = document.getElementById('pref-cookie-analytics');
      const elMarketing = document.getElementById('pref-cookie-marketing');
      const elFunctional = document.getElementById('pref-cookie-functional');

      if (elAnalytics) elAnalytics.checked = prefs.analytics !== false;
      if (elMarketing) elMarketing.checked = prefs.marketing === true;
      if (elFunctional) elFunctional.checked = prefs.functional !== false;

      modal.classList.remove('is-hidden');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function hideModal() {
    if (modal) {
      modal.classList.add('is-hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function init() {
    const consent = getConsent();

    if (!consent) {
      // First time visitor: show luxury banner after short gentle delay
      setTimeout(showBanner, 700);
    }

    // Button event listeners
    document.getElementById('btn-cookie-accept-all')?.addEventListener('click', () => {
      setConsent({ analytics: true, marketing: true, functional: true }, 'accept_all');
    });

    document.getElementById('btn-modal-accept-all')?.addEventListener('click', () => {
      setConsent({ analytics: true, marketing: true, functional: true }, 'accept_all');
    });

    document.getElementById('btn-cookie-reject-all')?.addEventListener('click', () => {
      setConsent({ analytics: false, marketing: false, functional: false }, 'reject_all');
    });

    document.getElementById('btn-cookie-customize')?.addEventListener('click', () => {
      hideBanner();
      showModal();
    });

    document.getElementById('btn-close-cookie-modal')?.addEventListener('click', hideModal);

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });

    document.getElementById('btn-save-cookie-prefs')?.addEventListener('click', () => {
      const elAnalytics = document.getElementById('pref-cookie-analytics');
      const elMarketing = document.getElementById('pref-cookie-marketing');
      const elFunctional = document.getElementById('pref-cookie-functional');

      const prefs = {
        necessary: true,
        analytics: elAnalytics ? elAnalytics.checked : false,
        marketing: elMarketing ? elMarketing.checked : false,
        functional: elFunctional ? elFunctional.checked : true
      };

      setConsent(prefs, 'custom_save');
    });

    // Reopen cookie settings trigger (from footer link)
    document.querySelectorAll('.btn-open-cookie-settings, #btn-open-cookie-settings').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
      });
    });
  }

  // Public API
  window.AtelieCookies = {
    getConsent,
    openSettings: showModal,
    resetConsent: () => {
      localStorage.removeItem(STORAGE_KEY);
      showBanner();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
