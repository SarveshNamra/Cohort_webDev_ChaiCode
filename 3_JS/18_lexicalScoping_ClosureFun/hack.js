/*  (For Counter.js file) As we are returning a function which is contain or holding the
    reference of a var(or it may be the obj, etc) like count which makes it consume more memory
    like if count = 0 is taking 10 MB space but the Garbage collector will not delete even after 
    the funtion is called. It will keep its reference till the code is running which is the reason for Meamory Leak.
    to clear this memory issue use 'NULL'.
*/

function createInstance(){
    let item = {
        value : 10
    };
    return function(){
        console.log(item);
    };
}

let logger = createInstance();

logger();
logger();
logger();
logger();

logger = null; /* By making null reference of item in return function will get removed and then the
                 Garbaje celector will remove/delete it from memory */