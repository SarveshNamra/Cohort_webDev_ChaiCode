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
  /* If the code was - class B extends A {}, 
  then A's constructor would have been called, and this.name would be "Class A".
  */
  const bInstance = new B();   /*Because without creating an instance, 
  the class definition is just a blueprint — it doesn’t do anything by itself.
  */
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
    this.age = 15;
  }
  
  // Add Class A to Class B using __proto__
  B.prototype.__proto__ = A.prototype;
  
  // Now B inherits from A
  const b_Instance = new B();
  b_Instance.greet(); // Inherited from A
  console.log(b_Instance.age); // Own property of B
  