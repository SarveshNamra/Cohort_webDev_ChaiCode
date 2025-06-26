// 1) Creating myForEach function same as forEach function which is not present in the prototype of Array

if(!Array.prototype.myForEach){
    Array.prototype.myForEach = function(userFun){
        const originalArr = this;     //  Current Object ki taraf point karta hai
        /*
        The function myForEach is attached to Array.prototype.
        When you call arr.myForEach(...), the this inside that function refers to the array object arr.
        */
        for(let i=0;i<originalArr.length;i++){
            userFun(originalArr[i], i);
        }
    };
}

const arr = [1,2,3,4];

/*
✅ What is userFun?
    UserFun is the callback function that you pass into myForEach.

    In this line:

        arr.myForEach(function(value, index) {
            console.log(`myForEach value at index ${index} is ${value}`);
        });

    You're calling myForEach and passing it an anonymous function like this:

        function(value, index) {
            console.log(`myForEach value at index ${index} is ${value}`);
        }

    This anonymous function is the argument passed to myForEach, and it's stored in the parameter userFun.
*/


// Error: .forEach function does not exist on arr variable

// Real Signature ko samjo - No return, function input, value, index
// calls my fn for every value

const ret = arr.forEach(function(value, index){
    console.log(`Value of index ${index} is ${value}`);
});

console.log(ret);

const myRet = arr.myForEach(function(value, index){
    console.log(`myForEach value at index ${index} is ${value}`);
});

/*  const arr = [1, 2, 3, 4];
    arr.myForEach(...);
  
    Inside myForEach, this is the same as arr.
    Therefore:
        const originalArr = this;

    Means:
        const originalArr = [1, 2, 3, 4]; // The array calling the method*/

console.log(myRet);


// 2) For .myMap function which will be same as that of .map

if(!Array.prototype.myMap){
    Array.prototype.myMap = function(userFun){
        const arrNew = [];
        for(let i=0; i<this.length; i++){
            const value = userFun(this[i], i);   // calls that arrow function on each element.
            arrNew.push(value);
            /*  For i = 0:
                    userFun(1, 0) → (1) * 3 = 3 → arrNew.push(3);

                For i = 1:
                    userFun(2, 1) → (2) * 3 = 6 → arrNew.push(6);*/
        }
        return arrNew;
    };
}

// Signature .map
// Return? - New Array, Each ele Iterate, userFn

const num1 = arr.map((e) => e * 2);
console.log(num1);

const num2 = arr.myMap((e) => e * 3);
console.log(num2);


// 3) For .myFilter() function same as that of .filter() function in Array prototype

if(!Array.prototype.myFilter){
    Array.prototype.myFilter = function(userFun){
        const arrNew = [];
        for(let i=0; i<this.length; i++){
            if(userFun(this[i])){
                arrNew.push(this[i]);
            }
        }
        return arrNew;
    };
}

// Filter
// Signature: Return - new array | input: userFn
// agar user ka function True return karta hai toh current value ko new array mein include kar leta hai

const num3 = arr.filter((e) => e % 2 === 0);
const num4 = arr.myFilter((e) => e % 2 === 0);
console.log(num3);
console.log(num4);

// 4) For .myIndexOf() function same as that of .indexOf() function in Array prototype

if(!Array.prototype.myIndexOf){
    Array.prototype.myIndexOf = function(userFun){
        for(let i=0; i<this.length; i++){
            if(this[i]===userFun){
                return i;
            }
        }
        return -1;
    };
}

console.log(arr.indexOf(3));
console.log(arr.myIndexOf(2));

// For .myConcat() function same as that of .concat() function in Array prototype

if(!Array.prototype.myConcat){
    Array.prototype.myConcat = function(userFun){
        let temp = [];
        for(let i=0; i<this.length; i++){
            temp.push(this[i]);
        }
        for(let i=0; i<arguments.length; i++){   // arguments is the array-like object but can't perform .map, .forEach
            if(Array.isArray(arguments[i])){     // to see the current argument is array e.g. ([5,6],9)
                const tempArray = arguments[i];   // to store sub array i.e. current argu. e.g. [5,6]
                for(let i=0; i<tempArray.length; i++){   // iterate on it
                    temp.push(tempArray[i]);      // push individual element in temp array.
                }
            }
            else{
                temp.push(arguments[i]);    // else push directly in temp array.
            }
        }
        return temp;
    };
}

/*  You can use .forEach(), .map(), etc.

Array.prototype.myConcat = function(...args){
    let temp = [...this];
    for (let i = 0; i < args.length; i++) {
        if (Array.isArray(args[i])) {
            temp.push(...args[i]);
        } else {
            temp.push(args[i]);
        }
    }
    return temp;
};
*/

const ans = arr.myConcat([5, 6], [7, 8], 9);
console.log(ans);

// Polyfill of reduce() function

const arr_num = [1,2,3,4,5];

if(!Array.prototype.myReduce){
    Array.prototype.myReduce = function(cb, initialValue = undefined){
   
    let acc = initialValue || this[0];
    const startIndex = initialValue ? 0 : 1;
    
    for(let i=startIndex; i<this.length; i++){
        acc = cb(acc, this[i]);
    }
    return acc;
    
    //  OR 

    //  Down below code we are voileting principle that we are reapating the code so above code is clean code

//         if(!initialValue){
//             let acc = this[0];        //  Initializing the accumulator
//             for(let i=1; i<this.length; i++){
//                 acc = cb(acc,this[i]);
//             }
//             return acc;
//         }
        
//         let acc = initialValue;       //  Initializing the accumulator
//         for(let i=0; i<this.length; i++){
//             acc = cb(acc,this[i]);
//         }
//         return acc;
    }
}

const result = arr.concat(arr2);
console.log(result);

const con = arr.myConcat(arr2);
console.log(con);

const con2 = arr.myConcat("a");
console.log(con2);

const value = arr_num.myReduce((abTakKiValue, curruntValue) => abTakKiValue + curruntValue, 0);
console.log(value);