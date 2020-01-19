var budgetController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function (id, description, value) {
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
        },
        budget: 0,
        precentage: -1
    };

    function idNumber() {
        var id = 0;

        return function () {
            id++;
            return id;
        }
    }

    var getId = idNumber();

    var calculateTotals = function(type) {
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });

        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
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
        calculateBudget: function() {
            calculateTotals('inc');
            calculateTotals('exp');
            data.budget = data.totals.inc - data.totals.exp;
            data.precentage = data.totals.inc > 0 ? Math.round((data.totals.exp / data.totals.inc) * 100) : -1;
        },
        getBudget: function() {
            return {
                budget: data.budget,
                precentage: data.precentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        testing: function () {
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
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        precentageLabel: '.budget__expenses--percentage'
    };
    return {
        getInput: function () {
            var type = document.querySelector(DOMStrings.inputType).value;
            var description = document.querySelector(DOMStrings.inputDescription).value;
            var value = parseFloat(document.querySelector(DOMStrings.inputValue).value);
            return {
                type,
                description,
                value
            }
        },
        getDOMString: function () {
            return DOMStrings;
        },
        addListItem: function (obj, type) {
            var html, newHtml, selector;

            if (type === 'inc') {
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
        clearInputFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(element => {
                element.value = '';
            });
            fieldsArr[0].focus();
        },
        displayBudget: function(budget) {
            document.querySelector(DOMStrings.budgetLabel).textContent = budget.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = budget.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = budget.totalExp;
            if(budget.precentage > 0) {
                document.querySelector(DOMStrings.precentageLabel).textContent = budget.precentage + '%';
            } else{
                document.querySelector(DOMStrings.precentageLabel).textContent = '---';
            }
        },
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
    var updateBudget = function() {
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };
    var ctrlAddItem = function () {
        var input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearInputFields();
            updateBudget();
        }
    };

    return {
        init: function () {
            console.log('application started!');
            UICtrl.displayBudget({
                budget: 0,
                precentage: -1,
                totalInc: 0,
                totalExp: 0
            });
            setupEventlistener();
        }
    }

})(budgetController, UIController);

controller.init();