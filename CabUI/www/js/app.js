(function () {
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhrhS7R0XUA9h5V4YCQI6FVuRz625dAQM",
    authDomain: "cabbooking-55f03.firebaseapp.com",
    databaseURL: "https://cabbooking-55f03.firebaseio.com",
    //storageBucket: "",
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.FacebookAuthProvider();

  var fName = document.getElementById('fname');
  var lname = document.getElementById('lname');
  var txtEmail = document.getElementById('email');
  var txtTel = document.getElementById('tel');
  var txtPass = document.getElementById('txtPass');
  var btnLogin = document.getElementById('btnLogin');
  var btnSignup = document.getElementById('btnSignup');
  var btnPass = document.getElementById('btnPass');
  var btnFacebook = document.getElementById('btnFacebook');

  //Add event listener for Login Button
  if(btnLogin) {
  	btnLogin.addEventListener('click', e => {
	  	var email = txtEmail.value;
	  	var pass = txtPass.value;
	  	var auth = firebase.auth();

	  	// Sign in
	  	var doLog = auth.signInWithEmailAndPassword(email, pass);
	  	doLog.catch(e => console.log(e.message));

	  	if (doLog != null){
	  		console.log("You have logged in");
	  		window.location.href = "booking.html";
	  	}else {
	  		console.log("Wrong or unavailable Account details");
	  		document.write("Wrong or unavailable Account details");
	  	}
	 });
  }

  // Add event listener for Signup button
  if(btnSignup){
  	btnSignup.addEventListener('click', e => {
	  	var email = txtEmail.value;
	  	var pass = txtPass.value;
	  	var auth = firebase.auth();

	  	// Sign up
	  	var doSignup = auth.createUserWithEmailAndPassword(email, pass);
	  	doSignup.catch(e => console.log(e.message));

	  	if (doSignup != null) {
	  		console.log("Sign Up successful");

	  	}

	  });
  }

  btnFacebook.addEventListener('click', e => {
  	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
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

  //Add a firebase realtime listener if user exists
  firebase.auth().onAuthStateChanged(firebase => {
  	if (firebaseUser) {
  		console.log(firebaseUser);
  	} else {
  		console.log('not logged in');
  	}
  });

}());
  
    