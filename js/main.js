var ret = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
var arr = ret;
ret = shuffle(arr);
var ready = false;

var enter = new Audio();
enter.src = "./sound/enter.mp3";
enter.currentTime = 0.3;
enter.playbackRate = 4;

var clock = new Audio();
clock.src = "./sound/clock.mp3";
clock.loop = true;

var score = new Audio();
score.src = "./sound/score.mp3";
score.playbackRate = 0.8;

var reach;
var result;
var myscore;

var timer;
function initTimer() {
    var tick = 0;
    var sec = 0;
    timer = setInterval(function () {
        if (sec == 10) {
            //clearInterval(timer)
        }
        if (tick / 10 < 10) {
            $("#timer_mill").text("0" + tick / 10);
        } else {
            $("#timer_mill").text(tick / 10);
        }


        tick += 10;
        if (tick == 1000) {
            sec++;

            if (sec < 10) {
                $("#timer_sec").text("0" + sec);
            } else {
                $("#timer_sec").text(sec);
            }

            tick = 0;

        }

        // if (tick == 3000) {
        //     clearInterval(timer)
        // }

    }, 10)
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function start() {
    enter.play();

    setTimeout(function () {
        $("#start").addClass("d-none");
        $("#stop").removeClass("d-none");
        initTimer();
        clock.play();
    }, 75)

    setTimeout(function () {
        hideTimer();
    }, 2000)
}

$("#again").click(function () {
    enter.play();
    setTimeout(function () {
        $("#again").addClass("d-none");
        $("#start").addClass("cta--disabled").removeClass("d-none");

        $("#timer_sec").text("00");
        $("#timer_mill").text("00");
        $("#myscore").removeClass("myscore--show");
        setTimeout(function(){
            $("#myscore_message").removeClass("myscore_message--ex myscore_message--vg myscore_message--g");
        },200)
        

         reach = 0;
         result = 0;
         myscore = 0;
         timer = 0;
         ready = false;
         go();
    }, 75)

})

$("#start").click(function () {
    if (ready) {
        start();
        $("#start").removeClass("cta--disabled")
    }
});

$("#stop").click(function () {
    enter.play();
    clearInterval(timer);
    clear();
    showTimer();
    setTimeout(function () {
        clock.pause();
        score.play();
    }, 500)

    result = parseInt($("#timer_sec").text()) + (parseInt($("#timer_mill").text()) / 100);

    myscore = (reach - result).toFixed(2);

    var message = "";
    var message_color = "";

    if (parseFloat(myscore) <= 0.5 && parseFloat(myscore) >= -0.5) {
        message = "¡EXCELLENT!";
        message_color = "myscore_message--ex";
    } else {
        if (parseFloat(myscore) <= 1 && parseFloat(myscore) >= -1) {
            message = "¡VERY GOOD!";
            message_color = "myscore_message--vg";
        } else {
            message = "¡NOT BAD!";
            message_color = "myscore_message--g";
        }
    }
    $("#myscore_message").text(message).addClass(message_color);
    $("#myscore_score").text(myscore);
    setTimeout(function () {
        $("#myscore").addClass("myscore--show");
    }, 500);

    $("#again").removeClass("d-none");
    $("#stop").addClass("d-none")



});



$(".cta--enable").mousedown(function () {
    $(this).addClass("cta--clicked");
});
$(".cta--enable").mouseup(function () {
    $(this).removeClass("cta--clicked");
});
$(".cta--enable").mouseleave(function () {
    $(this).removeClass("cta--clicked");
});

$(".cta--enable").bind("touchstart", function () {
    $(this).addClass("cta--clicked");
})
$(".cta--enable").bind("touchend", function () {
    $(this).removeClass("cta--clicked");
})


function hideTimer() {

    $("#timer_ret .ret").each(function (index) {

        var i = ret[index];
        var pz = $("#timer_ret .ret")[i];
        var t = index * 100;
        setTimeout(function () {
            $(pz).addClass("ret--show");
        }, t)

    });
    setTimeout(function () {
        clock.pause();
        $("#stop").removeClass("cta--disabled");
    }, 2600);
}

function showTimer() {
    $("#timer_ret .ret").each(function (index) {

        var i = ret[index];
        var pz = $("#timer_ret .ret")[i];
        var t = index * 30;
        setTimeout(function () {
            $(pz).removeClass("ret--show");
        }, t)

    })
}

function go() {

    var tick = 0;
    var int = setInterval(function () {
        var time = random(6, 15);

        $("#time").text(time.toString() + "'00");
        tick++;
        if (tick == 300) {
            reach = time;

            clearInterval(int);
            $("#instructions").addClass("show")
            $(".time_arrow").addClass("show")
            $("#start").removeClass("cta--disabled").addClass("cta--enable");

            ready = true;
        }
    }, 5)


}

function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function clear(){
    (function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
}

go();