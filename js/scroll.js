document.addEventListener('DOMContentLoaded', function() {

    var textArea = document.querySelector('textarea');

    textArea.addEventListener("scroll", function(event) {

        var scroll = textArea.scrollTop;

        // textArea.addEventListener('mouseout', function() {

        localStorage.setItem('scroll', scroll);

        // });

    });

    var textAreaScrollPos = localStorage.getItem('scroll');

    textAreaScrollPos = Number.parseInt(textAreaScrollPos);

    textArea.scrollTo(0, textAreaScrollPos);

    // do not work!

});
