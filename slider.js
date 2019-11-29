'use strict';
(function () {


var sliderDynamic = function (minValue,maxValue){

var startCoord;
var currentCoord;
var startD;
var d = 0;
var max = 320;
var range = (maxValue - minValue)/max;
console.log(range);
var pointStartTranslate = function(evt){
  console.log(0);
  startCoord = evt.clientX;
  startD = d;
  point_value.classList.remove('hidden');
  console.log(startCoord,evt.clientX);
    document.addEventListener('mousemove',pointMove);
    document.addEventListener('mouseup',pointMoveStop);
}

var pointMove = function(evt){
  currentCoord = evt.clientX;
  d = startD + currentCoord - startCoord;
  if(d>0&&d<max){
    point.style.left = d + 'px';
    point_value.style.left = d + 'px';
    point_value.textContent = Math.round(minValue + d*range);
    console.log(startCoord,evt.clientX,currentCoord,point.style.left,d);
  }else if(d<=0){
    d=0;
    point.style.left = d + 'px';
    point_value.style.left = d + 'px';
    point_value.textContent = Math.round(minValue + d*range);
  }else{
    d=max;
    point.style.left = d + 'px';
    point_value.style.left = d + 'px';
    point_value.textContent = Math.round(minValue + d*range);
  }
}

var pointJump = function(evt) {
  currentCoord = evt.clientX;
  point_value.classList.remove('hidden');
  d = currentCoord - scale_coord.left-15;
  point.style.left = d + 'px';
  point_value.style.left = d + 'px';
  point_value.textContent = Math.round(minValue + d*range);
  point.addEventListener('mouseup',function () {
    console.log('ok');
    point_value.classList.add('hidden');
  });
  console.log(startCoord,evt.clientX,currentCoord,point.style.left,d);

}

var pointMoveStop = function(evt) {
  console.log(1);
  document.removeEventListener('mousemove',pointMove);
  document.removeEventListener('mouseup',pointMoveStop);
  point_value.classList.add('hidden');
}

var point = document.querySelector('.point');
var point_value = document.querySelector('.point_value');
var scale = document.querySelector('.scale')
var scale_coord = scale.getBoundingClientRect();
point_value.textContent = minValue;
point.addEventListener('mousedown',pointStartTranslate);
scale.addEventListener('mousedown',pointJump);
}

sliderDynamic(5,9);

console.log('sdfsdf');
})();
