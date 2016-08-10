(function () {
	
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhrhS7R0XUA9h5V4YCQI6FVuRz625dAQM",
    authDomain: "cabbooking-55f03.firebaseapp.com",
    databaseURL: "https://cabbooking-55f03.firebaseio.com",
    storageBucket: "cabbooking-55f03.appspot.com",
  };

  firebase.initializeApp(config);

  // Create object of Facebook authentication
  const provider = new firebase.auth.FacebookAuthProvider();

  // Create database references
  const dbRefUsers = firebase.database();
  const dbRefBookings = firebase.database();

  // Get user inputs
  const fName = document.getElementById('fname');
  const lName = document.getElementById('lname');
  const txtEmail = document.getElementById('email');
  const txtTel = document.getElementById('tel');
  const txtPass = document.getElementById('txtPass');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnFacebook = document.getElementById('btnFacebook');

  // Get booking inputs
  const pickupCode = document.getElementById("pickup");
  const destCode = document.getElementById("dest");
  const datepicker = document.getElementById("datepick");
  const timepicker = document.getElementById("timepicker");
  const noOfAdults = document.getElementById("select-5");
  const noOfChild = document.getElementById("select-6");
  const btnLogout = document.getElementById('btnLogout');
  const btnBookCab = document.getElementById("btnBookCab");
  const bookingMsg = document.getElementById("bookingMsg");
  const bookingDetails = document.getElementById("bookingDetails");

  //Get Admin details
  const btnAdminLogin = document.getElementById("btnAdminLogin");

  //Add event listener for Login Button
  
  	if (btnLogin != null) {
    		btnLogin.addEventListener('click', e => {
  	  	const email = txtEmail.value;
  	  	const pass = txtPass.value;
  	  	const auth = firebase.auth();

  	  	// Sign in
  	  	const doLog = auth.signInWithEmailAndPassword(email, pass);
  	  	doLog.catch(e => console.log(e.message));

  	  	if (doLog != null){
  	  		console.log("You have logged in");
  	  		window.location.href = "booking.html";
  	  	}else {
  	  		console.log("Wrong or unavailable Account details");
  	  	}
  	 });
  	} else if(btnAdminLogin != null) {
        btnAdminLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPass.value;
        const auth = firebase.auth();

        // Sign in
        const doLog = auth.signInWithEmailAndPassword(email, pass);
        doLog.catch(e => console.log(e.message));

        if (doLog != null){
          console.log("You have logged in");
          window.location.href = "dashboard.html";
        }else {
          console.log("Wrong or unavailable Account details");
        }
     });
    }


  // Add event listener for Signup button
  	if (btnSignup != null) {
  		btnSignup.addEventListener('click', e => {
	  	const email = txtEmail.value;
	  	const pass = txtPass.value;
	  	const auth = firebase.auth();

	  	// Sign up
	  	const doSignup = auth.createUserWithEmailAndPassword(email, pass);
	  	doSignup.catch(e => console.log(e.message));

	  	if (doSignup != null) {
	  		console.log("Sign Up successful");
	  		console.log(fName.value, lName.value);

	  		dbRefUsers.ref().child("users/").push({
	  			firstname: fName.value,
  				lastname: lName.value,
  				email: txtEmail.value,
  				tel: txtTel.value
	  		});

	  		window.location.href = "booking.html";
	  	}

	  });
  	} 

    //Add a firebase realtime listener if user exists
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('not logged in');
      }
    });

  	// Add event listener for Logout button
  	if (btnLogout != null) {
  		btnLogout.addEventListener('click', e => {
  			firebase.auth().signOut().then(function(){
  				window.location.href = "index.html";
  			});
  		});
  	} 

  	// Add event for Cab booking button
  	if (btnBookCab != null) {
  		btnBookCab.addEventListener('click', e => {
  			dbRefBookings.ref().child("booking").push({
          pickup: pickupCode.value,
          destination: destCode.value,
          date: datepicker.value,
          time: timepicker.value,
          Adults: noOfAdults.value,
          Child: noOfChild.value
  			});
        bookingMsg.classList.remove('hide');

        dbRefBookings.on('child_added', snap => {
          var detail = snap.val();

          bookingDetails.innerText = detail.val().pickup + 
                                    detail.val().destination + "\n" + 
                                    detail.val().date + "\n" +
                                    detail.val().time + "\n" +
                                    detail.val().Adults + "\n" +
                                    detail.val().Child;
        })

  		});
  	} 

  if (btnFacebook != null) {
    btnFacebook.addEventListener('click', e => {
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      window.location.href = "booking.html";
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
   });
  }



}());


    