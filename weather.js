
const apikey = "07a677032cfb238c30ca137fb44feb79"; 

window.addEventListener("load", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            const url = `http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${apikey}`;

            fetch(url).then(res=>{
                return res.json()
            }).then((data)=>{
                console.log(data);
                weatherReport(data)
            })
        })
    }
})

function weatherReport(data){
    var urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;

    fetch(urlcast).then(res=>{
        return res.json()
    }).then((forecast)=>{
        console.log(forecast);
        hourForecast(forecast);
        dayForecast(forecast);
        document.getElementById('city').innerText = data.name+', '+data.sys.country;

        document.getElementById('temperature').innerText = Math.floor(data.main.temp-273) +' °C';

        document.getElementById('clouds').innerText = data.weather[0].description;

        let li = data.weather[0].icon;
        let liurl = "http://api.openweathermap.org/img/w/"+li+".png";
        document.getElementById('img').src = liurl;
    })
}

function hourForecast(forecast){
    document.querySelector('.templist').innerHTML='';
    for(let i=0; i<5; i++){
        var date = new Date(forecast.list[i].dt*1000);
    
        let hourR = document.createElement('div');
        hourR.setAttribute('class','next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 32)*(5/9))+ ' °C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273)+ ' °C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR); 
    }
}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML =  '';
    for(let i=1; i<forecast.list.length; i+=8){
        

        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        // let day = document.createElement('p');
        // day.setAttribute('class', 'day');
        // day.innerText = new day(forecast.list[i].dt*1000).toDateString(undefined, 'Asia/Kolkata');
        // div.appendChild(day);

        let day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecast.list[i+1].dt*1000).toDateString(undefined, 'Asia/Kolkata');
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i+1].main.temp_max - 273)+ ' °C' + ' / ' + Math.floor(forecast.list[i+1].main.temp_min - 273)+ ' °C';
        div.appendChild(temp);

        let description = document.createElement('p');
        description.setAttribute('class', 'desc');
        description.innerText = forecast.list[i+1].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div);
    }
}

    document.getElementById('search').addEventListener('click', ()=>{

    var place = document.getElementById('input').value ;
    var urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;

    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        weatherReport(data);
    })
    document.getElementById('input').value = '';
   })
