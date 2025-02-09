//weather
const body= document.getElementsByTagName("body")[0];
const Wform = document.getElementById("Weather-Form");
const cityInp = document.getElementById("txt");
const card = document.getElementById("card");
const Wcard = document.getElementById("Wcard");
const locationElement = document.getElementById("Wloc");
const temperature = document.getElementById("temp");
const clock = document.getElementById("clock");
const FL = document.getElementById("FL");
const WS = document.getElementById("WS");
const AH = document.getElementById("AH");
const AP = document.getElementById("AP");
const SS = document.getElementById("SS");
const SR = document.getElementById("SR");
const desc = document.getElementById("desc");
const icn= document.getElementById("icn");
const ball= document.querySelector(".ball");
const moon= document.querySelector(".moon");
const star1= document.querySelector(".star-1");
const star2= document.querySelector(".star-2");
const cloud2= document.querySelector(".cloud-2");
const cloud3= document.querySelector(".cloud-3");
const cloud4= document.querySelector(".cloud-4");
const rain= document.querySelector(".rain");
const snow= document.querySelector(".snow");
function iconf(data){
    let iconUrl;
    const iconCode = data.weather[0].icon;
    switch (iconCode) {
        case "01d": return "☀️"; // Clear sky (day)
        case "01n": return "🌙"; // Clear sky (night)
        case "02d": return "🌤️"; // Few clouds (day)
        case "02n": return "🌥️"; // Few clouds (night)
        case "03d": case "03n": return "☁️"; // Scattered clouds
        case "04d": case "04n": return "🌥️"; // Broken clouds
        case "09d": case "09n": return "🌧️"; // Shower rain
        case "10d": return "🌦️"; // Rain (day)
        case "10n": return "🌧️"; // Rain (night)
        case "11d": case "11n": return "⛈️"; // Thunderstorm
        case "13d": case "13n": return "❄️"; // Snow
        case "50d": case "50n": return "🌫️"; // Mist
        default: return "❓"; // Unknown weather condition
    }
    // Set the icon source
    icn.src = iconUrl;
}

const apiKe = "0fde0aeb439b10100baa8a91d9aaa843";
Wform.addEventListener("submit", async event=>{  
    event.preventDefault();


    const city = cityInp.value.trim();
    

    if(city){
try{
    
const weatherData = await GetWeather(city);
displayWeatherInfo(weatherData);
}
catch(error){
    console.error(error);
    displayError(error);
}
    }
    else{
        displayError("please enter a valid city")
   } });

   async function GetWeather(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKe}&units=metric`;
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error("City not available in the database");
    }
    return await response.json();

}



function displayWeatherInfo(data){

        card.style.display = "none";
        Wcard.style.display = "flex";
        locationElement.textContent = "📍"+data.name; 

      const tem=  Math.round(data.main.temp);
    temperature.textContent = "🌡️"+tem+ "°C"; 
    
   

    const localTime = new Date((data.dt + data.timezone) * 1000);
    const hours = localTime.getUTCHours().toString().padStart(2, "0"); 
    const minutes = localTime.getUTCMinutes().toString().padStart(2, "0");

    clock.textContent = `🕰️ ${hours}:${minutes}`;
    

//descreption

    desc.textContent = `${data.weather[0].description} ` + iconf(data) ; 
    

    
//feelsLIke
    const Ftemp= Math.round(data.main.feels_like);
    FL.textContent= "Feels Like: "+Ftemp+"°C";

    //windSpeed
    const Wspeed= Math.round(data.wind.speed);
    WS.textContent= "💨 The Wind Speed: "+Wspeed+" m/s";


    //AirHumidity
    
    AH.textContent=`💧 The Humidity: ${data.main.humidity}%`;

    //AtmoPressure
    AP.textContent=` Atmo Pressure: ${data.main.pressure} Pa`;

//SS && SR
    const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000);
    const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000);

    const sunriseHours = sunriseTime.getUTCHours().toString().padStart(2, "0");
    const sunriseMinutes = sunriseTime.getUTCMinutes().toString().padStart(2, "0");

    const sunsetHours = sunsetTime.getUTCHours().toString().padStart(2, "0");
    const sunsetMinutes = sunsetTime.getUTCMinutes().toString().padStart(2, "0");

    SR.textContent = `🌅 Sunrise: ${sunriseHours}:${sunriseMinutes}`; 
    SS.textContent = `🌇 Sunset: ${sunsetHours}:${sunsetMinutes}`; 
    if (localTime.getTime() < sunriseTime.getTime() || localTime.getTime() > sunsetTime.getTime()) {
        body.style.background = "#020122";
        body.style.color="#B2B2B2";
        ball.style.display="none";
        moon.style.display="block";
        star1.style.display="block";
        star2.style.display="block";
        cloud4.style.display="none";
        cloud3.style.display="none";
        cloud2.style.display="none";
    
    }
    if (
        data.weather[0].description === "light rain" ||
        data.weather[0].description === "moderate rain" ||
        data.weather[0].description === "heavy intensity rain" ||
        data.weather[0].description === "very heavy rain" ||
        data.weather[0].description === "extreme rain" ||
        data.weather[0].description === "freezing rain" ||
        data.weather[0].description === "light intensity drizzle" ||
        data.weather[0].description === "drizzle" ||
        data.weather[0].description === "heavy intensity drizzle" ||
        data.weather[0].description === "drizzle rain" ||
        data.weather[0].description === "heavy drizzle rain" ||
        data.weather[0].description === "mist" ||
        data.weather[0].description === "shower drizzle"){
            rain.style.display="block";
        }
        if (data.weather[0].description === "snow" || 
        data.weather[0].description === "light snow" || 
        data.weather[0].description === "heavy snow" || 
        data.weather[0].description=== "snow showers" || 
        data.weather[0].description === "blowing snow" || 
        data.weather[0].description === "flurries" || 
        data.weather[0].description === "snow grains" || 
        data.weather[0].description === "moderate snow" || 
        data.weather[0].description === "patchy snow" || 
        data.weather[0].description === "freezing rain") {
    snow.style.display="block";
}

          /*  if (weatherDesc.equalsIgnoreCase("Thunderstorm") ||
    weatherDesc.equalsIgnoreCase("Light thunderstorm") ||
    weatherDesc.equalsIgnoreCase("Heavy thunderstorm") ||
    weatherDesc.contains("Thunderstorm with")) { 
    
        rain.style.display="block";
        function triggerThunder() {
            let thunder = document.createElement("div");
            thunder.classList.add("thunder-effect");
            document.body.appendChild(thunder);
        
    
    }
                }*/

    }
            
    





function displayError(messg){
  
        const errDisplay = document.createElement("p");
        errDisplay.textContent = messg;
        errDisplay.style.color = "red";
        errDisplay.classList.add("errDisplay");
        card.appendChild(errDisplay);

}
