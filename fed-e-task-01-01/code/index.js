// 3

var arr = [12, 34, 32, 89, 4];
const min = Math.min(...arr);
console.log('min: ', min);


// 9 
const setPromise = (value) => {
  return Promise.resolve(value);
}

Promise.all([
  setPromise('hello'),
  setPromise('lagou'),
  setPromise('I ❤︎ U'),
]).then((values) => {
  console.log(values.join(' '));
});




