var canvas = document.getElementById("canvas");//create a canvas object referencing canvas in HTML document
var ctx = canvas.getContext("2d");//specify that is a 2d drawing object
ctx.translate(radius, radius);//remap the (0,0) point to the center
var radius = canvas.height / 2;//calculate the radius based on height of the canvas
radius = radius * 0.90;//reduce the radius to draw the clock
setInterval(showTime, 1000);//call the function that actually draw the clock
var size = 100;
function showTime(){
  //clear canvas
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  //draw clock
  drawClock(radius);
  //draw the hands
  getTime();
}

function drawClock(radius){//disegna l'interfaccia dell'orologio

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = radius*0.05;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  //draw the hour marks
  for (var i = 0; i < 12; i++) {
    var angle = i * (Math.PI * 2) / 12;
    ctx.lineWidth = radius*0.2;
    ctx.beginPath();
    var x1 = radius + Math.cos(angle) * (size);
    var y1 = radius + Math.sin(angle) * (size);
    var x2 = radius + Math.cos(angle) * (size - (size / 7));
    var y2 = radius + Math.sin(angle) * (size - (size / 7));
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  //draw the second marks
  for (i = 0; i < 60; i++) {
    angle = i * (Math.PI * 2) / 60;
    ctx.lineWidth = radius*0.1;
    ctx.beginPath();
    x1 = radius + Math.cos(angle) * (size);
    y1 = radius + Math.sin(angle) * (size);
    x2 = radius + Math.cos(angle) * (size - (size / 30));
    y2 = radius + Math.sin(angle) * (size - (size / 30));
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

}

function getTime(){
  //inizializza delle variabili con valore dei minuti ore e secondi tramite l'oggetto date
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  /*the  angle calulation is divided in three parts for the hour , two for minutes
  and one for seconds. this because we need to simulate the movement of an analogic
  clock, that doesn't skip from an hour to another instantly but it slowly moves
  until it reach the next hour. same principle occurs for the minutes, even if you
  notice a lot less than hour hands*/
  //hour, calculate the angle.
  hour=hour%12;
  hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.06);
  //minute, calculate the angle
  minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.04);
  // second, calculate the angle
  second=(second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
