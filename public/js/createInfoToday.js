export const createInfoToday = (data) => {
    const basedInformation = document.querySelector('.basedInformation')
    const minInfo = document.querySelector('.minInfo');

    minInfo.innerHTML = `

    <div class="underTemp">
    <ul>
        <li>
            <img src="./public/imagine/svg/mintemperature.webp">
            Minimum temperature: ${data.list[0].main.temp_min}°С
        </li>
        <li>
            <img src="./public/imagine/svg/maxtemperature.svg">
            Maximum temperature: ${data.list[0].main.temp_max}°С
        </li>
    </ul>

    </div>

    <div div class="underTemp">
    <ul>
        <li>It feels like: ${data.list[0].main.feels_like}°С</li>
        <li>
            <img src="./public/imagine/svg/wind.png">
            ${data.list[0].wind.speed} km/h
        </li>    
        <li>
            <img src="./public/imagine/svg/humidity.png">
            humidity: ${data.list[0].main.humidity}%
        </li>
        <li>
            <img src="./public/imagine/svg/pressure.png">
            Pressure: ${data.list[0].main.pressure} Pa
        </li>
    </ul>
    </div>

    `

    basedInformation.innerHTML = `
    <div class="iconWeather"><img class="weth" src= "http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt=""></div>

    <div class="thisTemp">
        <ul>
            <li>${data.list[0].main.temp}°С</li>
            <li>${data.list[0].weather[0].main}</li>
        </ul>
    </div>

    <div class="thisTemp">
    <ul>
    <li>${data.city.name}</li>
    <li id="datetime"></li>
    </ul>
    </div>
    `
}

