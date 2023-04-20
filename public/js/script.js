import moment from "moment";
import {createInfoToday} from "./createInfoToday";

const search = document.querySelector('.search');
const inpCity = document.querySelector('#name');

const city = 'Rivne';

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ua&appid=a134cafacc4f646d417bd139e0a2e9ea`;
const defaultErrorMessage = 'Помилка: не вдалося отримати дані про погоду.';



async function wetherOBJ(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createInfoToday(data);
    createNextDay(data);
    console.log(data);
  } catch (error) {
    console.log('Введіть коректне місто');
    console.error(error);
    console.log(defaultErrorMessage);
    inpCity.placeholder = 'Not an existing city';
  }
}

function updateTime() {
    const now = new Date();
    const datetime = document.getElementById('datetime');
    datetime.innerHTML = now.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric', hour12: false});
  }
  setInterval(updateTime, 1000);

  function correctCity() {
    search.addEventListener("click", () => {
      let searches = inpCity.value;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searches}&units=metric&lang=ua&appid=a134cafacc4f646d417bd139e0a2e9ea`;
      wetherOBJ(url);
      inpCity.placeholder = 'Enter the city';
      inpCity.value = ''
    });
  
    inpCity.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        inpCity.innerHTML = "";
        let searches = inpCity.value;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searches}&units=metric&lang=ua&appid=a134cafacc4f646d417bd139e0a2e9ea`;
        wetherOBJ(url);
        inpCity.placeholder = 'Enter the city';
        inpCity.value = ''
      }
    });
  }
  
  correctCity();


    wetherOBJ(url);

    const groupBy = (items, key) => items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [
          ...(result[item[key]] || []),
          item,
        ],
      }), 
      [],
    );
    

    function createNextDay(data) {
      let mapt = data.list.map((item) => ({
        ...item,
        day: moment(item.dt_txt).date(),
      }));
      // console.log(mapt);
      let newGroup = groupBy(mapt, `day`);
      // console.log(newGroup);
    
      const newDateIs = Object.keys(newGroup).map((key) => {
        const values = newGroup[key];
        const sortedValues = values.sort((a, b) => a.main.temp - b.main.temp);
        const minIndex = sortedValues[0].main.temp;
        const maxIndex = sortedValues[sortedValues.length - 1].main.temp;
        const filteredIndexes = sortedValues.reduce((acc, curr, index) => {
          if (curr.main.temp === minIndex || curr.main.temp === maxIndex) {
            acc.push(index);
          }
          return acc;
        }, []);
        let filteredValues = filteredIndexes.map(index => sortedValues[index])
        return filteredValues;
      });
    
      // console.log(newDateIs[0][0]);
      const deleteFirstElem =  newDateIs.shift();


      const swiperWrapper = document.querySelector(".swiper-wrapper");
      console.log(newDateIs);

      
       swiperWrapper.innerHTML = ""
      newDateIs.forEach((data)=>{


       
        swiperWrapper.innerHTML +=`
        <div class="swiper-slide">

        <div class="boxInfoSwiper">

        <div>
          <li>${moment(data[0].dt_txt).format('LL')}</li>
          <li>${data[0].weather[0].main}</li>
        </div>

        <div><img class="weth" src="http://openweathermap.org/img/wn/${data[1].weather[0].icon}@2x.png" alt=""></div>

        </div>

        <ul>
        <li>
          <img img class="mintemperature" src="./imagine/svg/mintemperature.webp">
          Minimum temperature: ${data[0].main.temp_min}°С
        </li>
        <li>
          <img img class="maxtemperature" src="./imagine/svg/maxtemperature.svg">
          Maximum temperature: ${data[1] ? data[1].main.temp_max : data[0].main.temp_max  }°С
        </li>
        <li>
          <img img class="humidity" src="./imagine/svg/humidity.png">
          Humidity: ${data[0].main.humidity}%
        </li>
        <li>
          <img class="wind" src="./imagine/svg/wind.png">
          Wind speed: ${data[0].wind.speed} km/h
        </li>
        <li>
          <img class="pressure" src="./imagine/svg/pressure.png">
          Pressure: ${data[0].main.pressure} Pa
        </li>
      </ul>
        
        </div>

        
        `

        const mintemperature = document.querySelector(".mintemperature");
        mintemperature.src = "./imagine/svg/mintemperature.webp"

        const maxtemperature = document.querySelector(".maxtemperature");
        maxtemperature.src = "./imagine/svg/maxtemperature.svg"

        const humidity = document.querySelector(".humidity");
        humidity.src = "./imagine/svg/humidity.png"

        const wind = document.querySelector(".wind");
        wind.src = "./imagine/svg/wind.png"

        const pressure = document.querySelector(".pressure");
        pressure.src = "./imagine/svg/pressure.png"

      })

    }