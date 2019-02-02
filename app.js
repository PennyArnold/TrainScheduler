
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARmXKNxbzIeocXiTXCmvJUjx_sAO6Jfko",
    authDomain: "trainscheduler-b0663.firebaseapp.com",
    databaseURL: "https://trainscheduler-b0663.firebaseio.com",
    projectId: "trainscheduler-b0663",
    storageBucket: "trainscheduler-b0663.appspot.com",
    messagingSenderId: "495512180980"
  };
 firebase.initializeApp(config);


  //set up the required firebase database function
  var database = firebase.database();

  //set up the click function and create the values for input
  $("#submitBtn").on("click", function() {
     var nameInput =  $("#nameInput").val().trim();
     var destinationInput =  $("#destinationInput").val().trim();
     var timeInput =  $("#timeInput").val().trim();
     var frequencyInput =  $("#frequencyInput").val().trim();
 //console logging to make sure the click function is working correctly
    console.log(nameInput);
    console.log(destinationInput);
    console.log(timeInput);
    console.log(frequencyInput);

//this is the firebase formula to add the time the data was entered into the form
    var dateAdded = firebase.database.ServerValue.TIMESTAMP;

//creating the object that stores the train data submitted
var trainData = {
    name: nameInput,
    destination: destinationInput,
    time: timeInput,
    frequency: frequencyInput,
    date: dateAdded
    }
//pushing the input data to firebase database
    database.ref().push(trainData);
//clearing the input form
    return false;
  });

//setting up a snapshot of the train input and assigning them as children in firebase
database.ref().on("child_added", function(childSnapshot) {
//console.log to ensure I am capturing the data correctly
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().date);

//need to convert the First train time into minutes away using the moments methodology
    var minutesAway = childSnapshot.val().time + childSnapshot.val().frequency;
    console.log("minutes away", minutesAway);


//append data to the columns to display the schedule created from the submitted data stored on firebase
    $("#trainRow").append("<tr><td>"+ childSnapshot.val().name + "</td><td>"+ childSnapshot.val().destination +
    "</td><td>"+ childSnapshot.val().frequency +"</td><td>"+ childSnapshot.val().time +
    "</td><td>" + minutesAway + "</td>")

});

   


