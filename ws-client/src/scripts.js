$(function () {
    $("body").on('click keypress mouseover', function () {
        ResetThisSession();
    });
});

function ReloadUrl() {
    return '/'
}

var timeInSecondsAfterSessionOut = 1800;
var secondTick = 0;

function ResetThisSession() {
    secondTick = 0;
}

function StartThisSessionTimer() {
    secondTick++;
    var timeLeft = timeInSecondsAfterSessionOut + 1 - secondTick;
    if (timeLeft === 1800 || timeLeft % 60 === 0) {
        $("#spanTimeLeft").html(timeLeft/60 + "m");
    }
    if (timeLeft < 60) {
        $("#spanTimeLeft").html(timeLeft + "s");
    }

    if (secondTick > timeInSecondsAfterSessionOut) {
        clearTimeout(tick);
        window.location = ReloadUrl();
        return;
    }
    tick = setTimeout("StartThisSessionTimer()", 1000);
}
StartThisSessionTimer();

