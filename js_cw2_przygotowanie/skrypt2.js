var expect = chai.expect;
var sum =0;


"use strict";


function cyfry(napis)
{
    if (napis == "") {return 0;}
    else{
    return napis.match(/[0-9]/g).length;
    }
}

function litery(napis)
{
    if (napis == "") {return 0;}
    else{
    return napis.match(/[a-zA-Z]/g).length; 
    }
}

function suma(napis)
{
    var add = parseInt(napis)
    if(Number.isNaN(add))
    {
        sum = sum + 0;
    }
    else{
        sum = sum + add;
    }
}

describe('Funkcja cyfry()', function() {
    it('Zwraca 4 dla "1234"', function() {
      expect(cyfry("1234")).to.equal(4);
    }); 
    it('Zwraca 3 dla "abc"', function() {
       expect(litery("abc")).to.equal(3);
     });
     it('Zwraca 3 i 5 dla "abc12345"', function() {
        expect(litery("abc12345")).to.equal(3);
        expect(cyfry("abc12345")).to.equal(5);
      });
      it('Zwraca 6 i 4 dla "1234abcdef"', function() {
        expect(litery("1234abcdef")).to.equal(6);
        expect(cyfry("1234abcdef")).to.equal(4);
      });
      it('Zwraca 0 i 0 dla ""', function() {
        expect(litery("")).to.equal(0);
        expect(litery("")).to.equal(0);
      });
   });







function countstuff(input)
{   
    document.write(input);
    document.write("<br>");
    document.write(cyfry(input));
    document.write(" ");
    document.write(litery(input));
    document.write(" ");
    suma(input);
    document.write(sum);
    document.write("<br>");
}
while(window.confirm){
var input = window.prompt("input data");
countstuff(input);
};


