var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var vector = [1,0];
var xPos= 300;
var yPos = 100;
var speeds = [3,5,8];
var quantities=[10,15,20];
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var level =0;
var Rectangles=new Array;
var Points =0;
var s1 = document.getElementById("s1");
var sc1 = document.getElementById("sc1");
var sc2 = document.getElementById("sc2");
var sc3 = document.getElementById("sc3");
var mins = 2;
var sec =59;
var int1;
var int2;
var int3;
var int4;
var int5;
var playerName;

var scores=[0,0,0];
var names=["unknown","unknown","unknown"];


document.addEventListener("keyup", keyUpHandler, false);

function show_prompt() {
    var name = prompt('Please enter your name','Name');
    if (name != null && name != "") {
        playerName = name;
    }
}

function InitializeRectangles(){
    if(level==0){
        for(var j=0; j<quantities[level]; j++){
        var x = Math.floor((Math.random() * 770) + 0);
        var y = Math.floor((Math.random() * 570) + 0);
        Rectangles.push([x,y,20]);
        }
    }
    else if(level ==1)
    {
        for(var j=10; j<quantities[level]; j++){
            var x = Math.floor((Math.random() * 770) + 0);
            var y = Math.floor((Math.random() * 570) + 0);
            Rectangles.push([x,y,20]);
            }
    }
    else if(level ==2)
    {
        for(var j=15; j<quantities[level]; j++){
            var x = Math.floor((Math.random() * 770) + 0);
            var y = Math.floor((Math.random() * 570) + 0);
            Rectangles.push([x,y,20]);
            }
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = true;
        rightPressed = false;
        downPressed = false;
        upPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
        leftPressed = false;
        rightPressed = false;
        downPressed = false;
    }
    else if(e.keyCode == 39) {
        upPressed = false;
        leftPressed = false;
        rightPressed = true;
        downPressed = false;
    }
    else if(e.keyCode == 40) {
        upPressed = false;
        leftPressed = false;
        rightPressed = false;
        downPressed = true;
    }
}

function checkKeys(){
    if(rightPressed)
    {
        vector[0]=1;
        vector[1]=0;
    }
    else if(leftPressed)
    {
        vector[0]=-1;
        vector[1]=0;
    }
    else if(upPressed)
    {
        vector[0]=0;
        vector[1]=-1;
    }
    else if(downPressed)
    {
        vector[0]=0;
        vector[1]=1;
    }
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(parseInt(x), parseInt(y), 20, 0, Math.PI*2, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawRectangle(x,y,val)
{
    
    ctx.beginPath();
    ctx.rect(parseInt(x), parseInt(y), 30, 30);
    if (val >= 0) 
    {
        ctx.fillStyle = "green";
    }
    else
    {
        ctx.fillStyle = "red";
    }
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(val.toString() ,parseInt(x)+3, parseInt(y)+23);
    ctx.closePath();
}

function drawRectangles(){
    var l = Rectangles.length;
    for (var i=0; i<l; i++)
    {
        drawRectangle(Rectangles[i][0], Rectangles[i][1], Rectangles[i][2]);
    }
}

function decreaseRectangles(){
    var l = Rectangles.length;
    for (var i=0; i<l; i++)
    {
        Rectangles[i][2]=Rectangles[i][2]-1;
    }
}

function decreaseTime(){
    sec = sec -1;
    if (sec == 0)
    {
        mins = mins -1;
        sec = 59;
    }
}

function levelUp()
{
    level = level + 1;
}

InitializeRectangles();

function checkCollision()
{
    var l = Rectangles.length;
    for (var i=0; i<l; i++)
    {
        if (xPos - Rectangles[i][0] > -20 && xPos - Rectangles[i][0] < 50 && yPos - Rectangles[i][1] > -20 && yPos - Rectangles[i][1] <50)
        {
            Points = Points + Rectangles[i][2];
            ctx.clearRect(Rectangles[i][0], Rectangles[i][1], 30, 30);
            Rectangles[i][0] = Math.floor((Math.random() * 770) + 0);
            Rectangles[i][1] = Math.floor((Math.random() * 570) + 0);
            Rectangles[i][2]=20;
        }
    }
}

function writePoints()
{
    s1.textContent = Points.toString();
}

function writeTime()
{
    s2.textContent = mins.toString() + ":" + sec.toString();
}

function moveCircle()
{
    checkKeys();
    clearCanvas();
    drawRectangles();
    if(xPos>780) xPos=20;
    if(xPos<20) xPos=780;
    if(yPos>580) yPos=20;
    if(yPos<20) yPos=580;
    drawCircle(xPos, yPos);
    xPos=xPos+vector[0]*speeds[level];
    yPos=yPos+vector[1]*speeds[level];
    checkCollision();
    writeTime();
    writePoints();
}

function writeScores()
{
   if (Points > scores[0])
   {
        scores[2]=scores[1];
        names[2]=names[1];
        scores[1]=scores[0];
        names[1]=names[0];
        scores[0]=Points;
        names[0]=playerName;
   }
   else if(Points > scores[1])
   {
        scores[2]=scores[1];
        names[2]=names[1];
        scores[1]=Points;
        names[1]=playerName;
   }
   else if(Points > scores[2])
   {
        scores[2]=Points;
        names[2]=playerName;
   }
   sc1.textContent = names[0].toString() + ": " + scores[0].toString();
   sc2.textContent = names[1].toString() + ": " + scores[1].toString();
   sc3.textContent = names[2].toString() + ": " + scores[2].toString();
}

function end()
{
        clearInterval(int1);
        clearInterval(int2);
        clearInterval(int3);
        clearInterval(int4);
        clearInterval(int5);  
        alert("Game ended! Your score: " + Points.toString());
        writeScores();
        Points =0;
        mins =2;
        sec =59;
        level =0;
        clearCanvas();
        Rectangles=[];
        InitializeRectangles();
        show_prompt();
 int1 = setInterval(decreaseRectangles, 1000);
 int2 = setInterval(decreaseTime, 1000);
 int3 = setInterval(moveCircle, 10);
 int4 = setInterval(levelUp, 60000);
 int5 = setInterval(InitializeRectangles, 60000);
 timeout = setTimeout(end,180000)
}

show_prompt();

 int1 = setInterval(decreaseRectangles, 1000);
 int2 = setInterval(decreaseTime, 1000);
 int3 = setInterval(moveCircle, 10);
 int4 = setInterval(levelUp, 60000);
 int5 = setInterval(InitializeRectangles, 60000);
 timeout = setTimeout(end,180000)



