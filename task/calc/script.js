var butArr = document.querySelectorAll(".value");
var actArr = document.querySelectorAll(".action");
var numberField = document.getElementById("number");
var firstNum="", secondNum="",actionChar="", added=false, isFN=false;
var deleteBut = document.getElementById("delete");
var result = document.getElementById("result");
var disp = document.getElementById("disp");
var backspace = document.getElementById("backspace");
var plusMin = document.getElementById("plusMin");
var dot = document.getElementById("dot");
var soluted = false;

numberField.onkeyup = ifNoNumber;

deleteBut.onclick = deleteAll;
result.onclick = solution;
plusMin.onclick = changeSign;
disp.onclick = dispFunc;
dot.onclick = dotFunc;
backspace.onclick = backspaceFunc;
for(var i=0;i<butArr.length;i++){
    butArr[i].onclick = addValue;
}
for(i=0;i<actArr.length;i++){
    actArr[i].onclick = action;
}

function addValue(e){
//    alert(e.target.value);
    if(soluted){
        numberField.value = "";
        soluted = false;
    }
    if(added){
        numberField.value="";
        added = false;
    }
    numberField.value+=e.target.value;
}
function action(e){
    if(numberField.value != ""){
//        if( firstNum == ""){
//            firstNum = numberField.value;
//        }
//        if(e.target.value = "*"){
//
//        } 
        if(/[-+*/]/.test(numberField.value.slice(numberField.value.length-1))){
            numberField.value = numberField.value.slice(0,numberField.value.length-1);
        }
        numberField.value+=e.target.value;
        firstNum = parseFloat(numberField.value);
        added = true;
        actionChar = e.target.value;
    }
}
function solution(){
    if(numberField.value != ""){
        secondNum = parseFloat(numberField.value);
        switch(actionChar){
           case("*"):
               numberField.value = firstNum * secondNum;
               break;
           case("/"):
               numberField.value = firstNum / secondNum;
               break;
           case("+"):
               numberField.value = firstNum + secondNum;
               break;
           case("-"):
               numberField.value = firstNum - secondNum;
               break;
        }
        firstNum = "";
        secondNum = "";
        actionChar="";
        soluted=true;
    }
}
function deleteAll(){
    firstNum = "";
    secondNum = "";
    actionChar="";
    numberField.value = "";
}
function changeSign(){
    if(numberField.value != ""){    
        numberField.value = -numberField.value; 
    }
}
function backspaceFunc(){
    if(numberField.value != ""){    
        numberField.value = numberField.value.slice(0, numberField.value.length-1);
    }
}
function dispFunc(){
    if(numberField.value != ""){    
        numberField.value = Math.sqrt(numberField.value);
    }    
}
function dotFunc(){
    if(numberField.value != "" && !(/\./.test(numberField.value))){    
        numberField.value+=".";
    }    
}
function ifNoNumber(e){
//    this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
//    alert(e.which);
    if(/\d[-*+/]{2}/.test(numberField.value)){
        actionChar=this.value.slice(this.value.length-1);
        this.value=this.value.slice(0,this.value.length-2)+actionChar;  
    }
    if(soluted){
        this.value=this.value.slice(numberField.value.length-1).replace(/^0/,"");
        soluted = false;
    }
    if(isFN){
        this.value=this.value.slice(numberField.value.length-1);
        isFN=false;
    }
    if(firstNum!="" && e.button == 13){
        solution();    
    }
    this.value = this.value.replace(/^\.|[^-+*/\.\d]|\.(?=.*\.)|^[^-\d]/gi, "");
    if(/\d+[-+*/]$/.test(numberField.value)){
        actionChar = numberField.value.slice(numberField.value.length-1);
        firstNum=parseFloat(numberField.value.slice(0,numberField.value.length-1));
        isFN=true;
    }
    
    
}