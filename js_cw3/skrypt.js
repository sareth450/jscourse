function set() {
    if(!document.getElementById("Div").hasAttribute("class")){
        document.getElementById("Div").setAttribute("class","view");
    }
}

function unset() {
    if(document.getElementById("Div").hasAttribute("class")){
        document.getElementById("Div").removeAttribute("class");
    }
}

function randomDegree()
{
   var res = Math.floor((Math.random() * 180) + 1);
   return res;
}

var rotated = false;
var rotated2 = false;
var idInterwalu;
var degree = Math.random()*360+1;

 function rotateDivs() {
    var div = document.getElementById('mainrot'),
        deg = rotated ? 0 : degree;

    div.style.webkitTransform = 'rotate('+deg+'deg)'; 
    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
    div.style.msTransform     = 'rotate('+deg+'deg)'; 
    div.style.oTransform      = 'rotate('+deg+'deg)'; 
    div.style.transform       = 'rotate('+deg+'deg)'; 

    rotated = !rotated;

    var div2 = document.getElementById('side'),
        deg2 =  rotated2 ? 0 : 360-deg;

    div2.style.webkitTransform = 'rotate('+deg2+'deg)'; 
    div2.style.mozTransform    = 'rotate('+deg2+'deg)'; 
    div2.style.msTransform     = 'rotate('+deg2+'deg)'; 
    div2.style.oTransform      = 'rotate('+deg2+'deg)'; 
    div2.style.transform       = 'rotate('+deg2+'deg)'; 

    rotated2 = !rotated2;
}

function startInterval(){
    idInterwalu = window.setInterval(rotateDivs, 100);
}

function stopInterval(){
    window.clearInterval(idInterwalu);
}



var e = document.getElementById('hov');
e.onmouseover = function() {
    //setTimeout(this, 1000);
  document.getElementById('popup').style.display = 'block';
}
e.onmouseout = function() {
  document.getElementById('popup').style.display = 'none';
}