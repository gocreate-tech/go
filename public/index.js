//visual
var usermode = "candidate";
function SwapPageFirst(){
	document.getElementById('buttonCandidate').setAttribute("class","nav-link active")
	document.getElementById('buttonClient').setAttribute("class","nav-link")
	setFieldText("F","mode: candidate")
    usermode = "candidate"
}
function SwapPageSecond(){
	document.getElementById('buttonCandidate').setAttribute("class","nav-link")
	document.getElementById('buttonClient').setAttribute("class","nav-link active")
	setFieldText("F","mode: client")
    usermode = "client"
}
function Register(){
	if(getFieldText("firstName")==""){setFieldText("F","enter First Name");return}
	if(getFieldText("lastName")==""){setFieldText("F","enter Last Name");return}
	if(getFieldText("email")==""){setFieldText("F","enter Email");return}
	if(getFieldText("password")==""){setFieldText("F","Enter password");return}
	if(getFieldText("password") !== getFieldText("passwordConfirm")){setFieldText("F","Passwords dosent match");return}
	SignUp()
}
//visual end
//register start
function FakeRegister(){
	setFieldText("F","Sending request.")
	localStorage.clear()
	
	firebase.auth().signInWithEmailAndPassword("ciz34737@eoopy.com", "password")
	firebase.auth().onAuthStateChanged(function(user){
		//if acc created and auth passed
		if(user){
			var documentReference = firebase.firestore().collection("users").doc(user.uid)
			documentReference.get().then(function(doc) {
				var data = doc.data()
				localStorage.firstname = data.firstname
				localStorage.lastname = data.lastname
				localStorage.earnings = data.earnings
			})
			
			setTimeout(function(){window.open("dashboard_1.html","_self")},3000)
		}
	})
}

function SignUp(){
	setFieldText("F","Sending request.")
	localStorage.clear()
	
	var email = document.getElementById('email').value
	var password = document.getElementById('password').value
	
	// Create user with email and pass.
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
        if (error.code=='auth/weak-password'){setFieldText("F","The password is too weak.")}
		if (error.code=='auth/email-already-in-use'){setFieldText("F","The email address is already in use by another account.")}
	})
	.then(function(){firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){})})
	
	firebase.auth().onAuthStateChanged(function(user){
		//if acc created and auth passed
		if(user){
			var firstName = getFieldText("firstName")
			var lastName = getFieldText("lastName")
			//update data
			firebase.firestore().collection("users").doc(user.uid).set({
				firstname: firstName,
				lastname: lastName,
				earnings: 0
			})
			//open dashboard
			setTimeout(function(){window.open("dashboard_1.html","_self")},3000)
		}
	})
}
//register end
function init(){
	document.getElementById("buttonCandidate").addEventListener("click",SwapPageFirst,false);
	document.getElementById("buttonClient").addEventListener("click",SwapPageSecond,false);
	document.getElementById("registerbutton").addEventListener("click",Register,false);
	document.getElementById("fakeregisterbutton").addEventListener("click",FakeRegister,false);
}
window.onload = init;