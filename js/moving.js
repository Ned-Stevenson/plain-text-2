document.addEventListener('DOMContentLoaded', function () {




var order = localStorage.getItem('order');
order = order.split(',');




var moveActiveSwitchButton = function (i) {


    var switchButton = document.querySelector('.' + order[i] + '-switch-button');


    switchButton.addEventListener('mousedown', function (event) {
        event.preventDefault();
        // localStorage.setItem('activeNote', order[i]);
        // localStorage.setItem('activeColor', setColors[i]);

        // switchButton.style.position = 'absolute';

        // var yCoordinates = (event.pageY + '');
        // yCoordinates = Number.parseInt(yCoordinates);


        var body = document.querySelector('body');

        body.addEventListener('mousemove', function (event) {

        

        // var newYCoordinates = (event.pageY + '');
        // newYCoordinates = Number.parseInt(newYCoordinates);

        // switchButton.style.top = newYCoordinates + 'px';







        });



        


    });



    };



    for (var i = 0; i < order.length; i++) {
    moveActiveSwitchButton(i);
    }  





// var switchButton = document.querySelector('.switch-button');

// console.log(switchButton);







});

