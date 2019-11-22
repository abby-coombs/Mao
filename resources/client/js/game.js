//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

function pageLoad() {

    console.log("Page load is running :)");

//moves the cards from relevant pile to centre
    var btn = document.getElementById("go");
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

//RENAME VARIABLES WHERE NEEDED AND ATTACH TO DATABASE
//game mechanics-check card played against rules and issue appropriate responses
//checks card is of correct suit or value, and issues penalty if not
function checkplayedcard(cardsuit, cardvalue, lastcardsuit, lastcardvalue, currentplayer) {
    if((cardsuit != lastcardsuit)&&(cardvalue != lastcardvalue)) {
        penalties(true, currentplayer)
    }
}
//checks for response when player on last card
function lastcard(handsize, currentplayer){
    //automates non-user turns
    if(currentplayer != user) {
        if (handsize == 1) {
            //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
            if (Math.random() >= 0.2){
                console.log("[last card message]");
            }
        }
        //runs user response check after 10 seconds
    } else {
        setTimeout(useerlastcard, 10000)

    }
}
