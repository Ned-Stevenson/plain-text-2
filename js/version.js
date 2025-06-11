document.addEventListener('DOMContentLoaded', function() {

    var version = '2.7.7';

    text = chrome.i18n.getMessage('version');
    var textVersion = text + version;
    var aboutVers = document.querySelector('.about');
    aboutVers.textContent = textVersion;

});
