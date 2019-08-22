var budgetController = (function () {
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };

    function idNumber() {
        var id = 0;

        return function() {
            id++;
            return id;
        }
    }

    var getId = idNumber();

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            ID = getId();
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            } else {
                newItem = new Expense(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function() {
            console.log('data: ', data);
        }
    }
})();

var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    };
    return {
        getInput: function () {
            var type = document.querySelector(DOMStrings.inputType).value;
            var description = document.querySelector(DOMStrings.inputDescription).value;
            var value = document.querySelector(DOMStrings.inputValue).value;
            return {
                type,
                description,
                value
            }
        },
        getDOMString: function () {
            return DOMStrings;
        }
    }
})();

var controller = (function (budgetCtrl, UICtrl) {
    var setupEventlistener = function () {
        var DOMStrings = UICtrl.getDOMString();
        document.querySelector(DOMStrings.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }
    var ctrlAddItem = function () {
        var input = UICtrl.getInput();
        console.log('input: ', input);
        budgetCtrl.addItem(input.type, input.description, input.value);
    };

    return {
        init: function() {
            console.log('application started!');
            setupEventlistener();
        }
    }

})(budgetController, UIController);

controller.init();