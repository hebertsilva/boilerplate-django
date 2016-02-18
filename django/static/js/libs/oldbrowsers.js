/*
 *  v. 0.1
 */
(function(){

    function getInternetExplorerVersion() {
        // Returns the version of Internet Explorer or a -1
        // (indicating the use of another browser).
        var rv = -1; // Return value assumes failure.
        if ( navigator.appName == 'Microsoft Internet Explorer' ) {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) !== null) {
                rv = parseFloat( RegExp.$1 );
            }
        }
        return rv;
    }

    function createModal() {
        var overlay = document.createElement('div'),
            modal = document.createElement('div'),
            html;

        overlay.id = 'oldbrowsers-overlay';
        modal.id = 'oldbrowsers';

        html = '' +
            '<h1>Você está usando um navegador desatualizado!</h1>' +
            '<p>Para que este site funcione corretamente você deve utilizar a versão mais recente do seu navegador.</p>' +
            '<p><strong>Selecione um navegador abaixo para fazer download da versão mais recente.</strong></p>' +
            '<p>' +
                '<a target="_blank" title="Google Chrome" href="https://www.google.com/chrome/"><img src="'+ window.__STATIC_URL__ +'img/libs/oldbrowsers/ch.jpg" alt=""></a>' +
                '<a target="_blank" title="Firefox" href="http://www.mozilla.org/firefox/new/"><img src="'+ window.__STATIC_URL__ +'img/libs/oldbrowsers/ff.jpg" alt=""></a>' +
                '<a target="_blank" title="Opera" href="http://www.opera.com/"><img src="'+ window.__STATIC_URL__ +'img/libs/oldbrowsers/op.jpg" alt=""></a>' +
                '<a target="_blank" title="Safari" href="http://www.apple.com/safari/"><img src="'+ window.__STATIC_URL__ +'img/libs/oldbrowsers/sa.jpg" alt=""></a>' +
                '<a target="_blank" title="Internet Explorer" href="http://www.microsoft.com/windows/internet-explorer/default.aspx"><img src="'+ window.__STATIC_URL__ +'img/libs/oldbrowsers/ie.jpg" alt=""></a>' +
            '</p>';

        modal.innerHTML = html;
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
    }

    var ver = getInternetExplorerVersion();
    if ( ver > -1 && ver < 8 ) {
        createModal();
    }
})();
