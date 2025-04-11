Object.prototype.chai = function(){
    console.log("Code Karo");
}

const tea = {
    name:"Green Tea",
    type:"tea"
}

console.log(tea.chai());

// The chai method inside Object.prototype does console.log("Code Karo"),
// but it does not return anything. So, when you call tea.chai(),
// it will log "Code Karo" to the console, but console.log(tea.chai()) 
// will output undefined because chai does not return anything.

tea.chai();

const myTea = ["Ice Tea", "Lemon Tea"];
myTea.chai();

const arr = [1,2,3]
if(!Array.prototype.fill){
    
    //Fallback - Polyfill function
    Array.prototype.fill = function(){

    }
}

arr.fill();