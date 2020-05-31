//visual

var usermode = "candidate";
function SwapPageFirst(){
	document.getElementById('buttonCandidate').setAttribute("class", "nav-link active")
	document.getElementById('buttonClient').setAttribute("class", "nav-link")
	setFieldText("F","mode: candidate");
    usermode = "candidate";
}
function SwapPageSecond(){
	document.getElementById('buttonCandidate').setAttribute("class", "nav-link")
	document.getElementById('buttonClient').setAttribute("class", "nav-link active")
	setFieldText("F","mode: client");
    usermode = "client";
}
function init(){
	document.getElementById("buttonCandidate").addEventListener("click",SwapPageFirst,false)
	document.getElementById("buttonClient").addEventListener("click",SwapPageSecond,false)
	document.getElementById("loginbutton").addEventListener("click",Login,false)
}
window.onload = init
//visual end
//script begin
function Login(){
	if(getFieldText("email")==""){setFieldText("F","enter email");return}
	if(getFieldText("password")==""){setFieldText("F","enter password");return}
	
	var email = getFieldText("email")
	var password = getFieldText("password")
	//sign in with password
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
	  setFieldText("F",error.code+"; "+error.message)
	})
	
	//observer; checks if user signd in
	firebase.auth().onAuthStateChanged(function(user){
	if(user){
		// User is signed in.
		setFieldText("F","You signed in!, dashboard will open in 3 seconds.")
		// saving data in local storage
		var documentReference = firebase.firestore().collection("users").doc(user.uid)
		documentReference.get().then(function(doc) {
			var data = doc.data()
			localStorage.firstname = data.firstname
			localStorage.lastname = data.lastname
			localStorage.earnings = data.earnings
		})
		
		setTimeout(function(){window.open("dashboard_1.html","_self")},3000)
	}else{
		// No user is signed in.
		setFieldText("F","You not signed in!")
	}})
}
localStorage.clear()
//script end