// Reemplaza 'YOUR_API_KEY' con tu API key de OpenWeatherMap
const API_KEY = 'f76e9ec416b6930ca34d04e1bb7a3057';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const msg = document.getElementById('msg');
const result = document.getElementById('result');
const locName = document.getElementById('locName');
const tempEl = document.getElementById('temp');
const descEl = document.getElementById('desc');
const weatherIcon = document.getElementById('weatherIcon');

async function fetchWeather(city) {
    msg.textContent = "Buscando...";
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Ciudad no encontrada");
        const data = await res.json();

        locName.textContent = `${data.name}, ${data.sys.country}`;
        tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        descEl.textContent = data.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

        result.classList.remove('hidden');
        msg.textContent = "";
    } catch (err) {
        msg.textContent = err.message;
    }
}

searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));
cityInput.addEventListener('keydown', e => { if (e.key === "Enter") fetchWeather(cityInput.value); });
window.addEventListener('DOMContentLoaded', () => fetchWeather('Madrid, ES'));
