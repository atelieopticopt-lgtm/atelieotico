
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com","https://extensions.shopifycdn.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Cwf7UO8Y.js","/cdn/shopifycloud/checkout-web/assets/c1/app.CtOGTtvX.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.BfceT7Gm.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser.B8P1EKyP.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-grouping.ijr4mkmS.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery.DNaCdp_5.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers.DyS8n08y.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-errors.D0vnY0zo.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-proposal.BEWbImH7.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-installmentsNotSupportedForAddress.aWEKTUp0.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared.hfwFKKeD.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-extension-execution-errors.BJUcmpLy.js","/cdn/shopifycloud/checkout-web/assets/c1/extensions-rpc.B5eub_md.js","/cdn/shopifycloud/checkout-web/assets/c1/error-logger-report-graphql-error.B8_isrVi.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails.BQ4t4sdo.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound.Crv2kHed.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate.DDApgf6-.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-browser.BreiFmC0.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-derivations.BuZCXueD.js","/cdn/shopifycloud/checkout-web/assets/c1/color-contrast-colorContrast.DQM7pLx9.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.Dz0J_wWy.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage.D1N3JV4T.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal.CEJPZPLZ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase.Bb5IL9w5.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition.lIEVY1sI.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowShopPayOptin.cMxe3HfO.js","/cdn/shopifycloud/checkout-web/assets/c1/remember-me-hooks.vcaCAV2Q.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink.CVvVQ4Py.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm.Bzmk4dyO.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField.CfUGRYSZ.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture.jvB1ABJn.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module.D7lpQ0CL.js","/cdn/shopifycloud/checkout-web/assets/c1/Popover.QzS3cp95.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice.BWTwhIaP.js","/cdn/shopifycloud/checkout-web/assets/c1/Interaction-tracker.COxACDkl.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox.D_K0Yc9W.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.CzplkIoI.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useEcpSpiDebugLog.BNKPVLU9.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.Fjgr32by.js","/cdn/shopifycloud/checkout-web/assets/c1/Monorail-monorailMetric-wallets.CIr0FuoA.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks.BwuXcLbq.js","/cdn/shopifycloud/checkout-web/assets/c1/EmptyState.QK3s7OVM.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.SvSjZfIU.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping.C6GiZVdG.js","/cdn/shopifycloud/checkout-web/assets/c1/components-useVaultedMsiInstallments.EKI4KSqu.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon.BC00AmKU.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-context.3F2bpVDh.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.BRwfv4PV.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine.BKUd01do.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.DvWwVwDG.js","/cdn/shopifycloud/checkout-web/assets/c1/cvv-cvvBridge.CIsNul5I.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useFilteredShopPayAvailablePaymentMethods.7p75-vwE.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.DWvxEzAS.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.6JqckUyF.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage.CBGWnIfH.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit.CqP360k_.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.GXBEANRQ.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-installments-types.CdWcc4g3.js","/cdn/shopifycloud/checkout-web/assets/c1/IncentiveBadge.BGzEheYG.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-useViolationsHandler.BuK0op4k.js","/cdn/shopifycloud/checkout-web/assets/c1/negotiated-findSelectedDeliveryMethod.BYBtAzww.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button.COhOyizG.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences.nghowNLm.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-monorail.D-yFz53u.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscount.eJkD3Xw0.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector.CDxO8h7T.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.Dowll4AE.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.CIZ6QHIc.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-as-guest-amazon-pay.Dtl-TeXu.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot.CZBKJG8d.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent.A1CdHwMc.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodRateLabel.CKUIoe1S.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included.LWcS4IIT.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines.fpTx1C3v.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.Bv2LEr8v.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.CfwJ4BrT.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.DFPBr9PL.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea.DffMvWu8.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.Doii7BD0.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.DEEmjrWA.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-browser-engine.DLRRwZbY.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.B1Hf1Dl6.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.V5glN9C1.js","/cdn/shopifycloud/checkout-web/assets/c1/QRCode.BJe8gpxu.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-dates.ChO2GdxN.js","/cdn/shopifycloud/checkout-web/assets/c1/NumberField.DJ1jvebh.js","/cdn/shopifycloud/checkout-web/assets/c1/extensions-remote-dom.D_QZ4sQX.js","/cdn/shopifycloud/checkout-web/assets/c1/EmailField.DZSG9axI.js","/cdn/shopifycloud/checkout-web/assets/c1/Sheet.B34QmIdO.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-rendering-extension-targets.DA209G8w.js","/cdn/shopifycloud/checkout-web/assets/c1/dist-v4.EwEgHOG0.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.DKSSBRBs.js","/cdn/shopifycloud/checkout-web/assets/c1/adapter-host.m5J1DyLX.js","/cdn/shopifycloud/checkout-web/assets/c1/sandbox.C6K77SV1.worker.js","/cdn/shopifycloud/checkout-web/assets/c1/sandbox-2025-07.DpzA6bL0.worker.js","https://extensions.shopifycdn.com/shopifycloud/checkout-web/assets/c1/polyfills-entry-modern.oWckgtZS.worker.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.BYT6yYGe.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/grouping.Cray4R9V.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/previous.BS7gyRhv.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.BDn7-hvu.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DeliveryTransition.DhbMYMIx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useVaultedMsiInstallments.dhevUZ1f.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.2B5x30PG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useOnePageFormSubmit.tSP6pJcp.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/cvvBridge.CIy8uDiZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Choice.jvH8TQL4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RedirectionNotice.B8v_QGNW.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EmptyState.BEvzDDvy.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentLine.0ZuT82rY.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.Dq_6Ius6.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentIcon.CLVwzp6i.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/IncentiveBadge.C5mVOEBf.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/BillingAddressForm.BdwN7V1K.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShowShopPayOptin.87JMHPUK.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PhoneField.uZEuHncj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Middot.D7Ujmshx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingLines.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MerchandiseModal.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EstimatedDeliveryContent.B_THySFF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentButtons.BbF1yV61.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.DWE5rRxz.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/QRCode.BZ_m5G5a.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Checkbox.CfwUdlpL.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Popover.C8uylY0y.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/NumberField.CRpcZnVJ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Sheet.BiQjEGaX.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPaySessionTokenStorage.DfWUBaTh.css"];
      var fontPreconnectUrls = ["https://fonts.shopifycdn.com"];
      var fontPrefetchUrls = ["https://fonts.shopifycdn.com/figtree/figtree_n4.3c0838aba1701047e60be6a99a1b0a40ce9b8419.woff2?h1=bWVsaW4uY29t&hmac=94378ca9b845b50f8ba0a2d2826e587264c2806c85fc3ae79a6967b8ef8c1f1f","https://fonts.shopifycdn.com/figtree/figtree_n5.3b6b7df38aa5986536945796e1f947445832047c.woff2?h1=bWVsaW4uY29t&hmac=c1f2c1dbcbc8a3bb32c4dfe10500637d7bc332f235f08546e0b3e3173cf6a2ec"];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/1175/0278/files/Join_the_1M_Happy_Heads_Who_Wear_Melin_5_copy_3_x320.png?v=1786555340"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  