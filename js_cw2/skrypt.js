var expect = chai.expect;


"use strict";

    var persNum =0;
    var pers1 = {przyr: 4.5, mat: 3};
    var persons = new Map();
    var rates = [];



    var frm3 = document.forms.f3;
    var frm2 = document.forms.f2;
    function add()
    {
        var res = frm2.elements.pole_tekstowe.value.split(" ");

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



    function wp(){
    for (var [key, value] of persons) {
        console.log(key + ' index' + value);
      }
    }

    function wr(){
        for (var h in rates) {
            for (var [key, value] of persons) {
                if (value == h) console.log(key);
              }
            for (var [key, value] of rates[h]) {
                console.log(key + ': ' + value);
            }
            //console.log(rates.length);
          }
        }

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
            sum = parseInt(sum) + parseInt(value);
            count = count +1;
        }
        //console.log(sum);
        //console.log(count);
        var a = sum / count;
        console.log(a);
        //return a;
    } 

    /*
describe('Funkcja avg()', function() {
    it('Zwraca 4.5 dla mac', function() {
      persons.set("mac", persNum+1);
      persNum=persNum+1;
      rates[persNum] = new Map();
            rates[persNum].set("mat", 4);
            rates[persNum].set("bio", 5);
            expect(avg("mac").to.equal(4.5));
    }); 
   });
   */