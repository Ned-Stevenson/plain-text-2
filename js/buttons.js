document.addEventListener('DOMContentLoaded', function () {
    var preActiveColor;
    var logo = document.querySelector('.logo');
    var order = localStorage.getItem('order');
    order = order.split(',');
    var setColors = localStorage.getItem('setColors');
    setColors = setColors.split(',');
    var activeNote = localStorage.getItem('activeNote');
    var activeColor = localStorage.getItem('activeColor');
    var activeNotepad = document.querySelector('.' + activeNote + '-notepad');
    var aciveSwitchButton = document.querySelector('.' + activeNote + '-switch-button');
    // switch
    var ActiveSwitchButton = function (i) {
        var switchButton = document.querySelector('.' + order[i] + '-switch-button');
        switchButton.addEventListener('click', function () {
            localStorage.setItem('activeNote', order[i]);
            localStorage.setItem('activeColor', setColors[i]);
        });
    };
    for (var i = 0; i < order.length; i++) {
        ActiveSwitchButton(i);
    }  

    // customize menu

    var customizeMenu = document.querySelector('.customize');
    var okButton = document.querySelector('.ok-button');
    okButton.addEventListener('click', function (event) {
        event.preventDefault();
        customizeMenu.classList.toggle('hidden');
        var emojiPanelButton = document.querySelector('.emoji-panel-button');
        emojiPanelButton.classList.toggle('hidden');
    });
    logo.addEventListener('click', function (event) {
        event.preventDefault();
        var emojiPanelGround = document.querySelector('.emoji-panel-ground');
        var emojiPanel = document.querySelector('.emoji-panel');
        var emojiPanelButton = document.querySelector('.emoji-panel-button');
        emojiPanel.classList.add('hidden');
        emojiPanelGround.classList.add('hidden');
        emojiPanelButton.classList.toggle('hidden');
        customizeMenu.classList.toggle('hidden');
        var activeCircle = customizeMenu.querySelector('.' + activeColor + '-line');
        activeCircle.classList.add(activeColor + '-fill');
        var textArea = document.querySelector('textarea');
        var customizeMenuClassName = customizeMenu.getAttribute('class');
        if (customizeMenuClassName.indexOf('hidden') + 1) {
            textArea.removeAttribute('tabindex');
        } else {
            textArea.setAttribute('tabindex', '-1');
            var newNoteButton = document.querySelector('.new-note-button');
            newNoteButton.setAttribute('tabindex', '-1');
            var swtchButton = document.querySelectorAll('.switch-button');
            for (var i = 0; i < swtchButton.length; i++) {
                swtchButton[i].setAttribute('tabindex', '-1');
            }      
        }
    });
    var targetColorMenu = function (i, color) {
        var circle = customizeMenu.querySelector('.' + color + '-line');
        circle.addEventListener('click', function (event) {
            event.preventDefault();
            var activeCircle = customizeMenu.querySelector('.' + activeColor + '-line');
            activeCircle.classList.remove(activeColor + '-fill');
            circle.classList.add(color + '-fill');
            activeColor = color;

            // input, logo and switch colors

            var inputTitle = activeNotepad.querySelector('.title');
            for (var i = 0; i < getColorsLength(); i++) {
                inputTitle.classList.remove(getColors(i) + '-font');
                logo.classList.remove(getColors(i) + '-font');
                aciveSwitchButton.classList.remove(getColors(i) + '-fill');
                aciveSwitchButton.classList.remove(getColors(i) + '-line');
            }
            inputTitle.classList.add(color + '-font');
            logo.classList.add(color + '-font');
            aciveSwitchButton.classList.add(color + '-fill');
            aciveSwitchButton.classList.add(color + '-line');

            // array write

            var arrayOrder = order.indexOf(activeNote);
            setColors.splice(arrayOrder, 1, activeColor);
            localStorage.setItem('setColors', setColors);
            localStorage.setItem('activeColor', activeColor);
            preActiveColor = activeColor;
        });
    };
    for (let i = 0; i < getColorsLength(); i++) {
        preActiveColor = targetColorMenu(i, getColors(i));
    }  

    // list of title names

    function deleteLineBreak() {
            // function delete line break and multiple spaces
            titleText = titleText.replace(/\s+/g, ' '); 
        }

    for (let i = 0; i < order.length; i++) {
        var titleText = localStorage.getItem(order[i] + '-title');
        deleteLineBreak();
        if (titleText == '' || titleText == ' ') {
            titleText = localStorage.getItem(order[i] + '-note');
        } else if (titleText == null || titleText == undefined) {
            titleText = '';
        }
        var switchButton = document.querySelector('.' + order[i] + '-switch-button');
        deleteLineBreak();
        if (titleText.length > 100) {
            titleText = titleText.substring(0, 99);
            titleText = titleText + '...';
        }
        switchButton.setAttribute('data-value', titleText);
        switchButton.setAttribute('title', titleText);
        if (titleText == null || titleText == undefined || titleText == '' || titleText == ' ') {
            switchButton.setAttribute('title', '...'); // for empty text
            switchButton.setAttribute('data-value', '...');
        }
    }  

    // resize notepad area

    var resizePlank = document.querySelector('.resize-plank');
    var menuList = document.querySelector('.list');
    var notePadArea = document.querySelector('.note');
    var bodyMainArea = document.querySelector('body');
    var bodyWidth = bodyMainArea.offsetWidth;
    bodyWidth = Number.parseInt(bodyWidth);
    var resizeTextArea = false; // When true, area resized
    resizePlank.addEventListener('mousedown', function () {
        bodyMainArea.addEventListener('mousemove', function (event) {
            if (resizeTextArea == true) {
                var coordinates = (event.pageX + '');
                coordinates = Number.parseInt(coordinates); // string to number
                coordinates = coordinates - 30;
                var noteWidth = bodyWidth - coordinates;
                if (coordinates <= 30) {
                    coordinates = 30;
                } else if (noteWidth <= 250) {
                    coordinates = bodyWidth - 250;
                }
                menuList.style.minWidth = coordinates + 'px';
                menuList.style.maxWidth = coordinates + 'px';
            }
        });
        resizeTextArea = true;
        
    });
    document.addEventListener('mouseup', function (event) {
        var widthListArea = document.querySelector('.list').offsetWidth;
        if (resizeTextArea == true) {
            localStorage.setItem('widthMenuList', widthListArea);
            resizeTextArea = false;
        }   

    });

    // new note button

    var preActiveNote = activeNote;
    var newNoteButton = document.querySelector('.new-note-button');
    noteCountOne = chrome.i18n.getMessage('noteCount1');
    noteCountTwotoFour = chrome.i18n.getMessage('noteCount2To4');
    noteCountFiveAndMore = chrome.i18n.getMessage('noteCount5');
    if (order.length < 15) {
        newNoteButton.setAttribute('data-value', order.length + ' ' + noteCountFiveAndMore);
        if (order.length < 5) {
            newNoteButton.setAttribute('data-value', order.length + ' ' + noteCountTwotoFour);
        }
        if (order.length == 1) {
            newNoteButton.setAttribute('data-value', order.length + ' ' + noteCountOne);
        }    

        newNoteButton.addEventListener('click', function (event) {
            event.preventDefault();
            var newNote = getRandomClassName();
            var duplicateSearch = function () {
                var duplicate = document.querySelector('.' + newNote + '-switch-button');
                if (duplicate == null || duplicate == undefined) {
                    return true;
                } else {
                    return false;
                }
            };
            if (duplicateSearch()) {
                order.unshift(newNote);
                localStorage.setItem('order', order);
            } else {
                while (duplicateSearch() == false) {
                    newNote = getRandomClassName();
                }
                order.unshift(newNote);
                localStorage.setItem('order', order);
            }      

            // new note + frame

            var canvas = document.querySelector('.canvas');
            canvas.classList.remove('hidden');
            var newNoteFrame = document.querySelector('.new-note-frame');
            newNoteFrame.classList.remove('hidden');

            // new note + title

            var inputTitle = document.querySelector('input');
            inputTitle.setAttribute('name', newNote + '-title');

            // enter button

            inputTitle.addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    window.location.reload(false);
                }
            });
            var name = inputTitle.getAttribute('name');
            inputTitle.value = localStorage.getItem(name) || '';
            if (localStorage.getItem(name) == null) {
                localStorage.setItem(name, '');
            }
            inputTitle.oninput = function () {
                localStorage.setItem(name, inputTitle.value);
            };

            // new note + color

            var defaultColorButton = localStorage.getItem('defaultColor');
            if (defaultColorButton == null || defaultColorButton == undefined || defaultColorButton == 'random') {
                activeColor = getRandomColor();
            } else {
                activeColor = defaultColorButton;
            }      

            // console.log(activeColor);

            var setNewNoteColor = function (color) {
                var frameColors = document.querySelector('.select-color');
                var activeCircle = frameColors.querySelector('.' + activeColor + '-line');
                activeCircle.classList.add(activeColor + '-fill');
                var circle = frameColors.querySelector('.' + color + '-line');
                circle.addEventListener('click', function (event) {
                    event.preventDefault();
                    var allCicles = frameColors.querySelectorAll('.select-color-button');
                    for (var i = 0; i < allCicles.length; i++) {
                        allCicles[i].classList.remove(activeColor + '-fill');
                    }
                    circle.classList.add(color + '-fill');
                    activeColor = color;
                    if (setColors.length < order.length) {
                        setColors.unshift(activeColor);
                    } else if (setColors.length >= order.length) {
                        setColors.splice(0, 1);
                        setColors.unshift(activeColor);
                    }
                    setLocalStorage();
                });
            };
            for (var i = 0; i < getColorsLength(); i++) {
                setNewNoteColor(getColors(i));
            }      

            // cancel button

            var cancelButtonCreateNewNote = newNoteFrame.querySelector('.cancel-button');
            cancelButtonCreateNewNote.addEventListener('click', function () {
                localStorage.removeItem(newNote + '-title');
                setColors.splice(0, 1);
                localStorage.setItem('setColors', setColors);
                order.splice(0, 1);
                localStorage.setItem('order', order);
                localStorage.setItem('activeNote', preActiveNote);
                if (preActiveColor == null || preActiveColor == undefined) {
                    for (var i = 0; i < order.length; i++) {
                        if (preActiveNote == order[i]) {
                            preActiveColor = setColors[i];
                        }
                    }
                }        

                localStorage.setItem('activeColor', preActiveColor);
            });
            var setLocalStorage = function () {
                localStorage.setItem('activeColor', activeColor);
                localStorage.setItem('activeNote', newNote);
                localStorage.setItem('setColors', setColors);
            };
            setColors.unshift(activeColor);
            setLocalStorage();

            // "Tab" button

            setUnfocus();
            // inputTitle.blur();
            inputTitle.focus();
            inputTitle.setAttribute('tabindex', '1');
            var allCiclesLinks = newNoteFrame.querySelectorAll('a');
            var y = 1;
            for (let i = 0; i < allCiclesLinks.length; i++) {
                y = y + 1;
                allCiclesLinks[i].setAttribute('tabindex', y);
            }
        });
    } else {
        var maxNotesCount = chrome.i18n.getMessage('maxNotesCount');
        newNoteButton.setAttribute('data-value', maxNotesCount);
        newNoteButton.setAttribute('style', 'cursor: default');
    }  

    // delete note

    var removeButton = document.querySelector('.' + activeNote + '-delete-button');
    if (order.length == 1) {
        removeButton.classList.add('hidden');
    } 

    removeButton.addEventListener('click', function (event) {
        event.preventDefault();
        customizeMenu.classList.add('hidden');
        var canvas = document.querySelector('.canvas');
        canvas.classList.remove('hidden');
        var verifyFrame = document.querySelector('.verify-frame');
        verifyFrame.classList.remove('hidden');
        setUnfocus();
        var cancelButton = verifyFrame.querySelector('.cancel-button');
        cancelButton.setAttribute('tabindex', '1');
        var removeButton = document.querySelector('.remove-button');
        removeButton.setAttribute('tabindex', '2');
        var removeButtonFinal = document.querySelector('.remove-button');
        removeButtonFinal.addEventListener('click', function () {
            var newOrder;
            for (var i = 0; i < order.length; i++) {
                if (activeNote == order[i]) {
                    order.splice(i, 1);
                    setColors.splice(i, 1);
                    var j = i;
                    if (j == order.length) {
                        j = j - 1;
                    }
                    localStorage.removeItem(activeNote + '-title');
                    localStorage.removeItem(activeNote + '-note');
                    localStorage.removeItem(activeNote + '-note' + '-caretStart');
                    localStorage.removeItem(activeNote + '-note' + '-caretEnd');
                    localStorage.setItem('order', order);
                    localStorage.setItem('setColors', setColors);
                    localStorage.setItem('activeNote', order[j]);
                    localStorage.setItem('activeColor', setColors[j]);
                }
            }
        });
    });
});


