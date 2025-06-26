class MyPromise {
    constructor(executorFn){
        this._state = 'pending';
        this._successCallbacks = [];
        this._errorCallbacks = [];
        this._finalCallback = [];
        this.value = undefined;
        executorFn(this.resolveFunction.bind(this), this.rejectFunction.bind(this));
    }

    then(cb){
        if(this._state == 'fulfilled'){
            console.log(`Apaka promice to pahle hi fulfilled hogaya, Run he kar deta hu`);
            cb(this.value);
            return this;
        }
        this._successCallbacks.push(cb);
        return this;
    }

    catch(cb){
        if(this._state == 'rejected'){
            console.log(`Apaka promice to pahle hi rejected hogaya, Run he kar deta hu`);
            cb();
            return this;
        }
        this._errorCallbacks.push(cb);
        return this;
    }

    finally(cb){
        if(this._state !== 'pending'){
            cb();
            return this;
        }
        this._finalCallback.push(cb);
        return this;
    }

    resolveFunction(value){
        console.log(`Fulfilled Promises, Running ${this._finalCallback.length} callbacks`);
        this._state = 'fulfilled';
        this.value = value;
        this._successCallbacks.forEach((cb) => cb(value));
        this._finalCallback.forEach((cb) => cb());
    }

    rejectFunction(err){
        this._state = 'rejected';
        this._errorCallbacks.forEach((cb) => cb(err));
        this._finalCallback.forEach((cb) => cb());
    }
}


function wait(seconds){
    const p = new MyPromise((resolve, reject) => {
        // setTimeout(() => resolve('Hahaha'), seconds * 1000);
        resolve('Hahaha');
    });
    return p;
}

const p = wait(5);

console.log(`Rejstering Callbacks`);

p
.then((e) => console.log('V1 Execute after 5 sec',e))
.catch(() => console.log('V1 Rejected after 5 sec'))
.finally(() => console.log(`V1 Mai to har baar chalunga`));

p
.then((e) => console.log('V2 Execute after 5 sec',e))
.catch(() => console.log('V2 Rejected after 5 sec'))
.finally(() => console.log(`V2 Mai to har baar chalunga`));

// wait(5)
// .then((e) => console.log('Execute after 5 sec',e))
// .catch((e) => console.log('Rejected after 5 sec',e))
// .finally(() => (`Mai to har baar chalunga`));


// ----- This code down below is given by copilot -----

// (function (global) {
//   // Promise polyfill
//   function Promise(executor) {
//     this.state = 'pending';
//     this.value = undefined;
//     this.handlers = [];

//     const resolve = (value) => {
//       if (this.state === 'pending') {
//         this.state = 'fulfilled';
//         this.value = value;
//         this.handlers.forEach((h) => h.onFulfilled(value));
//       }
//     };

//     const reject = (reason) => {
//       if (this.state === 'pending') {
//         this.state = 'rejected';
//         this.value = reason;
//         this.handlers.forEach((h) => h.onRejected(reason));
//       }
//     };

//     try {
//       executor(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   Promise.prototype.then = function (onFulfilled, onRejected) {
//     return new Promise((resolve, reject) => {
//       const handle = () => {
//         try {
//           if (this.state === 'fulfilled') {
//             const result = onFulfilled(this.value);
//             resolve(result);
//           } else if (this.state === 'rejected') {
//             const result = onRejected(this.value);
//             reject(result);
//           }
//         } catch (error) {
//           reject(error);
//         }
//       };

//       if (this.state === 'pending') {
//         this.handlers.push({ onFulfilled: handle, onRejected: handle });
//       } else {
//         handle();
//       }
//     });
//   };

//   // Export the Promise polyfill
//   if (typeof module !== 'undefined' && module.exports) {
//     module.exports = Promise;
//   } else {
//     global.Promise = Promise;
//   }
// })(this);

