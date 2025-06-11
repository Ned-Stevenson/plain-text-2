document.addEventListener('DOMContentLoaded', function() {

    // window size

    setWindowSize();

    // default

    var defaultColor = [
        'brown'
    ];
    var order = getLocalStorage.order();
    var activeNote = getLocalStorage.activeNote(order);

    // get local-storage

    var setColorsStorage = localStorage.getItem('setColors');

    // all buttons color

    if (setColorsStorage == null) {
        setColorsStorage = defaultColor;
        localStorage.setItem('setColors', defaultColor);
    }
    if (typeof(setColorsStorage) == 'string') { // checking the data type
        setColorsStorage = setColorsStorage.split(','); // convert string to array
    }
    var setColors = setColorsStorage;

    // active notepad
    // active color

    var activeColor = localStorage.getItem('activeColor');
    if (activeColor == null) {
        activeColor = defaultColor[0];
        localStorage.setItem('activeColor', defaultColor[0]);
    }

    // menu width

    var widthListArea = localStorage.getItem('widthMenuList');

    // var menuList = document.querySelector('.list');

    if (widthListArea == null || widthListArea == undefined) {
        widthListArea = 90;
        localStorage.setItem('widthMenuList', widthListArea);
        let menuList = document.querySelector('.list');
        menuList.style.minWidth = widthListArea + 'px';
        menuList.style.maxWidth = widthListArea + 'px';
    } else {
        let menuList = document.querySelector('.list');
        menuList.style.minWidth = widthListArea + 'px';
        menuList.style.maxWidth = widthListArea + 'px';
    }

    // menu-visibility

    var menuVisibility = localStorage.getItem('menu-visibility');
    var menuStatus = document.querySelector('.list');
    if (menuVisibility == null || menuVisibility == 'expand-menu') {
        menuStatus.classList.add('expand-menu');
    } else if (menuVisibility == 'hide') {
        menuStatus.classList.remove('expand-menu');
        var notepadWidth = true;
    }

    // tabs buttons

    var createTabMenu = function(i) {
        var tabMenu = document.querySelector('.list');
        var buttonTabMenu = document.createElement('a');
        buttonTabMenu.setAttribute('href', '');
        buttonTabMenu.classList.add(order[i] + '-switch-button');
        buttonTabMenu.classList.add('switch-button');
        buttonTabMenu.classList.add(setColors[i] + '-line');
        buttonTabMenu.setAttribute('id', order[i] + '-switch-button');
        tabMenu.appendChild(buttonTabMenu);
    };
    for (var i = 0; i < order.length; i++) {
        createTabMenu(i);
    }

    // notepads

    var createNotepads = function(i) {
        var notepad = function(i) {
            var notepad = document.createElement('div');
            notepad.classList.add(activeNote + '-notepad');
            notepad.classList.add('notepad');
            notepad.setAttribute('id', activeNote + '-notepad');
            notepad.classList.add('hidden');
            if (notepadWidth) {
                notepad.classList.add('notepad-expand');
            }
            var body = document.querySelector('body');
            body.appendChild(notepad);
        };
        var caption = function(i) {
            var notepad = document.querySelector('.' + activeNote + '-notepad');
            var caption = document.createElement('div');
            caption.classList.add('caption');
            caption.classList.add(activeNote + '-caption');
            notepad.appendChild(caption);
        };
        var customizeButton = function(i) {
            var caption = document.querySelector('.' + activeNote + '-caption');
            var button = document.createElement('a');
            button.classList.add('visibility-button');

            // button.setAttribute('href', '');55

            button.setAttribute('id', activeNote + '-visibility-button');
            button.textContent = '•';
            caption.appendChild(button);
            button.style.cursor = 'default';

            // button.style.position = 'relative';

            button.style.zIndex = '6002';
        };
        var customizeMenu = function(i) {
            var notepad = document.querySelector('body');
            var divCustomize = document.createElement('div');
            divCustomize.classList.add('customize');
            divCustomize.classList.add('hidden');
            divCustomize.classList.add(activeNote + '-customize');
            divCustomize.setAttribute('id', activeNote + '-customize');
            notepad.appendChild(divCustomize);
        };
        var trayOfCustomizeMenu = function(i) {
            var divCustomize = document.querySelector('.' + activeNote + '-customize');
            var pCustomize = document.createElement('p');
            pCustomize.classList.add(activeNote + '-tray');
            divCustomize.appendChild(pCustomize);
            var optionButton = document.createElement('a');
            optionButton.classList.add('option-button');
            optionButton.classList.add(activeNote + '-option-button');
            optionButton.setAttribute('href', '/pages/options.html');

            // optionButton.setAttribute('i18n', 'optionsOptions');

            divCustomize.appendChild(optionButton);
            var okButton = document.createElement('a');
            okButton.classList.add('ok-button');
            okButton.classList.add(activeNote + '-ok-button');
            okButton.setAttribute('href', '');
            divCustomize.appendChild(okButton);
            var deleteButton = document.createElement('a');
            deleteButton.classList.add('delete-button');
            deleteButton.classList.add(activeNote + '-delete-button');
            deleteButton.setAttribute('href', '');
            divCustomize.appendChild(deleteButton);
        };
        var colorCustomizeButtons = function(i) {
            var pCustomize = document.querySelector('.' + activeNote + '-tray');
            var colorsButtons = function(j) {
                var colorButton = document.createElement('a');
                colorButton.classList.add('set-color-button');
                colorButton.classList.add(getColors(j) + '-line');
                colorButton.setAttribute('href', '');
                pCustomize.appendChild(colorButton);
            };
            for (var j = 0; j < getColorsLength(); j++) {
                colorsButtons(j);
            }
        };
        var input = function(i) {
            var caption = document.querySelector('.' + activeNote + '-caption');

            var divTitle = document.createElement('div');
            divTitle.classList.add('title-wrapper');
            caption.appendChild(divTitle);

            var input = document.createElement('input');
            input.classList.add('title');
            input.classList.add(activeNote + '-title');
            input.setAttribute('name', activeNote + '-title');
            divTitle.appendChild(input);

        };
        var textarea = function(i) {
            var caption = document.querySelector('.' + activeNote + '-caption');
            var textArea = document.createElement('textarea');
            textArea.classList.add('note');
            textArea.classList.add('focus');
            textArea.classList.add(activeNote + '-note');
            textArea.setAttribute('placeholder', '...');
            textArea.setAttribute('name', activeNote + '-note');
            caption.appendChild(textArea);
        };
        notepad(i);
        caption(i);
        customizeButton(i);
        customizeMenu(i);
        trayOfCustomizeMenu(i);
        colorCustomizeButtons(i);
        input(i);
        textarea(i);
    };
    createNotepads(i);

    // set

    var notepad = document.querySelector('.' + activeNote + '-notepad');
    notepad.classList.remove('hidden');
    var input = document.querySelector('.' + activeNote + '-title');
    input.classList.add(activeColor + '-font');
    var logo = document.querySelector('.logo');
    logo.classList.add(activeColor + '-font');
    var activeButton = document.querySelector('.' + activeNote + '-switch-button');
    activeButton.classList.add(activeColor + '-fill');
    activeButton.classList.add(activeColor + '-line');
    activeButton.classList.add('highlight');

    // focus textarea

    var textareaFocus = document.querySelector('.' + activeNote + '-note');
    textareaFocus.focus();

    // fonts settings

    var fontDefault = localStorage.getItem('font');
    var fontSizeDefault = localStorage.getItem('font-size');
    if (fontDefault == null || fontDefault == undefined) {
        fontDefault = 'sans';
    }
    if (fontSizeDefault == null || fontSizeDefault == undefined) {
        fontSizeDefault = 16;
    }
    var noteMainArea = document.querySelector('.note');
    noteMainArea.style.fontFamily = 'PT ' + fontDefault;
    noteMainArea.style.fontSize = fontSizeDefault + 'px';
});
