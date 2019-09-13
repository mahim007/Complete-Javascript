
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', function() {
            var str = `this is box number ${this.position} and it's color is ${this.color}.`;
            alert(str);
        });
    }
}

box5.clickMe();

function Person(name) {
    this.name = name;
}

Person.prototype.myFriends = function() {
    var arr = friends.map((item, index) => {
        return this.name + ' is friend with ' + item;
    });
    console.log(arr);
}

var friends = ['mahim', 'nitol', 'ornob'];
var p = new Person('Jon');
p.myFriends();