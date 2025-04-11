//  1) Object

const ChaiRecipe = {
    name: "Masala Chai",
    ingredients: ["tea", "milk", "sugar", "spices"]
  };
  
  let { name, ingredients } = ChaiRecipe;
  console.log(name);        // "Masala Chai"
  console.log(ingredients); // ["tea", "milk", "sugar", "spices"]
  
//    Instead of writing ChaiRecipe.name and ChaiRecipe.ingredients, you can directly access the properties.

//  2) Array

const ChaiType = ["Karak Chai", "Ginger Chai", "Masala Chai"];
let [firstChai, secondChai] = ChaiType;

console.log(firstChai);  // "Karak Chai"
console.log(secondChai); // "Ginger Chai"


function checkValue(value){
    if(value){
        console.log("Truthy");
    }
    else{
        console.log("Falsy");
    }
}
checkValue("");
checkValue(1);
checkValue(0);
checkValue([]);
checkValue(null);
checkValue("hallo");
checkValue([1,2]);
checkValue();