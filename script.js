const API_KEY= "52dcba272f464de1a0ccfafc107979ee";
const url = "https://newsapi.org/v2/everything?q=";

const API_KEY1="6fbebb7d881fad3f123d7bbdb7f5805a";


window.addEventListener("load",() => fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews (query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage ) return;
        if(article.title == null ) return ;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataIncard(cardClone, article);
        cardsContainer.appendChild(cardClone); 
    });
};
function fillDataIncard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description; 

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} ・ ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchtext = document.getElementById("search-text");
searchButton.addEventListener("click",() => {
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav= null;

})
const url1 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const weatherIcon = document.querySelector("weather-icon");
async function checkweather(city){
    const response = await fetch(url1 + city + `&appid=${API_KEY1}`);
    var data = await response.json();
    console.log(data);
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity +"%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

    if(data.weather[0]=="Rain"){
        weatherIcon.src = "/assets/images/rain.png"
    }
    else if(data.weather[0]=="Clouds"){
        weatherIcon.src = "/assets/images/clouds.png"
    }
    else if(data.weather[0]=="Clear"){
        weatherIcon.src = "/assets/images/clear.png"
    }
    else if(data.weather[0]=="Drizzle"){
        weatherIcon.src = "/assets/images/drizzle.png"
    }
    else if(data.weather[0]=="Mist"){
        weatherIcon.src = "/assets/images/mist.png"
    }
    else if(data.weather[0]=="Snow"){
        weatherIcon.src = "/assets/images/snow.png"
    }
}
checkweather();
// Existing code ...

// Add a function to populate a weather card from the template
function populateWeatherCard(cardId, data) {
    const weatherCard = document.getElementById(cardId);
    const weatherCardTemplate = document.getElementById("tempalte-weather-card"); // Note the typo here, it should be "template-weather-card"

    // Clone the template content
    const cardClone = weatherCardTemplate.content.cloneNode(true);

    // Fill in the data
    const weatherIcon = cardClone.querySelector(".weather-icon");
    const temp = cardClone.querySelector(".temp");
    const city = cardClone.querySelector(".city-name");
    const humidity = cardClone.querySelector(".humidity");
    const wind = cardClone.querySelector(".wind");

    weatherIcon.src = data.iconURL; // You'll need to provide the correct URL
    temp.innerHTML = data.temperature;
    city.innerHTML = data.city;
    humidity.innerHTML = data.humidity;
    wind.innerHTML = data.windSpeed;

    // Append the populated card to the container
    weatherCard.innerHTML = ''; // Clear any existing content
    weatherCard.appendChild(cardClone);
}

// Function to fetch and populate weather data
async function fetchWeatherAndPopulateCards() {
    const cities = ["Alwar", "New York", "London", "Sydney"]; // Example cities

    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const response = await fetch(url1 + city + `&appid=${API_KEY1}`);
        const data = await response.json();

        // Create an object with weather data
        const weatherData = {
            iconURL: '/assets/images/rain.png', // Replace with the actual weather icon URL
            temperature: data.main.temp + "°C",
            city: data.name,
            humidity: data.main.humidity + "%",
            windSpeed: data.wind.speed + " Km/h",
        };

        // Populate the corresponding weather card
        populateWeatherCard(`weather-card${i + 1}`, weatherData);
    }
}

fetchWeatherAndPopulateCards(); // Call this function to fetch and populate weather data

// Existing code ...


