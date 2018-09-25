var data = new Date(); 

var giorno = data.getDay();
var mese = data.getMonth();
var date= data.getDate();
var anno= data.getFullYear();


if(giorno == 0) giorno = "Domenica";
if(giorno == 1) giorno = "Lunedì";
if(giorno == 2) giorno = "Martedì";
if(giorno == 3) giorno = "Mercoledì";
if(giorno == 4) giorno = "Giovedì";
if(giorno == 5) giorno = "Venerdì";
if(giorno == 6) giorno = "Sabato";

if(mese == 0) mese = "Gennaio";
if(mese == 1) mese = "Febbraio";
if(mese == 2) mese = "Marzo";
if(mese == 3) mese = "Aprile";
if(mese == 4) mese = "Maggio";
if(mese == 5) mese = "Giugno";
if(mese == 6) mese = "Luglio";
if(mese == 7) mese = "Agosto";
if(mese == 8) mese = "Settembre";
if(mese == 9) mese = "Ottobre";
if(mese == 10) mese = "Novembre";
if(mese == 11) mese = "Dicembre";
console.log('year:' + anno +' month:'+ mese +' day:' + giorno);

var $next = $('#next');
var $prev = $('#prev');
//console.log(next);
$("#month").text(mese);
$("#year").text(anno);
