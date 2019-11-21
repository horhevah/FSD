'use strict'
var addDiv = function(parent,cssclass){
  var elem = document.createElement('div');
  elem.className=cssclass;
  parent.appendChild(elem);
  return elem;
}

var renderCalendar = function (mouth){
  var container =document.createElement('div');
  container.className='calendar';
  var i=0;
  while(i<mouth.startDayOfWeek){
    if(i%7==0){
     var week = addDiv(container,'week week-'+Math.trunc(i/7));
    }
   day[i] = addDiv(week,'day day-'+(i-mouth.startDayOfWeek+1));
   day[i].className = 'grey day day- '+(i-mouth.startDayOfWeek-1);
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

  textContent=+day[i].textContent;
  //console.log(day[i]);
  i++;
  }
  while(i%7!=0){
   day[i] = addDiv(week,'grey day day-'+(i-mouth.startDayOfWeek+1));
   day[i].textContent=i-mouth.startDayOfWeek+1-mouth.maxDate;
   i++;
  }
  i=0;
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
var m=4;
var calendar = document.querySelector('.form-3');
var header = calendar.querySelector('.calendar_header');
var prev = calendar.querySelector('.prev_mouth');
var mouthName = calendar.querySelector('.mouth_name');
var next = calendar.querySelector('.next_mouth');
mouthName.textContent = mouths[m].name;
var daysOfWeek = ['пн','вт','ср','чт','пт','сб','вс'];
var day = [];
var week = addDiv(calendar,'days-of-week');
for(var i=0;i<7;i++) {
 var dayOfWeek  = addDiv(week,'day-of-week day-of-week-'+i);
 dayOfWeek.textContent = daysOfWeek[i];
}

var weeks = renderCalendar(mouths[m]);
console.log(weeks);
calendar.appendChild(weeks);

prev.addEventListener('click',function(evt){
calendar.removeChild(weeks);
m--;
if(m<0){
  m=11;
}
mouthName.textContent = mouths[m].name;
weeks = renderCalendar(mouths[m]);
calendar.appendChild(weeks);
})
next.addEventListener('click',function(evt){
calendar.removeChild(weeks);
m++;
if(m>11){
  m=0;
}
weeks = renderCalendar(mouths[m]);
console.log(weeks);
mouthName.textContent = mouths[m].name;
calendar.appendChild(weeks);
})



















/*
for (var i = 0; i < 5; i++) {
week[i] = addDiv(calendar,'week week-'+i);
for (var j = 0; j < 7; j++) {
day[j] = addDiv(week[i],'day day-'+(i*7+j+1));

if (date<startday){
 date_in=maxdate-startday+date;
 day[j].classList.add('grey');
}
else if(date_in>=maxdate){
    date_in=date-maxdate-startday+1;
    day[j].classList.add('grey');
  }
  else{
    date_in=date-startday+1;
  }
day[j].textContent = date_in;
date++;
if (!day[j].classList.contains('grey')) {
 day[j].addEventListener('click',
  function(evt){
   if(!evt.currentTarget.classList.contains('checked')&&n<2){
    evt.currentTarget.classList.add('checked');
    vacant[t]=+evt.currentTarget.textContent;
        if(vacant[0]>vacant[1]){
        var c = vacant[1];
        vacant[1]=vacant[0];
        vacant[0]=c;
      }
      for(var k=vacant[0]+1; k<vacant[1]; k++){
      document.querySelector('.day-'+(k+startday-1)).classList.add('mchecked');
      document.querySelector('.day-'+(vacant[0]+startday-1)).classList.add('firstchecked');
      document.querySelector('.day-'+(vacant[1]+startday-1)).classList.add('secondchecked');
      }
    n++;
    t++;
    console.log(n,t,vacant[0],vacant[1], evt.currentTarget);
   }
     else if (evt.currentTarget.classList.contains('checked')){
     evt.currentTarget.classList.remove('checked');
      for(var k=vacant[0]+1; k<vacant[1]; k++){
      document.querySelector('.day-'+(k+startday-1)).classList.remove('mchecked');
      document.querySelector('.day-'+(vacant[0]+startday-1)).classList.remove('firstchecked');
      document.querySelector('.day-'+(vacant[1]+startday-1)).classList.remove('secondchecked');
    }
    for(var z=0; z<2; z++){
    if(vacant[z] == +evt.currentTarget.textContent){
      vacant[z]=undefined;
      if (n==1&&z==1){ t=0 }else{t=z};
    }}
    n--;
    console.log(n,t,vacant[0],vacant[1], evt.currentTarget);
    }
  });
}
}
}
*/
