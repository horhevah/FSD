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
var n=0;
var t=0;
var vacant=[];
var weekday = ['пн','вт','ср','чт','пт','сб','вс']
for (var i = 0; i < 7; i++) {
  var day_of_week = addDiv(title,'day-of-week');
day_of_week.textContent = weekday[i];
}

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
  })

}
}
}



//var days = document.querySelectorAll('.day');
//for (var i = 0; i < 35; i++) {
  //console.log(days[i],i);

//}
