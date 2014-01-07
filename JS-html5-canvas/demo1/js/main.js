/*
 Name: Jeffrey McCommas
 Date: 12/12/2013
 */

console.log("start canvas");

// Begin self executing function
(function(){

    // Create the canvas element
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = 400;
    canvas.height = 300;
    var ctx = canvas.getContext("2d");


    // Student Grades
    var chartData = [50, 95, 85, 65];
    var maxBarHeight = 200;

    // Draw Image
    var img = new Image();
    img.src = "images/bg.jpg";

    // Starts the main function to draw out the bars and text
    img.addEventListener("load", function(){

        ctx.drawImage(img,0,0,400,300);

        // Draw Bars function
        var drawBars = function(){
            ctx.font = "14px Georgia";

            // loop through the chartData and write the bars according to the size
            for (var i = 0; i < chartData.length; i++) {

                ctx.beginPath();
                ctx.fillStyle = "rgba(100, 200, 200, 0.75)";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                var height = maxBarHeight * chartData[i] / 100;
                ctx.rect(i * 80 + 90, 270 - height, 50, height);
                ctx.fill();

                // Writes the numbers above the bars
                for (var ii = 0; ii < chartData.length; ii++) {

                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.fillText(chartData[i],i * 80 + 105, 270 - height - 10 );
                }

            }

        }; drawBars();

       // Writes the Header Text
        var drawCharText = function(){
            ctx.font = "20px Georgia";
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillText("TEST GRADES",30,30);


        }; drawCharText(); // end drawChartText


        // Writes the name of the quiz below the bars
        var xAxisData = ["Quiz1", "Quiz2","Quiz3","Quiz4"];
            ctx.font = "14px Georgia";
            ctx.fillStyle = "rgb(0,0,0)";

        for (var i = 0; i < xAxisData.length; i++) {
            ctx.fillText(xAxisData[i],i * 80 + 95, 290);
        } // end axis data



    }, false); // Prevents bubbling


})(); // end self executing function