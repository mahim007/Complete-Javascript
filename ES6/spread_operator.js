const h1 = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
console.log('box nodelist: ', boxes);
const all = [h1, ...boxes];
console.log(all);
all.forEach(item => item.style.color = 'yellow');
// const boxArr = Array.from(all);
// console.log('boxArr: ', boxArr);