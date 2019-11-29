//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

function pageLoad() {

    console.log("Page load is running :)");

    var btn2 = document.getElementById("go");
    var e = document.getElementById("playeroptions")
    var playersaid = e.options[e.selectedIndex].value
    btn2.onclick = function() {
        var result = e.options[e.selectedIndex].label
        alert(result)
    }

//moves the cards from relevant pile to centre
    var btn = document.getElementById("Play");
    var count = 0;
    var playdirection = 'forwards'
    btn.onclick = function () {
        if (playdirection == 'forwards') {
            count++
        } else {
            count--
        }
        while (count < 0) {
            count += 4
        }
        var x = 0;
        var y = 0;
        if ((count % 4) == 1) {
            var card = document.getElementById("card")
            var s = setInterval(moveCard1, 1);
            y = 200;

            function moveCard1() {
                if (x >= 0 && x < 650) {
                    x++;
                }
                if (x == 650 && y == 200) {
                    card.style.backgroundColor = 'red';
                }
                card.style.left = x + "px";
                card.style.top = y + "px";
            }
        } else if ((count % 4) == 2) {
            var card2 = document.getElementById("card2");
            var s = setInterval(moveCard2, 1);
            x = 650;

            function moveCard2() {
                if (y >= 0 && y < 200) {
                    y++;
                }
                if (x == 650 && y == 200) {
                    card2.style.backgroundColor = 'red';
                }
                card2.style.left = x + "px";
                card2.style.top = y + "px";
            }
        } else if ((count % 4) == 0) {
            var card3 = document.getElementById("card3");
            var s = setInterval(moveCard3, 1);
            y = 400;
            x = 650;

            function moveCard3() {
                if (y > 200 && y <= 400) {
                    y--;
                }
                if (x == 650 && y == 200) {
                    card3.style.backgroundColor = 'red';
                }
                card3.style.left = x + "px";
                card3.style.top = y + "px";
            }
        } else if ((count % 4) == 3) {
            var card4 = document.getElementById("card4")
            var s = setInterval(moveCard4, 1);
            x = 1300;

            function moveCard4() {
                y = 200;
                if (x > 650 && x <= 1300) {
                    x--;
                }
                if (x == 650 && y == 200) {
                    card4.style.backgroundColor = 'red';
                }
                card4.style.left = x + "px";
                card4.style.top = y + "px";
            }
        } else {
            alert('it done broke')
        }
    }

}


