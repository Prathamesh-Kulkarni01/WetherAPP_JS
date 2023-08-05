
const arrayOfCity=['Pune']
const getWeatherString = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
        case 'clouds':
            return './img/Sun cloud angled rain.png';
        case 'sunny':
            return './img/Sun cloud angled rain.png';
        case 'mist':
            case 'haze':
            case 'rain':
            return './img/Moon cloud mid rain.png';
        case 'windy':
            return `./img/Moon cloud fast wind.png`   
        default:
            console.log("here")
            return `./img/Sun cloud angled rain.png`;
    }
};
const container = document.querySelector('.card_grid'); 
const search = document.querySelector('.input-box'); 



const fetchData=async(city)=>{
    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d99b545cb6a30562249245afb1406eb4&units=metric`).then(res=>res.json())
console.log(res)
return res
}


const makeCard = (weather) => {
     container.innerHTML += `
        <div class="card">
            <img src='${getWeatherString(weather.weather[0]?.main)}'' alt="" class="right_img">
            <div class="left">
                <h1 class="temp">${Math.floor(weather.main.temp)}<span>O</span></h1>
                <p class="text1">H:${Math.floor(weather.main.temp_max)}<span>O</span>L:${Math.floor(weather.main.temp_max)}<span>O</span></p>
                <p class="text1">Wind:${weather.wind.deg}<span>O</span>Speed:${Math.floor(weather.wind.speed)} K/h</p>
                <p class="text2">${weather.name},${weather.sys.country}</p>
            </div>
            <p class="text3">${weather.weather[0].main}</p>
        </div>`;
    
};

const renderCards = async () => { 
    const wetherOfCity = [];

    for (const city of arrayOfCity) {
        const data = await fetchData(city); 
        if(data.cod===200)
        wetherOfCity.push(data);
    }
    container.innerHTML=""
 wetherOfCity.sort((a,b)=>a.main.temp-b.main.temp).map(makeCard).join('');
};
renderCards()

container.innerHTML="<p style=color:grey>Please add city to view wether...</p>"

const add=()=>{
    let val=search.value.trim()
    if(!arrayOfCity.includes(val))
arrayOfCity.push(val)
container.innerHTML="<p style=color:grey>Loading....</p>"
renderCards()
}