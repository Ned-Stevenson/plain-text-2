document.addEventListener('DOMContentLoaded', function() {
    var unfocus = document.querySelectorAll('a');
    for (var i = 0; i < unfocus.length; i++) {
        unfocus[i].addEventListener('click', function() {
            this.focus();
            this.blur();
        });
    }
});

// the function removes the frame around the link
