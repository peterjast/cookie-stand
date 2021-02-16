'use strict';

const timeSlots = [
  '6am: ',
  '7am: ',
  '8am: ',
  '9am: ',
  '10am: ',
  '11am: ',
  '12am: ',
  '1pm: ',
  '2pm: ',
  '3pm: ',
  '4pm: ',
  '5pm: ',
  '6pm: ',
  '7pm: '
];

let seattle = {
  name: 'Seattle',
  minCustomersPerHour: 23,
  maxCustomersPerHour: 65,
  avgCookiesPerSale: 6.3,
  totalCookieSales: 0,
  cookiesEachHour: [],
  generateCustomersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1) + this.minCustomersPerHour);
  },
  calcCookiesEachHour: function() {
    return Math.ceil(this.generateCustomersPerHour() * this.avgCookiesPerSale);
  }
};

let tokyo = {
  name: 'Tokyo',
  minCustomersPerHour: 3,
  maxCustomersPerHour: 24,
  avgCookiesPerSale: 1.2,
  totalCookieSales: 0,
  cookiesEachHour: [],
  generateCustomersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1) + this.minCustomersPerHour);
  },
  calcCookiesEachHour: function() {
    return Math.ceil(this.generateCustomersPerHour() * this.avgCookiesPerSale);
  }
};

let dubai = {
  name: 'Dubai',
  minCustomersPerHour: 11,
  maxCustomersPerHour: 38,
  avgCookiesPerSale: 3.7,
  totalCookieSales: 0,
  cookiesEachHour: [],
  generateCustomersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1) + this.minCustomersPerHour);
  },
  calcCookiesEachHour: function() {
    return Math.ceil(this.generateCustomersPerHour() * this.avgCookiesPerSale);
  }
};

let paris = {
  name: 'Paris',
  minCustomersPerHour: 20,
  maxCustomersPerHour: 38,
  avgCookiesPerSale: 2.3,
  totalCookieSales: 0,
  cookiesEachHour: [],
  generateCustomersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1) + this.minCustomersPerHour);
  },
  calcCookiesEachHour: function() {
    return Math.ceil(this.generateCustomersPerHour() * this.avgCookiesPerSale);
  }
};

let lima = {
  name: 'Lima',
  minCustomersPerHour: 2,
  maxCustomersPerHour: 16,
  avgCookiesPerSale: 4.6,
  totalCookieSales: 0,
  cookiesEachHour: [],
  generateCustomersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1) + this.minCustomersPerHour);
  },
  calcCookiesEachHour: function() {
    return Math.ceil(this.generateCustomersPerHour() * this.avgCookiesPerSale);
  }
};

let locations = [
  seattle,
  tokyo,
  dubai,
  paris,
  lima
];

let salesContainerElem = document.getElementById('locationData');

function displayLocation(location){

  let articleElem = document.createElement('article');

  salesContainerElem.appendChild(articleElem);

  let nameHeaderElem = document.createElement('h2');

  nameHeaderElem.textContent = location.name;

  articleElem.appendChild(nameHeaderElem);

  let cookiesElem = document.createElement('ul');

  articleElem.appendChild(cookiesElem);

  for(let i = 0; i < timeSlots.length; i++) {
    let cookieSalesEachHour = location.calcCookiesEachHour();
    let listItem = document.createElement('li');
    listItem.textContent = timeSlots[i] + cookieSalesEachHour + ' cookies';
    cookiesElem.appendChild(listItem);
    location.cookiesEachHour.push(cookieSalesEachHour);
    location.totalCookieSales += cookieSalesEachHour;
  }

  let totalCookies = document.createElement('li');
  totalCookies.textContent = 'Total: ' + location.totalCookieSales + ' cookies';
  cookiesElem.appendChild(totalCookies);

}

for(let i = 0; i < locations.length; i++) {
  let location = locations[i];
  displayLocation(location);
}


