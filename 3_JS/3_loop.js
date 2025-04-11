let arr = [1,2,3,4,5];

function add(numbers){
    let sum = 0;
    for(let i=0;i<numbers.length;i++){
        sum = sum + numbers[i];
    }
    return sum;
}

let result = add(arr);
console.log(result);