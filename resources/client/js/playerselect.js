function pageLoad() {
    const playerSelector = document.getElementById("playerSelector");
    fetch("/Player/list", {method: 'get'}
    ).then(response => response.json()
    ).then(listOfPlayers => {
        let optionList = '';
        for(let player of listOfPlayers) {
            optionList += `<option value="${player.id}">${player.name}</option>`;
        }
        playerSelector.innerHTML = optionList;
    });
}