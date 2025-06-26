function ptaNhi(fn, delay) {
  let myId;

  return function (...args) {
    clearTimeout(myId);
    myId = setTimeout(() => {
      fn.apply(this, args);    // function ko call Karange Karange
    }, delay);
  };
}
// 0201 -> dev
//

function greet(name) {
  console.log(`Hello ${name}`);
}

/* ptaNhi(greet("hitesh"), 3000);        // --> here we are calling greet fun implicitely we should not call fun
  ptaNhi(greet("hitesh"), 3000);         // --> but we should create callback fun which is calling greet fun.
  ptaNhi(greet("hitesh"), 3000); */

/* ptaNhi(() => greet("hitesh"), 3000);   // --> if we called like this then it will show nothing
  ptaNhi(() => greet("hitesh"), 3000);
  ptaNhi(() => greet("hitesh"), 3000);   // ptaNhi 1k debounce version return krayga original fun ka
                                            to ham fun return kar rhai hai to usko 1k var may store karna pdayga
                                            fhir usko call karna pdayga.
*/
const sachMeNhiPta = ptaNhi(() => greet("hitesh"), 3000);
sachMeNhiPta();
sachMeNhiPta();
sachMeNhiPta();
// remove past request => keep a reference of it
// fire a new request
// userRequest() => debouncesUserRequest()
