'use strict';

const timeSlots = [
  '',
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12am',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  'Daily Location Total'
];

const hourlyTrafficControlCurveArr = [
  0.5,
  0.75,
  1.0,
  0.6,
  0.8,
  1.0,
  0.7,
  0.4,
  0.6,
  0.9,
  0.7,
  0.5,
  0.3,
  0.4,
  0.6];

function CookieStand(name, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerSale) {
  this.name = name;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.totalCookieSales = 0;
  this.cookiesEachHour = [];
}

CookieStand.prototype.generateCustomersPerHour = function() {
  return Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1) + this.minCustomersPerHour);
};

CookieStand.prototype.calcCookiesEachHour = function() {
  return Math.ceil(this.generateCustomersPerHour() * this.avgCookiesPerSale);
};

CookieStand.prototype.render = function(){

  const tableElem = document.getElementById('table');

  const tableRowElem = document.createElement('tr');

  tableElem.appendChild(tableRowElem);

  const locationNameHeaderElem = document.createElement('th');

  locationNameHeaderElem.setAttribute('scope', 'row');

  locationNameHeaderElem.textContent = this.name;

  tableRowElem.appendChild(locationNameHeaderElem);

  for(let i = 0; i < timeSlots.length - 2; i++) {
    let cookieSalesEachHour = Math.floor(this.calcCookiesEachHour() * hourlyTrafficControlCurveArr[i]);
    const cookiesElem = document.createElement('td');
    cookiesElem.textContent = cookieSalesEachHour;
    tableRowElem.appendChild(cookiesElem);
    this.cookiesEachHour.push(cookieSalesEachHour);
    this.totalCookieSales += cookieSalesEachHour;
  }

  const totalCookies = document.createElement('td');
  totalCookies.textContent = this.totalCookieSales;
  tableRowElem.appendChild(totalCookies);

};

let seattle = new CookieStand('Seattle', 23, 65, 6.3);
let tokyo = new CookieStand('Tokyo', 3, 24, 1.2);
let dubai = new CookieStand('Dubai', 11, 38, 3.7);
let paris = new CookieStand('Paris', 20, 38, 2.3);
let lima = new CookieStand('Lima', 2, 16, 4.6);

let locations = [
  seattle,
  tokyo,
  dubai,
  paris,
  lima
];

const salesContainerElem = document.getElementById('locationData');

function displayTable(){
  const tableElem = document.createElement('table');
  tableElem.setAttribute('id', 'table');
  salesContainerElem.appendChild(tableElem);
  for(let i = 0; i < timeSlots.length; i++) {
    let tableTimeHeaderElem = document.createElement('th');
    tableTimeHeaderElem.textContent = timeSlots[i];
    tableElem.appendChild(tableTimeHeaderElem);
    tableTimeHeaderElem.setAttribute('scope', 'col');
  }
}

function displayFooter(){

  const tableElem = document.getElementById('table');

  const tableRowElem = document.createElement('tr');

  tableRowElem.setAttribute('id', 'totalRow');

  tableElem.appendChild(tableRowElem);

  const totalsHeaderElem = document.createElement('th');

  totalsHeaderElem.setAttribute('scope', 'row');

  totalsHeaderElem.textContent = 'Totals';

  tableRowElem.append(totalsHeaderElem);

  for(let i = 0; i < timeSlots.length-2; i++){
    let hourlyCookieTotal = 0;
    for(let j = 0; j < locations.length; j++){
      hourlyCookieTotal += locations[j].cookiesEachHour[i];
    }
    const hourlyCookieTotalElem = document.createElement('td');
    hourlyCookieTotalElem.textContent = hourlyCookieTotal;
    tableRowElem.appendChild(hourlyCookieTotalElem);
  }

  let dailyCookieTotal = 0;

  for(let i = 0; i < locations.length; i++){
    const currentStand = locations[i];
    dailyCookieTotal += currentStand.totalCookieSales;
  }

  const dailyCookieTotalElem = document.createElement('td');

  dailyCookieTotalElem.textContent = dailyCookieTotal;

  tableRowElem.appendChild(dailyCookieTotalElem);

}

displayTable();

for(let i = 0; i < locations.length; i++) {
  let location = locations[i];
  location.render();
}

displayFooter();

const form = document.getElementById('new-location-form');

form.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const newLocation = new CookieStand(event.target.storeName.value, parseInt(event.target.maxCustomers.value), parseInt(event.target.maxCustomers.value), parseFloat(event.target.avgCookies.value));
  locations.push(newLocation);
  const totalRow = document.getElementById('totalRow');
  totalRow.remove();
  newLocation.render();
  displayFooter();
}


