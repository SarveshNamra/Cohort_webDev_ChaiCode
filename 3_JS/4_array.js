// let arr1 = ["Apple","Mango",90,'A'];
// let arr2 = new Array("Cake","Brade","Patis");

// console.log(arr1);

// arr2.push("Tost");
// arr2.unshift("Pastries");
// arr2.pop();
// console.log(arr2)

// console.log(arr2.pop());

const tea = ["Green Tea", "Black Tea", "White Tea", "Masala Tea"];
console.log(tea);
tea.push("Chamomile Tea");
console.log(tea);

const index = tea.indexOf("White Tea");    // Checks if name of tea is present or not. If yes then returns index and else it returns -1.
console.log(index);

if(index>-1){
    tea.splice(index, 1);
    console.log(tea);
}

const caffinatedTea = tea.filter(not_caffin => not_caffin !== "Masala Tea");
console.log(caffinatedTea);

tea.sort();
console.log(tea);

for(let i=0 ;i<tea.length; i++){
    console.log(tea[i]);
}

let count = 0;
for(let i=0; i<caffinatedTea.length; i++){
    count++;
}
console.log(count);

let upperCase = [];
for(let i=0; i<tea.length; i++){
    upperCase.push(tea[i].toUpperCase());
}
console.log(upperCase);

let lowerCase = [];
for(let i=0; i<tea.length; i++){
    lowerCase.push(tea[i].toLowerCase());
}
console.log(lowerCase);

let mostChar = "";
for(let i=0; i<tea.length; i++){
    if(tea[i].length > mostChar.length){
        mostChar = tea[i];
    }
}
console.log(mostChar);

let reverseArray = [];
for(let i=tea.length-1  ; i>=0; i--){
    reverseArray.push(tea[i]);
}
console.log(reverseArray);