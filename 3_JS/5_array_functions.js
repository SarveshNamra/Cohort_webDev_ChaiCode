const arr = ["Mango","Banana","Apple"];
console.log(Object.keys(arr));
arr.forEach((items,index)=>{
    console.log(`${items} ${index}`);
})

// For
console.log(Array.from("Cool"));
const num = [1,2,3];
console.log(Array.from(num, (x)=>x+x));

// Map
const number = [1,4,9];
const mapfun = number.map((n) => Math.sqrt(n));
console.log(number);
console.log(mapfun);