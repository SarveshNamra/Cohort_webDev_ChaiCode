// ----- 1) Example for Class -----

  class A {
    constructor() {
      this.name = "Class A";
    }
  
    greet() {
      console.log("Hello from " + this.name);
    }
  }
  
  class B {
    constructor() {
      this.age = 25;
    }
  }
  
  // Inherit from A using __proto__
  B.prototype.__proto__ = A.prototype;
  
  const bInstance = new B();
  bInstance.greet();        // Inherited from A
  console.log(bInstance.age); // Own property of B


// ----- 2) Example for Function -----
function A() {
    this.name = "Class A";
  }
  
  A.prototype.greet = function() {
    console.log("Hello from " + this.name);
  };
  
  function B() {
    this.age = 25;
  }
  
  // Add Class A to Class B using __proto__
  B.prototype.__proto__ = A.prototype;
  
  // Now B inherits from A
  const b_Instance = new B();
  b_Instance.greet(); // Inherited from A
  console.log(b_Instance.age); // Own property of B
  