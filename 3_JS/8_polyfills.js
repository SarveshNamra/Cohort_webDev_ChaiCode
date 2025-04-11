// 1) Creating myForEach function same as forEach function which is not present in the prototype of Array

if(!Array.prototype.myForEach){
    Array.prototype.myForEach = function(userFun){
        const originalArr = this;     //  Current Object ki taraf point karta hai
        for(let i=0;i<originalArr.length;i++){
            userFun(originalArr[i], i);
        }
    };
}

const arr = [1,2,3,4];

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

console.log(myRet);


// 2) For .myMap function which will be same as that of .map

if(!Array.prototype.myMap){
    Array.prototype.myMap = function(userFun){
        const arrNew = [];
        for(let i=0; i<this.length; i++){
            const value = userFun(this[i], i);
            arrNew.push(value);
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

const arr2 = [5,6,7];

if(!Array.prototype.myConcat){
    Array.prototype.myConcat = function(userFun){
        let temp = [];
        for(let i=0; i<this.length; i++){
            temp.push(this[i]);
        }
        for(let i=0; i<arguments.length; i++){
            if(Array.isArray(arguments[i])){
                const tempArray = arguments[i];
                for(let i=0; i<tempArray.length; i++){
                    temp.push(tempArray[i]);
                }
            }
            else{
                temp.push(arguments[i]);
            }
        }
    };
}

const result = arr.concat(arr2);
console.log(result);

const con = arr.myConcat(arr2);
console.log(con);

const con2 = arr.myConcat("a");
console.log(con2);