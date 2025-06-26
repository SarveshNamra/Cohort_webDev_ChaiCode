console.log(arr[-1]);

const user = {
  name: "hitesh",
  age: 40,
  password: "123",
};

const proxyUser = new Proxy(user, {   // Here target happened to be an object i.e. user
         // In {} brases we are controling the proxied object i.e. user
get(target, prop) {   // Here property accessiong was String
    console.log(prop);
    if (prop === "password") {
      throw new Error("Access Denied");
    }
    return target[prop];
  },
  set(target, prop, user){}
});
console.log(proxyUser.password);

function negativeIndex(arr) {
  return new Proxy(arr, {
    get(target, prop) {    // Here property accessiong is Index of array/
      //    arr[-1] here arr is the target and -1 will be its prop
      const index = Number(prop);    // This makes sure that index of array happens to be a number
      if (index < 0) {
        return target[target.length + index];
      }
      return target[index];
    },
    set(target, prop, value) {
      const index = Number(prop);
      if (index < 0) {
        target[target.length + index] = value;
      } else {
        target[index] = value;
      }
      return true;
    },
  });
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let newArr = negativeIndex(arr);

console.log(arr[-1]);    // Interview que 1. does original array gets change if proxied array changes 2. shallo copy 3. Deep copy
console.log(newArr[-1]);
newArr[-1] = 22;
console.log(newArr);
console.log(arr);

