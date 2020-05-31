function init(){
	firebase.auth().onAuthStateChanged(function(user){
		//if auth passed
		if(user){
			const db = firebase.firestore()
			var documentReference = db.collection("users").doc(user.uid)
			documentReference.get().then(function(doc) {
				var data = doc.data()
				setFieldText("headername",data.firstname+" "+data.lastname)
				setFieldText("bluelinename",data.firstname+" "+data.lastname)
			})
		}else{}
	})
}
window.onload = init;