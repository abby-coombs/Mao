//MAKE SURE COUNT ONLY INCREMENTS AFTER CHECKED FOR KINGS!

let count, turnend, currentplayer, handsize, cardsuit, cardvalue, lastcardsuit, lastcardvalue, possiblesuit;
let rulebroken, cpuresponses, playerresponses, btn, playdirection,  btn2, option, firstturn, playersaid;
let bigarr, p1hand, p2hand, p3hand, userhand, discardpile, drawpile, response;

let card1, card2, card3, card4;

//Still to fix: usercards(), timeouts???

function frame() {

    console.log(mode);
    switch (mode) {
        case 1:
            console.log("> " + card1.style.left);
            //gets location to be changed
            let x = Number(card1.style.left.replace("px", ""));
            //increments position
            card1.style.left = (x + 1) + "px";
            //resets and continues game function when card in position
            if (x >=650) {
                card1.style.left = "0px";
                document.getElementById("discard").style.backgroundImage  = discardimg
                //identifies element from html doc to change/interact with, and what changes to make
                mode = 0;
                checkplayedcard()
            }
            break;
        case 2:
            console.log("> " + card2.style.top);
            //gets location to be changed
            let y = Number(card2.style.top.replace("px", ""));
            //increments position
            card2.style.top = (y+1) + "px";
            //resets and continues game function when card in position
            if ( y == 200) {
                card2.style.top = "0px";
                document.getElementById("discard").style.backgroundImage  = discardimg
                //identifies element from html doc to change/interact with, and what changes to make
                mode = 0;
                checkplayedcard()
            }
            break;
        case 3:
            if (card3.style.top == ""){card3.style.top = 500 + "px"}
            console.log("> " + card3.style.top);
            //gets location to be changed
            let y2 = Number(card3.style.top.replace("px", ""));
            //increments position
            card3.style.top = (y2-1) + "px";
            //resets and continues game function when card in position
            if (y2 == 200) {
                card3.style.top = 500 + "px";
                document.getElementById("discard").style.backgroundImage  = discardimg
                //identifies element from html doc to change/interact with, and what changes to make
                mode = 0;
                checkplayedcard()
            }
            break;
        case 4:
            if (card4.style.left == ""){card4.style.left = 1250 + "px"}
            console.log("> " + card4.style.left);
            //gets location to be changed
            let x2 = Number(card4.style.left.replace("px", ""));
            //increments position
            card4.style.left = (x2 - 1) + "px";
            //resets and continues game function when card in position
            if (x2 == 650) {
                card4.style.left = 1250 + "px"
                document.getElementById("discard").style.backgroundImage  = discardimg
                //identifies element from html doc to change/interact with, and what changes to make
                mode = 0;
                checkplayedcard()
            }
            break;
        default:
            // Twiddle your thumbs.
    }
    //continues animation
    window.requestAnimationFrame(frame);
}

function pageLoad() {
    console.log("Page load running");
    //rests all variables to default values at start of game
    reset();

    btn.addEventListener("click", function () {
        //responds generally faster/more reliably than onclick(), but functions in pretty much the same way
        if (gameready == true) {
        //ensures click only runs code if game set up
        //covers past issue of undefined count which prevented cards functioning
        if(typeof count == 'undefined') count = 0;

        currentplayer = count % 4;
        //sets count ready for next turn, depending on direction of play

        if (playdirection == 'forwards') {
            count = (count + 1) % 4;
        } else {
            count = (count + 7) % 4; // effectively minus 1
        }

        console.log("Count is " + count + " and currentplayer is " + currentplayer);

        //changes the mode of the animation frame (enabling cards to move)
        if (currentplayer == 0) {
            chooseplayercard("p1")
            mode = 1;
        } else if (currentplayer == 1) {
            chooseplayercard("p2")
            mode = 2;
        } else if (currentplayer == 3) {
            //user thing
            mode = 3;
        } else if (currentplayer == 2) {
            chooseplayercard("p3")
            mode = 4;
        } else {
            console.log('it done broke');
        }
        //continues program flow
        checkplayedcard('H', 6, 8, 'S', 2);
    }});

//!
    btn2.addEventListener("click", function () {
        //gets input from response dropdown
        let result = option.options[option.selectedIndex].label;
        alert(result);
        //informs player they have successfully responded
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
        } penalties(true, 3, "talking") //penalises user if 'speaking' on another player's turn
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
    bigarr = [][]; //REPLACE W/ DB VERSION
    p1hand = [][];
    p2hand = [][];
    p3hand = [][];
    userhand = [][];
    discardpile = [][];
    drawpile = [][];
    response = true;
    mode = 0;
    card1 = document.getElementById("cpupos0card");
    card2 = document.getElementById("cpupos1card");
    card3 = document.getElementById("usercard");
    card4 = document.getElementById("cpupos2card");
    //starts animation frame
    window.requestAnimationFrame(frame);
    //starts game setup/flow
    cardshuffle();
}

//TEST THIS BIT ASAP!!
function cardshuffle() {
    fetch("/Card/list", {method: 'get'}
    //establishes request type/method
    ).then(response => response.json()
        //obtains/parses response
    ).then(listOfCards => {
        bigarr;
        for(let card of listOfCards) {
            for(i = 0; i < 52; i ++){
                if (bigarr[i][0] == '') {
                  //  bigarr[i][0] = ${card.value}
                    //  bigarr[i][1] = ${card.suit} //WHY. WONT. IT. WORK
                    //adds each card to array
                }
            }
        }
    })
    //Shuffles using Fisher-Ystes Shuffle-more equal chance than array.sort
    for (let i = bigarr.length - 1; i > 0; i --) {
        let n = Math.floor(Math.random() * (i+1))
        let temp1 = bigarr[i][0]
        let temp2 = bigarr[i][1]
        let temp3 = bigarr[i][2]
        bigarr[i][0] = bigarr[n][0]
        bigarr[i][1] = bigarr[n][1]
        bigarr[i][2] = bigarr[n][2]
        bigarr[n][0] = temp1
        bigarr[n][1] = temp2
        bigarr[n][2] = temp3
    }
    //continues program flow
    carddeal(bigarr)
}

//deals cards to players/draw pile, with one in discard as initial
function carddeal(cardarr) {
    for (let i = 0; i < 7; i ++){
        p1hand[i][0] = cardarr[i][0]
        p1hand[i][1] = cardarr[i][1]
        p1hand[i][2] = cardarr[i][2]
        cardarr[i][0] = ''
        cardarr[i][1] = ''
        cardarr[i][2] = ''
    }
    for (let i = 7; i < 14; i ++){
        p2hand[i-7][0] = cardarr[i][0]
        p2hand[i-7][1] = cardarr[i][1]
        p2hand[i-7][2] = cardarr[i][2]
        cardarr[i][0] = ''
        cardarr[i][1] = ''
        cardarr[i][2] = ''
    }
    for (let i = 14; i <21; i ++){
        p3hand[i-14][0] = cardarr[i][0]
        p3hand[i-14][1] = cardarr[i][1]
        p3hand[i-14][2] = cardarr[i][2]
        cardarr[i][0] = ''
        cardarr[i][1] = ''
        cardarr[i][2] = ''
    }
    for (let i = 21; i < 28; i ++){
        userhand[i-21][0] = cardarr[i][0]
        userhand[i-21][1] = cardarr[i][1]
        userhand[i-21][2] = cardarr[i][2]
        cardarr[i][0] = ''
        cardarr[i][1] = ''
        cardarr[i][2] = ''
    }
    discardpile[0][0] = cardarr[28][0]
    discardpile[0][1] = cardarr[28][1]
    discardpile[0][2] = cardarr[28][2]
    cardarr[28][0] = ''
    cardarr[28][1] = ''
    cardarr[28][2] = ''
    for (let i = 29; i < cardarr.length; i ++) {
        drawpile[i-29][0] = cardarr [i][0]
        drawpile[i-29][1] = cardarr [i][1]
        drawpile[i-29][2] = cardarr [i][2]
        cardarr[i][0] = ''
        cardarr[i][1] = ''
        cardarr[i][2] = ''
    }
    //continues program flow
    usercards(userhand)
}

//BROKEN
function usercards(userhand) {
    let optionList = ""
    for (let i = 0; i < userhand.length, i ++;){
        alert(userhand[i])  //?
        optionList += `<option value = "${i}">${userhand[i]}</option>`
        //populates option list with player names from database
    }
    document.getElementById("cardselector").innerHTML = optionList
    gameready=true
}

//set onclick to disabled before here! ?


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
//UPDATE THE THING
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

function cardassign() {
    for (let i = 0; i > p1hand.length; i ++) {
        for (j = 2; j >= 10; j++){
            if (p1hand[i][0] == j){
                switch(p1hand[i][1]){
                    case 'H':
                        suit = "hearts"
                        break
                    case 'D':
                        suit = "diamonds"
                        break
                    case 'S':
                        suit = "spades"
                        break
                    case 'C':
                        suit = "clubs"
                        break
                }
                p1card[i][2] = j + "_of_" + suit
            }
        }
    }
    for (let i = 0; i > p2hand.length; i ++) {
        for (j = 2; j >= 10; j++){
            if (p2hand[i][0] == j){
                switch(p2hand[i][1]){
                    case 'H':
                        suit = "hearts"
                        break
                    case 'D':
                        suit = "diamonds"
                        break
                    case 'S':
                        suit = "spades"
                        break
                    case 'C':
                        suit = "clubs"
                        break
                }
                p2card[i][2] = j + "_of_" + suit
            }
        }
    }
    for (let i = 0; i > p3hand.length; i ++) {
        for (j = 2; j >= 10; j++){
            if (p3hand[i][0] == j){
                switch(p3hand[i][1]){
                    case 'H':
                        suit = "hearts"
                        break
                    case 'D':
                        suit = "diamonds"
                        break
                    case 'S':
                        suit = "spades"
                        break
                    case 'C':
                        suit = "clubs"
                        break
                }
                p3card[i][2]  = j + "_of_" + suit
            }
        }
    }
    for (let i = 0; i > userhand.length; i ++) {
        for (j = 2; j >= 10; j++){
            if (userhand[i][0] == j){
                switch(userhand[i][1]){
                    case 'H':
                        suit = "hearts"
                        break
                    case 'D':
                        suit = "diamonds"
                        break
                    case 'S':
                        suit = "spades"
                        break
                    case 'C':
                        suit = "clubs"
                        break
                }
                usercard[i][2] = j + "_of_" + suit
            }
        }
    }
}

function chooseplayercard(player){
    switch (player){
        case "p1":
            cardno = Math.ceil(Math.random() * (p1hand.length - 1))
            lastcardvalue = cardvalue
            lastcardsuit = cardsuit
            cardsuit = p1hand[cardno][1]
            cardvalue = p1hand[cardno][0]
            discardimg = "/client/images/cards/" + p1hand[cardno][2] + ".png"
            break
        case "p2":
            cardno = Math.ceil(Math.random() * (p2hand.length - 1))
            lastcardvalue = cardvalue
            lastcardsuit = cardsuit
            cardsuit = p2hand[cardno][1]
            cardvalue = p2hand[cardno][0]
            discardimg = "/client/images/cards/" + p2hand[cardno][2] + ".png"
            break
        case "p3":
            cardno = Math.ceil(Math.random() * (p3hand.length - 1))
            lastcardvalue = cardvalue
            lastcardsuit = cardsuit
            cardsuit = p3hand[cardno][1]
            cardvalue = p3hand[cardno][0]
            discardimg = "/client/images/cards/" + p3hand[cardno][2] + ".png"
            break
    }
}