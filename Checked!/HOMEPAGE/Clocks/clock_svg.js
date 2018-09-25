var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var radius = (canvas.height / 2) * 0.9;
ctx.translate(canvas.width/2,canvas.height/2);
setInterval(ShowTime, 1000);

//funzione principale che richiama tutte le altre
function ShowTime(){
  drawTime(ctx, radius);
}


function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.10 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.75);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.75);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
//inizializzare un date object e dichiarazione delle variabili con le sue proprietà
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  console.log(hour + 'h ' + minute + 'min '+ second + 's' )
  //calcolo del modulo necessario a portare le ore dal formato 24 a quello 12
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.06);

  //minute, calculate the angle
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.6, radius*0.04);

  // second, calculate the angle
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.7, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
