const API_KEY = "9c2d0487aac217794c91c529a8eaaaf3";

const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();

    const cityName = document.getElementById("input-search").value;
    document.getElementById("input-search").value = "";
    requestDataForecast(cityName);
})

const buildParams = params => {
    return Object.entries(params)
        .map(pair => pair.map(encodeURIComponent).join('='))
        .join('&');
}

const buildURL = cityName => {
    let params = { q: cityName ?? "Fortaleza", units: "metric", lang: "pt_br", appid: API_KEY };
    return `https://api.openweathermap.org/data/2.5/weather?${buildParams(params)}`;
}

const requestDataForecast = cityName => {
    fetch(buildURL(cityName))
        .then(response => response.json())
        .then(rec => showDataOnScreen(rec.main, rec.weather, rec.name))
        .catch(error => console.log("Error", error))
}

const showDataOnScreen = (main, weather, cityName) => {
    const contentWeather = document.querySelector(".content-weather");

    console.log(main, weather)

    if (weather[0].main === "Clouds") {
        contentWeather.children[0].src = "img/cloudy.svg";
        contentWeather.children[1].innerText = "Hoje • Nublado";
        contentWeather.children[2].innerText = `${main.temp_max.toFixed(0)}º / ${main.temp_min.toFixed(0)}`
    } else {
        contentWeather.children[0].src = "img/icon _cloud rain_.svg";
        contentWeather.children[1].innerText = "Hoje • Chuva";
        contentWeather.children[2].innerText = `${main.temp_max.toFixed(0)}º / ${main.temp_min.toFixed(0)}`
    }

    document.getElementById("temp-content").innerText = main.temp.toFixed(0);
    document.getElementById("info-clouds").innerText = weather[0].description;
    document.getElementById("cityName").innerHTML = cityName;
}