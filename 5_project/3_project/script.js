const btnToAddItem = document.getElementById('to-add-item');
const addedItem = document.querySelectorAll('.item');
const insertItem = document.querySelector('.items');

addedItem.forEach(board => {
    board.addEventListener(() => {

    })
})

btnToAddItem.addEventListener('click',() => {``
    const getInput = prompt("Insert here !");
    if(getInput == null || getInput == "") return alert("You haven't added anuthing !");

    const card = document.createElement('p');
    card.className = "item";
    card.draggable = "true";
    card.innerText = getInput;
    insertItem.appendChild(card);

    card.addEventListener("dragstart", () => {
        ondragstart = card.classList.add("flying");
    });

    card.addEventListener("dragend", () => {
        ondragend = card.classList.remove("flying");
    });
});