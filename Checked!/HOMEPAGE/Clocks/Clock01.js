var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var radius = (canvas.height / 2) * 0.9;
ctx.translate(canvas.width/2,canvas.height/2);
setInterval(ShowTime, 1000);

//funzione principale che richiama tutte le altre
function ShowTime(){
  //ctx.clearRect(0,0, canvas.width, canvas.height);
  drawClock(ctx, radius);
  drawTime(ctx, radius);
  drawNumbers(ctx, radius)
}

function drawClock(ctx, radius){

  /*ombra interna
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = radius*0.05;
    ctx.strokeStyle = '#000';
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.arc(0, 0, radius*0.9, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();*/
  //disegna lo sfondo bianco
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
  //disegna il bordo nero
    ctx.strokeStyle = '#000';
    ctx.lineWidth = radius*0.05;
    ctx.stroke();
  //aggiungere shadow nera interna al bordo box-shadow:
    /*ctx.beginPath();
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fill();*/
  //disegna il punto centrale
    ctx.beginPath();
    ctx.arc(0, 0, radius/15, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

  //disegna le tacche delle ore
    for (var i = 0; i < 12; i++){
    // il +1 evita un glitch che crea una linea nera che va da la tacca delle 2 fino a la tacca delle 3 , per questo il +1
      var angle = i*Math.PI/6;
      var x1 = Math.cos(angle) * (radius);
      var y1 = Math.sin(angle) * (radius);
      var x2 = Math.cos(angle) * (radius - (radius / 7));
      var y2 = Math.sin(angle) * (radius - (radius / 7));
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = radius*0.02;
      ctx.stroke();
    }
  //disegna le tacche dei secondi
    for (i = 0; i < 60; i++){
      angle = i*Math.PI/30;
      x1 = Math.cos(angle) * (radius);
      y1 = Math.sin(angle) * (radius);
      x2 = Math.cos(angle) * (radius - (radius / 15));
      y2 = Math.sin(angle) * (radius - (radius / 15));
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = radius*0.01;
      ctx.stroke();
    }
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
