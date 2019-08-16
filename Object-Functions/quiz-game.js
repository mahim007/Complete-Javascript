(function() {
    function Question(ques, answers, correct) {
        this.ques = ques;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.checkAnswer = function(ans) {
        if (this.correct === ans) {
            this.correctAnsMsg();
        } else {
            this.errorAnsMsg();
        }
    }
    
    Question.prototype.correctAnsMsg = function() {
        console.log('your answer is correct!');
        console.log('your point is: ' + keepScore(true));
        console.log('--------------------------');
    }
    
    Question.prototype.endGameMsg = function() {
        console.log('--------------------------');
        console.log('Gamr Over!');
        console.log('your point is: ' + keepScore(false));
        console.log('--------------------------');
    }
    
    Question.prototype.errorAnsMsg = function() {
        console.log('your answer is not correct!');
        console.log('your point is : ' + keepScore(false));
        console.log('--------------------------');
    }
    
    Question.prototype.showQues = function() {
        console.log('Ques: ', this.ques);
        for(var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ', this.answers[i]);
        }
    }
    
    var q1 = new Question('name of your country?', ['bangladesh', 'india', 'new zealand'], 0);
    var q2 = new Question('what\'s the name of our star?', ['earth', 'sun', 'proxima santurai'], 1);
    var q3 = new Question('which one is faster?', ['bike', 'cycle', 'car'], 2);
    var quiz = [q1, q2, q3];
    
    function getNextQues() {
        return Math.floor(Math.random()*quiz.length);
    }
    
    function score() {
        var point = 0;
        return function(correct) {
            return correct ? ++point : point;
        }
    }
    
    var keepScore = score();
    
    function gameEngine() {
        var ques_id = getNextQues();
        var quizItem = quiz[ques_id];
        quizItem.showQues(quizItem);
    
        var answer = prompt('Please provide your answer');
        if(answer === 'x') {
            quizItem.endGameMsg();
        } else {
            quizItem.checkAnswer(parseInt(answer));
            gameEngine();
        }
    }
    
    gameEngine();
    
})();