"use strict";

const API = "2642953c6006d35a7ff745c465c8f592";


const dayEl = document.querySelector(".default-day");
const dateEl = document.querySelector(".default-date");
const btnEl = document.querySelector(".btn-search");
const inputEl = document.querySelector(".input-field");
const iconsContainer = document.querySelector(".icon");
const dayInfo = document.querySelector(".day-info");
const listContentEL = document.querySelector(".list-content ul")


const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];


// display the date 
const day = new Date();
const dayName = days[day.getDay()];
dayEl.textContent = dayName;

// display date 

let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();

console.log();
dateEl.textContent = date + " " + month + " " + year;

// add event
btnEl.addEventListener("click", (e) => {
    e.preventDefault();

    // check empty value

    if (inputEl.value !== "") {
        const Serach = inputEl.value;
        inputEl.value == "";
        findlocation(Serach);

    } else {
        console.log("Please Enter City or Country Name");
    }

});


async function findlocation(name) {
    iconsContainer.innerHTML = "";
    dayInfo.innerHTML = "";
    listContentEL.innerHTML = "";
    try {
        const API_URl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}`;
        const data = await fetch(API_URl);
        const result = await data.json();
        console.log(result);

        if (result.cod !== "404") {
            // display image content 
            const ImageContent = displayImageContent(result);

            // display right side Content 
            const rightSide = rightSideContent(result);

            // forecast function 
            displayForCast(result.coord.lat, result.coord.lon);

            setTimeout(() => {
                iconsContainer.insertAdjacentHTML("afterbegin", ImageContent);
                iconsContainer.classList.add("fadeIn");
                dayInfo.insertAdjacentHTML("afterbegin", rightSide);
            }, 1500);


        } else {
            const message = `<h2 class="weather-temp">${result.cod}</h2>
         <h3 class="cloudtext">${result.message}</h3>`;
            iconsContainer.insertAdjacentHTML("afterbegin", message);
        }

    } catch (error) { }

}


// display image contact and temp 
function displayImageContent(data) {
    return ` <img src = "https://openweathermap.org/img/wn/${data.weather[0].icon
        }@2x.png" alt="" />
                        <h2 class="weather-temp">${Math.round(data.main.temp - 273.15)}°C</h2>
                        <h3 class="cloudtext">${data.weather[0].description}</h3>`;
}


// display the right side content 
function rightSideContent(result) {
    return `<div class="content">
                        <p class="title">NAME</p>
                        <span class="value">${result.name}</span>
                    </div>

                    <div class="content">
                        <p class="title">TEMP</p>
                        <span class="value">${Math.round(result.main.temp - 273.15)}°C</span>
                    </div>

                    <div class="content">
                        <p class="title">HUMIDITY</p>
                        <span class="value">${result.main.humidity}%</span>
                    </div>
                
                    <div class="content">
                        <p class="title">WIND SPEED</p>
                        <span class="value">${result.wind.speed} Km/h</span>
                    </div>`;

}

async function displayForCast(lat, long) {
    const ForeCast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API}`;
    const data = await fetch(ForeCast_API);
    const result = await data.json();
    // console.log(result);

    const uniqeForeCastDays = [];
    const daysForecast = result.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqeForeCastDays.includes(forecastDate)) {
            return uniqeForeCastDays.push(forecastDate);
        }
    });

    console.log(daysForecast);

    daysForecast.forEach((content, indx) => {

        if (indx <= 3) {
            listContentEL.insertAdjacentHTML("afterbegin", forecast(content));
        }
    });
}

// forecast html Element data 
function forecast(frContent) {
    const day = new Date(frContent.dt_txt);
    const dayName = days[day.getDay()];
    const spliDay = dayName.split("", 3);
    const joinDay = spliDay.join("");
    // console.log(joinDay);

    return `<li>
                <img src="https://openweathermap.org/img/wn/${frContent.weather[0].icon
        }@2x.png" alt="">
                <span>${joinDay}</span>
                <span class="day-temp">${Math.round(frContent.main.temp - 273.15)}°C</span>
            </li>`;
}


function loader(){
    var loader = document.querySelector("#laoder")
setTimeout(function(){
    loader.style.top="-100%"
},4200)
}

loader();