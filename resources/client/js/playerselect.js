function pageLoad() {
    //gets input from webpage
    const playerSelector = document.getElementById("playerSelector");
    let inputtext = document.getElementById('newplayerinput').value;
    let inputupdate = document.getElementById('updateplayerinput').value;
    //populates option list on page with player names from database
    fetch("/Player/list", {method: 'get'}
    ).then(response => response.json()
    ).then(listOfPlayers => {
        let optionList = '';
        for(let player of listOfPlayers) {
            optionList += `<option value="${player.id}">${player.name}</option>`;
        }
        playerSelector.innerHTML = optionList;
    });
    //prints the option the player selected
    document.getElementById('confirmplayer').onclick = function() {
        let result = playerSelector.options[playerSelector.selectedIndex].label;
        alert("selected: " + result)
        //PASS TO MAINPAGE
    }
    //similar to selector above, but feeds from a different input
    document.getElementById('confirmnewplayer').onclick = function() {
        let result = inputtext
        fetch('/Player/new', {method: 'post', body: inputtext}
        ).then(response => response.json()
        ).then(responseData => {
            if (responseData.hasOwnProperty('error')){
                alert(responseData.error);
            } else {alert('all good I think?')}
        })
    }
    document.getElementById('confirmupdateplayer').onclick = function() {
        let currentname = playerSelector.options[playerSelector.selectedIndex].label;
        let result = inputupdate;
        //GET CORRESPONDING ID
        //UPDATE THE THING
        alert('selected: ' + result)
    }
}