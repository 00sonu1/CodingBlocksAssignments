const form = document.getElementById("form")

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getweatherdata = async(searchText) => {

const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=a0d5d1b4595815840795ac2013a89758`;
const fetchedData = await fetch(url);
const data = await fetchedData.json()

//-------location and country--------------
let name = document.querySelector('.header');
name.innerText = `${data.name}, ${data.sys.country}`

//-------present date and day--------------
let unix_timestamp = data.dt
var date = new Date(unix_timestamp * 1000);
let day = days[date.getDay()];
let pdate = date.getDate();
let month = months[date.getMonth()];
let year = date.getFullYear();
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);;
let time = document.querySelector('.header2');
time.innerText = `${day} ${pdate} ${month} ${year} , ${formattedTime}`

//---------temprature----------------------
let temp = document.querySelector('.temp');
temp.innerText = `${Math.round((data.main.temp)-273.15)}\xB0c`;

//---------visibilty of the region---------
let visibilty = document.querySelector('.visible');
visibilty.innerText = `${data.weather[0].main}`;

//---------min and max temp----------------
let min = document.querySelector('.min');
min.innerText = `${Math.round((data.main.temp_min)-273.15)}\xB0c /`;
let max = document.querySelector('.max');
max.innerText = `${Math.round((data.main.temp_max)-273.15)}\xB0c`;
}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const searchText = form.elements[0].value;
    getweatherdata(searchText)
    form.elements[0].value = "";
})
