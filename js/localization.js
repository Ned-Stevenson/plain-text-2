document.addEventListener('DOMContentLoaded', function () {
    var removeButton = document.querySelector('.remove-button');
    var removeButtonLocal = browser.i18n.getMessage('remove');
    removeButton.textContent = removeButtonLocal;

    // remove button

    var cancelButton = document.querySelectorAll('.cancel-button');
    cancelButtonLocal = browser.i18n.getMessage('cancel');
    for (var i = 0; i < cancelButton.length; i++) {
        cancelButton[i].textContent = cancelButtonLocal;
    }  

    // create button

    var createButton = document.querySelector('.create-button');
    var createButtonLocal = browser.i18n.getMessage('create');
    createButton.textContent = createButtonLocal;

    // warning massage

    var cautionMassage = document.querySelector('.caution');
    var cautionMassageLocal = browser.i18n.getMessage('caution');
    cautionMassage.textContent = cautionMassageLocal;

    // new-note-frame

    var newNoteFrame = document.querySelector('.new-note-frame');
    var inputTitleNoteFrame = newNoteFrame.querySelector('.title');
    var inputTitleNoteFrameLocal = browser.i18n.getMessage('inputTitleNoteFrame');
    inputTitleNoteFrame.setAttribute('placeholder', inputTitleNoteFrameLocal);
    var newNottButton = document.querySelector('.new-note-button');
    var newNottButtonTitle = browser.i18n.getMessage('newNottButtonTitle');
    newNottButton.setAttribute('title', newNottButtonTitle);

    // logo button

    var logoButton = document.querySelector('.logo');
    logoButtonTitle = browser.i18n.getMessage('logoButtonTitle');
    logoButton.setAttribute('title', logoButtonTitle);
});
