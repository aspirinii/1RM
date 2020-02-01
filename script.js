$(document).ready(function () {

    $('#saveBtn1').click(function () {

        for (workout of workoutList) {
            saveData(input(workout), workout);
        }


    });
    $('#saveBtn2').click(function () {
        for (workout of workoutList)
            saveData(input(workout), workout);

    });

    $('#clearBtn').click(function () {
        alert("Are you really want to cleat All data?");
        for (workout of workoutList) {
            for (week = 1; week < 4; week++) {
                localStorage.removeItem(week + '_' + workout + '_weight');
                localStorage.removeItem(week + '_' + workout + '_rep');
            
            }
        }
        location.reload()
    });

    createTable();
    output()
    appendText();
    catchAllChange();
    displayLocalData();
    // $(document).scrollTop($(document).height());
    $("#531pToggle").click(function () {
        //   $("#531PP").show(1000);
        $("#531PP").slideToggle("slow");
    });


});


function calculator(weight, rep, workout) {
    if (rep === 1) {
        var ave = weight;
        var result = $("." + workout + "_out");
        result.html(workout.toUpperCase() + " 1RM : " + weight);
        return ave;
    } else {
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

function calculatorO(weight, rep) {
    if (rep === 1) {
        return weight;
    } else {
        var ave;
        var re1 = weight / (1.0278 - (0.0278 * rep));
        var re2 = weight * (1 + (0.033 * (rep - 1)));
        var re3 = weight * (1 + (0.033 * (rep - 1)));
        var re4 = (100 * weight) / (101.3 - (2.67123 *
            rep));
        var ave = Math.round((re1 + re2 + re3 + re4) /
            4);
        return ave;
    }
}

function level(oneRm, workout) {
    var benchLevelM = {
        super: 2.45, // raw 신기록
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
        super: 3.4,
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
        super: 1.6,
        elite: 1.0,
        advanced: 0.75,
        intermediate: 0.5,
        novice: 0.35,
        beginner: 0.2,
        starter: 0,
    };
    var levelPercent = {
        super: 0,
        elite: 0.05,
        advanced: 0.2,
        intermediate: 0.5,
        novice: 0.8,
        beginner: 0.95,
        starter: 1
    };
    var bodyWeight = $('#bodyWeight').val();
    // var sex = $("#selSex").val();
    //    console.log($('#selSex').prop('checked'));
    if ($('#selSex').prop('checked')) {
        var sex = 'M';
    } else {
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
                    var cal = ((currentLevelpercent - ((ratio - currentLevelratio) / (nextLevelratio - currentLevelratio) * (currentLevelpercent - nextLevelpercent))) * 100).toFixed(2);

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
    var input1 = $("#" + workout + "_input1");
    weight = Number(input1.val());
    var input2 = $("#" + workout + "_input2");
    rep = Number(input2.val());
    // console.log(workout, weight);
    result = calculator(weight, rep, workout);
    return result;
}


function makingTableData(oneRm, workout) {
    var oneRmW; // Workout 0ne RM -> 90% of 1RM first only


    var barWeight = Number($("#sel1").val());

    if ($('#selFirst').prop('checked')) {
        oneRmW = oneRm * 0.9;
    } else {
        oneRmW = oneRm;
    }

    var i;
    for (i = 35; i < 100; i++) {
        var ipercent = Math.round(oneRmW * i * 0.01)
        var percent = $("." + workout + "_" + i);
        percent.html("<img src=\"25.png\"> " + ipercent + "Kg");

        var ihpercent = (ipercent - barWeight) / 2;
        var hpercent = $("." + workout + "_" + i + "half");
        hpercent.html("<img src=\"25half.png\"> " + ihpercent + "Kg");

    }

    for (week = 1; week < 4; week++) {
        var percentTable = [];
        var firstWeek = ["75", "80", "85", 5, 5];
        var secondWeek = ["80", "85", "90", 3, 3];
        var thirdWeek = ["75", "85", "95", 5, 3];

        if (week === 1) {
            percentTable = firstWeek;
        } else if (week === 2) {
            percentTable = secondWeek;
        } else if (week === 3) {
            percentTable = thirdWeek;
        }
        for (i = 0; i < 3; i++) {

            var ratio = Math.round(oneRmW * percentTable[i] * 0.01)
            // console.log('one:'+oneRmW+'__' +percentTable[i]+'__'+ratio);
            // var twWeight = $('#' + week + workout + '_weight'+i);
            // twWeight.html(ratio);
            localStorage.setItem(week + '_' + workout + '_weight', ratio);


        }

    }


}




function appendText() {

    for (i = 7; i < 23; i++) {
        if (i === 10) {
            var optionList = '<option selected>' + i + '</option>';
            $("#sel1").append(optionList); // Append new elements
        } else {
            var optionList = '<option>' + i + '</option>';
            $("#sel1").append(optionList); // Append new elements
        }
    }

}

function appendRep(week, workout) {


    // var cat1 = localStorage.getItem(week + '_' + workout + '_weight');
    var cat2 = localStorage.getItem(week + '_' + workout + '_rep');


    for (i = 1; i <= 12; i++) {

        if (Boolean(cat2)) {
            if (i == Number(cat2)) {
                var optionList = '<option selected>' + i + '</option>';
            } else {
                var optionList = '<option>' + i + '</option>';
            }
        } else {
            if (week === 1) {
                if (i === 5) {
                    var optionList = '<option selected>' + i + '</option>';
                    localStorage.setItem(week + '_' + workout + '_rep', i);
                } else {
                    var optionList = '<option>' + i + '</option>';
                }
            } else if (week === 2) {
                if (i === 3) {
                    var optionList = '<option selected>' + i + '</option>';
                    localStorage.setItem(week + '_' + workout + '_rep', i);
                } else {
                    var optionList = '<option>' + i + '</option>';
                }
            } else {
                if (i === 1) {
                    var optionList = '<option selected>' + i + '</option>';
                    localStorage.setItem(week + '_' + workout + '_rep', i);
                } else {
                    var optionList = '<option>' + i + '</option>';
                }
            }
        }
        $("#" + week + workout).append(optionList); // Append new elements
    }

}


var workoutList = ["bench", "squat", "deadlift", "shoulder"];




function catchAllChange() {
    function catchChange(workout) {
        $("#" + workout + "_input1").change(function () {
            
                saveData(input(workout), workout);
            
        });
        $("#" + workout + "_input2").change(function () {
            saveData(input(workout), workout);
        });
    }
    catchChange("bench");
    catchChange("squat");
    catchChange("deadlift");
    catchChange("shoulder");
    $("#sel1").change(function () {
        for (workout of workoutList) {
            saveData(input(workout), workout);
        }
    }); 
    $("#selSex").change(function () {
        for (workout of workoutList) {
            saveData(input(workout), workout);
        }
    });
    $("#selFirst").change(function () {
        for (workout of workoutList) {
            saveData(input(workout), workout);
        }
    });
    $("#selhalf").change(function () {
        if ($('#selhalf').prop('checked')) {
            $('.half').hide();
        } else {
            $('.half').show();
        }
        for (workout of workoutList) {
            saveData(input(workout), workout);
        }
    });
    $("#bodyWeight").change(function () {
        for (workout of workoutList) {
            saveData(input(workout), workout);
        }
    });
    $(".bar_weight_last").change(function () {
        for (workout of workoutList) {
            saveData(input(workout), workout);
        }
    });
}


function createTable() {
    for (workout of workoutList) {
        colTable(workout);
    }

}

function colTable(workout) {
    var week = [1, 2, 3, 4]
    for (var i = 0 in week) {
        if (week[i] === 4) {
            workoutTitle(week[i], workout);
            warmUp(week[i], workout);
        } else {
            workoutTitle(week[i], workout);
            warmUp(week[i], workout);
            mainLifting(week[i], workout);
            forVolume(week[i], workout);
            appendRep(week[i], workout)
        }
    }
    for (var i of week) {

    }
}

function mainLifting(week, workout) {


    var percentTable = [];
    var firstWeek = ["75", "80", "85", 5, 5];
    var secondWeek = ["80", "85", "90", 3, 3];
    var thirdWeek = ["75", "85", "95", 5, 3];

    if (week === 1) {
        percentTable = firstWeek;
    } else if (week === 2) {
        percentTable = secondWeek;
    } else if (week === 3) {
        percentTable = thirdWeek;
    }

    $('#' + workout + 'Table').append(
        $('<tr>').append(
            $('<th>').attr("colspan", "3").append("Main lifting"),
        ),
        $('<tr>').append(
            $('<td>').append("Set1"),
            $('<td id=' + week + workout + '_weight0 class=' + workout + '_' + percentTable[0] + '>'),
            $('<td>').append(percentTable[3] + "rep"),

        ),
        $('<tr class=half>').append(
            $('<td>').append(""),
            $('<td class=' + workout + '_' + percentTable[0] + 'half>'),
            $('<td>').append(""),

        ),
        $('<tr>').append(
            $('<td>').append("Set2"),
            $('<td id=' + week + workout + '_weight1 class=' + workout + '_' + percentTable[1] + '>'),
            $('<td>').append(percentTable[4] + "rep"),

        ),
        $('<tr class=half>').append(
            $('<td>').append(""),
            $('<td class=' + workout + '_' + percentTable[1] + 'half>'),
            $('<td>').append(""),
        ),
        $('<tr>').append(
            $('<td>').append("Set3"),
            $('<td id=' + week + workout + '_weight2 class=' + workout + '_' + percentTable[2] + '>'),
            $('<td>').append(
                '<select id=' + week + workout + ' class=\"bar_weight_last\"></select>'),

        ),
        $('<tr class=half>').append(
            $('<td>').append(""),
            $('<td class=' + workout + '_' + percentTable[2] + 'half>'),
            $('<td>').append(""),

        ),
    );

}

function workoutTitle(week, workout) {
    var title = ""
    switch (workout) {
        case "bench":
            title = "Week Bench Press"
            break;
        case "squat":
            title = "Week Squat"
            break;
        case "deadlift":
            title = "Week Deadlift"
            break;
        case "shoulder":
            title = "Week Shoulder P"
            break;
        default:
            console.log("문제가있음..")


    }
    $('#' + workout + 'Table').append(
        $('<tr>').append(
            $('<th class=weekName>').attr("colspan", "4").append(week + title)
        )
    );

}

function warmUp(week, workout) {

    var title = ""
    if (week === 4) {
        title = "Deload";
    } else {
        title = "Warm up";
    }
    $('#' + workout + 'Table').append(
        $('<tr>').append(
            $('<th>').attr("colspan", "3").append(title),
        ),
        $('<tr>').append(
            $('<td class=firstColumn>').append("Set1"),
            $('<td class=\'secondColumn ' + workout + '_40\'>'),
            $('<td class=thirdColumn>').append("5rep"),
        ),
        $('<tr class=half>').append(
            $('<td>').append(""),
            $('<td class=' + workout + '_40half>'),
            $('<td>').append(""),
        ),
        $('<tr>').append(
            $('<td>').append("Set2"),
            $('<td class=' + workout + '_50>'),
            $('<td>').append("5rep"),
        ),
        $('<tr class=half>').append(
            $('<td>').append(""),
            $('<td class=' + workout + '_50half>'),
            $('<td>').append(""),
        ),
        $('<tr>').append(
            $('<td>').append("Set3"),
            $('<td class=' + workout + '_60>'),
            $('<td>').append("5rep"),
        ),
        $('<tr class=half>').append(
            $('<td>').append(""),
            $('<td class=' + workout + '_60half>'),
            $('<td>').append(""),
        )
    );

}

function forVolume(week, workout) {

    $('#' + workout + 'Table').append(
        $('<tr>').append(
            $('<th>').attr('colspan', '3').append('For Volume')
        ),
        $('<tr>').append(
            $('<td>').append('Set1-3'),
            $('<td class=' + workout + '_80>'),
            $('<td>').append('8rep'),

        ),
        $('<tr class=half>').append(
            $('<td>').append(""),
            $('<td class=' + workout + '_80half>'),
            $('<td>').append(""),
        )

    );

}

function saveTime() {
    //$("#benchDate").html(getTimeStamp());
    localStorage.setItem("savedDate", getTimeStamp())

    function getTimeStamp() {
        var d = new Date();
        var s =
            leadingZeros(d.getFullYear(), 4) + '-' +
            leadingZeros(d.getMonth() + 1, 2) + '-' +
            leadingZeros(d.getDate(), 2) + ' ' +

            leadingZeros(d.getHours(), 2) + ':' +
            leadingZeros(d.getMinutes(), 2) + ':' +
            leadingZeros(d.getSeconds(), 2);

        return s;
    }

    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }
}

function saveData(oneRm, workout) {
    saveTime();
    console.log("진입")
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(workout + "OneRmLatest", oneRm);
        localStorage.setItem('bodyWeight', $('#bodyWeight').val())
        var val1 = $('#' + workout + '_input1').val();
        var val2 = $('#' + workout + '_input2').val();
        localStorage.setItem(workout + '_input1', val1)
        localStorage.setItem(workout + '_input2', val2)

        console.log("save", localStorage.getItem(workout + "_input1"), localStorage.getItem(workout + "_input2"))


        for (week = 1; week < 4; week++) {
            var twrep = Number($('#' + week + workout).val());
            localStorage.setItem(week + '_' + workout + '_rep', twrep);
        }

    } else {
        $('#' + workout + 'Date').html("Sorry, your browser does not support web storage... Throw your browser to trash bin");

    }
    displayLocalData()

}

function displayLocalData() {
    $('#savedDate').html("Lastest Saved Time : " + localStorage.savedDate);

    for (workout of workoutList) {
        var str = "localStorage." + workout + "OneRmLatest"
        $('#' + workout + 'Data').html(
            $('<div>').append('Previous 1RM : ' + eval(str))
        );
        $('#bodyWeight').val(localStorage.getItem('bodyWeight'));

        var weight = localStorage.getItem(workout + '_input1');
        var rep = localStorage.getItem(workout + '_input2')

        $('#' + workout + '_input1').val(weight);
        $('#' + workout + '_input2').val(rep);


        for (week = 1; week < 4; week++) {

            var cat1 = localStorage.getItem(week + '_' + workout + '_weight');
            var cat2 = localStorage.getItem(week + '_' + workout + '_rep');
            // var j=10
            // j++
            // console.log(j,workout, cat1, cat2)
            var cat3 = calculatorO(cat1, cat2)
            $('#' + workout + 'Result' + week).html(week + 'Week 1RM : ' + cat1 + ' * ' + cat2 + ' = ' + cat3);
        }

        output();

    }

}

function output() {
    var workout;
    for (workout of workoutList) {
        makingTableData(input(workout), workout);
        level(input(workout), workout);
    };
}