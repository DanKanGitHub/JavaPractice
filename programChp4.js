// CHAPTER 4
// FUNCTION OBJECTS

// Create a variable called add and store a function
// in it that adds two numbers

var add = function(a, b) { // no function name given  a, b are initlaized to the aurgements supplied when the function is invoked
  return a + b;
};

// INVOCATION
// There is no error if the number of parameters does not equal the number of variables
// There is no type checking either!
// If too few arguements are passed then undefined is inserted for the remaining aprameters
// Method Invocation Pattern
var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
document.writeln(myObject.value);	// 1

myObject.increment(2);
document.writeln(myObject.value);	// 3

// Function Invocation Pattern
var sum = add(3, 4)	// 7
document.writeln(sum); // I added this code to print sum to the screen

// augment myObject with a double method
myObject.double = function() {
  var that = this; // Workaround
  
  var helper = function() {
    that.value = add(that.value, that.value);
  };
  
  helper();	// Invoke helper as a function
};

// invoke double as a method

myObject.double();
document.writeln(myObject.value); // 6

// Constructor Invocation Pattern
// Create a constructor function called Quo
// It makes an object with a status property

var Quo = function (string) {
  this.status = string;
};

// Give all instances of Quo a public method

// called get_status.

Quo.prototype.get_status = function () {
  return this.status;
};

// Make an isntance of Quo

var myQuo = new Quo("confused");

document.writeln(myQuo.get_status());	// confused

// Apply Invocation Pattern
// make an array of two numbers and add them

var array = [3,4];
var sum = add.apply(null, array);	// sum is 7

// Make an object with a status member

var statusObject = {
  status: 'A-OK'
};

// Status object does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method

var status = Quo.prototype.get_status.apply(statusObject);
// status is A-OK
document.writeln(status);

// Arguements
// make a function that adds a lot of stuff

// Note that defining the variable sum inside of
// the function does not interfer with the sum
// define outside of the function.  The function
// only sees the inner one

var sum = function () {
  var i, sum = 0;

  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];

  }
  return sum;
};

document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108

// Exceptions
var add = function(a,b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
}

// Make a try it function that incorrectly calls the new add function
var try_it = function () {
  try {
    add("seven");
  } catch (e) {
    document.writeln(e.name + ': ' + e.message);
  }
}
try_it();

// Augmenting Types
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

// uses math.ceil or math.floor dependingupon the sign of the number
Number.method('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln((-10 / 3).integer()); // -3

// removes space at the end strings
String.method('trim', function () {
  return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "    neat    ".trim() + '"');

// add a method conditionally
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};

// Recursion

var hanoi = function hanoi(disc, src, aux, dst) {
  if(disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    document.writeln('Move disc ' + disc +
	      ' from ' + src + ' to ' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
};

hanoi(3, 'Src', 'Aux', 'Dst');

// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
/// from some given node.  It invokes a function,
// passing it each node in turn.  walk_the_DOM calls
// itself to process each of the child nodes

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstchild;
  while(node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

// Define a getElementsByAttribute function.  It
// takes an attribute name string and an optional
// matching value.  It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node.  The matching nodes are accumulating in a
// results array.

var getElementsByAttribute = function (att, value) {
  var results = [];
  
  walk_the_DOM(document.body, function (node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' &&
      (actual === value || typeof value !== 'string')) {
    results.push(node);
    }
  });
  
  return results;
};

// Tail Recursion

// Make a factorial function with tail
// recursion.  It is tail recursion because
// it returnss the result of calling itself

// JavaScript does not currently optimize this form.

var factorial = function factorial(i, a) {
  a = a || 1;
  if(i < 2) {
    return a;
  }
  return factorial(i-1, a * i);
};

document.writeln(factorial(4)); // 24

// Scope
var foo = function () {
  var a = 3, b = 5;
  
  var bar = function () {
    var b = 7, c = 11;
    
  // at this point, a is 3, b is 7, and c is 11
    
    a += b + c;
    
  // at this point a is 21, b is 7 and c is 11
  };
  
  // at this point, a is 3, b is 5 and cis not defined
  
  bar();
  
  // at this point, a is 21, b is 5
  
};

// Closure

var myObject = (function () {
  var value = 0;
  
  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value;
    }
  };
}());

// Create a maker function called quo.  It makes an
// object with a get_status method and a private
// status property

var quo = function (status) {
  return {
    get_status: function () {
      return status;
    }
  };
};

// Make an instance of quo

var myQuo = quo("amazed");

document.writeln(myQuo.get_status());

// Define a function that sets a DOM node's color
// to yellow and then fades it to white

var fade = function (node) {
  var level = 1;
  var step = function () {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if(level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

fade(document.body);

// Bad example

// Make a function that assigns event handler functions to an array
// of nodes the wrong way.  When you click on a node, an alert box
// is supposed to display the ordinal of the node.  But it always
// displays the number of nodes instead.

var add_the_handlers = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function (e) {
      alert(i);
    };
  }
};

// End Bad example
// Fails because the handler functions are bound to the variable i,
// not the value off the variable i at the time the function was made.

// Better example

// Make a function that assigns event handler functions to an array
// of nodes.  When you click on a node, an alert box will display
// the ordinal of the nodes.

var add_the_handlers = function (nodes) {
  var helper = function (i) {
    return function (e) {
      alert(i);
    };
  };
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = helper(i);
  }
};

// Callbacks

// For soe reason this code stops all subsequent writing to the screen.
// request = prepare_the_request();
// send_request_asynchronously(request, function (response) {
//   display(response);
// });

// Module
// A module is a function or object that presents an interface
// but that hides its state and implementation.

String.method('deentityify', function () {
    // The entity table.  It maps entuty names to
    // characters.
    
    var entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };
    
    // Return the deentityify method
    
    return function () {
      
      // This is the deentityify method.  It calls the string
      // replace method, looking for substrings that starting
      // with '&' and end with ';'.  If the characters in
      // between are in the entity table, then replace the
      // entity with the character from the table.  It uses
      // a regular expression (Chaptre 7).
      
      return this.replace(/&([^&;]+);/g,
	function (a,b) {
	  var r = entity[b];
	  return typeof r === 'string' ? r : a;
	}
      );
    };
}());

document.writeln('&lt;&quot;&gt;'.deentityify()); // <">

// Secure Object
var serial_maker = function() {
  // Produce an object that produces unique strings.  A
  // unique string is made up of two parts: a prefix
  // and a sequence number.  The object comes with
  // methods for setting the prefix and sequence
  // number, and a gensym method that produces unique
  // strings
  
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym(); // unique is "Q1000"

document.writeln(unique);

// Cascade
getElement('myBoxDiv')
  .move(350, 150)
  .width(100)
  .height(100)
  .color('red')
  .border('10px outset')
  .padding('4px')
  .appendText("Please stand by")
  .on('mousedown', function (m) {
    this.startDrag(m, this.getNinth(m));
  })
  .on('mousemove', 'drag')
  .on('mouseup', 'stopDrag')
  .later(2000, function () {
    this
	.color('yellow')
	.setHTML("What hath God wraught?")
	.slide(400, 40, 200, 200);
  })
  tip('This box is resizeable');
  
// Curry
var add1 = add.curry(1);
document.writeln(add1(6));	// 7

Function.method('curry', function () {
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;
  return function () {
    return that.apply(null, args.concat(slice.apply(arguements)));
  };
});

// Memoization

var fibonacci = (function () {
  var memo = [0, 1];
  var fib = function(n) {
    var results = memo[n];
    if (typeof results !== 'number') {
      result = fin(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}());
document.writeln('Still Prints 1');
document.writeln(fibonacci(5));