/* Global Variables */
let addEntryButton = document.getElementById('entry-button');
let nameElement = document.getElementById('name');
let zipElement = document.getElementById('zip');
let feelingsElement = document.getElementById('feelings');
let entrySection = document.getElementById('entry-section');
let entriesElement = document.getElementById('entries');

// API Key
const apiKey = '8e5ccdb71fc19dc417aad096b7f8d68c';

// Request URL
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

// Event Listener
addEntryButton.addEventListener('click', addEntry);

// Add Entry
async function addEntry(e) {
  e.preventDefault();
  if (
    name.value == '' ||
    zipElement.value == '' ||
    feelingsElement.value == ''
  ) {
    alert('Please fill in all the fields.');
  } else {
    getWeatherData(zipElement.value, apiKey);
  }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

async function getWeatherData(zipCode, apiKey) {
  const response = await fetch(
    `${weatherURL}?zip=${zipCode}&APPID=${apiKey}`,
  );

  try {
    const allData = await response.json();

    if (allData.cod == "404") {
      alert(allData.message);
    } else {
      const newData = {
        date: newDate,
        temp: allData.main.temp,
        zip: zipElement.value,
        feelings: feelingsElement.value,
        name: nameElement.value,
      };

      const postResult = await postData('/add', newData);

      const getResult = await getData('/data');

      displayResults(getResult);      
    }
  } catch (error) {
    console.log(error);
  }
}

async function postData(url, data) {
  let result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  let responseData = await result.json();

  return responseData;
}

async function getData(url) {
  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseData = await result.json();

  return responseData;
}

function displayResults(data) {
  const entries = data.entries;

  for (index in entries) {
    if (index < 3) {
      const { name, date, feeling, zip, temp } = entries[index];

      const wrapper = document.createElement('div');
      const flex = document.createElement('div');
      const textWrapper = document.createElement('div');
      const nameElement = document.createElement('em');
      const dateElement = document.createElement('span');
      const tempElement = document.createElement('div');
      const tempIndicator = document.createElement('span');
      const feelingsElement = document.createElement('p');

      wrapper.classList.add('entry-card');
      flex.classList.add('entry-flex');
      nameElement.classList.add('entry-name');
      dateElement.classList.add('entry-date');
      tempElement.classList.add('entry-temp');
      tempIndicator.classList.add('entry-temp-indicator');
      textWrapper.classList.add('entry-feelings');

      nameElement.innerText = `- ${name}`;
      dateElement.innerText = date;
      feelingsElement.innerText = feeling;
      tempIndicator.innerText = '(F)';
      tempElement.innerText = `${temp}°`;
      tempElement.appendChild(tempIndicator);

      flex.appendChild(tempElement);
      flex.appendChild(dateElement);
      textWrapper.appendChild(feelingsElement);
      textWrapper.appendChild(nameElement);
      wrapper.appendChild(flex);
      wrapper.appendChild(textWrapper);

      entriesElement.appendChild(wrapper);
      entrySection.style.display = 'block';
    }
  }
}
