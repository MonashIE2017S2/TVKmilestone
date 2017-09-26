/* Created by yang and roshan
*  Date : 06-Sep-2017
*  Logic of the questionnaire is handled
* 
*/


Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
// Initialize Firebase database 
var config = {
    apiKey: "AIzaSyBuZ3aZJOwa4Xwa3iJuLZe6WH0umz-brlc",
    authDomain: "thesecondhomedb.firebaseapp.com",
    databaseURL: "https://thesecondhomedb.firebaseio.com",
    projectId: "thesecondhomedb",
    storageBucket: "thesecondhomedb.appspot.com",
    messagingSenderId: "1047254460760"
};
firebase.initializeApp(config);

var keys=[];

var database = firebase.database();


database.ref().on("value", function (snap) {
//pull entries from database
    var obj = snap.val();
    for (x in obj) {
        keys.push(x);
    }

    window.survey = new Survey.Model({
        questions: [
            {
                type: "radiogroup", name: "StudyEngagement1", title: "What is the attendance status of this kid?", isRequired: true,
                colCount: 6, choices: ["Excellent(95%)", "Good(85%)", "Fair(75%)", "Not Good(60% or below)"]
            },
            {
                type: "radiogroup", name: "StudyEngagement2", title: "What is the grade status of this kid?", isRequired: true,
                colCount: 6, choices: ["Excellent(TOP 15%)", "Good(TOP 30%)", "Fair(TOP 60%)", "Not Good(Below 60%)"]
            },
            {
                type: "radiogroup", name: "Personality1", title: "Does the kid have a record of significant bad behavior?", isRequired: true,
                colCount: 6, choices: ["Many records", "Just one", "Never"]
            },
            {
                type: "dropdown", name: "Personality2", title: "How many friends do the child have?", isRequired: true, colCount: 0,
                choices: ["Few Friend", "One or Two Friends", "Many Friends"]
            },
            {
                type: "radiogroup", name: "SocialFactor1", title: "What is the gender of this kid?", isRequired: true,
                colCount: 6, choices: ["Male","Female"]
            },
            {
                type: "dropdown", name: "SocialFactor2", title: "Please select the suburb where the kid live in.", isRequired: true, colCount: 0,
                choices: keys
            },
            {
                type: "radiogroup", name: "SchoolFactor1", title: "Please select the area where your school is located.", isRequired: true, colCount: 6,
                choices: ["North-Eastern Victoria", "North-Western Victoria","South-Eastern Victoria","South-Western Victoria"]
            },
            {
                type: "radiogroup", name: "SchoolFactor2", title: "What type of school are you work in?", isRequired: true,
                colCount: 6, choices: ["Government", "Non-Government","Catholic","Indepentent"]
            },
            {
                type: "radiogroup", name: "FamilyFactor1", title: "Have you ever found any sign of domestic violence in the body of this kid?", isRequired: true, colCount: 6,
                choices: ["Yes", "No"]
            },
            {
                type: "radiogroup", name: "FamilyFactor2", title: "What is the family status of this kid?", isRequired: true, colCount: 6,
                choices: ["Single-Parent(With Mother)", "Single-Parent(With Father)", "Blend Family(Step mother or step father)","Two-parent Family", "Foster Family"]
            }
        ]
    });

/*    survey.onValueChanged.add(function(sender, options) {
        var erApi = "https://localhost:44306/api/IdentifyQuestions";
        $.getJSON(erApi,
            function(result) {
                $.each(result, function (i, field) { document.querySelector('#surveyEvidence').innerHTML = i + " " + field; });
            });
    });

    survey.onComplete.add(function (result) {
        document.querySelector('#surveyEvidence').innerHTML = "result: " + JSON.stringify(result.data);
    });*/

    survey.onValueChanged.add(function (sender, options) {
        var erApi = "https://localhost:44306/api/IdentifyQuestions/";

        switch (options.value) {
            //question1
            case "Excellent(95%)":
                erApi += "1";
                break;
            case "Good(85%)":
                erApi += "1";
                break;
            case "Fair(75%)":
                erApi += "1";
                break;
            case "Not Good(60% or below)":
                erApi += "1";
                break;
            //question2
            case "Excellent(TOP 15%)":
                erApi += "2";
                break;
            case "Good(TOP 30%)":
                erApi += "2";
                break;
            case "Fair(TOP 60%)":
                erApi += "2";
                break;
            case "Not Good(Below 60%)":
                erApi += "2";
                break;
            //question3
            case "Many records":
                erApi += "3";
                break;
            case "Just one":
                erApi += "3";
                break;
            case "Never":
                erApi += "3";
                break;
            //question4
            case "Few Friend":
                erApi += "4";
                break;
            case "One or Two Friends":
                erApi += "4";
                break;
            case "Many Friends":
                erApi += "4";
                break;
            //question5
            case "Male":
                erApi += "5";
                break;
            case "Female":
                erApi += "5";
                break;
            //question7
            case "North-Eastern Victoria":
                erApi += "7";
                break;
            case "North-Western Victoria":
                erApi += "7";
                break;
            case "South-Eastern Victoria":
                erApi += "7";
                break;
            case "South-Western Victoria":
                erApi += "7";
                break;
            //question8
            case "Government":
                erApi += "8";
                break;
            case "Non-Government":
                erApi += "8";
                break;
            case "Catholic":
                erApi += "8";
                break;
            case "Indepentent":
                erApi += "8";
                break;
            //question9
            case "Yes":
                erApi += "9";
                break;
            case "No":
                erApi += "9";
                break;
            //question 10
            case "Single-Parent(With Mother)":
                erApi += "10";
                break;
            case "Single-Parent(With Father)":
                erApi += "10";
                break;
            case "Blend Family(Step mother or step father)":
                erApi += "10";
                break;
            case "Two-parent Family":
                erApi += "10";
                break;
            case "Foster Family":
                erApi += "10";
                break;
        default:
            erApi += "6";
        }

        $.getJSON(erApi, {
                format: "json"
            })
            .done(function (data) {
                document.querySelector('#surveyEvidence').innerHTML = data.evidence;
                document.querySelector('#surveyReference').innerHTML = data.reference;
            });
    });

/*    survey.onComplete.add(function (result) {
        document.querySelector('#surveyEvidence').innerHTML = "result: " + JSON.stringify(result.data);
    });*/

    survey.onComplete.add(function (result) {

        var $resultPanelPage = $("#ResultPanel");
        var $surveyPage = $("#SurveyPanel");
        var $evidencePage = $("#EvidencePanel");
        var $referencePage = $("#ReferencePanel");
/*
        var $surveyPage = $("#SurveyPanel");
*/
/*
        $resultPage.show();
*/
        $resultPanelPage.show();
        $surveyPage.hide();
        $evidencePage.hide();
        $referencePage.hide();

        var ctx = document.getElementById("radarChartResult2").getContext('2d');
        Chart.defaults.global.defaultFontFamily = "Lato";
        Chart.defaults.global.defaultFontSize = 12;
        var marksData = {
            labels: [
                "Study Engagement","Personality","School-related factor","Family-related factor","Socio-cultural"
            ],
            datasets: [
                {
                    label: "The Kid you identified",
                    backgroundColor: "rgba(220,0,0,0.4)",
                    data: [55, 70, 75, 75, 70]
                }
            ]
        };
        var optionsRadar = {
            scale: {
                ticks: {
                    beginAtZero: true
                },
                pointLabels: {
                    fontSize: 16
                }
            }
        };
        var radarChart = new Chart(ctx,
            {
                type: 'radar',
                data: marksData,
                options: optionsRadar
            });
/*
        $surveyPage.setAttribute("style", "position: relative; left:100px; background: rgba(255, 250, 250, 1); width:500px; height:500px");
*/

        /*var emotion = result.data['Emotion'];
        var socialEvents = result.data['SocialEvents'];
        var sports = result.data['Sports'];
        var friends = result.data['Friends'];
        var age = result.data['Age'];
        var gender = result.data['kidGender'];
        var suburb = result.data['Suburb'];


        var $alert1 = $("#alert1");
        var $alert2 = $("#alert2");
        var $alertSad = $("#alert-sad");
        var $alertHappy = $("#alert-happy");
        var $alertOK = $("#ok");

        //Find low income suburb
        var nillIncomePercent = obj[suburb]["TotalCount"] / obj[suburb]["nillIncomeCount"];
        


        //Calculate vulnerability of child
        if ((parseInt(emotion) <= 2 && (friends === "Few Friend" || friends === "Not Sure" || friends === "One or Two Friends") )|| nillIncomePercent < 20) {

            $alertSad.show();

            $alert1.stop().fadeIn(300);
            //$alertSad.css("visibility","hidden");
        }
        else {
            $alertHappy.show();
            $alert2.stop().fadeIn(300);
            //$alertHappy.css("visibility","hidden");

        }

        $(".ok").click(function () {
            $("#alertSad").hide();
            $("$alertHappy").hide();

        });*/

    });

    $("#surveyElement").Survey({ model: survey });
});

