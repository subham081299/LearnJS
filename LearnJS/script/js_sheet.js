//Promises and Promise chaining
let cart = ["shampoo", "mouse", "keyboard", "iphone"];

/* 
 These callbacks within another callbacks will result in growing the code horizontall instead of vertically 
---Besides if we pass an api within another it will give the control of the api to another api , which will lead
 to loosing the control of our own api . This is called Inversion of Control or Pyramid of Doom or Callback Hell
 */

// createOrder(cart, function (orderId){
//    proceedToPayment(orderId, function (paymentInfo) {
//       showOrderSummary(paymentInfo , function () {
//         updateWallet();
//       });
//    });
// });

/* 
How to resolve it ? 
Using promises ---- We create Promise Object and we do not pass a callback function to it ,
 instead we attach a callback function and whenn we get the data or the promise is resolved 
 then automatically it will be called
 */

/* 
 DEFINITION----
 Promise is an object representing the  eventual completion of an asynchronous operation or failure .
 In simple terms , it's a placeholder for the future value of an async function.
 */
createOrder(cart)
  .then(function (orderId) {
    console.log(orderId);
    return orderId;
  })
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch(function (err) {
    console.log(err.message);
  });

function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error("Cart Not Valid");
      reject(err);
    }
    const orderId = "123";
    if (orderId) {
      setTimeout(() => {
        resolve(orderId);
      }, 2000);
    }
  });
  return pr;
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("Payment Successful");
  });
}

function validateCart(cart) {
  console.log(cart);
  return true;
}

/**
 * What is aysnc? 
 * The keyword async before a function makes the function return a promise:
 * 
 * What is await?
 * The await keyword can only be used inside an async function.
   The await keyword makes the function pause the execution and wait for a resolved promise before it continues:
   
 * How async await works behind the scene ?
 * Examples
 * Async await vs Promise.then/catch
 * 
 */

//async always returns Promises . even if we return string or any other data types it will wrap it into Promise
// async and await combo is used to handle promises . Await can be used only inside an async function . await is written infornt promises
async function getData() {
  return "Namaste";
}
const dataPromise = getData();
dataPromise.then((res) => console.log(res));

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Resolved");
  }, 10000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise Resolved");
  }, 5000);
});

async function handlePromise() {
  console.log("handlePromise");
  /**
   * in the console it will appear to wait for the promise to return then proceed to next line but in reality Js engine doesn't wait  for anyone
   * But inside the call stack when handlePromise() is called it at first prints the handlePromise msg then sees that the 2 promises are not
   * yet resolved then it will suspend the function then handlePromise() will move out of the call stack and therefore no more memory storage is
   * needed . Then when the promise p1 is resolved , handlePromise() will again come in call stack and proceed where it was suspended it
   *  will print the result and if the p2 is resolved then it will also be printed after p1. That is  p2 is executed after p1
   */

  const v = await p1;
  console.log(v);
  const l = await p2;
  console.log(l);
}
handlePromise();

/**
 * fetch() => is a Promise so it will return a Response Object so it will have a ResponseBody, now inorder to see we need to convert it to json() which is also a promise
 *  fetch() => Response.json();
 */
const url =
  "https://google-translate1.p.rapidapi.com/language/translate/v2/detect";

async function fetchResponse() {
  try {
    const data = await fetch(url);
    const val = await data.json();
    console.log(val);
  } catch (error) {
    console.log(error);
  }
}
fetchResponse();

//this keyword-----------------------------
/**
 *  What is the value of this inside the Global Space ?
 * --> Global Object depends on where the code is running
 * this keyword works different for 'strict' and 'non-strict' mode
 * what's the difference ?
 *  under non strict mode : If the value of this keyword is undefined or null then this keyword is replaced with global object. This is also called this Substitution
 *  under strict mode: the value will be undefined
 *
 * this keyword value depends on how the function is called(windows)
 */
("use strict");
function x() {
  console.log(this);
}
x(); //returns undefined
window.x(); //returns window Object

const obj = {
  a: 10,
  x: function () {
    console.log(this); //this refers to the object within which it's placed
  },
};

//call the method of the object
obj.x(); //returns obj

//sharing the method using call bind apply
const emp1 = {
  name: "subham",
  company: function () {
    console.log("TCS");
  },
};

const emp2 = {
  name: "chirag",
};
//now if i call emp2.company it will return error as it is not there
emp1.company.call(emp2); // here emp2 is passed as this object so on referening to this
///this keyword works differently for  arrow functions , arrow functions dont   provide their own this binding , so the this value will return the  value of the enclosing lexical content

const obj1 = {
  a: 20,
  x: function () {
    let y = () => {
      console.log(this); // it will skip the immediate parent and show it's parent's parent
    };
    y();
  },
};

obj1.x();
