let container = document.getElementById("container");
let items = document.getElementsByClassName("item");

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

function clearGrid(){ // removes existing grid from container (empties the container div)
    while(items.length > 0) { //because items is a HTML collection updated live, we have to use While instead of a For loop
       items[0].remove();
     }
    container.style.removeProperty('grid-template-columns');
    container.style.removeProperty('grid-template-rows');
}

// document.addEventListener("mouseover", )