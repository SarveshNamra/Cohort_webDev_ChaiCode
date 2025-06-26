/*
I should have a function increment()
on call of fun it should increment the no. and return the current count.

like - 
console.log(increment());  1
console.log(increment());  2
console.log(increment());  3
console.log(increment());  4
*/


function increment(){
    let count = 0;

    // Closer Function (closer binded by its lexical scope)
    return function(){
        count++;
        return count;
    };
}

const x = increment();  //  when we call the increment() then we are returning a function therefore x is also a function.
const y = increment();

console.log(x());
console.log(x());
console.log(x());
console.log(y());

count = 3;  // External interuption i.e. if anyone tryis chage count
console.log(y());
console.log(x());
console.log(y());


// ----- To explain how count is not changing -----

function test(){
    let i = 10;
    i++;
    
    function letIncrement(){
        i++;
        return i;
    };

    return letIncrement;  /* I am able to return letIncrement fun in test() only 
                             because of its scope is limited till test fun, not outside of it 
                             */
}

// letIncrement();  // Outside test fun I can't access it because of its scope

test();  // So the return type of test will be a function because it is returning a function.

const f = test();  // Then f will be an incremental function jo letIncrement fun ko call krraha hoga.
/*function letIncrement(){    This is how f will look like internaly
        i++;
        return i;
    };
*/

console.log(test());