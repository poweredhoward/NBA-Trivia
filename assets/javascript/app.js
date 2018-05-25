$(document).ready(function() {
    //Set up questions
    var q1 = {
        question: "Which player has the most career points?",
        answer: "Kareem Abdul-Jabbar",
        wrongs:[ "Kobe Bryant",
         "Magic Johnson",
         "Bill Russel"],
         pic: "assets/images/Kareem-Abdul-Jabbar.jpg"
    };

    var q2 = {
        question: "Which player has the most career assists?",
        answer: "John Stockton",
        wrongs:[ "Magic Johnson",
         "Steve Nash",
         "Jason Kidd"],
         pic: "assets/images/john-stockton.jpg"
    };

    var q3 = {
        question: "Which player has the most career rebounds?",
        answer: "Wilt Chamberlain",
        wrongs: ["Shaquille O'Neal",
        "Kareem Abdul-Jabbar",
        "Bill Russel"],
        pic: "assets/images/wilt-chamberlain.jpg"
    };

    var q4 = {
        question: "Which player has the most career steals?",
        answer: "John Stockton",
        wrongs: ["Jason Kidd",
         "Michael Jordan",
         "Gary Payton"],
         pic: "assets/images/john-stockton.jpg"
    };

    var q5 = {
        question: "Which player has the most career blocks?",
        answer: "Hakeem Olajuwon",
        wrongs: ["Dikembe Mutombo",
        "Marcus Camby",
        "Bill Russel"],
        pic: "assets/images/hakeem-olajuwon.jpg"
    };

    var q6 = {
        question: "Who was the youngest player to get a triple double?",
        answer: "Markelle Fultz",
        wrongs: ["Lebron James",
                "Lonzo Ball",
                "Magic Johnson"],
        pic: "assets/images/markelle-fultz.jpg"
    };

    var q7 = {
        question: "Who has the highest career free throw percentage?",
        answer: "Steve Nash",
        wrongs: [
            "Steve Kerr",
            "Ray Allen",
            "Steph Curry"
        ],
        pic: "assets/images/steve-nash.jpg"
    };

    var q8 = {
        question: "Who has the best single season 3-point field goal percentage?",
        answer: "Kyle Korver",
        wrongs: [
            "Kobe Bryant",
            "Steph Curry",
            "Ray Allen"
        ],
        pic: "assets/images/kyle-korver.jpg"
    };

    var questions = [q1, q2, q3, q4, q5, q6, q7, q8];
    var page = $("#page");
    var timer;
    var currentQuestion = 0;
    var numCorrect = 0;
    var numWrong = 0;
    var numTimeLimit = 0;


    var startButton = $("<button>");
    startButton.attr("id", "startButton");

    //What to show when the page loads
    function startPage(){
        startButton.text("Start Quiz");
        startButton.on("click", function(){
            questionPage(questions[currentQuestion]);
        })
        page.append(startButton);
    }

    //Display given question along with a countdown timer
    function questionPage(thequestion){

        //Whatever timer has, get rid of it and replace with countdown timer
        clearTimeout(timer);
        timer = setInterval(updateTime, 1000);
        function updateTime(){
            timedisplay.text(--timeleft);
            if(timeleft === 0){
                answerPage(false, thequestion, false);
            }
        }

        page.empty();
        var timedisplay = $("<span>");
        var questiondisplay = $("<p>");
        var option1 = $("<button>");
        var option2 = $("<button>");
        var option3 = $("<button>");
        var option4 = $("<button>");

        //Ensure that answers are put in random postions on the page
        var options = [option1, option2, option3, option4];
        options.forEach( function(o){
            o.addClass("option");
        })
        var wrongs = [];

        var correctanswer_index = Math.floor(Math.random() * 4);
        options[correctanswer_index].text(thequestion.answer);
        correctanswer = options[correctanswer_index];
        options.splice(correctanswer_index, 1);
        for(var i=0 ; i<options.length ; i++){
            options[i].text(thequestion.wrongs[i]);
            wrongs.push(options[i]);
        }


        var timeleft = 10;

        timedisplay.text(timeleft);
        questiondisplay.text(thequestion.question);

        //Give each wrong answer a click event
        wrongs.forEach(function(i){
            i.attr("id", i);
            i.addClass("option");
            i.on("click", function(){
                answerPage(false, thequestion, true);
            });
        });

        //Correct answer gets a click event
        correctanswer.attr("id", correctanswer);
        correctanswer.on("click", function(){
            answerPage(true, thequestion, true);
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
    function answerPage(correct, thequestion, answered){

        //Show this page for 3 seconds
        function runQuestionPage(){
            questionPage(questions[++currentQuestion]);
        }

        clearInterval(timer);

        timer = setTimeout(runQuestionPage, 3500);

        page.empty();
        var feedback = $("<p>");
        var correctAnswerDisplay = $("<p>");

        //Track answer results
        if (!correct && !answered){
            feedback.text("Out of time!");
            numTimeLimit++;
        }

        else if(!correct && answered){
            feedback.text("Wrong!");
            numWrong++;
        }

        else{
            feedback.text("Correct!");
            numCorrect++;
        }

        correctAnswerDisplay.text("The correct answer was " + thequestion.answer);
        page.append(feedback);
        page.append(correctAnswerDisplay);
        page.append($("<img>").attr("src", thequestion.pic));

        //When all questions are finished, show final results page
        console.log("Current question: " + currentQuestion);
        if(currentQuestion === questions.length-1){
            clearTimeout(timer);
            setTimeout(function(){
                resultPage();
            }, 3300);
        }
        
    }

    

    //Display after all questions are answered
    //Shows final results of quiz
    function resultPage(){
        page.empty();
        page.append($("<p>").text("Number Correct: " + numCorrect));
        page.append($("<p>").text("Number Wrong: " + numWrong));
        page.append($("<p>").text("Number Unanswered: " + numTimeLimit));

        currentQuestion = 0;
        numWrong = 0;
        numCorrect = 0;
        numTimeLimit = 0;

        setTimeout(function(){
            startPage();
        }, 3300);
        
    }

    startPage();


}); 
