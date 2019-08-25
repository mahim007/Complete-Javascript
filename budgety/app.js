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
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
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
        },
        addListItem: function(obj, type) { console.log('here: ', obj, " type: ", type);
            var html, newHtml, selector;

            if(type === 'inc') {
                selector = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%', obj.description);
                newHtml = newHtml.replace('%value%', obj.value);
            } else {
                selector = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description" >%description%</div ><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div >';
                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%', obj.description);
                newHtml = newHtml.replace('%value%', obj.value);
            }

            document.querySelector(selector).insertAdjacentHTML('beforeend', newHtml);
        },
        clearInputFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(element => {
                element.value = '';
            });
            fieldsArr[0].focus();
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
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearInputFields();
    };

    return {
        init: function() {
            console.log('application started!');
            setupEventlistener();
        }
    }

})(budgetController, UIController);

controller.init();