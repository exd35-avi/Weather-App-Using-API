const temperatureField = document.querySelector('.weather1');

const cityField = document.querySelector('.weather2 p');
const dateField = document.querySelector('.weather2 span');

const emojiField = document.querySelector('.weather3 p img');
const weatherField = document.querySelector('.weather3 span');

const searchField = document.querySelector('.searchField');
const form = document.querySelector('form');

// let target = 'kolkata';

const fetchData = async(target)=>{
    try {
    const url = `https://api.weatherapi.com/v1/current.json?key=a78dc2e323d949fea55164639230302&q=${target}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    console.log(data.current.temp_c);

    // Data destructuring
    const {
        current: {
            temp_c,
            condition: { text,icon}
        },
        location: {name,localtime}
    } = data;

    updateDOM(temp_c,name,localtime,icon,text);

    // updateDOM(data.current.temp_c,data.location.name);
    } catch (err) {
        alert('Location not found, please check spelling');
    }
    

}

function updateDOM(temperature,city,localtime,emoji,text) {
    temperatureField.innerHTML = `${temperature}°`;
    cityField.innerHTML = city;

    emojiField.src = emoji;
    weatherField.innerHTML = text;

    const exactDate = localtime.split(" ")[0];
    const exacttime = localtime.split(" ")[1];

    const exactDay = new Date(exactDate).getDay();
    
    dateField.innerHTML = `${exacttime} - ${getDayFullName(exactDay)} ${exactDate}`;
    console.log(exacttime);
    console.log(exactDate);
    console.log(getDayFullName(exactDay));
}

function getDayFullName(num) {
    switch (num) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thrusday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return `Dont't know`;
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const target = searchField.value;
    console.log(target);

    fetchData(target);
});

// fetchData();