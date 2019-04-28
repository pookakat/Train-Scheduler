
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDUgp8dbtEWEzIfNmhJ-VtziMTLZpsUsYY",
    authDomain: "train-scheduler-b1ca6.firebaseapp.com",
    databaseURL: "https://train-scheduler-b1ca6.firebaseio.com",
    projectId: "train-scheduler-b1ca6",
    storageBucket: "train-scheduler-b1ca6.appspot.com",
    messagingSenderId: "336234075932"
  };
  firebase.initializeApp(config);
  
  const theTrains = firebase.firestore().collection("theTrains");
  var arrivalTime = 0;
  var howMuchLonger = 0;
  
  theTrains.onSnapshot(function (snap) {
    $("#trainSched tbody").html("");
    theTrains.get().then(function (docs){
      docs.forEach(function(doc){
        const data = doc.data();
        const $newRow = $("#trainSched tbody").append("<tr>");
        const nextArrival = timeCalc(data.firstArrival, data.frequency);
        $newRow
          .append(`<th scope="row">${data.name}</td>`)
          .append(`<td>${data.destination}</td>`)
          .append(`<td>${data.firstArrival}</td>`)
          .append(`<td>${nextArrival}</td>`)
          .append(`<td>${moment(nextArrival).subtract(moment())}</td>`);
        console.log("changed", doc.data())
        
      })
    })
  });
  
  $("#trainAppear").on("click", function(event){
    event.preventDefault();
    theTrains.add({
      name: $("#name").val(),
      destination: $("#destination").val(),
      firstArrival: $("#firstArrival").val(),
      frequency: $("#frequency").val()
    });
  });

    function timeCalc(firstArrival, interval) {
        let nextArrival = moment(firstArrival);
        while ( moment(nextArrival).isBefore(moment()) ) {
            nextArrival = moment(nextArrival).add(interval, "minutes")
        }
        return nextArrival;
    }