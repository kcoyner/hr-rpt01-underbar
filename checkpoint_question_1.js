var x = 30;

function get (x) { 
  console.log('inside get(x): ', x);  // 20
  return x;
}

function set (value) {
  console.log('1: inside set(x): ', x);  // 30
  x = value;
  console.log('2: inside set(x): ', x);  // 10
}


set(10);  // this set the global x = 10 

console.log('after set(10): ', x);   // 10

var result = get(20);   // passes in 20 to inside the function, but it never gets out

console.log('after get(20): ', x);   // still = 10 from previous set(10)

console.log('result: ', result);   // 20 because the get function knows 20 and returns it to result


