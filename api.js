let url="https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=d99b545cb6a30562249245afb1406eb4&units=metric"

const fetchData=async(city)=>{
    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d99b545cb6a30562249245afb1406eb4&units=metric`).then(res=>res.json())
console.log(res)
return res
}
const arrayOfCity=[]

const container = document.querySelector('.card_grid'); // Replace with the actual ID of the container
const search = document.querySelector('.input-box'); // Replace with the actual ID of the container


const makeCard = (weather) => {
     container.innerHTML += `
        <div class="card">
            <img src="./img/Sun cloud angled rain.png" alt="" class="right_img">
            <div class="left">
                <h1 class="temp">${Math.floor(weather.main.temp)}<span>O</span></h1>
                <p class="text1">H:${Math.floor(weather.main.temp_max)}<span>O</span> L:${Math.floor(weather.main.temp_max)}<span>O</span></p>
                <p class="text2">${weather.name}</p>
            </div>
            <p class="text3">${weather.weather[0].main}</p>
        </div>`;
    
};

const renderCards = async () => { // Replace with actual city names
    const wetherOfCity = [];

    for (const city of arrayOfCity) {
        const data = await fetchData(city); 
        if(data.cod===200)
        wetherOfCity.push(data);
    }

    const cardsHtml = wetherOfCity.sort((a,b)=>a.main.temp-b.main.temp).map(makeCard).join('');
};

renderCards()


const add=()=>{
arrayOfCity.push(search.value)
console.log(arrayOfCity)
container.innerHTML=""
renderCards()
}