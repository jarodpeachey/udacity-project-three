/* Global Variables */
let addEntryButton = document.getElementById('entry-button');
let name = document.getElementById('name');
let zip = document.getElementById('zip');
let feelings = document.getElementById('feelings');

// Event Listener
addEntryButton.addEventListener('click', addEntry);

// Add Entry
function addEntry (e) {
  e.preventDefault();
  if (name.value == '' || zip.value == '' || feelings.value == '') {
    alert('Please fill in all the fields.');
  } else {
    getWeatherData(zip.value, '8e5ccdb71fc19dc417aad096b7f8d68c');
  }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

async function getWeatherData(zipCode, apiKey) {
  console.log("Getting weather data from zip code " + zipCode);

  const response = await fetch(
    `https://api.openweathermap.org/data/weather?zip=${zipCode}&APPID=${apiKey}`,
  );

  try {
    const allData = await response.json();

    console.log(allData);
  } catch (error) {
    console.log(error);
  }
}
