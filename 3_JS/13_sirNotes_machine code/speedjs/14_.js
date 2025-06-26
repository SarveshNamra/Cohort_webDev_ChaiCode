const user = {
    name:'san',
    age:30,
    password:'123',
};

const proxyUser = new Proxy(user,{
    get(target, prop){
        console.log(`${target} and ${prop}`);
        if(prop === 'password'){
            throw new Error('Access Denied');
        }
        return target[prop];
    }
});

console.log(proxyUser.name);

let arr = [1,2,3,4,5];

console.log(arr[1]);