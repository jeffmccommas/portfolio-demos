/*
 Name: Jeffrey McCommas
 Date: 12/18/2013
 Class & Section:  PWA1-sec 01
 Comments: " FINAL PWA-1"
 */

// Create a new Array to add our students to
var studentsArray = new Array();

//  Students Constructor

var Student = function(name, street, city, state, GPA, hireDate, photo){
	
    this.name = name;
    this.address = {
    		street	:  street,
    		city	:  city,
    		state	:  state
    };
    this.GPA = GPA;
    this.hireDate = hireDate;
    this.photo = photo;

    // push the students index into the array above
    studentsArray.push(this);
    
    this.currentIndex = studentsArray.length - 1;
    
    this.getFullAddress = function () {
        result = this.address.street+'<br> '+this.address.city+' '+ this.address.state;
        return result;
    }
}; // end Students Constructor


// Student Prototype for Grade Average, click function and RegEx function
Student.prototype = {
		gradeAvg : function(){

			var gpaavg = U.$("#gpaavg");
		    var count = 0;
		    var total = 0;
		    for (var i = 0, j = this.GPA.length; i < j; i++){
		        count++;
		        total += this.GPA[i];

		    }
		    return total/count;
		},
		
		next : function() {
	    	nextIndex = this.currentIndex + 1;
	    	
	    	if (studentsArray.length > nextIndex)
	    		return studentsArray[nextIndex];
	    	else 
	    		return null;
	    },
	    
	    first : function () {
	    	
	    	if (studentsArray.length > 0)
	    		return studentsArray[0];
	    	else 
	    		return null;
	    },
        // RegEx test for Grade Average  EXTRA CREDIT EXTRA CREDIT EXTRA CREDIT EXTRA CREDIT
        gpaTest:function(){
            var newGPA = this.gradeAvg().toFixed(2);
            var regEx = (/^\d+(\.\d{1,2})?$/);
            var gpaEx =  newGPA;
            var patt = regEx;
            var result = patt.test(gpaEx);
            return ("Your Grade Average " +gpaEx+ " Passed the RegEx test: " + result);

    }
};