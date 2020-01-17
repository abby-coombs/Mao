//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

let count, turnend, currentplayer, handsize, cardsuit, cardvalue, lastcardsuit, lastcardvalue, possiblesuit;
let rulebroken, cpuresponses, playerresponses, btn, playdirection,  btn2, option, firstturn, playersaid;
let testarr, p1hand, p2hand, p3hand, userhand, discardpile, drawpile, response;

let card1, card2, card3, card4;

//Still to fix: usercards(), timeouts???

function frame() {

    console.log(mode);

    switch (mode) {
        case 1:

            console.log("> " + card1.style.left);

            let x = Number(card1.style.left.replace("px", ""));

            card1.style.left = (x + 1) + "px";

            if (x >=650) {
                card1.style.left = "0px";
                mode = 0;
                checkplayedcard()
            }
            break;
        case 2:
            console.log("> " + card2.style.top);
            let y = Number(card2.style.top.replace("px", ""));

            card2.style.top = (y+1) + "px";

            if ( y == 200) {
                card2.style.top = "0px";
                mode = 0;
                checkplayedcard()
            }

            break;

        case 3:
            if (card3.style.top == ""){card3.style.top = 500 + "px"}
            console.log("> " + card3.style.top);
            let y2 = Number(card3.style.top.replace("px", ""));

            card3.style.top = (y2-1) + "px";

            if (y2 == 200) {
                card3.style.top = 500 + "px";
                mode = 0;
                checkplayedcard()
            }

            break;
        case 4:
            if (card4.style.left == ""){card4.style.left = 1250 + "px"}
            console.log("> " + card4.style.left);
            let x2 = Number(card4.style.left.replace("px", ""));

            card4.style.left = (x2 - 1) + "px";

            if (x2 == 650) {
                card4.style.left = 1250 + "px"
                mode = 0;
                checkplayedcard()
            }

            break;
        default:

            // Twiddle your thumbs.

    }

    window.requestAnimationFrame(frame);

}

function pageLoad() {
    console.log("Page load running");

    reset();

    btn.addEventListener("click", function () {
        //covers past issue of undefined count which prevented cards functioning
        if(typeof count == 'undefined') count = 0;

        currentplayer = count % 4;
        //sets count ready for next turn, depending on direction of play

        if (playdirection == 'forwards') {
            count = (count + 1) % 4;
        } else {
            count = (count + 7) % 4; // effectively minus 1
        }

        //moves relevant player's card
        console.log("Count is " + count + " and currentplayer is " + currentplayer);

        if (currentplayer == 0) {

            mode = 1;

        } else if (currentplayer == 1) {
            mode = 2;

        } else if (currentplayer == 3) {
            mode = 3;

        } else if (currentplayer == 2) {

            mode = 4;

        } else {
            console.log('it done broke');
        }
        checkplayedcard('H', 6, 8, 'S', 2);
    });

//!
    btn2.addEventListener("click", function () {
        //gets input from response dropdown
        let result = option.options[option.selectedIndex].label;
        alert(result);
        let complete = false;
        //logs copy of response in recent responses to check against when cards played
        if (currentplayer == 3) {
            for (let i = 0; i < 5; i++) {
                console.log(playerresponses[i])
                if (playerresponses[i] == null) {
                    if (complete == false) {
                        playerresponses[i] = playersaid;
                        complete = true;
                        setTimeout(playerresponses[i] = "", 10000)
                        //BROKEN i think?
                        setTimeout(timedout(playersaid, playerresponses), 10001)
                    }
                }
            }
            //FINISH/EDIT
        } penalties(true, 3, "talking")
    });

}

//variables!
function reset() {
    count = 0;
    turnend = false;
    handsize = [5, 5, 5, 5];
    cpuresponses = [];
    playerresponses = [];
    btn = document.getElementById("Play");
    playdirection = 'forwards';
    btn2 = document.getElementById("go");
    option = document.getElementById("playeroptions");
    firstturn = true;
    playersaid = option.options[option.selectedIndex].value;
    testarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    p1hand = [];
    p2hand = [];
    p3hand = [];
    userhand = [];
    discardpile = [];
    drawpile = [];
    response = true;
    mode = 0;

    card1 = document.getElementById("cpupos0card");
    card2 = document.getElementById("cpupos1card");
    card3 = document.getElementById("usercard");
    card4 = document.getElementById("cpupos2card");

    window.requestAnimationFrame(frame);

    cardshuffle();

}

//SOME STUFF TO EDIT/FIX
function cardshuffle() {
    fetch("/Card/list", {method: 'get'}
    ).then(response => response.json()
    ).then(listOfCards => {
        // let cards = []
        //************
    });
    //Replace testarr \/ with ^ but working!!!
    //Shuffles using Fisher-Ystes Shuffle-more equal chance than array.sort
    for (let i = testarr.length - 1; i > 0; i --) {
        let j = Math.floor(Math.random() * (i+1))
        let temp = testarr[i]
        testarr[i] = testarr[j]
        testarr[j] = temp
    }
    carddeal(testarr)
}

//deals cards to players/draw pile, with one in discard as initial
function carddeal(cardarr) {
    for (let i = 0; i < 7; i ++){
        p1hand[i] = cardarr[i]
        cardarr[i] = ''
    }
    for (let i = 7; i < 14; i ++){
        p2hand[i-7] = cardarr[i]
        cardarr[i] = ''
    }
    for (let i = 14; i <21; i ++){
        p3hand[i-14] = cardarr[i]
        cardarr[i] = ''
    }
    for (let i = 21; i < 28; i ++){
        userhand[i-21] = cardarr[i]
        cardarr[i] = ''
    }
    discardpile[0] = cardarr[28]
    cardarr[28] = ''
    for (let i = 29; i < cardarr.length; i ++) {
        drawpile[i-29] = cardarr [i]
        cardarr[i] = ''
    }
    usercards(userhand)
}

//BROKEN
function usercards(userhand) {
    let optionList = ""
    for (let i = 0; i < userhand.length, i ++;){
        alert(userhand[i])
        optionList += `<option value = ${i}>${userhand[i]}</option>`
    }
    document.getElementById("cardselector").innerHTML = optionList
}

//set onclick to disabled before here!)


function checkplayedcard(cardsuit, cardvalue, lastcardsuit, lastcardvalue, currentplayer) {
    if ((cardsuit != lastcardsuit) && (cardvalue != lastcardvalue)) {
        penalties(true, currentplayer);
        //ends their turn if invalid card played
        turnend=true;
    }
    if (turnend == false){specialcards(cardsuit, cardvalue, lastcardvalue, count, currentplayer); /*runs further checks on turn if card allowed*/}
}

//checks card value against those with particular rules when played/ followed on from
function specialcards(cardsuit, cardvalue, lastcardvalue, count, currentplayer){
    //checks if responded when 7 played the turn before
    if (lastcardvalue == 7){
        //automates non-user turna
        if (currentplayer != 2) {
            //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
            if (Math.random() >= 0.2){
                //REPLACE WITH DB VERSION!!!!!!
                alert("[thank you]");
            } else {penalties(true, currentplayer);}
        } else {
            //runs user response check after 10 seconds
            //TIMEOUT BROKED (function fine)
            setTimeout(userafter7, 10000);
        }
    }
    //runs through specific checks for card being played
    switch (cardvalue){
        //checks if message printed when 7 played
        case '7':
            //automates non-user turns
            if (currentplayer != 2) {
                //allows for 20% chance of failure, so user can see rules broken to learn them, gives penalty if broken
                if (Math.random() >= 0.2){
                    //REPLACE WITH DB VERSION!!!!!!
                    alert("[have a nice day]");
                } else {penalties(true, currentplayer);}
            } else {
                //runs user response check after 10 seconds
                //TIMEOUT BROKED (function fine)
                setTimeout(userplayed7, 10000);
            }
            break;
        case 'A':
            //increments the count again, with effect of skipping a turn
            count ++;
            break
        case 'J':
            //TIMEOUT BROKED (function fine)
            //Calls separate function to deal with jacks as complex
            setTimeout(jacks, 10000);
            break;
        case 'K':
            //reverses play direction
            if (playdirection == forwards) {
                playdirection = backwards;
            } else {playdirection = forwards;}
    }
    //checks if played card is a spade, and runs appropriate check/penalty
    if (cardsuit == 'S') {
        if (Math.random() >= 0.2) {
            alert(cardvalue + " of " + cardsuit);
        } else {penalties(true, currentplayer);}
    }
    lastcard(handsize, currentplayer)
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
    } else {
        //runs user response check after 10 seconds
        //TIMEOUT BROKED (function fine)
        setTimeout(useerlastcard, 10000);
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






function jacks() {
    //allows for 20% chance of no response
    if (Math.random() >= 0.2) {
        //randomises decision (see dev. for reasoning)
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
        //DO THIS BIT!!!!
        //if (/*before player acts*/) {
        //  cardsuit = possiblesuit;
        //}
    }
}

//checks required response against recent from player
function checkinputs(input) {
    for (var i = 0; i <5; i++){
        if (playerresponses[i] == input) {
            response = true
        } response = false
    }
    //TIMEOUT BROKED (function fine)
    setTimeout(timedout(input), 10000)
    alert(response)
}

//CHECK IT WORKS/LINKS CORRECTLY
//removes response from recent after their pemitted time has elapsed (==after called)
function timedout(input, playerreaponses){
    for (let i = 0; i <5; i++){
        if (playerresponses[i] == input) {
            playerresponses[i] = ""
        }
    }
}

//checks whether user has responded by the end of the 10 second window
function userlastcard() {
    //issues penalty if not
    if (checkinputs('lastresponse') == false) {
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

//handles any required penalties
//EDIT TO FIT LATER STUFF
function penalties(rulebroken, currentplayer, source) {
    //gives back incorrectly dealt cards
    if (source == "checkplayercard") {
        //movecardback('discard')
        handsize[currentplayer] ++
    }
    //issues penalty card and gives relevant message
    //CHANGE TO DATABASE VERSION
    alert("[penalty message]")
    handsize[currentplayer]++
    //movecardback('draw')
}

function gameend(handsize, turnend, currentplayer) {
    if (handsize == 0 && turnend == true) {
        if (currentplayer == 3) {
            window.location.href = "/client/winlose.html" //ADD QUERY BIT!!!
        } else {
            window.location.href = "/client/winlose.html"
        }
    }
}
