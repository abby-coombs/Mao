//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

function pageLoad() {

    console.log("Page load is running :)");

    var noresponse
    var spadesresponse
    var JH
    var JS
    var JC
    var JD
    var sevenplay
    var after7response
    var lastresponse
    var endresponse
    document.getElementById("noresponse").onselect = function () {
        noresponse = true
    }
    document.getElementById("spadesresponse").onselect = function () {
        spadesresponse = true
        setTimeout(wait, 15000)
        spadesresponse = false
    }
    document.getElementById("JH").onselect = function () {
        JH = true
        setTimeout(wait, 15000)
        JH = false
    }
    document.getElementById("JS").onselect = function () {
        JS = true
        setTimeout(wait, 15000)
        JS = false
    }
    document.getElementById("JC").onselect = function () {
        JC = true
        setTimeout(wait, 15000)
        JC = false
    }
    document.getElementById("JD").onselect = function () {
        JD = true
        setTimeout(wait, 15000)
        JD = false
    }
    document.getElementById("sevenplay").onselect = function () {
        sevenplay = true
        setTimeout(wait, 15000)
        sevenplay = false
    }
    document.getElementById("after7response").onselect = function () {
        after7response = true
        setTimeout(wait, 15000)
        after7response = false
    }
    document.getElementById("lastresponse").onselect = function () {
        lastresponse = true
        setTimeout(wait, 15000)
        lastresponse = false
    }
    document.getElementById("endresponse").onselect = function () {
        endresponse = true
        setTimeout(wait, 15000)
        endresponse = false
    }

    function wait(){console.log("waited");}

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


