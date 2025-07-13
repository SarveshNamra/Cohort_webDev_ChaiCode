const { jsx } = require("react/jsx-runtime");

let p1 = {
    name : "San",
    age: 91
}

let p2 = p1;

console.log(p1);
console.log(p2);

p2.age = 32;

console.log(p1);
console.log(p2);  // This is because p2 is pointing towards p1 obj, its not creating copy of p1.

let p3 = {    
    name: p1.name,    // This will create actual copy of p1 obj key valyes
    age : p1.age
}

let p4 = {
    ...p1    // This will create actual copy of p1 obj
}

console.log(p1);
p3.age = 44;
console.log(p3);

//   << -------  Shallow copy  ------- >>
 
let c1 = {
    name : "Hitesh",
    age: 45,
    profession: {
        pname: "Teacher"
    }
}

let c2 = {
    profession : c1.profession // This is copy by reference, as we are copying outer obj the inner obj gets copyed by reference so it points to c1.profession 
    // ...c1 this spread operator does the same
}

console.log(c1);
c2.profession.pname = "YouTuber";
console.log(c1);
console.log(c2);


//   << -------  Deep copy  ------- >>

const c1KaString = JSON.stringify(c1);
console.log(c1KaString);
let c3 = JSON.parse(c1KaString);
