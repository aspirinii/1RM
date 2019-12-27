function caculator(weight, rep, workout) {
    if(rep===1){
        var $result = $("." + workout + "_out");
        $result.html(workout.toUpperCase() + " 1RM : " + weight);
        return weight;
    }else{
        var ave;
        var re1 = weight / (1.0278 - (0.0278 * rep));
        var re2 = weight * (1 + (0.033 * (rep - 1)));
        var re3 = weight * (1 + (0.033 * (rep - 1)));
        var re4 = (100 * weight) / (101.3 - (2.67123 *
            rep));
        var ave = Math.round((re1 + re2 + re3 + re4) /
            4);

        var $result = $("." + workout + "_out");
        $result.html(workout.toUpperCase() + " 1RM : " + ave);
        return ave;
    }
}

function level(oneRm, workout) {
    var benchLevelM = {
        super : 2.45, // raw 신기록
        elite: 1.9,
        advanced: 1.5,
        intermediate: 1.2,
        novice: 0.9,
        beginner: 0.6,
        starter: 0,
    };
    var benchLevelF = {
        super: 1.9,
        elite: 1.4,
        advanced: 1.0,
        intermediate: 0.8,
        novice: 0.45,
        beginner: 0.2,
        starter: 0,
    };
    var squatLevelM = {
        super:3.4,
        elite: 2.6,
        advanced: 2.0,
        intermediate: 1.6,
        novice: 1.2,
        beginner: 0.9,
        starter: 0,
    };
    var squatLevelF = {
        super: 2.6,
        elite: 2.0,
        advanced: 1.6,
        intermediate: 1.1,
        novice: 0.7,
        beginner: 0.5,
        starter: 0,
    };
    var deadliftLevelM = {
        super: 3.8,
        elite: 3.0,
        advanced: 2.4,
        intermediate: 1.9,
        novice: 1.4,
        beginner: 1.0,
        starter: 0,
    };
    var deadliftLevelF = {
        super: 3.0,
        elite: 2.3,
        advanced: 1.8,
        intermediate: 1.4,
        novice: 0.9,
        beginner: 0.5,
        starter: 0,
    };
    var shoulderLevelM = {
        super: 2.0,
        elite: 1.35,
        advanced: 1.05,
        intermediate: 0.8,
        novice: 0.55,
        beginner: 0.4,
        starter: 0,
    };
    var shoulderLevelF = {
        super:1.6,
        elite: 1.0,
        advanced: 0.75,
        intermediate: 0.5,
        novice: 0.35,
        beginner: 0.2,
        starter: 0,
    };
    var levelPercent = {
        super:0,
        elite: 0.05,
        advanced: 0.2,
        intermediate: 0.5,
        novice: 0.8,
        beginner: 0.95,
        starter: 1
    };
    var bodyWeight = $('#bodyWeight').val();
    // var sex = $("#selSex").val();
    console.log($('#selSex').prop('checked'));
    if($('#selSex').prop('checked')){
        var sex = 'M';
    }else{
        var sex = 'F';
    }
  
    var ratio = oneRm / bodyWeight;
    var objectArray = Object.entries(eval(workout + "Level" + sex))

    var currentLevelratio;
    var currentLevelpercent;
    var nextLevelratio;
    var nextLevelpercent;

    for (const [key, value] of Object.entries(eval(workout + "Level" + sex))) {
        if (value <= ratio) {
            $("." + workout + "_lev").html("Level : " + key.toUpperCase() + ".<br>");
            for (const [level, percent] of Object.entries(levelPercent)) {
                if (level === key) {
                    currentLevelpercent = percent;
                    currentLevelratio = value;
                }
            }
            break;
        }
    }

    objectArray.reverse();
    for (const [key, value] of objectArray) {
        if (value > ratio) {
            $("." + workout + "_lev").append("Next : " + key.toUpperCase() + ". <br> [Next Weight:" + (bodyWeight * value).toFixed(1) + "Kg]");
            for (const [level, percent] of Object.entries(levelPercent)) {
                if (level === key) {
                    nextLevelpercent = percent;
                    nextLevelratio = value;
                    var cal = ((currentLevelpercent - ((ratio-currentLevelratio)/(nextLevelratio-currentLevelratio)*(currentLevelpercent-nextLevelpercent)))*100).toFixed(2);
                    
                    $("." + workout + "_out").append("<br> (Powerlifting Top " + cal + "%) <br> ");
                }
            }
            break;
        }
    }


}

function input(workout) {
    var result;
    var weight;
    var rep;
    var $input1 = $("#" + workout + "_input1");
    weight = Number($input1.val());
    var $input2 = $("#" + workout + "_input2");
    rep = Number($input2.val());
    result = caculator(weight, rep, workout);
    return result;
}


function makingTableData(oneRm, workout) {
    var oneRmW; // Workout 0ne RM -> 90% of 1RM
    oneRmW = oneRm * 0.9;

    var barWeight = Number($("#sel1").val());

    var i;
    for (i = 40; i < 100; i++) {
        var ipercent = Math.round(oneRmW * i * 0.01)
        var $percent = $("." + workout + "_" + i);
        $percent.html("<img src=\"25.png\"> "+ipercent + "Kg");

        var hpercent = (ipercent - barWeight) / 2;
        var $hpercent = $("." + workout + "_" + i + "half");
        $hpercent.html("<img src=\"25half.png\"> "+ hpercent + "Kg");
        

    }
}




function appendText() {

    for (i = 7; i < 23; i++) {
        if (i === 10) {
            var optionList = $("<option value=" + i + " selected=\"true\" id=sel10></option>").text(i);
            $("#sel1").append(optionList); // Append new elements
        } else {
            var optionList = $("<option value=" + i + "></option>").text(i);
            $("#sel1").append(optionList); // Append new elements
        }
    }

}

function catchChange(workout) {
    $("#" + workout + "_input1").change(function () {
        output();
    });
    $("#" + workout + "_input2").change(function () {
        output();
    });
}

var workoutList = ["bench", "squat", "deadlift", "shoulder"];

function output() {
    // var bench_1rm;
    // var squat_1rm;
    // var deadlift_1rm;
    // var shoulder_1rm;
    // bench_1rm = input("bench");
    // squat_1rm = input("squat");
    // deadlift_1rm = input("deadlift");
    // shoulder_1rm = input("shoulder");
    // makingTableData(bench_1rm, "bench");
    // makingTableData(squat_1rm, "squat");
    // makingTableData(deadlift_1rm, "daedlift");
    // makingTableData(shoulder_1rm, "shoulder");
    // level(bench_1rm,"bench");
    // level(squat_1rm, "squat");
    // level(deadlift_1rm,"deadlift");
    // level(shoulder_1rm,"shoulder");
    var workout;
    for (workout of workoutList) {
        makingTableData(input(workout), workout);
        level(input(workout), workout);
    };
}

$(document).ready(function () {

    $("#sel1").change(function () {
        output();
    });

    $("#selSex").change(function() {
        output();
        console.log("changed");
    });
        
    $("#bodyWeight").change(function () {
        output();
    });

    output()
    appendText();
    catchChange("bench");
    catchChange("squat");
    catchChange("deadlift");
    catchChange("shoulder");
//    makingTable("bench");
});




// function onClickToggle(){
//     output();
//     console.log("Toggle");
// }

