const btnToAddItem = document.getElementById('to-add-item');
const addedItem = document.querySelectorAll('.item');
const insertItem = document.querySelector('.items');
const allBoard = document.querySelectorAll('.board');
const toCreateBoard = document.getElementById('to-create-board');
const mainContainer = document.querySelector('.container');

// This add dragstart and dragend.
function drag(target){
    target.addEventListener("dragstart", () => {
        target.classList.add("flying");
    });

    target.addEventListener("dragend", () => {
        target.classList.remove("flying");
    });
}

// This deletes item from board
function deleteBtn(target){
    const btnDeletCard = document.createElement('button');
    btnDeletCard.innerText = "X";
    btnDeletCard.className = "Delete-btn";

    btnDeletCard.addEventListener('click', () => {
        target.remove();
        saveToLocalStorage();
    });

    target.appendChild(btnDeletCard);
}

// Ye flying item ko chipka leta hai dragover say.
function removeBoardAndAddDragFun(target){
    target.addEventListener("dragover", (e) => {
        //target.appendChild(document.querySelector('.flying'));
        e.preventDefault();
        const flying = document.querySelector('.flying');
        const itemsDiv = target.querySelector('.items');
        if (itemsDiv && flying) {
            itemsDiv.appendChild(flying);
        }
    });

    const removeBoard = document.createElement('button');
    removeBoard.innerText = "Remove";
    removeBoard.className = "remove-board-btn";

    removeBoard.addEventListener('click', () => {
        target.remove();
        saveToLocalStorage();
    });

    target.appendChild(removeBoard);
}

allBoard.forEach((board) => removeBoardAndAddDragFun(board));

addedItem.forEach((item) => {
    deleteBtn(item);
    drag(item);
});
//addedItem.forEach((item) => drag(item));

// Saving to Local Storage in the local device.
function saveToLocalStorage() {
    const boards = [];
    document.querySelectorAll('.board').forEach(board => {
      const title = board.querySelector('h3').innerText;
      const tasks = Array.from(board.querySelectorAll('.item'))
      .map(item => 
        item.childNodes[0].nodeValue.trim() // Exclude delete button text
      );
      boards.push({ title, tasks });
    });
    localStorage.setItem('kanbanBoards', JSON.stringify(boards));
}

// Adds new item to board
btnToAddItem.addEventListener('click',() => {
    
    const getInput = prompt("Insert here !");
    if(getInput == null || getInput == "") return alert("You haven't added anuthing !");

    // To avoid duplicates
    const allItems = document.querySelectorAll('.item');   // This part of code does'nt seem to work.
    for(let item of allItems){
        if(item.innerText.toLowerCase() === getInput.toLowerCase()){
            alert("Task alerady exists!");
            return;
        }
    }

    const card = document.createElement('p');
    card.className = "item";    
    card.draggable = true;
    card.innerText = getInput;

    insertItem.appendChild(card);    

    drag(card);
    deleteBtn(card);

    saveToLocalStorage(); 
});

// Creates new board with similar functionalities.
toCreateBoard.addEventListener('click', () => {
    const getInputText = prompt('Board title!');
    if(getInputText == null || getInputText == "") return alert("You haven't added anuthing!");
    
    const createNewBoardCard = document.createElement('div');
    createNewBoardCard.className = "board";

    const createTitleForCard = document.createElement('h3');
    createTitleForCard.innerText = getInputText;

    const createDivForItems = document.createElement('div');
    createDivForItems.className = "items";

    createNewBoardCard.appendChild(createTitleForCard);
    createNewBoardCard.appendChild(createDivForItems);
    removeBoardAndAddDragFun(createNewBoardCard);
    
    mainContainer.appendChild(createNewBoardCard);

    saveToLocalStorage();
});

// Add Item dutton give choice to add item in which board ?
/* To do so 1. hovering on Add button it must display present Board Title name.
            2. After clicking on Board title the user will add its items in board
            3. If extra board created must be able to seen in sublist of Add btn when hover and it must fun same.
*/

const divSublistBoardTitle = document.querySelector('subList-board-title');

to-add-item.addEventListener('click', () => {
    const listOfTitles = document.createElement('button'); // unordered list (ul) having li tags
    listOfTitles.className = "get-selected";
    // I think we have to do like drag
    // a. i have to add all title name using className or h3 or innerText and then on clicking list the popup of insert item appears
    // b. then use switch case for choicing the board to insert items Or just

    divSublistBoardTitle.appendChild(listOfTitles);
})
