








const CLEFAPI = '1b8434627885dd9cd5207be16b19471b';
let resultatsAPI;

const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


let ajd = new Date();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
// console.log(jourActuel, ajd);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
// console.log(tabJoursEnOrdre);


const temps=document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');


//ken lutilasateur 3ta location mte3ou
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(position => {

		//console.log(position);
		let long = position.coords.longitude;
		let lat = position.coords.latitude;
		 AppelAPI(long,lat);
	}, () => {
		alert(`Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner, veuillez l'activer.!`)
	})
}

function AppelAPI(long, lat) {

	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
	.then((reponse) => {
		return reponse.json();
	})
	.then((data) => {
		 //console.log(data);

		 resultatsAPI=data;
		 temps.innerText = resultatsAPI.current.weather[0].description;
	   temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
	   localisation.innerText = resultatsAPI.timezone;
	  
	  
	  
	  //kol 3 sweya3 m3a temperature
	  
		let heureActuelle = new Date().getHours();

		for(let i = 0; i < heure.length; i++) {

			let heureIncr = heureActuelle + i * 3;

			if(heureIncr > 24) {
				heure[i].innerText = `${heureIncr - 24} h`;
			} else if(heureIncr === 24) {
				heure[i].innerText = "00 h"
			} else {
				heure[i].innerText = `${heureIncr} h`;
			}

		}
	  //temperature ta3 kol  sweya3 
	  
		for(let j = 0; j < tempPourH.length; j++) {
			tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
		}
	  
	  // trois premieres lettres des jours 

		for(let k = 0; k < tabJoursEnOrdre.length; k++) {
			joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
		}


		// Temps par jour
		for(let m = 0; m < 7; m++){
			tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
		}

		// Icone dynamique 
		 if(heureActuelle >= 6 && heureActuelle < 21) {
			 imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
		 } else  {
			imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
		 }
	})

}


var map = document.querySelector('#map');
var paths = map.querySelectorAll('.map--svg a');
var links = map.querySelectorAll('.map--list a')

//Polyfill du foreach
if(NodeList.prototype.forEach == undefined){
	NodeList.prototype.forEach = function(callback){
		[].forEach.call(this.callback)
	}
}
// active area
var activeArea = function(id){
		map.querySelectorAll('.is-active').forEach(function(item){
			item.classList.remove('is-active');
		})	
		if (id !== undefined) {
			document.querySelector('#list-'+ id).classList.add('is-active')
			document.querySelector('#area-'+id).classList.add('is-active')		
		}

}
// Select item
paths.forEach(function(path){

	path.addEventListener('mouseenter',function(e){
		var id = this.id.replace('area-','')
		activeArea(id)
	})
})

links.forEach(function(link){

	link.addEventListener('mouseenter',function(e){
		var id = this.id.replace('list-','')
		activeArea(id)
	})
})
map.addEventListener('mouseover',function(){
	activeArea();
})







function GetInfo() {

	var newName = document.getElementById("cityInput");
	var cityName = document.getElementById("cityName");
	cityName.innerHTML = "-------"+newName.value+"--------";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=87bfc356fb4d9c34b842d5aaf20c9969')
.then(response => response.json())
.then(data => {

	//Getting the min and max values for each day
	for(i = 0; i<7; i++){
		document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
		//Number(1.3450001).toFixed(2); // 1.35
	}

	for(i = 0; i<7; i++){
		document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
	}
	//------------------------------------------------------------

	//Getting Weather Icons
	 for(i = 0; i<7; i++){
		document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
		data.list[i].weather[0].icon
		+".png";
	}
	//------------------------------------------------------------
	console.log(data)

})
.catch(err => alert("Ville Inconnu"))

}


function DefaultScreen(){
	document.getElementById("cityInput").defaultValue = "Tunis";
	GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
	if(day + d.getDay() > 6){
		return day + d.getDay() - 7;
	}
	else{
		return day + d.getDay();
	}
}

	for(i = 0; i<7; i++){
		document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
	}
	//------------------------------------------------------------
