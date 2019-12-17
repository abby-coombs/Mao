function pageLoad() {
    const playerSelector = document.getElementById("playerSelector");
    let inputtext = document.getElementById('newplayerinput').value;
    let inputupdate = document.getElementById('updateplayerinput').value;
    fetch("/Player/list", {method: 'get'}
    ).then(response => response.json()
    ).then(listOfPlayers => {
        let optionList = '';
        for(let player of listOfPlayers) {
            optionList += `<option value="${player.id}">${player.name}</option>`;
        }
        playerSelector.innerHTML = optionList;
    });
    document.getElementById('confirmplayer').onclick = function() {
        let result = playerSelector.options[playerSelector.selectedIndex].label;
        alert("selected: " + result)
        //pass to mainpage
    }
    document.getElementById('confirmnewplayer').onclick = function() {
        let result = inputtext
        //not running?
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
        //get currentname associated ID
        //post result as newname
        alert('selected: ' + result)
    }
}