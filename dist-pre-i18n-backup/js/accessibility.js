new MutationObserver(() => {
    fixAccessibility();
}).observe(document.body, { childList: true, subtree: true });

const fixAccessibility = () => {
    document.querySelectorAll('img').forEach(el => {
        if (!el.hasAttribute('alt')) {
            el.setAttribute('alt', '')
        }
    })
}

fixAccessibility();
