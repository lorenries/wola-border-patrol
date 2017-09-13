document.addEventListener('DOMContentLoaded', function(e) {

    feather.replace({ "height": "1em", "width": "1em" });

    // Initialize polyfill for 'position: sticky'

    var sticky = document.querySelector('.sticky');

    if (sticky) {

        new StickyState(sticky);

    }

    var disabledLink = document.querySelector('.disabled');

    if (disabledLink) {
        disabledLink.addEventListener('click', function(e) { e.preventDefault(); });
    }

    // Popup Function

    function popup() {

        var popup = document.querySelector('.js-popup');
        var popupClose = document.querySelector('.js-close-popup');
        var footerHeight = document.querySelector('footer').offsetHeight;

        function scrollFn() {

            if (window.pageYOffset > 500 < ((document.body.clientHeight - footerHeight) - (window.pageYOffset + window.innerHeight))) {

                popup.classList.remove('dn');

            } else if ((window.pageYOffset + window.innerHeight) >= (document.body.clientHeight - footerHeight)) {

                popup.classList.add('dn');

            }
        }

        if (popup) {
            document.addEventListener('scroll', scrollFn, false);
        }

        if (popupClose) {

            popupClose.addEventListener('click', function(e) {

                e.preventDefault();
                popup.classList.add('dn');

                // kill scroll listener
                document.removeEventListener('scroll', scrollFn, false);


            }, false);
        }

    }

    popup();

}, false);