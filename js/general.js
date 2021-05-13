function buildDomElement(parent, element, className) {
    var parentElement = document.querySelector(parent);
    var childElement = document.createElement(element);
    childElement.classList.add(className);
    parentElement.appendChild(childElement);
}
function addClassName(element, className) {
    var elementDom = document.querySelector(element);
    elementDom.classList.add(className);
}
function buildLinkElement(parent, className, link, name) {
    var parentElement = document.querySelector(parent);
    var childElement = document.createElement('a');
    childElement.classList.add(className);
    childElement.setAttribute('href', link);
    childElement.textContent = name;
    parentElement.appendChild(childElement);
}
function removeSelectedClass(element) {
    var box = document.querySelector('.' + element);
    var allButtons = box.querySelectorAll('.button');
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('selected');
    }
}
function setWindowSize() {
    var bodyMain = document.querySelector('body');
    var notePadSizeBody = localStorage.getItem('notepad-size');
    var activeButtonSetWindowSize = localStorage.getItem('notepad-size-key');
    if (activeButtonSetWindowSize == null || undefined) {
        activeButtonSetWindowSize = 'medium';
        notePadSizeBody = 630;
    }
    bodyMain.style.width = notePadSizeBody + 'px';
}
function getColors(i) {
    var colors = [
        'grey',
        'purple',
        'green',
        'red',
        'yellow',
        'blue',
        'orange',
        'brown',
        'black',
        'white'
    ];
    return colors[i];
}
function getColorsLength() {
    var colors = [
        'grey',
        'purple',
        'green',
        'red',
        'yellow',
        'blue',
        'orange',
        'brown',
        'black',
        'white'
    ];
    return colors.length;
}
function getRandomColor() {
    var colors = [
        'grey',
        'purple',
        'green',
        'red',
        'yellow',
        'blue',
        'orange',
        'brown',
        'black',
        'white'
    ];
    return colors[Math.floor(Math.random() * (colors.length - 0)) + 0];
}
function getRandomClassName() {
    var alfabet = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'g',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ];
    var randomNumber = function () {
        return Math.floor(Math.random() * (alfabet.length - 0)) + 0;
    };
    var className = alfabet[randomNumber()];
    for (var i = 0; i < 7; i++) {
        randomNumber();
        className = className + alfabet[randomNumber()];
    }
    return className;
}
function setUnfocus() {
    var i,
    allLinks,
    inputTitle,
    textArea;
    allLinks = document.querySelectorAll('a');
    for (i = 0; i < allLinks.length; i++) {
        allLinks[i].setAttribute('tabindex', '-1');
    }
    inputTitle = document.querySelectorAll('input');
    for (i = 0; i < inputTitle.length; i++) {
        inputTitle[i].setAttribute('tabindex', '-1');
    }
    textArea = document.querySelectorAll('textarea');
    for (i = 0; i < textArea.length; i++) {
        textArea[i].setAttribute('tabindex', '-1');
    }
}

// local storage

var getLocalStorage = {
    order: function () {
        var order = localStorage.getItem('order');
        if (order == null) {
            order = [
                'first'
            ];
            localStorage.setItem('order', order);
        } else {
            order = order.split(',');
        }
        if (order.length == 15) {
            var verticalPlus = document.querySelector('.vertical-plus');
            verticalPlus.classList.add('hidden');
        }
        return order;
    },
    activeNote: function (order) {
        var activeNote = localStorage.getItem('activeNote');
        if (activeNote == null) {
            activeNote = order[0];
            localStorage.setItem('activeNote', order[0]);
        }
        return activeNote;
    }
};
