document.addEventListener('DOMContentLoaded', function () {

    // set winow size
    
    var bodyMain = document.querySelector('body');
    var notePadSizeBody = localStorage.getItem('notepad-size');
    var activeButtonSetWindowSize = localStorage.getItem('notepad-size-key');
    if (activeButtonSetWindowSize == null || undefined) {
        activeButtonSetWindowSize = 'medium';
        notePadSizeBody = 630;
    }
    var activeButtonSetWindow = document.querySelector('.' + activeButtonSetWindowSize + '-size');
    activeButtonSetWindow.classList.add('selected');
    bodyMain.style.width = notePadSizeBody + 'px';

    // notepad size options

    var setNotepadSize = function (size) {
        var bodyMain = document.querySelector('body');
        var smallSizeButton = document.querySelector('.small-size');
        var mediumSizeButton = document.querySelector('.medium-size');
        var largeSizeButton = document.querySelector('.large-size');
        var button = document.querySelector('.' + size + '-size');
        button.addEventListener('click', function (event) {
            event.preventDefault();
            removeSelectedClass('notepad-size-block');
            button.classList.add('selected');
            var width;
            if (size == 'small') {
                width = 490;
            } else if (size == 'medium') {
                width = 630;
            } else if (size == 'large') {
                width = 790;
            }
            bodyMain.style.width = width + 'px';
            console.log(width + 'px');
            localStorage.setItem('notepad-size', width);
            localStorage.setItem('notepad-size-key', size);
        });
    };
    setNotepadSize('small');
    setNotepadSize('medium');
    setNotepadSize('large');

    // set default color

    var defaultColorButton = localStorage.getItem('defaultColor');
    var aciveButton;
    if (defaultColorButton == null || defaultColorButton == undefined) {
        defaultColorButton = 'random';
    }
    if (defaultColorButton == 'random') {
        aciveButton = document.querySelector('.random');
        aciveButton.classList.add('selected');
    } else {
        aciveButton = document.querySelector('.' + defaultColorButton + '-font');
        aciveButton.classList.add(defaultColorButton + '-fill');
        var randomButton = document.querySelector('.random');
    }
    var newNoteSetColor = function (color) {
        var setColorBlock = document.querySelector('.set-color-block');
        var allButtons = setColorBlock.querySelectorAll('.button');
        var button = setColorBlock.querySelector('.' + color + '-font');
        var buttonRandom = setColorBlock.querySelector('.random');
        var allColors = [
            'grey',
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
        button.addEventListener('click', function (event) {
            event.preventDefault();
            for (var i = 0; i < allButtons.length; i++) {
                allButtons[i].classList.remove('selected');
                allButtons[i].classList.remove(allColors[i] + '-fill');
                button.classList.add(color + '-fill');
                localStorage.setItem('defaultColor', color);
            }
        });
        buttonRandom.addEventListener('click', function (event) {
            event.preventDefault();
            for (var i = 0; i < allButtons.length; i++) {
                allButtons[i].classList.remove('selected');
                allButtons[i].classList.remove(allColors[i] + '-fill');
            }
            buttonRandom.classList.add('selected');
            localStorage.setItem('defaultColor', 'random');
        });
    };
    newNoteSetColor('grey');
    newNoteSetColor('purple');
    newNoteSetColor('green');
    newNoteSetColor('red');
    newNoteSetColor('yellow');
    newNoteSetColor('orange');
    newNoteSetColor('blue');
    newNoteSetColor('brown');
    newNoteSetColor('black');
    newNoteSetColor('white');

    // set font 

    var fontDefault = localStorage.getItem('font');
    if (fontDefault == null || fontDefault == undefined) {
        fontDefault = 'sans';
    }
    var fontBlock = document.querySelector('.font-pref');
    var activeButtonFontSet = fontBlock.querySelector('.' + fontDefault);
    activeButtonFontSet.classList.add('selected');
    var fontPref = function (font) {
        var fontBlock = document.querySelector('.font-pref');
        var fontSet = fontBlock.querySelector('.' + font);
        fontSet.addEventListener('click', function (event) {
            event.preventDefault();
            removeSelectedClass('font-pref');
            fontSet.classList.add('selected');
            localStorage.setItem('font', font);
            var fontSizeBlockExample = document.querySelector('.font-size-example');
            fontSizeBlockExample.style.fontFamily = 'PT ' + font;
        });
    };
    fontPref('sans');
    fontPref('serif');
    fontPref('mono');

    // font size set

    var fontSizeBlockExample = document.querySelector('.font-size-example');
    fontSizeBlockExample.style.fontFamily = 'PT ' + fontDefault;
    var fontSizeBlock = document.querySelector('.font-size');
    var lessFontSize = fontSizeBlock.querySelector('.less-font-size');
    var moreFontSize = fontSizeBlock.querySelector('.more-font-size');
    var defaultFontSize = localStorage.getItem('font-size');
    if (defaultFontSize == null || defaultFontSize == undefined) {
        defaultFontSize = 16;
    } else if (defaultFontSize == 10) {
        lessFontSize.classList.add('silent');
    } else if (defaultFontSize == 30) {
        moreFontSize.classList.add('silent');
    } else if (defaultFontSize == 30) {
    }
    defaultFontSize = Number.parseInt(defaultFontSize);
    var fontSizeScreen = fontSizeBlock.querySelector('.font-size-screen');
    fontSizeScreen.setAttribute('data-value', defaultFontSize);
    if (defaultFontSize == 16) {
        fontSizeScreen.classList.add('white-font');
    } 

    fontSizeBlockExample.style.fontSize = defaultFontSize + 'px';
    lessFontSize.addEventListener('click', function (event) {
        event.preventDefault();
        moreFontSize.classList.remove('silent');
        defaultFontSize = defaultFontSize - 2;
        if (defaultFontSize <= 10) {
            defaultFontSize = 10;
            lessFontSize.classList.add('silent');
        } else if (defaultFontSize == 16) {
            fontSizeScreen.classList.add('white-font');
        } else if (defaultFontSize != 16) {
            fontSizeScreen.classList.remove('white-font');
        }
        fontSizeBlockExample.style.fontSize = defaultFontSize + 'px';
        console.log(defaultFontSize);
        localStorage.setItem('font-size', defaultFontSize);
        fontSizeScreen.setAttribute('data-value', defaultFontSize);
    });
    moreFontSize.addEventListener('click', function (event) {
        event.preventDefault();
        lessFontSize.classList.remove('silent');
        defaultFontSize = defaultFontSize + 2;
        if (defaultFontSize >= 30) {
            defaultFontSize = 30;
            moreFontSize.classList.add('silent');
        } else if (defaultFontSize == 16) {
            fontSizeScreen.classList.add('white-font');
        } else if (defaultFontSize != 16) {
            fontSizeScreen.classList.remove('white-font');
        }
        fontSizeBlockExample.style.fontSize = defaultFontSize + 'px';
        localStorage.setItem('font-size', defaultFontSize);
        fontSizeScreen.setAttribute('data-value', defaultFontSize);
    });
});
