'use strict';
var tab = document.querySelector('.form-3 table');
console.log(tab);
var tr=[];
var td=[];
var day=1;
var text;
for (var i = 0; i<5; i++){
tr[i] = document.createElement('tr');
tr[i].className='tr tr-'+i;
tab.appendChild(tr[i]);
console.log(tr[i]);

for (var j = 0; j < 7; j++) {
  td[j] = document.createElement('td');
  td[j].className='td td-'+day;
  text=document.createTextNode(day);
  td[j].appendChild(text);
  tr[i].appendChild(td[j]);
  day++;
}
}
