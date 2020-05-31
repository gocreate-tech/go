function setFieldText(fieldid,newtext){document.getElementById(fieldid).innerHTML=newtext;}
function getFieldText(fieldid){return document.getElementById(fieldid).value;}
function removeSpaces(string){string = string.replace(/\s+/g,'');return string;}
function ifNull(smth){if(smth==null){return true;}else{return false;}}
//stolen start
const CreateElement = (tag, options, attNode, content) => {
    const node = document.createElement(tag);
    
    if(options)
        for(const prop in options)
            node.setAttribute(prop, options[prop]);
    
    if(content)
        node.textContent = content;
    
    if(attNode)
        attNode.appendChild(node);
    
    return node;
};

function insertAfter(referenceNode, newNode){
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
//stolen end
//loading stack
stack = new Array()
function onLoad(func){
	stack.push(func)	
}

function runOnLoad(){
	for (let func of stack){
		func()
	}
}

function timedRun(){
	//to let read all scripts, then run all init
	setTimeout(runOnLoad, 100)
}

window.onload = timedRun()