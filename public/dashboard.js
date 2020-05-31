function init(){
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			setFieldText("headername",localStorage.firstname+" "+localStorage.lastname)
			setFieldText("bluelinename",localStorage.firstname+" "+localStorage.lastname)
			setFieldText("earnings","$"+localStorage.earnings)
		}
	})
}
onLoad(init)