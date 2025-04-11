const tea = {
    name: "Green tea",
    caffine: "No"
}

tea.origine = "China";
console.log(tea.origine);

tea.caffine = "Medium";

delete tea.origine;

console.log("origine" in tea);                  // First Method to Check
console.log(Object.hasOwn(Object, "origine"));  // Second Method to Check if origine is present in tea or not.

for(let key in tea){
    console.log(`${key} : ${tea[key]}`);
}

// ---- Assign Function ----
const target = {     // This is one method to copy but this is shallow copy.
    n : 1,
    b : 2,
    order : {
        f : "1 is first"
    }
}
const source = {}
const returnTarget = Object.assign(source, target);
console.log(source);

source.n = 3;
source.order.f = "2 is first";

console.log(target);
console.log(source);

