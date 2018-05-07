const modul = require('./modul');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


function readLine (line)
{
        var sum = line.split(" ");
        var res = modul.suma(parseInt(sum[0]),parseInt(sum[1]));
        console.log("suma: " + res);
        process.exit();
}

rl.on('line', readLine);
rl.on('line', readLine);
rl.on('line', readLine);
rl.on('line', readLine);

/*
console.log(modul.suma(r1,r2));

console.log(modul.suma(r1,r2));

console.log(modul.suma(r1,r2));

console.log(modul.suma(r1,r2));*/