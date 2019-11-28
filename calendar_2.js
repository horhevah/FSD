'use strict'
var addDiv = function(parent,cssclass){
  var elem = document.createElement('div');
  elem.className=cssclass;
  parent.appendChild(elem);
  return elem;
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

var mouths = [];
  mouths[0] = {
    name: 'Январь',
    maxDate: 31,
    startDayOfWeek: 1,
    prevMaxDate: 31,
  };
  mouths[1] = {
    name: 'Февраль',
    maxDate: 28
  };
  mouths[2] = {
    name: 'Март',
    maxDate: 31
  };
  mouths[3] = {
    name: 'Апрель',
    maxDate: 30
  };
  mouths[4] = {
    name: 'Май',
    maxDate: 31
  };
  mouths[5] = {
    name: 'Июнь',
    maxDate: 30
  };
  mouths[6] = {
    name: 'Июль',
    maxDate: 31
  };
  mouths[7] = {
    name: 'Август',
    maxDate: 31
  };
  mouths[8] = {
    name: 'Сентябрь',
    maxDate: 30
  };
  mouths[9] = {
    name: 'Октябрь',
    maxDate: 31
  };
  mouths[10] = {
    name: 'Ноябрь',
    maxDate: 30
  } ;
  mouths[11] = {
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
var currentMouth=0;

var daysOfWeek = ['пн','вт','ср','чт','пт','сб','вс'];
var day = [];
var calendar = document.querySelector('.form-3');
var header = calendar.querySelector('.calendar_header');
var prev = calendar.querySelector('.prev_mouth');
var mouthName = calendar.querySelector('.mouth_name');
var next = calendar.querySelector('.next_mouth');
mouthName.textContent = mouths[currentMouth].name + '/' + currentYear;
var week = addDiv(calendar,'days-of-week');
for(var i=0;i<7;i++) {
 var dayOfWeek  = addDiv(week,'day-of-week day-of-week-'+i);
 dayOfWeek.textContent = daysOfWeek[i];
}

var weeks = renderCalendar(mouths[currentMouth]);
calendar.appendChild(weeks);
prev.addEventListener('click',function(evt){
 calendar.removeChild(weeks);
 currentMouth--;
 if(currentMouth<0){
   currentMouth=11;
   currentYear--;
   mouths[11].startDayOfWeek = (mouths[0].startDayOfWeek - mouths[11].maxDate%7 + 7) % 7;
 }else{
 mouths[currentMouth].startDayOfWeek = (mouths[currentMouth+1].startDayOfWeek - mouths[currentMouth].maxDate%7 + 7) % 7;
 }
 mouthName.textContent = mouths[currentMouth].name + '/' + currentYear;
 weeks = renderCalendar(mouths[currentMouth]);
 calendar.appendChild(weeks);
})
next.addEventListener('click',function(evt){
 calendar.removeChild(weeks);
 currentMouth++;
 if(currentMouth>11){
  currentMouth=0;
  currentYear++;
  mouths[0].startDayOfWeek = (mouths[0].maxDate%7+mouths[11].startDayOfWeek)%7;
 }else{
 mouths[currentMouth].startDayOfWeek = (mouths[currentMouth-1].maxDate%7+mouths[currentMouth-1].startDayOfWeek)%7;
 }
 weeks = renderCalendar(mouths[currentMouth]);
 mouthName.textContent = mouths[currentMouth].name  + '/' + currentYear;
 calendar.appendChild(weeks);
})
