'use strict'
var addDiv = function(parent,cssclass){
  var elem = document.createElement('div');
  elem.className=cssclass;
  parent.appendChild(elem);
  return elem;
}



var createYear = function(y){
  var year={
     mouths:[]
  };
  for (var i = 0; i < years[2019].mouths.length; i++) {
  var o={};
  year.mouths.push(o);
  year.mouths[i].name = years[2019].mouths[i].name;
  year.mouths[i].maxDate = years[2019].mouths[i].maxDate;
  year.mouths[i].prevMaxDate = years[2019].mouths[i].prevMaxDate;
  }
  year.mouths[0].startDayOfWeek = years[2019].mouths[0].startDayOfWeek
  if (years[y-1]==undefined){
    year.mouths[0].startDayOfWeek = years[y+1].mouths[0].startDayOfWeek - 1;
  }else{
    year.mouths[0].startDayOfWeek = years[y-1].mouths[0].startDayOfWeek + 1;
  }
  if (y%4==0){
      year.mouths[1].maxDate = 29;
      year.mouths[2].prevMaxDate = 29;
      if (years[y-1]==undefined){
        year.mouths[0].startDayOfWeek = years[y+1].mouths[0].startDayOfWeek - 2;
      }
  }
  if(y%4==1){
    if(years[y-1]!=undefined)
    year.mouths[0].startDayOfWeek = years[y-1].mouths[0].startDayOfWeek + 2;
  }
  for (var i = 1; i < year.mouths.length; i++) {

    year.mouths[i].prevMaxDate = year.mouths[i-1].maxDate;
    year.mouths[i].startDayOfWeek = (year.mouths[i-1].maxDate%7+year.mouths[i-1].startDayOfWeek)%7;
  }
    return year;
}





var checkedDate = function(evt){
  if(!evt.target.classList.contains('checked')&&n<2){
    evt.target.classList.add('checked');
    if(points.start!==undefined){
      points.finish = +evt.target.textContent;
    }else {
      points.start = +evt.target.textContent;
    }
    console.log(points.start,points.finish);
    if (points.start>points.finish) {
      var c = points.start;
      points.start = points.finish;
      points.finish = c;
    }
    for(var i=points.start+1; i<points.finish; i++){
      document.querySelector('.day-'+i).classList.add('mchecked');
      document.querySelector('.day-'+points.start).classList.add('startchecked');
      document.querySelector('.day-'+points.finish).classList.add('finishchecked');
    }
    n++;
 }
  else {
    evt.target.classList.remove('checked');
    for(var p in points){
      console.log(+evt.target.textContent==points[p]);
      if(+evt.target.textContent==points[p]){
        for(var i=points.start+1; i<points.finish; i++){
          document.querySelector('.day-'+i).classList.remove('mchecked');
          document.querySelector('.day-'+points.start).classList.remove('startchecked');
          document.querySelector('.day-'+points.finish).classList.remove('finishchecked');
        }
        points[p] = undefined;
        n--;
      }
    }
  }
}


var renderCalendar = function (mouth){
  var container =document.createElement('div');
  container.className='calendar';
  var i=0;
  while(i<mouth.startDayOfWeek){
    if(i%7==0){
     var week = addDiv(container,'week week-'+Math.trunc(i/7));
   }
   day[i] = addDiv(week,'grey day day- '+(i-mouth.startDayOfWeek-1));
   day[i].textContent=i-mouth.startDayOfWeek+mouth.prevMaxDate+1;
   i++;
  }
  var textContent=0;
  while (textContent<mouth.maxDate) {
   if(i%7==0){
    var week = addDiv(container,'week week-'+Math.trunc(i/7));
   }
   day[i] = addDiv(week,'day day-'+(i-mouth.startDayOfWeek+1));
   day[i].textContent=i-mouth.startDayOfWeek+1;
   day[i].addEventListener('click',checkedDate);
   textContent=+day[i].textContent;
   i++;
  }
  while(i%7!=0){
   day[i] = addDiv(week,'grey day day-'+(i-mouth.startDayOfWeek+1));
   day[i].textContent=i-mouth.startDayOfWeek+1-mouth.maxDate;
   i++;
  }
  return container;
}


var years = [];
years[2019] ={};
var mouths = [];
years[2019].mouths = mouths;

  years[2019].mouths[0] = {
    name: 'Январь',
    maxDate: 31,
    startDayOfWeek: 1,
    prevMaxDate: 31,
  };
  years[2019].mouths[1] = {
    name: 'Февраль',
    maxDate: 28
  };
  years[2019].mouths[2] = {
    name: 'Март',
    maxDate: 31
  };
  years[2019].mouths[3] = {
    name: 'Апрель',
    maxDate: 30
  };
  years[2019].mouths[4] = {
    name: 'Май',
    maxDate: 31
  };
  years[2019].mouths[5] = {
    name: 'Июнь',
    maxDate: 30
  };
  years[2019].mouths[6] = {
    name: 'Июль',
    maxDate: 31
  };
  years[2019].mouths[7] = {
    name: 'Август',
    maxDate: 31
  };
  years[2019].mouths[8] = {
    name: 'Сентябрь',
    maxDate: 30
  };
  years[2019].mouths[9] = {
    name: 'Октябрь',
    maxDate: 31
  };
  years[2019].mouths[10] = {
    name: 'Ноябрь',
    maxDate: 30
  } ;
  years[2019].mouths[11] = {
    name: 'Декабрь',
    maxDate: 31
  };

for (var i = 1; i < mouths.length; i++) {
  mouths[i].prevMaxDate = mouths[i-1].maxDate;
  mouths[i].startDayOfWeek = (mouths[i-1].maxDate%7+mouths[i-1].startDayOfWeek)%7;
}

var currentYear=2019;
var points={};
var n=0;
var currentMouth=11;
var daysOfWeek = ['пн','вт','ср','чт','пт','сб','вс'];
var day = [];
var calendar = document.querySelector('.form-3');
var header = calendar.querySelector('.calendar_header');
var prev = calendar.querySelector('.prev_mouth');
var mouthName = calendar.querySelector('.mouth_name');
var next = calendar.querySelector('.next_mouth');
mouthName.textContent = years[currentYear].mouths[currentMouth].name + '/' + currentYear;
var week = addDiv(calendar,'days-of-week');
for(var i=0;i<7;i++) {
 var dayOfWeek  = addDiv(week,'day-of-week day-of-week-'+i);
 dayOfWeek.textContent = daysOfWeek[i];
}

var weeks = renderCalendar(years[currentYear].mouths[currentMouth]);
calendar.appendChild(weeks);
prev.addEventListener('click',function(evt){
 calendar.removeChild(weeks);
 currentMouth--;
 if(currentMouth<0){
   currentMouth=11;
   currentYear--;
   if(years[currentYear]==undefined){
     years[currentYear] = createYear(currentYear);
   }
 }
 mouthName.textContent = years[currentYear].mouths[currentMouth].name + '/' + currentYear;
console.log(years[currentYear].mouths[currentMouth].startDayOfWeek);
console.log(years[2019].mouths[11].startDayOfWeek);
 weeks = renderCalendar(years[currentYear].mouths[currentMouth]);
 calendar.appendChild(weeks);
 console.log(years[2019].mouths[11].startDayOfWeek);
})
next.addEventListener('click',function(evt){
 calendar.removeChild(weeks);
 currentMouth++;
 if(currentMouth>11){
  currentMouth=0;
  currentYear++;
  if(years[currentYear]==undefined){
    years[currentYear] = createYear(currentYear);
  }
 }
 weeks = renderCalendar(years[currentYear].mouths[currentMouth]);
 mouthName.textContent = years[currentYear].mouths[currentMouth].name  + '/' + currentYear;
 calendar.appendChild(weeks);
 console.log(years[2019].mouths[11].startDayOfWeek);
})













var startCoord;
var currentCoord;
var startD;
var d = 0;
var max = 320;
var pointStartTranslate = function(evt){
  console.log(0);
  startCoord = evt.clientX;
  startD = d;
  console.log(startCoord,evt.clientX);
    document.addEventListener('mousemove',pointMove);
    document.addEventListener('mouseup',pointMoveStop);
}

var pointMove = function(evt){
  currentCoord = evt.clientX;
  d = startD + currentCoord - startCoord;
  if(d>=0&&d<max){
    point.style.left = d + 'px';
    console.log(startCoord,evt.clientX,currentCoord,point.style.left,d);
  }else if(d<=0){
    d=0;
    point.style.left = d + 'px';
  }else{
    d=max;
    point.style.left = d + 'px';
  }

  }

var pointMoveStop = function(evt) {
  console.log(1);
  document.removeEventListener('mousemove',pointMove);
  document.removeEventListener('mouseup',pointMoveStop);
}

var point = document.querySelector('.point');

point.addEventListener('mousedown',pointStartTranslate);
