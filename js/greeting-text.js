document.addEventListener('DOMContentLoaded', function () {
    var title = localStorage.getItem('first-title');
    var text = localStorage.getItem('first-note');
    if (title == null) {
        title = browser.i18n.getMessage('greetingTitle');
        localStorage.setItem('first-title', title);
    }
    if (text == null) {
        text = browser.i18n.getMessage('greeting');
        localStorage.setItem('first-note', text);
    }
});
