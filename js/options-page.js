document.addEventListener('DOMContentLoaded', function() {
    function localizeElement(element, message) {
        var elementDom = document.querySelector(element);
        var messageLocal = chrome.i18n.getMessage(message);
        elementDom.textContent = messageLocal;
    }

    buildDomElement('.main-area', 'p', 'font-pref');
    addClassName('.font-pref', 'pref');
    localizeElement('.font-pref', 'fontPref');
    buildLinkElement('.font-pref', 'sans', '', 'Sans');
    addClassName('.sans', 'button');
    buildLinkElement('.font-pref', 'serif', '', 'Serif');
    addClassName('.serif', 'button');
    buildLinkElement('.font-pref', 'mono', '', 'Mono');
    addClassName('.mono', 'button');

    // Font size options

    buildDomElement('.main-area', 'p', 'font-size');
    addClassName('.font-size', 'pref');
    localizeElement('.font-size', 'fontSize');
    buildLinkElement('.font-size', 'less-font-size', '', '−');
    addClassName('.less-font-size', 'button');
    buildLinkElement('.font-size', 'more-font-size', '', '+');
    addClassName('.more-font-size', 'button');
    buildLinkElement('.font-size', 'font-size-screen', '', '');
    addClassName('.font-size-screen', 'button');
    buildDomElement('.font-size', 'span', 'font-size-example');
    localizeElement('.font-size-example', 'pangram');
    // todo: add random pangram!

    // notepad size

    buildDomElement('.main-area', 'p', 'notepad-size-block');
    addClassName('.notepad-size-block', 'pref');
    localizeElement('.notepad-size-block', 'notepad');
    buildLinkElement('.notepad-size-block', 'large-size', '', '');
    addClassName('.large-size', 'button');
    localizeElement('.large-size', 'large');
    buildLinkElement('.notepad-size-block', 'medium-size', '', '');
    addClassName('.medium-size', 'button');
    localizeElement('.medium-size', 'medium');
    buildLinkElement('.notepad-size-block', 'small-size', '', '');
    addClassName('.small-size', 'button');
    localizeElement('.small-size', 'small');

    // set color

    buildDomElement('.main-area', 'p', 'set-color-block');
    addClassName('.set-color-block', 'pref');
    localizeElement('.set-color-block', 'defaultColor');
    buildLinkElement('.set-color-block', 'random', '', '');
    addClassName('.random', 'button');
    localizeElement('.random', 'random');
    var setColorBlock = document.querySelector('.set-color-block');
    var brElement = document.createElement('br');
    setColorBlock.appendChild(brElement);

    function createButtonSetColor(color) {
        var className = color + '-font';
        buildLinkElement('.set-color-block', className, '', '');
        className = '.' + className;
        addClassName(className, 'color-selected');
        addClassName(className, 'button');
        var classNameFill = color + '-line';
        addClassName(className, classNameFill);
    }
    var allColors = [
        'grey',
        'purple',
        'green',
        'red',
        'yellow',
        'orange',
        'blue',
        'brown',
        'black',
        'white'
    ];
    for (var i = 0; i < allColors.length; i++) {
        createButtonSetColor(allColors[i]);

    }

    // 'done' button

    buildDomElement('.main-area', 'p', 'done-button-block');
    addClassName('.done-button-block', 'pref');
    buildLinkElement('.done-button-block', 'done', '../index.html', '');
    addClassName('.done', 'button');
    localizeElement('.done', 'done');
});
