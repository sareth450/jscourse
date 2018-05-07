var value=10;
var idInt;

var form = document.forms.form;



function decrease()
{
    if(value>0)
    {
        var s1 = document.getElementById("s1");
        var s2 = document.getElementById("s2");
        var s3 = document.getElementById("s3");
        var s4 = document.getElementById("s4");
        s1.textContent = value.toString();
        s2.textContent = value.toString();
        s3.textContent = value.toString();
        s4.textContent = value.toString();
        value = value-1;
    }
    else
    {
        window.clearInterval(idInt);
    }
}

function set(){
    value = parseInt(form.elements.pole_tekstowe.value);
    decrease();
}

idInt = window.setInterval(decrease, 1000);
decrease();
