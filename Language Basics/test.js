var a = 'a';
first();

function first() {
    var b = 'b';
    second();

    function second() {
        var c = 'c';
        third();
    }
}

function third() {
    var d = 'd';
    console.log(a+b+c+d);
}