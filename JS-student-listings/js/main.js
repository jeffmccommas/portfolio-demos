/*
 Name: Jeffrey McCommas
 Date: 12/18/2013
 Class & Section:  PWA1-sec 01
 Comments: " FINAL PWA-1"
 */


//Self Invoking Functions
(function (){

    // Log all the students to the console log the first time
    function logAll() {

        var obj= currentStudent.first();

        while (obj != null) {

            console.log( "Name: " + obj.name+ "\n" +
                "Address: " + obj.address.street + " " + obj.address.city + " " + obj.address.state+ " " +"\n"
                + "GPA:" + obj.GPA.join()  +"\n"+ "Hire Date:" + obj.hireDate.toDateString() + "\n" +"GPA Average:" +obj.gradeAvg().toFixed(2)+ "\n" + obj.gpaTest() + "\n\n"+ "---------- Next Student ----------" + "\n");

            obj = obj.next();
        }
    }

    // Initialize the student objects
    function init_students() {

        var init_student_array = [
            {
                name: "Jeff McCommas",
                address: {
                    street: "148 Flower Ln",
                    city: "Boston",
                    state:"MA"
                },
                GPA: [3.5,2.8,3,9],
                photo: "jeff.jpg"

            },
            {
                name: "Ronald Reagan",
                address: {
                    street: "987 Ocean Blvd",
                    city: "San Diego",
                    state:"CA"
                },
                GPA: [3.90, 2.20, 3.70],
                photo: "President_Reagan.jpg"

            },
            {   name: "Superman",
                address: {
                    street: "123 Louis Lane",
                    city: "Smallville",
                    state:"KA"
                },
                GPA: [7.10, 9.20, 8.70],
                photo: "Superman.jpg"


            }];

         // Lets loop through the student objects above to create new Students on the constructor
        var studentObject = null;

        for (i=0; i<init_student_array.length; i++) {
            var studnet_value = init_student_array[i];
            studentObject = new Student(studnet_value.name, studnet_value.address.street,studnet_value.address.city,studnet_value.address.state,studnet_value.GPA,new Date(), studnet_value.photo);
        }

        return studentObject.first();
    }

    //add the firstStudent
    var currentStudent = init_students();

    // Log all the students to the console log the second time
    logAll();


    //Add another student ;
    var newStudent = new Student("Lyndon Modomo","987 Ocean Blvd","Honolulu","Hawaii", [4.9, 4.3, 4.5], new Date(), "Lyndon_Modomo.jpg");


    //log All information to the console log again so we dont get graded off again for dumb mistakes
    logAll();

    // Window event that triggers the button clicks and adds the Event Listener
    window.onload = function() {
        var btnClick = U.$("#info_btn .buttonred");
        U.addEvent(btnClick, 'click',  next);
        show();
    };

    // Function that sets the click event to disable at the end of the students list. Removes the event listener
    function allDone() {
        var heading = U.$("h4.heading");
        var btnClick = U.$("#info_btn .buttonred");
        btnClick.innerHTML = "DONE";
        heading.innerHTML = "<div style=color:#ff0000>" + "Congratulations, You have reached the end of the Internet" + "</div>";
        btnClick.disabled = true;
        btnClick.setAttribute('class','disabled');
        U.removeEvent(btnClick, "click", next);

    }

    function show() {
        var name = U.$("#name");
        name.innerHTML = "<h2>" + "<span>Name:</span> " +"<div>" +currentStudent.name+ "</div>"+"</h2>";
        address.innerHTML = "<h3>" + "<span>Address:</span> " +"<div>" +currentStudent.getFullAddress() + "</div>"+"</h3>";
        gpa.innerHTML = "<h3>" + "<span>GPA:</span> " +"<div>" +currentStudent.GPA.join() +  "</div>"+"</h3>";
        date.innerHTML = "<h3>" + "<span>Date:</span> " +"<div>" +currentStudent.hireDate.toDateString()+"</div>"+"</h3>";
        gpaavg.innerHTML = "<h3 class=grade>" + "<span>GPA Average:</span> " +"<div>" + (currentStudent).gradeAvg().toFixed(2)+"</div>"+"</h3>";
        photo.src="images/" + currentStudent.photo;


    }

    /* This next function is what HTML displays on the page when you click next!
     We store the students index length in a variable currentStudent. Then we add a counter ++
     then when the click function reaches the end of the index we call the allDone() function which adds the disabled class and
     sets removes the eventHandler */

    function next(e) {

        currentStudent = currentStudent.next();

        if (currentStudent != null)  {
            show();

        } else {
            allDone();
        }

        if (e) e.preventDefault();
        return false;

    }

    // Finally, lets add some styling to the photos
    var fade = document.getElementById("photo");
    fade.classList.add("fade");

})(); // End Self executing function