'use strict';
(function () {

var addDiv = function(parent,cssclass){
  var elem = document.createElement('div');
  elem.className=cssclass;
  parent.appendChild(elem);
  return elem;
}

var checkedDate = function(evt){
  if(!evt.target.classList.contains('checked')&&n<2){
    evt.target.classList.add('checked');

    if(startDate.day!==undefined){
      finishDate.day = +evt.target.textContent;
      finishCheck = +evt.target.textContent;
      finishDate.mouth = currentMouth;
    }else {
      startDate.day = +evt.target.textContent;
      startCheck = +evt.target.textContent;
      startDate.mouth = currentMouth;
    }

    if (startDate.day>finishDate.day&&startDate.mouth >= finishDate.mouth) {
      var c = startDate.day;
      startDate.day = finishDate.day;
      startCheck = startDate.day;
      finishDate.day = c;
      finishCheck = c;
    }

    console.log(startDate.day,finishDate.day,startCheck);

    for(var i=startCheck+1; i<finishCheck; i++){
      document.querySelector('.day-'+i).classList.add('mchecked');
      document.querySelector('.day-'+startDate.day).classList.add('startchecked');
      document.querySelector('.day-'+finishDate.day).classList.add('finishchecked');
    }
    n++;
 }
  else {
    evt.target.classList.remove('checked');
    if(+evt.target.textContent==startDate.day||+evt.target.textContent==finishDate.day){
        for(var i=startCheck+1; i<finishCheck; i++){
        document.querySelector('.day-'+i).classList.remove('mchecked');
        document.querySelector('.day-'+startDate.day).classList.remove('startchecked');
        document.querySelector('.day-'+finishDate.day).classList.remove('finishchecked');
      }
      if(+evt.target.textContent==startDate.day){
        startDate.day = finishDate.day;
        startCheck = startDate.day;
        finishDate.day = undefined;
      } else{
        finishDate.day = undefined;

      }
      n--;
    }
  }
  console.log(startDate.day,finishDate.day);
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

var prevClick = function(evt){
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
 if(startDate.day&&!finishDate.day){
   finishDate.day = startDate.day;
   startDate.day = undefined;
   startDate.mouth = currentMouth;
   finishCheck = mouths[currentMouth].maxDate+1;
 } else{
   startDate.day = undefined;
   finishDate.day = undefined;
   n=0;
 }

 console.log(points.start,points.finish);
 calendar.appendChild(weeks);
}




var nextClick = function(evt){
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

if(startDate.day&&!finishDate.day){
  startCheck = 0;
  finishDate.mouth = currentMouth;
} else{
  startDate.day = undefined;
  finishDate.day = undefined;
  n=0;
}

console.log(points.start,points.finish);

 calendar.appendChild(weeks);
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
var n=0;
var currentMouth=0;
var startDate = {};
var finishDate = {};
var points = {};
var startCheck;
var finishCheck;
startDate.year = currentYear;
finishDate.year = currentYear;
startDate.mouth = currentMouth;
finishDate.mouth = currentMouth;

var daysOfWeek = ['пн','вт','ср','чт','пт','сб','вс'];
var day = [];
var calendar = document.querySelector('.form-3');
var header = calendar.querySelector('.calendar_header');
var prev = calendar.querySelector('.prev_mouth');
var mouthName = calendar.querySelector('.mouth_name');
var next = calendar.querySelector('.next_mouth');
prev.addEventListener('click',prevClick);
next.addEventListener('click',nextClick);
mouthName.textContent = mouths[currentMouth].name + '/' + currentYear;
var week = addDiv(calendar,'days-of-week');
for(var i=0;i<7;i++) {
 var dayOfWeek  = addDiv(week,'day-of-week day-of-week-'+i);
 dayOfWeek.textContent = daysOfWeek[i];
}



var weeks = renderCalendar(mouths[currentMouth]);
calendar.appendChild(weeks);


})();










var checkedDate_old = function(evt){
  if(!evt.target.classList.contains('checked')&&n<2){
    evt.target.classList.add('checked');
    if(points.start!==undefined){
      points.finish = +evt.target.textContent;
      finishDate.day = +evt.target.textContent;
    }else {
      points.start = +evt.target.textContent;

    }
    console.log(points.start,points.finish);
    if (points.start>points.finish) {
      var c = points.start;
      points.start = points.finish;
      points.finish = c;
    }
    startDate.day = points.start;
    finishDate.day = points.finish;

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
        if(!points.start){
        points.start = points.finish;
        points.finish = undefined;
      }
        console.log(points.start,points.finish);

      }
    }
    startDate.day = points.start;
    finishDate.day = points.finish;
  }
}
