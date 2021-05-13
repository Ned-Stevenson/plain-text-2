document.addEventListener('DOMContentLoaded', function() {
    var savingText = function(element) {
        var name = element.getAttribute('name');
        element.value = localStorage.getItem(name) || '';
        if (localStorage.getItem(name) == null) {
            localStorage.setItem(name, '');
        }
        element.oninput = function() {
            localStorage.setItem(name, element.value);
        };
    };
    var elements = document.querySelectorAll('[name]');
    for (var i = 0, length = elements.length; i < length; i++) {
        savingText(elements[i]);
    }
});