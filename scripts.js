getLocation();


function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherInfo);
  } else {
      alert("Sorry couldn't find your Location");
  }
}

function getWeatherInfo(position) {
  const long = position.coords.longitude;
  const lati = position.coords.latitude;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat="+lati+"&lon="+long+"", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      loadDetailsOfThePage(this.responseText);
    }
  };
}

function loadDetailsOfThePage(data) {
    const details = JSON.parse(data);
    const iconSrc = details.weather[0].icon;
    const name = details.name;
    const temp = details.main['temp'];
    const description = details.weather[0].description;
    const windSpeed = details.wind['speed'];
    document.getElementById('weatherIcon').innerHTML = "<img src="+iconSrc+">";
    document.getElementById("temp").innerHTML = parseInt(temp);
    document.querySelector('.placeHolder .place').innerHTML = name;
    document.querySelector('.reportDetails .description').innerHTML = description;
    document.querySelector('.windinner .windSpeed').innerHTML = windSpeed;
}
document.getElementById('far').addEventListener('click', ()=> {
    document.getElementsByClassName('tempChange')[0].classList.toggle('active');
    document.getElementsByClassName('tempChange')[1].classList.toggle('active');
    const c = document.getElementById("temp").innerHTML;
    const f = Math.floor((9*c + 160)/5);
    document.getElementById("temp").innerHTML = f;
});
document.getElementById('cen').addEventListener('click', ()=> {
    document.getElementsByClassName('tempChange')[0].classList.toggle('active');
    document.getElementsByClassName('tempChange')[1].classList.toggle('active');
    const f = document.getElementById("temp").innerHTML;
    const c = Math.floor((5*f - 160)/9);
    document.getElementById("temp").innerHTML = c;
});