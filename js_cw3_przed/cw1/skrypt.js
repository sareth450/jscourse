var going = false;
var d=new Date();
var timeFunInterval = d.getTime(); 
var timeFunTimeout = d.getTime(); 
var timeFunRequest = d.getTime();

var animCanc;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function randomTime()
{
    return Math.floor((Math.random() * 4) + 2)*1000;
}      

function goInterval(){
    idInterwalu = setInterval(funInterval, 1000);
}

async function funInterval()
{
    while(going){
    await sleep(randomTime());
    var d2 = new Date();
    console.log("Interval: " + (d2.getTime()-timeFunInterval).toString() );
    var d3 = new Date();
    timeFunInterval = d3.getTime();   
}
}

async function funTimeout()
{
    while(going){
    await sleep(randomTime());
    var d2 = new Date();
    console.log("Timeout: " + (d2.getTime()-timeFunTimeout).toString());
    var d3 = new Date();
    timeFunTimeout = d3.getTime();
    window.setTimeout(2000,funTimeout());
}
}

async function funRequest()
{
    while(going){
    await sleep(randomTime());
    var d2 = new Date();
    console.log("Request: " + (d2.getTime()-timeFunRequest).toString());
    var d3 = new Date();
    timeFunRequest = d3.getTime();
    animCanc = window.requestAnimationFrame(funRequest)
}
}

function start()
{     
        going = true;
        goInterval();
        funRequest();
        funTimeout();
}

function stop()
{
    going=false;
    console.log("stopping");
    window.clearInterval(idInterwalu);
    window.clearTimeout();
    window.cancelAnimationFrame(animCanc);
}