
const URL = "https://api.weatherapi.com/v1/current.json"
const key = "dca1708ada7745d483e15551242607"
const btn = document.querySelector('#Search')
const qField = document.querySelector('#quaryField')
const LocationData = document.querySelector('#Location')
const weatherReport = document.querySelector('#weatherReport')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getWeather(q) {
    let Responce = await fetch(`${URL}?key=${key}&q=${q}`)
    let Data = await Responce.json()

    if(qField.value == '' || qField.value == " ")  {
        weatherReport.innerText = "";
        LocationData.innerText = "Type Something"
    }
    else if (Data['current']) {
        let shortCut = Data['current']['condition']['text'];
        let Weather = `Weather: ${shortCut}`;
        let Temp = `\n Temperature: ${Data['current']['temp_c']} C and ${Data['current']['temp_f']} F`
        let Location = `Name: ${Data['location']['name']} \n Region: ${Data['location']['region']} \n Country: ${Data['location']['country']} \n Local Time: ${Data['location']['localtime']}`
        weatherReport.innerText = Weather + Temp;
        LocationData.innerText = Location;
    }  else if (Data['error']) {
            weatherReport.innerText = "";
            LocationData.innerText = "Location Not Found, Try searching Another"
}
}

btn.addEventListener("click", async () => {
    return await getWeather(qField.value) 
    })
