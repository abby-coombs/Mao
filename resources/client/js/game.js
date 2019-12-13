//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

function pageLoad() {

    console.log("Page load running");

    //variables!

    let count;
    let turnend = false;
    let currentplayer;
    let handsize = [5, 5, 5, 5];
    let cardsuit;
    let cardvalue;
    let lastcardsuit;
    let lastcardvalue;
    let possiblesuit;
    let rulebroken;
    let cpuresponses = [];
    let playerresponses = [];
    const btn = document.getElementById("Play");
    let playdirection = 'forwards';
    const btn2 = document.getElementById("go");
    const option = document.getElementById("playeroptions");
    let firstturn = true;
    let playersaid = option.options[option.selectedIndex].value;


    CARD.onclick = function () {
        function turn(currentplayer) {
            if ((firstturn == true) || (turnend[currentplayer - 1] = true)) {
                turnend[currentplayer] = false;
                firstturn = false;
                playcard(currentplayer);
                if (played == true) {
                    played = false;
                    checkplayedcard();
                    if (turnend == false) {
                        specialcards();
                        if (completed == true)
                            completed = false;
                        turnend[currentplayer] = true;
                    }
                }
            }
        }
    }


    //moves the cards from relevant pile to centre
    btn.onclick = function () {
        currentplayer = count % 4;
        //sets count ready for next turn, depending on direction of play
        if (playdirection == 'forwards') {
            count++;
        } else {
            count--;
        }
        //ensures count % 4 between 0 and 3
        while (count < 0) {
            count += 4;
        }
        //sets initial position of card pile
        //CHANGE SO THAT EACH PLAYER HAS PILE, PLUS DRAWPILE!
        var x = 0;
        var y = 0;
        //moves relevant player's card
        if (currentplayer == 0) {
            var card = document.getElementById("cpu0card");
            var s = setInterval(moveCard1, 1);

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
        } else if (currentplayer == 1) {
            var card2 = document.getElementById("cpu1card");
            var s = setInterval(moveCard2, 1);

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
        } else if (currentplayer == 3) {
            var card3 = document.getElementById("card4");
            var s = setInterval(moveCard3, 1);

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
        } else if (currentplayer == 2) {
            var card4 = document.getElementById("cpu2card")
            var s = setInterval(moveCard4, 1);

            //alters position by 1px each millisecond, producing smooth animation
            function moveCard4() {
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
            console.log('it done broke');
        }
        checkplayedcard('H', 6, 8, 'S', 2);
    }
}

//ATTACH TO API STUFF
//CHANGE CARDS TO MOVING ON CLICK
//ASSIGN CARDS TO OBJECTS (+ comp equivalent)
//ADD RETURNING OFFENDING CARD TO HAND WHERE APPLICABLE TO PENALTIES()


//CHANGE HAND SIZE SO THAT IT TRACKS EVERY PLAYER AS CURRENTLY ONLY ONE-done?
//MAKE SURE RESPONSES DELETE FROM ARRAY WHEN FALSE-done?
// IF CARD DOESN'T MATCH END TURN AFTER PENALTY-done?

//game mechanics-check card played against rules and issue appropriate responses
//checks card is of correct suit or value, and issues penalty if not
function checkplayedcard(cardsuit, cardvalue, lastcardsuit, lastcardvalue, currentplayer) {
    if ((cardsuit != lastcardsuit) && (cardvalue != lastcardvalue)) {
        penalties(true, currentplayer);
        turnend=true;
    }
    if (turnend == false){specialcards(cardsuit, cardvalue, lastcardvalue, count, currentplayer);}
}

//checks card value against those with particular rules when played/ followed on from
function specialcards(cardsuit, cardvalue, lastcardvalue, count, currentplayer){
    //checks if message printed when 7 played the turn before
    if (lastcardvalue == 7){
        //automates non-user turna
        if (currentplayer != 2) {
            //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
            if (Math.random() >= 0.2){
                alert("[thank you]");
            } else {penalties(true, currentplayer);}
        } else {
            //runs user response check after 10 seconds
            setTimeout(userafter7, 10000);
        }
    }
    switch (cardvalue){
        //checks if message printed when 7 played
        case '7':
            //automates non-user turns
            if (currentplayer != 2) {
                //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
                if (Math.random() >= 0.2){
                    alert("[have a nice day]");
                } else {penalties(true, currentplayer);}
            } else {
                //runs user response check after 10 seconds
                setTimeout(userplayed7, 10000);
            }
            break;
        case 'A':
            //increments the count again, with effect of skipping a turn
            count ++;
            break
        case 'J':
            setTimeout(jacks, 10000);
            break;
        case 'K':
            if (playdirection == forwards) {
                playdirection = backwards;
            } else {playdirection = forwards;}
    }
    if (cardsuit == 'S') {
        if (Math.random() >= 0.2) {
            alert(cardvalue + " of " + cardsuit);
        } else {penalties(true, currentplayer);}
    }
}

//checks for response when player on last card
function lastcard(handsize, currentplayer) {
    //automates non-user turns
    if (currentplayer != 2) {
        if (handsize[currentplayer] == 1) {
            //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
            if (Math.random() >= 0.2) {
                alert("[last card message]");
            }
        }
        //runs user response check after 10 seconds
    } else {
        setTimeout(useerlastcard, 10000);
    }
}

function jacks() {
    if (Math.random() >= 0.2) {
        switch (Math.ceil(Math.random() * 4)) {
            case 1:
                alert('Hearts');
                possiblesuit = 'H';
                break;
            case 2:
                alert('Spades');
                possiblesuit = 'S';
                break;
            case 3:
                alert('Clubs');
                possiblesuit = 'C';
                break;
            case 4:
                alert('Diamonds');
                possiblesuit = 'D';
                break;
        }
        //if (/*before player acts*/) {
        //  cardsuit = possiblesuit;
        //}
    }
}

btn2.onclick = function () {
    let result = option.options[option.selectedIndex].label;
    alert(result);
    let complete = false;
    for (let i = 0; i < 5; i++) {
        if (!(cpuresponses[i] == "")) {
            if (complete == false) {
                playerresponses[i] = playersaid;
                complete = true;
            }
        }
    }
}

function movecardback(movefrom) {
    if (movefrom == 'discard') {
        y = 200;
        x = 650;
        switch(currentplayer) {
            case 0:
                var card = document.getElementById("cpu0card");
                var s = setInterval(moveCardback, 1);
                card.style.backgroundColor = 'red';
                alert('check')
            function moveCardback() {
                if (x > 0 && x <= 650) {
                    x--;
                }
                if ((x == 0) && (y == 200)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
            case 1:
                var card = document.getElementById("");
                var s = setInterval(moveCardback1, 1);
                card.style.backgroundColor = 'red';
            function moveCardback1() {
                if (y > 0 && y <= 200) {
                    y--;
                }
                if ((x == 650) && (y == 0)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
            case 2:
                var card = document.getElementById("");
                var s = setInterval(moveCardback2, 1);
                card.style.backgroundColor = 'red';
            function moveCardback2() {
                if (x >= 650 && x < 1300) {
                    x++;
                }
                if ((x == 1300) && (y == 200)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
            case 3:
                var card = document.getElementById("");
                var s = setInterval(moveCardback3, 1);
                card.style.backgroundColor = 'red';
            function moveCardback3() {
                if (y > 0 && y <= 200) {
                    y--;
                }
                if ((x == 650) && (y == 0)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
        }
    } else if (movefrom == 'draw') {
        //BEING SORTA WEIRD FIX IT!!
        y= 200
        x = 750
        switch(currentplayer) {
            case 0:
                var card = document.getElementById("cpu0card");
                var s = setInterval(moveCardback, 1);
                card.style.backgroundColor = 'red';
                alert('check')
            function moveCardback() {
                if (x > 0 && x <= 750) {
                    x--;
                }
                if ((x == 0) && (y == 200)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
            case 1:
                var card = document.getElementById("");
                var s = setInterval(moveCardback1, 1);
                card.style.backgroundColor = 'red';
            function moveCardback1() {
                if (y > 0 && y <= 200) {
                    y--;
                }
                if (x > 650 && x <= 750) {
                    x--;
                }
                if ((x == 650) && (y == 0)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
            case 2:
                var card = document.getElementById("");
                var s = setInterval(moveCardback2, 1);
                card.style.backgroundColor = 'red';
            function moveCardback2() {
                if (x >= 650 && x < 1300) {
                    x++;
                }
                if ((x == 1300) && (y == 200)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
            case 3:
                var card = document.getElementById("");
                var s = setInterval(moveCardback3, 1);
                card.style.backgroundColor = 'red';
            function moveCardback3() {
                if (y > 0 && y <= 200) {
                    y--;
                }
                if (x > 650 && x <= 750) {
                    x--;
                }
                if ((x == 650) && (y == 0)){
                    card.style.backgroundColor = 'green';
                }
                card.style.left = x + 'px'
                card.style.top = y + 'px'
            }
                break
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
    setTimeout(timedout(input), 10000)
    //delay not working???
    alert(response)
}

function timedout(input){
    response = false
    for (var i = 0; i <5; i++){
        if (playerresponses[i] == input) {
            playerresponses[i] = ""
        }
    }
}

//checks whether user has responded by the end of the 10 second window
function userlastcard() {
    //issues penalty if not
    if (checkinputs('lastresponse') == false) {
        alert("working")
        penalties(true, currentplayer)
    }
}

//checks whether user has responded by the end of the 10 second window
function usererafter7() {
    //issues penalty if not
    if (checkinputs('after7response')==false) {
        penalties(true, currentplayer)
    }
}

//checks whether user has responded by the end of the 10 second window
function userplayed7() {
    //issues penalty if not
    if (checkinputs('sevenplay')==false) {
        penalties(true, currentplayer)
    }
}

function penalties(rulebroken, currentplayer, source) {
    if (source == "checkplayercard") {
        movecardback('discard')
        handsize[currentplayer] ++
    }
    alert("[penalty message]")
    handsize[currentplayer]++
    movecardback('draw')
}