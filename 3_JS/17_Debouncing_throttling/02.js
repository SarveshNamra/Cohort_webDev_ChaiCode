// execute this function . Make it runable.

const ptaNhi = (fn, delay) => {
    let myId = null
    
    console.log(parameters);

    return (...args) => {
        console.log(args);

        if(myId === null){
            fn(...args);     // nahi nahi function ko abhi call kardo
            myId = setTimeout(() => {
                myId = null
            }, delay);
        }
    }
}

ptaNhi()
ptaNhi()
ptaNhi()