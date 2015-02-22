//program.js

document.writeln('Hello World!');

var empty_object = {};

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

stooge["first-name"]
flight.departure.IATA

// retunrs (none) from logical or
var middle = stooge["middle-name"] || "(none)";
var flight.status || "unknown"

// undefined
flight.equipment 
// will throw a type error since u can't retrieve a value from undefined
flight.equipment.model 
// returns undefined from logical and
flight.equipment && flight.equipment.model 

// assignment and note single quotes also work
stooge['first-name'] = 'Dan';

// object assignment can augment an object with a property
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
  model: 'Boeing 777'
};
flight.status = 'overdue';

// objects are passed by reference only
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
  // nick is Curl since x and stooge are references to the same object

// 3 different empty objects
var x = {}, b = {}, c = {};

// 3 references to the same empty object
var a = b = c = {};

// adds a create method to the object function
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}\var another_stooge = Object.create(stooge);