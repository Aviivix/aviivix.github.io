var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


const Http = new XMLHttpRequest();
const url = 'https://aviivix-ecde9-default-rtdb.firebaseio.com/ZSUIMS.json';

Http.open("GET", url);
Http.send();

Http.onreadystatechange=(e)=>{
	var ZooData = Http.responseText;
	var ZooJson = JSON.parse(ZooData);
	var ZooList = Object.keys(ZooJson.Zoos);
	var OpenZooNames = [];
	var ClosedZooNames = [];
	
	for(let i = 0; i < ZooList.length; i++){
		if(ZooJson['Zoos'][ZooList[i]]['status'] == "Open"){
			OpenZooNames.push("<button type=\"button\" onclick=\"getZooData('"+ZooList[i]+"')\">" + ZooJson['Zoos'][ZooList[i]]['zoo_name'] + "</button>")
		} else {
			ClosedZooNames.push("<button type=\"button\" onclick=\"getZooData('" + ZooList[i] + "')\">" + ZooJson['Zoos'][ZooList[i]]['zoo_name'] + "</button>")
		}
	}
	
	document.getElementById("open_zoo_list").innerHTML = "<p>" + OpenZooNames.join("<\p><p>") + "</p>";
	document.getElementById("closed_zoo_list").innerHTML = "<p>" + ClosedZooNames.join("<\p><p>") + "</p>";
}

function getZooData(zoo_name){
	var ZooData = Http.responseText;
	var ZooJson = JSON.parse(ZooData);
	document.getElementById("current_zoo_name").innerHTML = ZooJson['Zoos'][zoo_name]['zoo_name'];
	document.getElementById("current_zoo_data").innerHTML = "<p>" + ZooJson['Zoos'][zoo_name]['zoo_name'] + " was founded by " + ZooJson['Zoos'][zoo_name]['owner_name'] + ", and is located in " + ZooJson['Zoos'][zoo_name]['location'] + " (" + ZooJson['Zoos'][zoo_name]['region'] + ").</p><p>It currently has " + ZooJson['Zoos'][zoo_name]['tokens'] + " tokens.";
	
	var IndList = Object.keys(ZooJson.Individuals);
	var OwnedAnimals = [];
	for(let i = 0; i < IndList.length; i++){
		if(ZooJson['Individuals'][IndList[i]]['owner'] == zoo_name){
			OwnedAnimals.push(IndList[i])
		}
	}
	
	var OwnedSpecies = {};
	
	for(let i = 0; i < OwnedAnimals.length; i++){
		var species = ZooJson['Individuals'][OwnedAnimals[i]]['scientific name'] + ZooJson['Individuals'][OwnedAnimals[i]]['subspecies_breed']
		var sex = ZooJson['Individuals'][OwnedAnimals[i]]['sex']
		var age = ZooJson['Individuals'][OwnedAnimals[i]]['age']
		
		if (Object.keys(ZooJson['Individuals'][OwnedAnimals[i]]).indexOf('subspecies_breed') == -1) {
				var subspecies = 'No Subspecific Status';
			} else if(ZooJson['Individuals'][OwnedAnimals[i]]['subspecies_breed'] == '') {
				var subspecies = 'No Subspecific Status';
			} else {
				var subspecies = ZooJson['Individuals'][OwnedAnimals[i]]['subspecies_breed'];
			}
		
		if(Object.keys(OwnedSpecies).indexOf(species) == -1){
			OwnedSpecies[species] = {}
			OwnedSpecies[species][subspecies] = { 'Adult': { "M": 0, "F": 0 }, 'Juv': { "M": 0, "F": 0 } }
		} else if(Object.keys(OwnedSpecies[species]).indexOf(subspecies) == -1) {
			OwnedSpecies[species][subspecies] = { 'Adult': { "M": 0, "F": 0 }, 'Juv': { "M": 0, "F": 0 } }
		}
		OwnedSpecies[species][subspecies][age][sex]++
	}
	
	var BirdList = []
	var MammList = []
	var HerpList = []
	var FishList = []
	var InveList = []
			
	for (let i = 0; i < Object.keys(OwnedSpecies).length; i++){
		var species = Object.keys(OwnedSpecies)[i]
		for (let s = 0; s < Object.keys(OwnedSpecies[species]).length; s++){
			console.log('Checking New Species')
			try {
				var subspecies = Object.keys(OwnedSpecies[species])[s]
				if (OwnedSpecies[species][subspecies]['Juv']['M'] + OwnedSpecies[species][subspecies]['Juv']['F'] == 0) {
					var notation = OwnedSpecies[species][subspecies]['Adult']["M"] + '.' + OwnedSpecies[species][subspecies]['Adult']["F"] + ' ' + ZooJson['Species'][species]['common names'][0]
				} else {
					var notation = OwnedSpecies[species][subspecies]['Adult']["M"] + '.' + OwnedSpecies[species][subspecies]['Adult']["F"] + '.' + OwnedSpecies[species][subspecies]['Juv']["M"] + '.' + OwnedSpecies[species][subspecies]['Juv']["F"] + ' ' + ZooJson['Species'][species]['common names'][0]
				}
				console.log(ZooJson['Species'][species])
				switch (ZooJson['Species'][species]['group']){
					case 'Birds':
						BirdList.push(notation);
						break;
					case 'Mammals':
						MammList.push(notation);
						break;
					case 'Herptiles':
						HerpList.push(notation);
						break;
					case 'Fish':
						FishList.push(notation);
						break;
					case 'Invertebrates':
						InveList.push(notation);
						break;
				}
			} catch (TypeError) {
				console.log('Hit End')
			}
		}
	}
	
	document.getElementById("bird_holdings").innerHTML = "<p>" + BirdList.join("</p><p>") + "</p>";
	document.getElementById("mamm_holdings").innerHTML = "<p>" + MammList.join("</p><p>") + "</p>";
	document.getElementById("herp_holdings").innerHTML = "<p>" + HerpList.join("</p><p>") + "</p>";
	document.getElementById("fish_holdings").innerHTML = "<p>" + FishList.join("</p><p>") + "</p>";
	document.getElementById("inve_holdings").innerHTML = "<p>" + InveList.join("</p><p>") + "</p>";
	
	
}

