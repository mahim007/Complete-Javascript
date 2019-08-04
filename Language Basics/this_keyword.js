var john = {
    name: 'john',
    birthYear: 1995,
    calculateAge: function(year) {
        console.log(year - this.birthYear);
        console.log(this);
    }
};

john.calculateAge(2019);

var mike = {
    name: 'mike',
    birthYear: 1996
};

mike.calculateAge = john.calculateAge;
mike.calculateAge(2019);