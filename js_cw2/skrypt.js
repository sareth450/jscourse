var expect = chai.expect;


"use strict";

    var persNum =0;
    var pers1 = {przyr: 4.5, mat: 3};
    var persons = new Map();
    var rates = [];
    var window = document.getElementById('wykres');
    var avgs = [];

    var frm4 = document.forms.f4;
    var frm3 = document.forms.f3;
    var frm2 = document.forms.f2;
    function add()
    {
        var res = frm2.elements.pole_tekstowe.value.split(" ");
        if (parseFloat(res[2]) > 5.0 || paresFloat(res[2]) < 2.0)
            {
                console.log("zła ocena!");

                return;
            }
        if(persons.has(res[0]))
            {
                var idx = persons.get(res[0]);
                var rating = rates[idx];
                rating.set(res[1], res[2]);
            }
        else{
            persons.set(res[0], persNum+1);
            persNum=persNum+1;
            rates[persNum] = new Map();
            rates[persNum].set(res[1], res[2]);
        }
    }        

    function wp(){ //wypisz ludzi
    for (var [key, value] of persons) {
        console.log(key + ' index: ' + value);
      }
    }


    function wr(){//wypisz oceny
        for (var h in rates) {
            for (var [key, value] of persons) {
                if (value == h) console.log(key);
              }
            for (var [key, value] of rates[h]) {
                console.log(key + ': ' + value);
            }
          }
        }
    /*
    * funkcja liczaca średnią ocen danej osoby
    * otrzymuje jako argument imie osoby
    * 
    */
    function avg(res)
    {
    
        
        if(!persons.get(res))
        {
            console.log('nie ma takiej osoby');
            return;
        }
        var idx = persons.get(res);

        var count =0;
        var sum=0;

        for (var [key, value] of rates[idx]) {
            sum = parseFloat(sum) + parseFloat(value);
            count = count +1;
        }
        var a = sum / count;
        console.log(a);
        return a;
    } 

    /*
    * funkcja liczaca medianę ocen danej osoby
    * korzysta z funkcji biblioteki math.js
    * otrzymuje jako argument imie osoby
    * 
    */
    function med(res) 
    {
        if(!persons.get(res))
        {
            console.log('nie ma takiej osoby');
            return;
        }

        var idx = persons.get(res);

        var rts = [];
        
        for (var [key, value] of rates[idx]) {
            rts.push(parseFloat(value));
        }


        var a = math.median(rts); 
        console.log(a);
        return a;
    }

    /*
    * funkcja liczaca standardowe odchylenie średnich wszystkich osób 
    * korzysta z funkcji biblioteki math.js oraz avg() 
    * otrzymuje jako argument imie osoby
    */
    
   function stDev() 
   {
       avgs =[];
       for (var [key, value] of persons) {
        var accAvg = avg(key);
        avgs.push(accAvg);
       }
       
       var a = math.std(avgs);
       console.log(a);
       return a;
   }

    function createAvgs()
    {
        avgs = [];
        for (var [key, value] of persons) {
            var accAvg = avg(key);
            avgs.push(accAvg);
           }
    }
    //testy
   describe('Funkcja avg()', function() {
    it('Zwraca 4.5 dla maciek, oceny mat:4, biol:5. ', function() {
            expect(avg("maciek")).to.equal(4.5);
    }); 
    it('Zwraca 2.5 dla paweł, oceny ang:2, pol:2, wf: 4, mat: 2. ', function() {
              expect(avg("paweł")).to.equal(2.5);
      });
      it('Zwraca 3.5 dla adam, oceny ang:3, pol:3, wf: 5, mat: 3. ', function() {
        expect(avg("adam")).to.equal(3.5);
}); 
   });
   
   describe('Funkcja med()', function() {
    it('Zwraca 3.5 dla michał, oceny ang:3, pol:3, wf: 5, mat: 3. ', function() {
              expect(med("michał")).to.equal(3);
      });
   });

   describe('Funkcja stDev()', function() {
    it('Zwraca 0.816496580927726 dla danych powyżej  ', function() {
              expect(stDev()).to.equal(0.816496580927726);
                //wartośc oczekiwana wyliczona z pomocą kalkulatora odchylenia standardowego
      });
   });
   persons.set("paweł", persNum+1);
        persNum=persNum+1;
        rates[persNum] = new Map();
              rates[persNum].set("ang", 2);
              rates[persNum].set("pol", 2);
              rates[persNum].set("wf", 4);
              rates[persNum].set("mat", 2);

   persons.set("michał", persNum+1);
        persNum=persNum+1;
        rates[persNum] = new Map();
              rates[persNum].set("ang", 3);
              rates[persNum].set("pol", 3);
              rates[persNum].set("wf", 5);
              rates[persNum].set("mat", 3);

   persons.set("adam", persNum+1);
        persNum=persNum+1;
        rates[persNum] = new Map();
              rates[persNum].set("ang", 3);
              rates[persNum].set("pol", 3);
              rates[persNum].set("wf", 5);
              rates[persNum].set("mat", 3);

    persons.set("maciek", persNum+1);
        persNum=persNum+1;
        rates[persNum] = new Map();
                rates[persNum].set("mat", 4);
                rates[persNum].set("bio", 5);

   
// wykres kołowy średnuich wszystkich uczniów


function drawChart(){

    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var lastend = 0;
    var myTotal = 0; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createAvgs(); //aktualizuj srednie
var avgsCount = [];
var avgsLabels = [];
for(var j=0; j<avgs.length; j++)
  {
    avgsCount.push(-1);
    avgsLabels.push(-1);
  }
  //zliczam ilość wystapień srednich przypisujeim etykiete w osobnej tablicy

    for(var i=0; i<avgs.length; i++)
    {     
        for(var j=0; j<avgsLabels.length; j++){
          if(avgsLabels[j] == -1)
          {
              avgsLabels[j] = avgs[i].toString();
              avgsCount[j] = 1;
              break;
          }
          else if(avgsLabels[j].toString() == avgs[i].toString())
          {
            avgsCount[j]++;
              break;
          }
    }
    } 
    //usuwam niepotrzebne rekordy
for(var k=avgs.length-1; k>=0; k--)
{
     if(avgsLabels[k]==-1){
        avgsLabels.pop();
        avgsCount.pop();
     }    
     else {
         break;
     }
 } 
    //losowy kolor
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

   for (var e = 0; e < avgsCount.length; e++) {
     myTotal += avgsCount[e];
   }
   
   for (var i = 0; i < avgsCount.length; i++) {
     ctx.fillStyle = getRandomColor();
     //wypisanie wartości procentowej aktualnej sredniej
     var percentage = parseFloat(parseFloat(100)*(parseFloat(avgsCount[i]) / parseFloat(myTotal)));
     var label = (avgsLabels[i].toString() + " -- " + percentage.toString() + "%");
     var ctx = canvas.getContext("2d");
     ctx.font = "15px Arial";
     ctx.fillText(label,10,18*(i+1));
     ctx.beginPath();
     ctx.moveTo(canvas.width / 2 + 100, canvas.height / 2);
     // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
     ctx.arc(canvas.width / 2 + 100, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (avgsCount[i]  / myTotal)), false);
     ctx.lineTo(canvas.width / 2 + 100, canvas.height / 2);
     ctx.fill();
     lastend += Math.PI * 2 * (avgsCount[i] / myTotal);
   }

}




