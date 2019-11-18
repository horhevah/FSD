'use strict';
var addDiv = function(parent,cssclass){
  var elem = document.createElement('div');
  elem.className=cssclass;
  parent.appendChild(elem);
  return elem;
}
var calendar = document.querySelector('.form-3 .calendar');
var title = addDiv(calendar,'calendar-title')
var day=[];
var week = [];
var startday=4;
var maxdate=31;
var date=1;
var date_in;
var weekday = ['пн','вт','ср','чт','пт','сб','вс']
for (var i = 0; i < 7; i++) {
  var day_of_week = addDiv(title,'day-of-week');
day_of_week.textContent = weekday[i];
}

for (var i = 0; i < 5; i++) {
week[i] = addDiv(calendar,'week week-'+i);
console.log(week[i],i);
for (var j = 0; j < 7; j++) {
console.log(j);
day[j] = addDiv(week[i],'day day-'+j);
if (date<startday){
 date_in=maxdate-startday+date;
 day[j].classList.add('grey');
}
else{
  if(date_in>=maxdate){
    date_in=date-maxdate-startday+1;
    day[j].classList.add('grey');
  }
  else{
    date_in=date-startday+1;
  }
}
day[j].textContent = date_in;
date++;
}
}
