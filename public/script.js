document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
});

function setFieldText(fieldid,text){
    document.getElementById(fieldid).value = text;
}

function getFieldText(fieldid){
    return document.getElementById(fieldid).value;
}

function ifNull(smth){
    if(smth==null){
        return true
    }else{
        return false
    }
}

function checkAccount(){
    var textfield_username = document.getElementById('Username').value;
    var doc = getDocument("users",textfield_username);
}

function getDocument(collectionname,documentname){
    const db = firebase.firestore();
    var documentReference = db.collection(collectionname).doc(documentname);
    documentReference.get().then(function(documentSnapshot) {
        if (documentSnapshot.exists) {
            // do something with the data
            var data = documentSnapshot.data();
            setFieldText("Name",data['name'])
            setFieldText("Tag",data['tag'])
            setFieldText("From",data['from'])
            setFieldText("Signature",data['signature'])
            setFieldText("TimePerDay",data['timeperday'])
            setFieldText("msgbox",'data received')
          } else {
            setFieldText("Name","user not found")
            setFieldText("Tag","error")
            setFieldText("From","error")
            setFieldText("Signature","error")
            setFieldText("TimePerDay","error")
            console.log('document not found');
            setFieldText("msgbox",'document not found')
          }
      });
}

function getDocData(collectionname,documentname){
    const db = firebase.firestore();
    var documentReference = db.collection(collectionname).doc(documentname);
    documentReference.get().then(function(documentSnapshot) {
        if (documentSnapshot.exists) {
            var data = documentSnapshot.data();
            return data
        } else {
            console.log('document not found');
        }
    });
}

function updateAccount(){
    setDocument("users",`${removeSpaces(getFieldText("edit_Username"))}`)
}

function setDocument(collectionname,documentname){
    const db = firebase.firestore();
    var olddata = getDocData(collectionname,documentname)

    var new_name = `${getFieldText("edit_Name")}`;
    var new_tag = `${getFieldText("edit_Tag")}`;
    var new_from = `${getFieldText("edit_From")}`;
    var new_signature = `${getFieldText("edit_Signature")}`;
    var new_timeperday = `${getFieldText("edit_TimePerDay")}`;
    if(ifNull(new_name)){new_name = olddata['name']}
    if(ifNull(new_tag)){new_tag = olddata['tag']}
    if(ifNull(new_from)){new_from = olddata['from']}
    if(ifNull(new_signature)){new_signature = olddata['signature']}
    if(ifNull(new_timeperday)){new_timeperday = olddata['timeperday']}

    //update
    db.collection(collectionname).doc(documentname).set({
        name: new_name,
        tag: new_tag,
        from: new_from,
        signature: new_signature,
        timeperday: new_timeperday
    },{ merge: true })
    .then
        setFieldText("msgbox",'data Updated')
}

function removeSpaces(string){
    string = string.replace(/\s+/g, '');
    return string
}