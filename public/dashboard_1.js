function addRow(row2link,row2text,row3text,row4text,row5text,row6text){
	var header = document.getElementById("header")
	
	var container = document.createElement("div")
	container.classList.add('menu')
	container.classList.add('mt20')
	
//row1 
	var row1 = document.createElement("div")
	row1.classList.add('inline')
	row1.classList.add('w9')
	container.appendChild(row1)
	
//row2 link + title
	var row2 = document.createElement("div")
	row2.classList.add('inline')
	row2.classList.add('w25')
	row2.classList.add('fs110')
	row2.classList.add('al')
	
	var a = document.createElement("a")
	a.classList.add('c22')
	a.href = row2link
	
	
	var textnode = document.createTextNode(row2text)
	
	a.appendChild(textnode)
	row2.appendChild(a)
	container.appendChild(row2)
	
//row3 contry
	var row3 = document.createElement("div")
	row3.classList.add('inline')
	row3.classList.add('w15')
	row3.classList.add('c75')
	row3.classList.add('al')
	
	var image = document.createElement("img")
	image.classList.add('mr')
	image.src = "imgs\\earthmark.png"
	
	var textnode = document.createTextNode(row3text)
	row3.appendChild(image)
	row3.appendChild(textnode)
	container.appendChild(row3)
	
//row4 money
	var row4 = document.createElement("div")
	row4.classList.add('inline')
	row4.classList.add('w19')
	row4.classList.add('fs90')
	row4.classList.add('al')
	
	var textnode = document.createTextNode(row4text)
	row4.appendChild(textnode)
	container.appendChild(row4)
	
//row5 date
	var row5 = document.createElement("div")
	row5.classList.add('inline')
	row5.classList.add('w10')
	row5.classList.add('fs85')
	row5.classList.add('c45')
	row5.classList.add('al')
	
	var textnode = document.createTextNode(row5text)
	row5.appendChild(textnode)
	container.appendChild(row5)
	
//row6 status	
	var row6 = document.createElement("div")
	row6.classList.add('inline')
	row6.classList.add('w14')
	row6.classList.add('c85')
	row6.classList.add('al')
	
	var textnode = document.createTextNode(row6text)
	row6.appendChild(textnode)
	
	container.appendChild(row6)
	
//row7	
	var row7 = document.createElement("div")
	row7.classList.add('inline')
	row7.classList.add('w3')
	container.appendChild(row7)
	
//line
	var hr = document.createElement("hr")
	hr.style.width = "82%"
	hr.style.align = "center"
//adding
	insertAfter(header, container)
	insertAfter(container, hr)
	
}

function init(){
	var start = 0
	var end = 0
	
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			var documentReference = firebase.firestore().collection("jobs").doc("settings")
			documentReference.get().then(function(doc) {
				var data = doc.data()
				start = data.startn
				end = data.endn
				console.log("1", start, end)
			})
			.then(function(){
				if(start !== 0){
					for(docn = start; docn<=end; docn++){
						var documentReference = firebase.firestore().collection("jobs").doc(docn.toString())
						const n = docn
						documentReference.get().then(function(doc) {
							var data = doc.data()
							addRow("document.html?postid="+n.toString(), data.title, data.location, data.earnings, data.updated, data.status)
						})
					}
				}
			})
		}
	})
}
onLoad(init)