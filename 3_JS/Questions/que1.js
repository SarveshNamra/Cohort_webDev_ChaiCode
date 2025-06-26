/*  Print the low stock items
    Items less than 50
*/

let inventory = [
    {name:"widget A", stock: 30},
    {name:"widget B", stock: 120},
    {name:"widget C", stock: 45},
    {name:"widget D", stock: 70},
];

//let lowStock = inventory.map((e) => e.stock < 50 ? e : undefined).filter(Boolean);
let lowStock = inventory.filter((e) => e.stock < 50);
console.log(lowStock);