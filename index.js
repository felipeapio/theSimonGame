var buttons = document.querySelectorAll(".containerGame");
var keydown = false;
var sound;
var gameArray =  []; 
var resultArray =  [];
var title = document.querySelector("#title");
var level = 0;

var highest = 0;
var score = 0;

var scoreNode = document.querySelectorAll(".score");
setScore(0, 0);

anyKey();

function anyKey(){
    if(!keydown){
        //just one button: https://stackoverflow.com/questions/6087959/prevent-javascript-keydown-event-from-being-handled-multiple-times-while-held-do
        document.addEventListener("keydown", startGame);
        keydown = true;
    }
    
}

function startGame(){
    console.clear();
    removeClick();
    removeKey();
    console.log("gameArray length: " + gameArray.length);
    console.log("resultArray length: " + resultArray.length);

    gameArray =  [];
    resultArray =  [];
    level++;
    title.textContent = "Level " + level;
    var randomNumber;
    let i = 0;
    //https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop 
    function myLoop(){
        setTimeout(function(){
            console.log("Teste, level: " + level);
            randomNumber = getRandomInt(4);
            gameArray[i] = randomNumber;
            console.log("Loop: " + i + " Random Number: " + randomNumber);
            console.log("Array: " + gameArray);
            switch (randomNumber){
                case 0:
                    buttons[randomNumber].classList.add("selected");
                    sound = new Audio('./sounds/green.mp3');
                    sound.play();
                    removeFilter(buttons[randomNumber], 'selected');
                    break; 
                case 1:
                    buttons[randomNumber].classList.add("selected");
                    sound = new Audio('./sounds/red.mp3');
                    sound.play();
                    removeFilter(buttons[randomNumber], 'selected');
                    break;
                case 2:
                    buttons[randomNumber].classList.add("selected");
                    sound = new Audio('./sounds/yellow.mp3');
                    sound.play();
                    removeFilter(buttons[randomNumber], 'selected');
                    break;
                case 3:
                    buttons[randomNumber].classList.add("selected");
                    sound = new Audio('./sounds/blue.mp3');
                    sound.play();
                    removeFilter(buttons[randomNumber], 'selected');
                    break;
            }
            i++;
            if(i < level){
                myLoop();
            }
        }, 500);
    }
    myLoop();
    click();
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function wrong(){
    level = 0;
    console.log("TESTE");
    sound = new Audio('./sounds/wrong.mp3');
    sound.play();
    document.body.classList.add('wrong');
    title.textContent = "Game Over, Press Any Key to Restart";
    removeFilter(document.body, 'wrong');
    anyKey();
}

function removeFilter(item, classe){
    setTimeout(() => {
        item.classList.remove(classe);
    }, 300); 
}

function click(){
    for(let i = 0; i < buttons.length; i++){
        //double click
        //https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
        buttons[i].addEventListener("click", e =>{
            whatever(buttons[i], i);
            //e.preventDefault();
            e.stopImmediatePropagation();
        });
    }
}

function whatever(button, index){
    if(!addResultArray(button, index)){
        highestValidation(false);
        wrong();
    }if(gameArray.length === 0){
        //next level
        highestValidation(true);
        startGame();
    }
}

function addClickButton(button, index){
    button.addEventListener("click", ()=>{
        whatever(buttons, index);
    });
}

function removeClickButton(button, index){
    button.removeEventListener("click", ()=>{
        whatever(buttons, index);
    });
}

function removeClick(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].removeEventListener("click", function(){});
    }
}

function addResultArray(buttons, i){
    resultArray.push(i);
    buttons.classList.add("selected");
    removeFilter(buttons, 'selected');
    return comparaResultado();
}

function comparaResultado(){
    if(resultArray[0] !== gameArray[0]){
        return false;
    }
    gameArray.shift(); //remove position[0]
    resultArray.shift();
    return true;
}

function removeKey(){
    if(keydown){
        document.removeEventListener("keydown", startGame);
        keydown = false;
    }
}

function setScore(score, highest){
    for(let i = 0; i < scoreNode.length; i++){
        if(i === 0){
            scoreNode[i].textContent = score;
        }else{
            scoreNode[i].textContent = highest;
        }
        
    }
}

function highestValidation(validation){
    if(validation){
        score++;
        if(score > highest){
            highest = score;
        }
    }else{
        score = 0;
    }
    
    setScore(score, highest);
}