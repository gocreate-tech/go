//stolen code what works
function getAllUrlParams(url) {
  // извлекаем строку из URL или объекта window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  // объект для хранения параметров
  var obj = {};
  // если есть строка запроса
  if (queryString) {
    // данные после знака # будут опущены
    queryString = queryString.split('#')[0];
    // разделяем параметры
    var arr = queryString.split('&');
    for (var i=0; i<arr.length; i++) {
      // разделяем параметр на ключ => значение
      var a = arr[i].split('=');
      // обработка данных вида: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });
      // передача значения параметра ('true' если значение не задано)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];
      // преобразование регистра
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();
      // если ключ параметра уже задан
      if (obj[paramName]) {
        // преобразуем текущее значение в массив
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // если не задан индекс...
        if (typeof paramNum === 'undefined') {
          // помещаем значение в конец массива
          obj[paramName].push(paramValue);
        }
        // если индекс задан...
        else {
          // размещаем элемент по заданному индексу
          obj[paramName][paramNum] = paramValue;
        }
      }
      // если параметр не задан, делаем это вручную
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}
//a bit more stolen code
document.head = document.head || document.getElementsByTagName('head')[0];
function changeFavicon(src) {
 var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
}


function getContainer(){
	var container = document.createElement("div")
	container.classList.add('menu')
	return container
}
function addQuals(array){
	var n = 0
	var container = getContainer()
	
	var hr = document.getElementById("specs")
	var lastElement = array.slice().pop()
	
	var prevContainer
	for(let value of array){
		
		var div = document.createElement("div")
		div.classList.add('inline')
		div.classList.add('p5')
		
		var button = document.createElement("button")
		button.classList.add('btn')
		button.classList.add('btn-lg')
		button.classList.add('btn-block')
		button.style.borderRadius = "50px"
		button.style.fontSize = "12pt"
		button.style.backgroundColor = "#cccccc"
		button.type = "button"
		
		var textnode = document.createTextNode(value)
		
		button.appendChild(textnode)
		div.appendChild(button)
		container.appendChild(div)
		
		n = n + 1
		if(lastElement==value){insertAfter(prevContainer,container);break}
		//rows for 3 elements
		if(n==3){insertAfter(hr,container);prevContainer=container;container=getContainer();n=0}
	}
}


function init(){
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			setFieldText("headername",localStorage.firstname+" "+localStorage.lastname)
			
			var postid = getAllUrlParams().postid
			var documentReference = firebase.firestore().collection("jobs").doc(postid.toString())
			documentReference.get().then(function(doc) {
				var data = doc.data()
				//title
				document.title = data.title
				
				setFieldText("breadtitle",data.title)
				setFieldText("title",data.title)
				setFieldText("companyname",data.companyname)
				setFieldText("adress",data.adress)
				setFieldText("description",data.description)
				setFieldText("budget",data.budget)
				setFieldText("duration",data.duration)
				setFieldText("experience",data.experience)
				//change header
				document.getElementById("image").src = data.image
				changeFavicon(data.image)
				//add quals
				addQuals(data.quals)
			})
		}
	})
}
onLoad(init)