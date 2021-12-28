// v0.1.7

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
	
	var IndList = Object.keys(ZooJson.Individuals);
	var OwnedAnimals = [];
	for(let i = 0; i < IndList.length; i++){
		if(ZooJson['Individuals'][IndList[i]]['owner'] == zoo_name){
			OwnedAnimals.push(IndList[i])
		}
	}
	
	var OwnedSpecies = {};
	
	for(let i = 0; i < OwnedAnimals.length; i++){
		var species = ZooJson['Individuals'][OwnedAnimals[i]]['scientific name']
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
	
	var BirdCol = [[],[],[],[],[]]
	var MammCol = [[],[],[],[],[]]
	var HerpCol = [[],[],[],[],[]]
	var FishCol = [[],[],[],[],[]]
	var InveCol = [[],[],[],[],[]]	
	
	console.log('SPECIES OK: ')
	console.log(OwnedSpecies)
	
	for (let i = 0; i < Object.keys(OwnedSpecies).length; i++){
		
		var species = Object.keys(OwnedSpecies)[i]
		console.log('NEW SPECIES: ' + species)
		for (let s = 0; s < Object.keys(OwnedSpecies[species]).length; s++){
			var subspecies = Object.keys(OwnedSpecies[species])[s]
			console.log('CHECKING SUBSPECIES: ' + subspecies)
			if (subspecies != 'No Subspecific Status'){
				if (OwnedSpecies[species][subspecies]['Juv']['M'] + OwnedSpecies[species][subspecies]['Juv']['F'] == 0) {
					var notation = OwnedSpecies[species][subspecies]['Adult']["M"] + '.' + OwnedSpecies[species][subspecies]['Adult']["F"] + ' ' + ZooJson['Species'][species]['common names'][0] + ' (' + subspecies + ')'
				} else {
					var notation = OwnedSpecies[species][subspecies]['Adult']["M"] + '.' + OwnedSpecies[species][subspecies]['Adult']["F"] + '.' + OwnedSpecies[species][subspecies]['Juv']["M"] + '.' + OwnedSpecies[species][subspecies]['Juv']["F"] + ' ' + ZooJson['Species'][species]['common names'][0] + ' (' + subspecies + ')'
				}
			} else {
				if (OwnedSpecies[species][subspecies]['Juv']['M'] + OwnedSpecies[species][subspecies]['Juv']['F'] == 0) {
					var notation = OwnedSpecies[species][subspecies]['Adult']["M"] + '.' + OwnedSpecies[species][subspecies]['Adult']["F"] + ' ' + ZooJson['Species'][species]['common names'][0]
				} else {
					var notation = OwnedSpecies[species][subspecies]['Adult']["M"] + '.' + OwnedSpecies[species][subspecies]['Adult']["F"] + '.' + OwnedSpecies[species][subspecies]['Juv']["M"] + '.' + OwnedSpecies[species][subspecies]['Juv']["F"] + ' ' + ZooJson['Species'][species]['common names'][0]
				}
			}
			var col = i % 5
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
				case 'Invertibrates':
					InveList.push(notation);
					break;
			}
		}
	}
	
	for (let i = 0; i < BirdList.length; i++){
		var col = i % 5
		BirdCol[i%5].push(BirdList[i])
	}
	for (let i = 0; i < MammList.length; i++){
		var col = i % 5
		MammCol[i%5].push(MammList[i])
	}
	for (let i = 0; i < HerpList.length; i++){
		var col = i % 5
		HerpCol[i%5].push(HerpList[i])
	}
	for (let i = 0; i < FishList.length; i++){
		var col = i % 5
		FishCol[i%5].push(FishList[i])
	}
	for (let i = 0; i < InveList.length; i++){
		var col = i % 5
		InveCol[i%5].push(InveList[i])
	}
	
	document.getElementById("bird_col_0").innerHTML = "<p>" + BirdCol[0].join("</p><p>") + "</p>";
	document.getElementById("bird_col_1").innerHTML = "<p>" + BirdCol[1].join("</p><p>") + "</p>";
	document.getElementById("bird_col_2").innerHTML = "<p>" + BirdCol[2].join("</p><p>") + "</p>";
	document.getElementById("bird_col_3").innerHTML = "<p>" + BirdCol[3].join("</p><p>") + "</p>";
	document.getElementById("bird_col_4").innerHTML = "<p>" + BirdCol[4].join("</p><p>") + "</p>";
	
	document.getElementById("mam_col_0").innerHTML = "<p>" + MammCol[0].join("</p><p>") + "</p>";
	document.getElementById("mam_col_1").innerHTML = "<p>" + MammCol[1].join("</p><p>") + "</p>";
	document.getElementById("mam_col_2").innerHTML = "<p>" + MammCol[2].join("</p><p>") + "</p>";
	document.getElementById("mam_col_3").innerHTML = "<p>" + MammCol[3].join("</p><p>") + "</p>";
	document.getElementById("mam_col_4").innerHTML = "<p>" + MammCol[4].join("</p><p>") + "</p>";
	
	document.getElementById("herp_col_0").innerHTML = "<p>" + HerpCol[0].join("</p><p>") + "</p>";
	document.getElementById("herp_col_1").innerHTML = "<p>" + HerpCol[1].join("</p><p>") + "</p>";
	document.getElementById("herp_col_2").innerHTML = "<p>" + HerpCol[2].join("</p><p>") + "</p>";
	document.getElementById("herp_col_3").innerHTML = "<p>" + HerpCol[3].join("</p><p>") + "</p>";
	document.getElementById("herp_col_4").innerHTML = "<p>" + HerpCol[4].join("</p><p>") + "</p>";
	
	document.getElementById("fish_col_0").innerHTML = "<p>" + FishCol[0].join("</p><p>") + "</p>";
	document.getElementById("fish_col_1").innerHTML = "<p>" + FishCol[1].join("</p><p>") + "</p>";
	document.getElementById("fish_col_2").innerHTML = "<p>" + FishCol[2].join("</p><p>") + "</p>";
	document.getElementById("fish_col_3").innerHTML = "<p>" + FishCol[3].join("</p><p>") + "</p>";
	document.getElementById("fish_col_4").innerHTML = "<p>" + FishCol[4].join("</p><p>") + "</p>";
	
	document.getElementById("invert_col_0").innerHTML = "<p>" + InveCol[0].join("</p><p>") + "</p>";
	document.getElementById("invert_col_1").innerHTML = "<p>" + InveCol[1].join("</p><p>") + "</p>";
	document.getElementById("invert_col_2").innerHTML = "<p>" + InveCol[2].join("</p><p>") + "</p>";
	document.getElementById("invert_col_3").innerHTML = "<p>" + InveCol[3].join("</p><p>") + "</p>";
	document.getElementById("invert_col_4").innerHTML = "<p>" + InveCol[4].join("</p><p>") + "</p>";
	document.getElementById("current_zoo_name").innerHTML = ZooJson['Zoos'][zoo_name]['zoo_name'];
	document.getElementById("current_zoo_data").innerHTML = "<p>" + ZooJson['Zoos'][zoo_name]['zoo_name'] + " was founded by " + ZooJson['Zoos'][zoo_name]['owner_name'] + ", and is located in " + ZooJson['Zoos'][zoo_name]['location'] + " (" + ZooJson['Zoos'][zoo_name]['region'] + ").</p><p>It currently has " + ZooJson['Zoos'][zoo_name]['tokens'] + " tokens.";
	document.getElementById("species_info").innerHTML = "<p>" + ZooJson['Zoos'][zoo_name]['zoo_name'] + " currently owns " + OwnedAnimals.length + ' individual animals from ' + Object.keys(OwnedSpecies).length + " species.</p>";
	
	
}

