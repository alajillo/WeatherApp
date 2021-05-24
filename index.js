let city;
let cityLat;
let cityLon;
let weatherUrl;
let forecastUrl;

function onChange() {
  getCity();
  changeIntoBox();
  weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4977c6395d6461c4d67ac01827948fe7&lang=kr`;
  getWeather();
  getCityLoaction(city);
  forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=daily&appid=4977c6395d6461c4d67ac01827948fe7`;
  getForecast();
}

function getCity() {
  city = document.getElementById("location").value;
}
function changeIntoBox() {
  document.getElementById("cityName").innerHTML = city;
  document.getElementById("location").style.display = "none";
  document.getElementById("cityName").style.display = "flex";
}
function getWeather() {
  axios
    .get(weatherUrl)
    .then(function (result) {
      console.log("통신결과 :", result);
      temp = result.data.main.temp - 273.15;
      weather = result.data.weather[0].description;
      tempLow = result.data.main.temp_min - 273.15;
      tempHigh = result.data.main.temp_max - 273.15;

      document.getElementById("temp").innerHTML = temp.toFixed(2);
      document.getElementById("weather-now").innerHTML = weather;
      document.getElementById(
        "temperature-sub-high"
      ).innerHTML = `최저기온 \n ${tempLow.toFixed(2)}`;
      document.getElementById(
        "temperature-sub-low"
      ).innerHTML = `최고기온 \n ${tempHigh.toFixed(2)}`;
    })
    .catch(function (error) {
      console.error("error 발생 :", error);
    });
}

function getCityLoaction(city) {
  cityLon;
  cityLat;
  if (city === "Seoul") {
    cityLon = 127.0;
    cityLat = 37.583328;
  } else if (city === "Busan") {
    cityLon = 129.050003;
    cityLat = 35.133331;
  } else if (city === "Gangwon-do") {
    cityLon = 128.25;
    cityLat = 37.75;
  } else if (city === "Incheon") {
    cityLon = 126.416107;
    cityLat = 37.450001;
  } else if (city === "Jeju-do") {
    cityLon = 126.5;
    cityLat = 33.416672;
  }
}

function getForecast() {
  axios
    .get(forecastUrl)
    .then(function (result) {
      console.log("통신결과 :", result);
      let fore_weather = [];
      let fore_temp = [];
      for (let i = 0; i < 24; i++) {
        fore_temp[i] = result.data.hourly[i].temp - 273.15;
        fore_temp[i] = fore_temp[i].toFixed(2);
        fore_weather[i] = result.data.hourly[i].weather[0].main;
      }
      let fore_card = "";
      console.log(fore_temp);
      console.log(fore_weather);
      for (let i = 0; i < 24; i++) {
        fore_card += `<div class="hourly-forecast">
      <p>${i}시간후</p>
      <div></div>
      <div>${fore_temp[i]}도</div>
    </div>`;
      }
      document.querySelector(".middle").innerHTML = fore_card;
    })
    .catch(function (error) {
      console.error("error 발생 :", error);
    });
}
