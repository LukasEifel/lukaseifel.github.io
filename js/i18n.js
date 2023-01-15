var lngs = {
    en: { nativeName: 'English'},
    de: { nativeName: 'Deutsch'}
};

const rerender = () => {
    // start localizing
    $('body').localize();
};

$(function () {
    i18next
        .use(i18nextHttpBackend)
        // detect user language
        .use(i18nextBrowserLanguageDetector)
        // init i18next
        .init({
            debug: true,
            load: 'languageOnly',
            fallbackLng: 'en',
            detection: {
                lookupQuerystring: 'lng'
            }
        }, (err, t) => {
            if (err) return console.error(err);
        
            jqueryI18next.init(i18next, $, { useOptionsAttr: true });
            
            // fill language switcher
            Object.keys(lngs).map((lng) => {
                const opt = new Option(lngs[lng].nativeName, lng);
                if (lng === i18next.resolvedLanguage) {
                    opt.setAttribute("selected", "selected");
                }
                $('#languageSwitcher').append(opt);
            });
            $('#languageSwitcher').change((a, b, c) => {
                const chosenLng = $(this).find("option:selected").attr('value');
                i18next.changeLanguage(chosenLng, () => {
                    rerender();
                });
            });
        
            rerender();
        });
});