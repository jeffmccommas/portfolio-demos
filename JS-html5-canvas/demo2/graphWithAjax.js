$(document).ready(function() {

    $("body").append("<h1>Population Distribution by Age</h1>");
    $("body").append("<div class=\"container\"></div>");
    $("<div>2000</div>").appendTo("div.container").addClass("year").css({
        position: "relative",
        top: 10,
        left: 10
    });

    $("<div></div>").appendTo("div.container").addClass("dataContainer").css({
        position: "absolute",
        top: 40,
        left: 40,
        width: $("div.container").width() - 80,
        height: $("div.container").height() - 80
    });

    // Added Code for Legend
    function addLegend() {
        $('<div>x axis: age range <br>y axis: population</div>').appendTo('div.container').addClass('legend').css({
            position: 'absolute',
            top: 20,
            left: 533

        });  console.log($("div.container").width() / 3);
    }

    addLegend();
    $.ajaxSetup({ cache: false });
    $.getJSON("graph.json")
        .success(function(graphData) {
            console.log("Data loaded successfully");
            data = graphData;
            addAxes();
            addData();
        })
        .error(function() {
            alert("Couldn't load graph data");
        })
        .complete(function(xhr, status) {
            // run after success or error
            console.log("Status: " + status);
        });

    function addAxes() {
        var numPoints = data.length / 2;
        var ptWidth = $("div.dataContainer").width() / numPoints / 2;
        var dataContainerLeft = $("div.dataContainer").position().left;
        for (var i = 0; i < data.length; i += 2) {
            var dataPt = data[i];
            var left = dataContainerLeft + (ptWidth * i);
            $("<span>" + dataPt[0] + "</span>").appendTo("div.container").addClass("X").css({
                position: "absolute",
                bottom: 20,
                left: left + $("span.X").width()
            });
        }
        var max = findMax();
        var magMax = findMag(max);
        var ptHeight = $("div.dataContainer").height() / (magMax+1);
        var dataContainerTop = $("div.dataContainer").position().top;
        var left = $("div.dataContainer").width() + 50;
        for (var i = 0; i <= magMax; i++) {
            var top = dataContainerTop + (ptHeight * i);
            $("<span>" + (magMax-i) + "M</span>").appendTo("div.container").addClass("Y").css({
                position: "absolute",
                top: top + $("span.Y").height(),
                left: left
            });
        }
    }

    function addData() {
        var numPoints = data.length / 2;
        var ptWidth = $("div.dataContainer").width() / numPoints / 2;
        var max = findMax();
        var dataContainerLeft = $("div.dataContainer").position().left - 40;
        for (var i = 0; i < data.length; i++) {
            var dataPt = data[i];
            var sexClass;
            var pos;
            if (dataPt[1] == 1) {
                sexClass = "M";
                pos = i;
            } else {
                sexClass = "F";
                pos = i-1;
            }
            var left = dataContainerLeft + (ptWidth * pos);
            var barHeight = (dataPt[2] * $("div.dataContainer").height()) / max;
            $("<div></div>").appendTo("div.dataContainer").addClass("dataPoint").addClass(sexClass).css({
                position: "absolute",
                width: ptWidth,
                height: barHeight,
                bottom: 0,
                left: left
            });
        }
    }

    function findMax() {
        var max = 0;
        for (var i = 0; i < data.length; i++) {
            var dataPt = data[i];
            if (dataPt[2] > max) {
                max = dataPt[2];
            }
        }
        return max;
    }

    function findMag(num) {
        while (num > 1) {
            num = num / 10;
        }
        num = num * 100;
        num = Math.floor(num);
        return num;
    }

});