/*
 Name: Jeffrey McCommas
 Date: 12/05/2013
 Class & Section:  PWA1-sec 01
 Comments: "goal4_assign_duel"
 */

// Self Invoking Anonymous Function
(function () {

    // Shortcut function:
    function $(id) {
        'use strict';
        if (typeof id != 'undefined') {
            return document.querySelector(id);
        }
    } // End of $() function.

    // Fighter Variables


    var fighter1 = {
        name: "Spiderman",
        damage:20,
        health: 100
    };

    var fighter2 = {
        name: "Batman",
        damage: 20,
        health: 100
    };

    // Event Listeners for click Function
    function eventListener(e)
    {
        fight();

        e.preventDefault();
        return false;
    }

    var round = 0; // sets rounds to 0

    // Fight Function
    function fight(){
        // Starts the game Here

        var kabal = $('#kabal p');// get the element for score inputs
        var kratos = $('#kratos p');
        kabal.innerHTML = (fighter1.name + " : " + fighter1.health);
        kratos.innerHTML = (fighter2.name + " : " + fighter2.health);


        // determines the minimum damage a player can receive
        var minDamageOne = fighter1.damage * .5;
        var minDamageTwo = fighter2.damage * .5;

        // Sets a random number for the fight
        var f1 = Math.floor(Math.random() * (fighter1.damage - minDamageOne) + minDamageOne);
        var f2 = Math.floor(Math.random() * (fighter2.damage - minDamageTwo) + minDamageTwo);

        // Inflict Damage
        fighter1.health -= f1;
        fighter2.health -= f2;
        console.log(fighter1.name+ " : " +fighter1.health+ " " +fighter2.name+ " : "+fighter2.health+ "");

        // Print the results out in an alert
        var results = winnerCheck();
        //   console.log(results);

        if (results === "No Winner") {
            round++;
            var rounds = $("#fight_btn h4#round");
            rounds.innerHTML = ("Round " + round + " Complete");
        } else {
            var resultsText = $("#results p");
            resultsText.innerHTML = results;
        }


        var fightBtn = $("#fight_btn .buttonblue");
        if (fightBtn)
        {
            fightBtn.addEventListener('click',eventListener,false);
        }

    } // end fight fn


    // Check the Winner Function
    function winnerCheck(){
        // console.log("in winner check FN");
        var result = "No Winner";
        // Conditional to determine who may have won the fight
        if (fighter1.health < 1 && fighter2.health < 1) {
            result = "You Both Die";
            disabledButton();
        } else if (fighter1.health < 1) {
            result =  fighter2.name+ " WINS";
            disabledButton();
        } else if (fighter2.health < 1) {
            result =  fighter1.name+ " WINS";
            disabledButton();

        }

        return result;

    } // end winnerCheck fn

    var disabledButton = function(){
        var fightBtn = $("#fight_btn .buttonblue");
        kabal.innerHTML = "";
        kratos.innerHTML = "";
        fightBtn.innerHTML = "Done";
        fightBtn.removeEventListener('click', eventListener, false);
        fightBtn.setAttribute("class","disabled");
    };



    fight();// Invoke the Fight Function

})();// End  Self Invoking Anonymous Function///