document.addEventListener('DOMContentLoaded', function() {

    // TODO - Come up with a better way to handle emojis
    var emoji = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🥳', '🥴', '🥺', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '❤️', '🖤', '💔', '☯️'];

    // create elements

    // buildDomElement('.notepad', 'div', 'emoji-panel-buttong-ground');
    buildLinkElement('.emoji-panel-buttong-ground', 'emoji-panel-button', '', ':-)');
    buildDomElement('.notepad', 'div', 'emoji-panel');
    buildDomElement('.emoji-panel', 'div', 'emoji-panel-ground');

    for (var i = 0; i < emoji.length; i++) {
        buildLinkElement('.emoji-panel', 'emoji-button-' + i, '', emoji[i]);
        addClassName('.emoji-button-' + i, 'emoji-button');
    }
    var emojiPanelButton = document.querySelector('.emoji-panel-button');
    var emojiPanel = document.querySelector('.emoji-panel');
    var emojiPanelGround = document.querySelector('.emoji-panel-ground');

    emojiPanel.classList.add('hidden');
    emojiPanelGround.classList.add('hidden');

    // localization

    emojiTitle = chrome.i18n.getMessage('emoji');
    emojiPanelButton.setAttribute('title', emojiTitle);

    // open panel

    emojiPanelButton.addEventListener('click', function(event) {
        event.preventDefault();
        emojiPanel.classList.toggle('hidden');
        emojiPanelGround.classList.toggle('hidden');
    });

    // the function removes the frame around the link

    var unfocus = emojiPanel.querySelectorAll('a');
    for (let i = 0; i < unfocus.length; i++) {
        unfocus[i].addEventListener('click', function() {
            this.focus();
            this.blur();
        });
    }

    // get focused element

    var activeNote = localStorage.getItem('activeNote');
    var textArea = document.querySelector('.' + activeNote + '-note');
    var titleWrapper = document.querySelector('.title-wrapper');
    var inputTitle = document.querySelector('.' + activeNote + '-title');
    var focusedElement = textArea;
    titleWrapper.addEventListener('click', function(event) {
        event.preventDefault();
        focusedElement = inputTitle;
        emojiPanel.classList.add('hidden');
    });
    textArea.addEventListener('click', function(event) {
        event.preventDefault();
        focusedElement = textArea;
    });

    // set focus to element

    emojiPanel.addEventListener('click', function(event) {
        focusedElement.blur();
        focusedElement.focus();
    });
    var emojiPanelButtongGround = document.querySelector('.emoji-panel-buttong-ground');
    emojiPanelButtongGround.addEventListener('click', function(event) {
        focusedElement.blur();
        focusedElement.focus();
    });

    // add emoji

    var allEmojies = document.querySelectorAll('.emoji-button');

    function clickEmojiFeature(element) {

        element.addEventListener('click', function(event) {

            event.preventDefault();

            // highlight emoji

            element.classList.add('favourite-emoji');

            let allHighlightEmoji = document.querySelectorAll('.favourite-emoji');

            element.classList.add('favourite-emoji-' + allHighlightEmoji.length);

            // if (allHighlightEmoji.length > 10) {

            //     let firstEmojiHL = document.querySelector('.favourite-emoji-1');
            //     firstEmojiHL.classList.remove('favourite-emoji');
            //     firstEmojiHL.classList.remove('favourite-emoji-1');

            //     for (let i = 1; i < allHighlightEmoji.length; i++) {

            //         let elementEmoji = document.querySelector('.favourite-emoji-' +  (i + 1));
            //         elementEmoji.classList.remove('favourite-emoji-' + (i + 1));
            //         elementEmoji.classList.add('favourite-emoji-' + i);                    
            //     }
            // }

            let activeButton = event.target;
            activeButton = activeButton.textContent;

            insertElementOnCaretPos(activeButton, focusedElement);
        });
    }

    for (let i = 0; i < allEmojies.length; i++) {
        clickEmojiFeature(allEmojies[i]);
    }

    // close emoji panel on focus lose

    function hideEmojiPanel(element, action) {
        element.addEventListener(action, function(event) {
            event.preventDefault();
            emojiPanel.classList.add('hidden');
            emojiPanelGround.classList.add('hidden');
        });
    }

    hideEmojiPanel(textArea, 'input');
    hideEmojiPanel(textArea, 'click');
    hideEmojiPanel(titleWrapper, 'input');
    hideEmojiPanel(titleWrapper, 'click');

    // function insert element

    function insertElementOnCaretPos(copyBuffer, focusedElement) {

        var caretStart = focusedElement.selectionStart;
        var caretEnd = focusedElement.selectionEnd;

        focusedElementContent = focusedElement.value;

        var focusedElementContentStart = focusedElementContent.substring(0, caretStart);
        var focusedElementContentEnd = focusedElementContent.substring(caretEnd);

        focusedElementContent = focusedElementContentStart + copyBuffer + focusedElementContentEnd;

        focusedElement.value = focusedElementContent;
        caretStart += 2;

        caretEnd = caretStart;

        focusedElement.setSelectionRange(caretEnd, caretEnd);
        localStorage.setItem(activeNote + '-note', textArea.value);
        localStorage.setItem(activeNote + '-title', inputTitle.value);
        localStorage.setItem(activeNote + '-note' + '-caretStart', caretStart);
        localStorage.setItem(activeNote + '-note' + '-caretEnd', caretEnd);
    }

});
