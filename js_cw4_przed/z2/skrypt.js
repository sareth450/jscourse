const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


function readLine (line)
{
        var exists = false;
        var file = false;
        if (fs.existsSync(line)) {
            exists = true;
        }
        console.log("Does path: \"" + line + "\" exists?: " + exists );
        if(exists){
            if (fs.lstatSync(line).isFile()) {
                console.log("It's a file. Content:\n");
                var data = fs.readFileSync(line);
                console.log(data.toString());
            }
            if (fs.lstatSync(line).isDirectory()) {
                console.log("It's a dir.");
           }
        }
        process.exit();
}

rl.on('line', readLine);





