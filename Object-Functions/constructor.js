var Persion = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Persion.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
    function test() {
        console.log(this);
    }
    test();
    console.log('this inside calculateAge: ', this);
}
Persion.prototype.lastname = 'william';

var john = new Persion('John', 1995, 'programmer');
var jane = new Persion('Jane', 1996, 'teacher');
var mark = new Persion('Mark', 1997, 'doctor');
console.log(john, jane, mark);
john.calculateAge();

console.log(john.lastname, jane.lastname, mark.lastname);