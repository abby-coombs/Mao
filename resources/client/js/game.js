//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

function pageLoad() {

    console.log("Page load running");

    //variables!
    var currentplayer = (count % 4)
    var handsize = 5
    var cardsuit
    var cardvalue
    var lastcardsuit
    var lastcardvalue
    var possiblesuit
    var rulebroken
    var cpuresponses = []
    var playerresponses = []
    var btn = document.getElementById("Play");
    var count = 0;
    var playdirection = 'forwards'
    var btn2 = document.getElementById("go");
    var option = document.getElementById("playeroptions")
    var playersaid = option.options[option.selectedIndex].value

    //moves the cards from relevant pile to centre
    btn.onclick = function () {
        //sets count ready for next turn, depending on direction of play
        if (playdirection == 'forwards') {
            count++
        } else {
            count--
        }
        //ensures count % 4 between 0 and 3
        while (count < 0) {
            count += 4
        }
        //sets initial position of card pile
        //CHANGE SO THAT EACH PLAYER HAS PILE, PLUS DRAWPILE!
        var x = 0;
        var y = 0;
        //moves relevant player's card
        if (currentplayer == 1) {
            var card = document.getElementById("card")
            var s = setInterval(moveCard1, 1);
            y = 200;
            //alters position by 1px each millisecond, producing smooth animation
            function moveCard1() {
                if (x >= 0 && x < 650) {
                    x++;
                }
                //flips card over when in position
                if (x == 650 && y == 200) {
                    card.style.backgroundColor = 'red';
                }
                card.style.left = x + "px";
                card.style.top = y + "px";
            }
        } else if (currentplayer == 2) {
            var card2 = document.getElementById("card2");
            var s = setInterval(moveCard2, 1);
            x = 650;
            //alters position by 1px each millisecond, producing smooth animation
            function moveCard2() {
                if (y >= 0 && y < 200) {
                    y++;
                }
                //flips card over when in position
                if (x == 650 && y == 200) {
                    card2.style.backgroundColor = 'red';
                }
                card2.style.left = x + "px";
                card2.style.top = y + "px";
            }
        } else if (currentplayer == 0) {
            var card3 = document.getElementById("card3");
            var s = setInterval(moveCard3, 1);
            y = 400;
            x = 650;
            //alters position by 1px each millisecond, producing smooth animation
            function moveCard3() {
                if (y > 200 && y <= 400) {
                    y--;
                }
                //flips card over when in position
                if (x == 650 && y == 200) {
                    card3.style.backgroundColor = 'red';
                }
                card3.style.left = x + "px";
                card3.style.top = y + "px";
            }
        } else if (currentplayer == 3) {
            var card4 = document.getElementById("card4")
            var s = setInterval(moveCard4, 1);
            x = 1300;
            //alters position by 1px each millisecond, producing smooth animation
            function moveCard4() {
                y = 200;
                if (x > 650 && x <= 1300) {
                    x--;
                }
                //flips card over when in position
                if (x == 650 && y == 200) {
                    card4.style.backgroundColor = 'red';
                }
                card4.style.left = x + "px";
                card4.style.top = y + "px";
            }
        } else {
            console.log('it done broke')
        }
    }

    //RENAME VARIABLES & ATTACH TO VALUES
    //game mechanics-check card played against rules and issue appropriate responses
    //checks card is of correct suit or value, and issues penalty if not
    function checkplayedcard(cardsuit, cardvalue, lastcardsuit, lastcardvalue, currentplayer) {
        if ((cardsuit != lastcardsuit) && (cardvalue != lastcardvalue)) {
            //penalties(true, currentplayer)
        }
    }

    //checks card value against those with particular rules when played/ followed on from
    function specialcards(cardsuit, cardvalue, lastcardvalue, count, currentplayer){
        //checks if message printed when 7 played the turn before
        if (lastcardvalue == 7){
            //automates non-user turna
            if (currentplayer != 2) {
                //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
                if (Math.random() >= 0.2){
                    alert("[thank you]")
                } else {/*penalties(true, currentplayer)*/}
            } else {
                //runs user response check after 10 seconds
                //       setTimeout(userafter7, 10000)
            }
        }
        switch (cardvalue){
            //checks if message printed when 7 played
            case '7':
                //automates non-user turns
                if (currentplayer != 2) {
                    //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
                    if (Math.random() >= 0.2){
                        alert("[have a nice day]")
                    } else {/*penalties(true, currentplayer)*/}
                } else {
                    //runs user response check after 10 seconds
//                    setTimeout(userplayed7, 10000)
                }
                break
            case 'A':
                //increments the count again, with effect of skipping a turn
                count ++;
                break
            case 'J':
                setTimeout(jacks, 10000)
                break
            case 'K':
                if (playdirection == forwards) {
                    playdirection = backwards;
                } else {playdirection = forwards}
        }
        if (cardsuit == 'S') {
            if (Math.random() >= 0.2) {
                alert(cardvalue + " of " + cardsuit)
            } else {/*penalties(true, currentplayer)*/}
        }
    }

    //checks for response when player on last card
    function lastcard(handsize, currentplayer) {
        //automates non-user turns
        if (currentplayer != 2) {
            if (handsize == 1) {
                //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
                if (Math.random() >= 0.2) {
                    alert("[last card message]");
                }
            }
            //runs user response check after 10 seconds
        } else {
            //setTimeout(useerlastcard, 10000)
        }
    }

    function jacks() {
        if (Math.random() >= 0.2) {
            switch (Math.ceil(Math.random() * 4)) {
                case 1:
                    alert('Hearts')
                    possiblesuit = 'H'
                    break
                case 2:
                    alert('Spades')
                    possiblesuit = 'S'
                    break
                case 3:
                    alert('Clubs')
                    possiblesuit = 'C'
                    break
                case 4:
                    alert('Diamonds')
                    possiblesuit = 'D'
                    break
            }
            //if (/*before player acts*/) {
            //  cardsuit = possiblesuit;
            //}
        }
    }

    btn2.onclick = function () {
        var result = option.options[option.selectedIndex].label
        alert(result)
        var complete = false
        for (var i = 0; i < 5; i++) {
            if (!(cpuresponses[i] == "")) {
                if (complete == false) {
                    playerresponses[i] = playersaid;
                    complete = true
                }
            }
        }
    }

    var response = true
    function checkinputs(input) {
        for (var i = 0; i <5; i++){
            if (playerresponses[i] == input) {
                response = true
            } response = false
        }
        setTimeout(timedout(), 10000)
        //delay not working???
        alert(response)
    }

    function timedout(){
        response = false
    }

    //checks whether user has responded by the end of the 10 second window
    function userlastcard() {
        //issues penalty if not
        if (checkinputs('lastresponse') == false) {
            alert("working")
//            penalties(true, currentplayer)
        }
    }

    //checks whether user has responded by the end of the 10 second window
    function usererafter7() {
        //issues penalty if not
        if (checkinputs('after7response')==false) {
 //           penalties(true, currentplayer)
        }
    }

    //checks whether user has responded by the end of the 10 second window
    function userplayed7() {
        //issues penalty if not
        if (checkinputs('sevenplay')==false) {
 //           penalties(true, currentplayer)
        }
    }
}