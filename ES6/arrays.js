var boxes = document.querySelectorAll('.box');
Array.from(boxes).forEach(function(item) {
    item.style.backgroundColor = 'dodgerblue';
});

var boxes5 = Array.from(boxes);
for(var i=0; i < boxes5.length ; i++) {
    if(boxes5[i].className === 'box blue') {
        continue;
    }

    boxes5[i].textContent = 'I changed to blue!';
}