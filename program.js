// CHAPTER 3

var empty_object = {};

// OBJECT LITERALS
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
      IATA: "AYD",
      time: "2004-09-22 14:55",
      city: "Sydney"
    },
    arrival: {
      IATA: "LAX",
      time: "2004-09-23 10:42",
      city: "Los Angeles"
    }
};

// RETRIVAL
stooge["first-name"]
flight.departure.IATA

// retunrs (none) from logical or
var middle = stooge["middle-name"] || "(none)";
// var flight.status || "unknown"

// // undefined
// flight.equipment 
// // will throw a type error since u can't retrieve a value from undefined
// flight.equipment.model 
// // returns undefined from logical and
// flight.equipment && flight.equipment.model 

// assignment and note single quotes also work
stooge['first-name'] = 'Dan';

// UPDATE
// object assignment can augment an object with a property
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
  model: 'Boeing 777'
};
flight.status = 'overdue';

// REFERENCE
// objects are passed by reference only
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
  // nick is Curl since x and stooge are references to the same object

// 3 different empty objects
var x = {}, b = {}, c = {};

// 3 references to the same empty object
var a = b = c = {};

// PROTOTYPE
// adds a create method to the object function
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.create(stooge);

// Prototypes are not updated
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

// Prototypes update dynamically
stooge.profession = 'actor';
another_stooge.profession // 'actor' is the result

// REFLECTION
typeof flight.number	// 'number
typeof flight.status	// 'string'
typeof flight.arrival	// 'object'
typeof flight.manifest	// 'undefined'

// function return is undesirable, want data info
typeof flight.toString	// 'function'
typeof flight.constructor	// 'function'

// to protect use hasOwnProperty
flight.hasOwnProperty('number')		// true
flight.hasOwnProperty('constructor')	// false

// ENUMERATION
// names will appear in any order
var name;
for(name in another_stooge) {
  if(typeof another_stooge[name] !== 'function') {
    document.writeln(name + ': ' + another_stooge[name]);
  }
}

// names in a particular order avoid for in statement
var i;
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];
for(i = 0; i < properties.length; i += 1) {
  document.writeln(properties[i] + ': ' +
    another_stooge[properties[i]]);
}

// DELETEs
// Removing a property from an object may allow a property from the prototype linkage to show through
another_stooge.nickname		// 'Moe'

// remove nickname from another_stooge, revealing
// the nickname of the prototype
delete another_stooge.nickname;
another_stooge.nickname // 'Curly'

// GLOBAL ABATEMENT
// MYAPP is the container for my applications
var MYAPP = {};

MYAPP.stooge = {
  "first-name": "Joe",
  "last-name": "Howard"
};

MYAPP.flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
  IATA: "LAX",
  time: "2004-09-23 10:42",
  city: "Los Angeles"
  }
};

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
var myObject = {
  value: 0;,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
document.writeln(myObject.value);	// 1

myObject.increment(2);
document.writeln(myObject.value);	// 3

var sum = add(3, 4)	// 7

// augment myObject with a double method
myObject.double = function() {
  var that = this; // Workaround
  
  var = helper = function() {
    that.value = add(that.value, that.value);
  };
  
  helper();	// Invoke helper as a function
};

// invoke double as a method

myObject.double();
document.writeln(myObject.value);

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

// make an array of two numbers and add them

var array = [3,4];
var sum = add.apply(null, array);	// sum is 7

// Make an object with a status member

var statusObject = {
  status: 'A-OK'
};

