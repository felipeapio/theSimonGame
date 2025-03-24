document.addEventListener("keydown", (event) =>{
    game();
});


function game(){
    var level = 1;
    var title = document.querySelector("#title");
    title.textContent = "Level " + level;

    for(let i = 0; i < level; i++){
        let randomNumber = getRandomInt(4);
        console.log(randomNumber)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }