$(document).ready(function() {
    var q1 = {
        question: "Which player has the most career points?",
        answer: "Kareem Abdul-Jabar",
        wrong1: "Kobe Bryant",
        wrong2: "Magic Johnson",
        wrong3: "Bill Russel"
    };

    var q2 = {
        question: "Which player has the most career assists?",
        answer: "John Stockton",
        wrong1: "Magic Johnson",
        wrong2: "Steve Nash",
        wrong3: "Jason Kidd"
    };

    var q3 = {
        question: "Which player has the most career rebounds?",
        answer: "Wilt Chamberlain",
        wrong1: "Shaquille O'Neal",
        wrong2: "Kareem Abdul-Jabar",
        wrong3: "Bill Russel"
    };

    var q4 = {
        question: "Which player has the most career steals?",
        answer: "John Stockton",
        wrong1: "Jason Kidd",
        wrong2: "Michael Jordan",
        wrong3: "Gary Payton"
    };

    var q5 = {
        question: "Which player has the most career blocks?",
        answer: "Hakeem Olajuwon",
        wrong1: "Dikembe Mutombo",
        wrong2: "Marcus Camby",
        wrong3: "Bill Russel"
    };

    var questions = [q1, q2, q3, q4, q5];
    var page = $("#page");

    //What to show when the page loads
    function startPage(){
        page.empty();
        var startButton = $("<button>");
        startButton.text("Start Quiz");
        page.append(startButton);
    }

    //Display given question along with a countdown timer
    function questionPage(thequestion){
        page.empty();
        var timedisplay = $("<p>");
        var questiondisplay = $("<p>");
        var option1 = $("<p>");
        var option2 = $("<p>");
        var option3 = $("<p>");
        var option4 = $("<p>");

        var wrongs = [option1, option3, option4];

        var correctanswer = option2;

        var timeleft = 30;

        timedisplay.text(timeleft);
        questiondisplay.text(thequestion.question);
        option1.text(thequestion.wrong2);
        option2.text(thequestion.answer);
        option3.text(thequestion.wrong1);
        option4.text(thequestion.wrong3);

        wrongs.forEach(function(i){
            i.attr("id", i);
            i.addClass("option");
            i.on("click", function(){
                answerPage(false, thequestion);
            });
        });

        correctanswer.attr("id", correctanswer);
        correctanswer.on("click", function(){
            answerPage(true, thequestion);
        });      

        page.append(timedisplay);
        page.append(questiondisplay);
        page.append(option1);
        page.append(option2);
        page.append(option3);
        page.append(option4);
        
    }

    //Display after question is answered
    //Reads whether answer was correct or not
    //Shows page with feedback and result
    function answerPage(correct, thequestion){
        page.empty();
        var feedback = $("<p>");
        var correctAnswerDisplay = $("<p>");

        if (!correct){
            feedback.text("Wrong!");
        }

        else{
            feedback.text("Correct!");
        }

        correctAnswerDisplay.text("The correct answer was " + thequestion.answer);
        page.append(feedback);
        page.append(correctAnswerDisplay);
    }

    //Display after all questions are answered
    //Shows final results of quiz
    function resultPage(){
        page.empty();

    }

    //startPage();
    questionPage(q1);
    //answerPage(false, q2);
    //resultPage();
}); 
