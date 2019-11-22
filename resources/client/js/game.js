//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

//moves the cards from relevant pile to centre
var btn = document.getElementById("go");
var count = 0;
var playdirection = 'forwards'
btn.onclick = function () {
    if (playdirection == 'forwards') {
        count ++
    } else { count -- }
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
    } else {alert('it done broke')}
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
//checks whether user has responded by the end of the 10 second window
function userlastcard() {
    //issues penalty if not
    if (/*player not acted*/) {
        penalties(true, currentplayer)
    }
}
//checks whether user has responded by the end of the 10 second window
function usererafter7() {
    //issues penalty if not
    if (/*Not printed thank you*/) {
        penalties(true, currentplayer)
    }
}
//checks whether user has responded by the end of the 10 second window
function userplayed7() {
    //issues penalty if not
    if (/*Not printed message*/) {
        penalties(true, currentplayer)
    }
}
//checks card value against those with particular rules when played/ followed on from
function specialcards(cardsuit, cardvalue, lastcardvalue, count, currentplayer){
    //checks if message printed when 7 played the turn before
    if (lastcardvalue == 7){
        //automates non-user turna
        if (currentplayer != user) {
            //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
            if (Math.random() >= 0.2){
                console.log("[thank you]")
            } else {penalties(true, currentplayer)}
        } else {
            //runs user response check after 10 seconds
            setTimeout(userafter7, 10000)
        }
    }
    switch (cardvalue){
        //checks if message printed when 7 played
        case '7':
            //automates non-user turns
            if (currentplayer != user) {
                //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
                if (Math.random() >= 0.2){
                    console.log("[have a nice day]")
                } else {penalties(true, currentplayer)}
            } else {
                //runs user response check after 10 seconds
                setTimeout(userplayed7, 10000)
            }
            break
        case 'A':
            //increments the count again, with effect of skipping a turn
            count ++;
            break
        case 'J':
            setTimeout(jacks, 10000
            break
        case K:
            if (playdirection == forwards) {
                playdirection = backwards;
            } else {playdirection = forwards}
    }
    if (cardsuit == 'S') {
        if (Math.random() >= 0.2) {
            console.log(cardvalue + " of " + cardsuit)
        } else {penalties(true, currentplayer)}
    }
}
function jacks(){
    if (Math.random() >= 0.2) {
        switch(Math.ceil(Math.random() * 4)){
            case 1:
                console.log('Hearts')
                possiblesuit = 'H'
                break
            case 2:
                console.log('Hearts')
                possiblesuit = 'S'
                break
            case 3:
                console.log('Clubs')
                possiblesuit = 'C'
                break
            case 4:
                console.log('Diamonds')
                possiblesuit = 'D'
                break
        }
        if (/*before player acts*/) {
            cardsuit = possiblesuit;
        }
    }
}
function penalties(rulebroken, currentplayer){
    if(rulebroken == true){
        */currentplayer's cardnumber ++
        push top card from drawpile
        add into player's hand
        print 'rule broken' message*/
    }
}