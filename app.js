const URL = "https://api.openweathermap.org/data/2.5/weather"
        const key = "eb95df91b8d801839feb9cd47b87318c"
        const btn = document.querySelector('#Search')
        const qField = document.querySelector('#quaryField')
        const LocationData = document.querySelector('#Location')
        const weatherReport = document.querySelector('#weatherReport')
        const temperature = document.querySelector('#temperature')
        const humidity = document.querySelector('#humidity')
        const wind = document.querySelector('#wind')
        const pressure = document.querySelector('#pressure')
        const image = document.querySelector('#image')

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        async function getWeather(q) {
            let Responce = await fetch(`${URL}?appid=${key}&q=${q}`)
            let Data = await Responce.json()

            if(qField.value == '' || qField.value == " ")  {
                weatherReport.innerText = "";
                LocationData.innerText = "Type Something"
            }
            else if (Data) {
                let weather = `Weather feels : ${Data.weather[0].description}`;
                let Temp = `Temperature: ${(Data.main.temp - 273.15).toFixed(2)} °C`
                let Humidity = `Humidity: ${Data.main.humidity}%`
                let Wind = `Wind Speed: ${Data.wind.speed} m/s`
                let Pressure = `Pressure: ${Data.main.pressure} hPa`
                let Location = `Country: ${Data.sys.country} \n Place: ${Data.name}`
                weatherReport.innerText = weather;
                temperature.innerText = Temp;
                humidity.innerText = Humidity;
                wind.innerText = Wind;
                pressure.innerText = Pressure;
                LocationData.innerText = Location;
                image.src = `https://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png`

            }  else if (Data.message == "city not found") {
                    weatherReport.innerText = "";
                    LocationData.innerText = "Location Not Found, Try searching Another"
            }
        }

        btn.addEventListener("click", async () => {
            return await getWeather(qField.value) 
        })