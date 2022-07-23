var api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

var city = document.querySelector('.city')
var container_img = document.querySelector('.container-img');
var temp_number = document.querySelector('.container-temp div');
var temp_unit = document.querySelector('.container-temp span');
var weather_t = document.querySelector('.weather');
var search_input = document.querySelector('.form-control');
var img = document.getElementById('imagem')
var umidade=document.querySelector('.umidade')

// Um eventListener para o enter do teclado no qual a variável search_input recebe a cidade que é passada como parâmetro na função searchResults.
search_input.addEventListener('keypress', enter)
function enter(event) {
    
    key = event.keyCode
    if (key === 13) {
        searchResults(search_input.value)
         
    }

}
//requisição na api do openweathermap de acordo com a cidade obtida no search_input
function searchResults(city) { 
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                window.alert('Falha na requisição')
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}

//Função para acessar os campos na API.
function displayResults(weather) {
    console.log(weather)

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let hora = now.getHours();
    if(hora>18 || hora<5){
    img.src='noite.jpg'}
    else  
    {img.src='dia.jpg'}

    umidade.innerText=`U.R=${weather.main.humidity}`
    let iconName = weather.weather[0].icon;
    container_img.innerHTML = `<img src="./icons/${iconName}.png">`;

    let temperature = `${Math.round(weather.main.temp)}`
    temp_number.innerHTML = temperature;
    temp_unit.innerHTML = `°c`;

    weather_tempo = weather.weather[0].description;
    weather_t.innerText = capitalizeFirstLetter(weather_tempo)

}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

