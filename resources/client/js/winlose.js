function pageload() {
    let gamewon = true
    let title = document.getElementById("winlosetext")
    if (gamewon == true) {
        title.innerHTML = "Game won!"
    } else {title.innerHTML = "Game lost :("}
}