let container = document.getElementById("container");
let items = document.getElementsByClassName("item");
let colored = true; //set default mode to black
let btnReset = document.getElementById("btn-reset");
let btnGridSize = document.getElementById("btn-gridsize");
let coloredMode = document.getElementById("colored-mode");
let gridSize;
let gradientBlack = ["rgb(229, 229, 229)", "rgb(204, 204, 204)", "rgb(178, 178, 178)", "rgb(153, 153, 153)",
                    "rgb(127, 127, 127)", "rgb(102, 102, 102)", "rgb(76, 76, 76)", "rgb(51, 51, 51)",
                    "rgb(25, 25, 25)", "rgb(0, 0, 0)"];
// RGB Values of gradient "#E5E5E5","#CCCCCC","#B2B2B2","#999999","#7F7F7F","#666666","#4C4C4C","#333333","#191919","#000000"


function createDefaultGrid(){ // creates default grid of 16 squares
    createGrid(16);
    gridSize = 16;
}

function createGrid(dimension){ // creates dynamic css grid depending on the dimension given
    container.style.gridTemplateColumns= `repeat(${dimension}, 1fr)`;
    container.style.gridTemplateRows= `repeat(${dimension}, 1fr)`;
    for (let i = 0; i < dimension; i++) {
        for (let u = 0; u < dimension; u++) {
            let gridSquare = document.createElement("div"); //creates each element with a item class
            gridSquare.classList.add('item');
            container.appendChild(gridSquare);
        }
    }
}

function increaseBlackGradient(event){
    itemcolor = event.target.style.backgroundColor;
    if (gradientBlack.indexOf(itemcolor) == -1){ //see if current square color is not one of the black gradients
        event.target.style.backgroundColor = "rgb(229, 229, 229)"; // set first color of the gradient if square is blank or random color
    }
    else if (itemcolor == "rgb(0, 0, 0)"){  // if color is already black, leave it
        return;
    }
    else { // if color is a shade of the black gradient, increase that shade
        event.target.style.backgroundColor = gradientBlack[gradientBlack.indexOf(itemcolor)+1];
    }
}

function paintGrid(event){ // paints the item on the grid black
    let randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6); //generate random HEX color
    if (event.target.className == "item"){
        if (coloredMode.checked){ // check if colored mode is on
            event.target.style.backgroundColor = randomColor;
        }
        else { // paint black if it's off
            increaseBlackGradient(event);
        }
    }
}

function clearGrid(){ // removes existing grid from container (empties the container div)
    while(items.length > 0) { //because items is a HTML collection updated live, we have to use While instead of a For loop
       items[0].remove();
     }
    container.style.removeProperty('grid-template-columns');
    container.style.removeProperty('grid-template-rows');
}

function setGridSize(){
    let size = prompt("Please the grid size:");
    if (isNaN(Number(size)) || Number(size)> 64 || Number(size)< 1) { // test if GridSize input is an acceptable number
        alert(size + " is not a valid number, please enter a number from 0 to 64");
        createGrid(gridSize);
    }
    else if (size === "" || size === null) { // test if empty field of user clicked "cancels"
        alert("You didn\'t enter anything in the size field. Try Again!");
        createGrid(gridSize);
    }
    else {
        createGrid(Number(size));
        gridSize = Number(size); //save gridsize state for reset purposes
    }
}

document.addEventListener("mouseover", function() {  //paints squares hovered
    paintGrid(event);
});

btnGridSize.addEventListener("click", function(){ // Grid Size button functionality
    clearGrid();
    setGridSize();
});

btnReset.addEventListener("click", function(){ //Reset Grid button functionality
    clearGrid();
    createGrid(gridSize);
});


createDefaultGrid(); // creates default grid with 16 square size