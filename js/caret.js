document.addEventListener('DOMContentLoaded', function() {
    var textArea = document.querySelector('textarea');
    var TextAreaName = textArea.getAttribute('name');

    function setCaretPosition() {
        var caretPosStart = textArea.selectionStart;
        localStorage.setItem(TextAreaName + '-caretStart', caretPosStart);
        var caretPosEnd = textArea.selectionEnd;
        localStorage.setItem(TextAreaName + '-caretEnd', caretPosEnd);
    }
    textArea.addEventListener('keyup', function() {
        setCaretPosition();
    });
    textArea.addEventListener('mouseup', function() {
        setCaretPosition();
    });
    textArea.addEventListener('click', function() {
        setCaretPosition();
    });
    textArea.addEventListener('mouseout', function() {
        setCaretPosition();
    });
    var textAreaCaretPosStart = localStorage.getItem(TextAreaName + '-caretStart');
    var textAreaCaretPosEnd = localStorage.getItem(TextAreaName + '-caretEnd');
    if (textAreaCaretPosStart == null || textAreaCaretPosStart == undefined) {
        textAreaCaretPosStart = 0;
        textAreaCaretPosEnd = 0;
    }
    textArea.setSelectionRange(textAreaCaretPosStart, textAreaCaretPosEnd);
});
