var http = require("http");
var url = require("url");
var str="";
const fs = require('fs');
//const readline = require('readline');
//
//const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//  });


 
http.createServer(function(request, response) {
    /*
      ,,request''  - strumień wejściowy - zawiera dane otrzymane od przeglądarki, np. zakodowaną zawartość pól formularza HTML
       
      ,,response'' - strumień wyjściowy - umieszcza się w nim dane, które chcemy odesłać przeglądarce.
        Odpowiedź, wysyłana za pomocą tego strumienia, musi się składać z dwóch części: nagłówka oraz ciała.
        W nagłówku umieszcza się, m.in., informację o typie (MIME) danych  zawartych w ciele.
        W ciele umieszcza się właściwe dane, np. definicję formularza.
    */
    console.log("--------------------------------------")
    console.log("Względny adres URL bieżącego żądania: "+request.url+"\n")
    var url_parts = url.parse(request.url,true); //parsowanie (względnego) adresu URL
     
    if(url_parts.pathname == '/submit') { //Przetwarzanie zawartości formularza, jeżeli względny URL to '/submit' 
        var line=url_parts.query['imie'];
       // var res = readLine(imie); //Odczytaj zawartość pola (formularza) o nazwie 'imie'
        //console.log(str + "here");
        console.log("Tworzenie nagłówka odpowiedzi")
        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});  //Tworzenie nagłówka odpowiedzi - informujemy przeglądarkę, że w ciele odpowiedzi będzie zwykły tekst (text/plain)
        console.log("Tworzenie ciała odpowiedzi")
        response.write('Path: '+line);
        //response.write('here'); //Umieść podane dane (tu: tekst 'Witaj ...') w ciele odpowiedzi
        str="";
        fs.exists(line, (exists) => {
        //console.log(str);
        if(exists){
            fs.stat(line, function (err, stats) {
                if (err) {
                    console.log(err);
                    throw err;
                    return; // exit here since stats will be undefined
                }
                
                if (stats.isFile()) {
                        str = "It's a file. Content:\n";
                        fs.readFile(line, (err, data) => {
                            if (err) throw err;
                            content = data.toString();
                            str = str + content;
                            console.log(str);
                        });
                          
                };
                if (stats.isDirectory()) {
                    str = "It's a dir.\n";
                    console.log(str);
        //            return str;
                }
               // console.log("hehe" + str);
            });
        }
        else {
            str = "Path doesnt exist.";
            console.log(str);
      //      return str;
        }
    });
        console.log("Wysyłanie odpowiedzi")
        response.end(); //Koniec odpowiedzi - wyślij ją do przeglądarki
        
        
    }
    else { //Generowanie formularza
        console.log("Tworzenie nagłówka odpowiedzi")
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  //Tworzenie nagłówka odpowiedzi - informujemy przeglądarkę, że w ciele odpowiedzi będzie tekst w formacie HTML
        //a teraz  w ciele odpowiedzi umieszczamy formularz HTML
        console.log("Tworzenie ciała odpowiedzi")
        response.write('<form method="GET" action="/submit">');
        response.write('<label for="imie">Podaj swoje imię</label>');
        response.write('<input name="imie">');
        response.write('<br>');
        response.write('<input type="submit">');
        response.write('<input type="reset">');
        response.write('</form>');
        response.end();  //Koniec odpowiedzi - wyślij ją do przeglądarki
        console.log("Wysyłanie odpowiedzi")
    } 
}).listen(8080);
console.log("Uruchomiono serwer na porcie 8080");
console.log("Aby zakończyć działanie serwera, naciśnij 'CTRL+C'");
