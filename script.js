// v0.2.0

document.getElementById("version_number").innerHTML = "ZSUIMS v0.2.11";
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

function blankData(){
	document.getElementById("main_data").innerHTML = ""
	document.getElementById("zoo_button").innerHTML = "<b>Search Zoos</b>"
	document.getElementById("species_button").innerHTML = "Search Species"
	document.getElementById("admin_button").innerHTML = "Admin Tools"
}


function showStaffLogin(){
	document.getElementById("main_data").innerHTML = "<b>Enter Admin Password</b><p><input type=\"text\" id=\"admin_pass\" name=\"admin_pass\"><input onClick=\"loadStaffPage()\"  type=\"submit\" value=\"Submit\"></p>"
	document.getElementById("zoo_button").innerHTML = "Search Zoos"
	document.getElementById("species_button").innerHTML = "Search Species"
	document.getElementById("admin_button").innerHTML = "<b>Admin Tools</b>"
}

function loadStaffPage(){
	// This isn't secure. This isn't meant to be secure, just a deterrent. This is a Zoo Tycoon roleplay group. Why are you trying to hack it.
	if(document.getElementById("admin_pass").value == 'peggle2'){
		document.getElementById("main_data").innerHTML = "<h3>Admin Tools</h3><button type=\"button3\" onclick=\"staffSpecies()\">Edit Species</button><button type=\"button3\" onclick=\"staffZoos()\">Edit Zoos</button><button type=\"button3\" onclick=\"staffAnimals()\">Edit Animals</button><br><br><div id=\"staffData\"></div>"
		document.getElementById("zoo_button").innerHTML = "Search Zoos"
		document.getElementById("species_button").innerHTML = "Search Species"
		document.getElementById("admin_button").innerHTML = "<b>Admin Tools</b>"
	}
}

function staffSpecies(){
	var ZooData = Http.responseText;
	var ZooJson = JSON.parse(ZooData);
	var SpeciesList = Object.keys(ZooJson.Species);
	var staffSpeciesHTML = '<b>Pairing Types</b><br><b>MONO</b>: Serially Monogamous. A pair will both commit to breeding, but may pair up with others.<br><b>LIFE</b>: Mate for Life. A pair will both commit to breeding, and will remember their mate.<br><b>HARM and HARF</b>: Harem of Males/Females. A single male will be able to breed with many females, or vice versa.<br><br><b>Breeding Numbers</b><br><b>Min-Max</b>: Litter size.<br><b>Odds</b>Chances of breeding each viable week compared to others. 0.5 is half, 2 is twice.<br><b>Freq</b>Number of weeks after baby grows up until it is able to breed again.<br><b>Adult Time</b>: How many weeks it takes for a baby to grow up.<br><br><table id=\"species_table\"><tr><th style="width: 80px;">Group</th><th>Scientific Name</th><th>Common Names</th><th>Order</th><th>Family</th><th style="width: 66px;">Pair Type</th><th style="width: 50px;">Min</th><th style="width: 50px;">Max</th><th style="width: 50px;">Odds</th><th style="width: 50px;">Freq</th><th style="width: 50px;">Adult Time</th><th style="width: 80px;">Author</th><th style="width: 30px;">Submit</th></tr>'
	
	document.getElementById("staffData").innerHTML = staffSpeciesHTML
	
	for(i = 0; i < SpeciesList.length; i++){
		species = ZooJson['Species'][SpeciesList[i]]
		if(species['author'] == undefined){
			author = ""
		} else {
			author = species['author']
		}
		
		if(species['family'] == undefined){
			family = ""
		} else {
			family = species['family']
		}
		
		staffSpeciesHTML = staffSpeciesHTML + '<tr id="' + SpeciesList[i] + '">'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_group">' + species['group'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td>' + SpeciesList[i] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_names" contenteditable="true">' + species['common names'].join('<br>') + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_order" contenteditable="true">' + species['order'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_family" contenteditable="true">' + family + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_pair" contenteditable="true">' + species['pair type'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_min" contenteditable="true">' + species['min'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_max" contenteditable="true">' + species['max'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_odds" contenteditable="true">' + species['odds'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_freq" contenteditable="true">' + species['freq'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_adult" contenteditable="true">' + species['adult time'] + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td id="' + SpeciesList[i] + '_author" contenteditable="true">' + author + '</td>'
		staffSpeciesHTML = staffSpeciesHTML + '<td><button style="width: 80px;" type="button2" onclick="applyChanges(\'Species\', \'' + SpeciesList[i] + '\')" id="' + SpeciesList[i] + '_submit">Update</button></td>'
		staffSpeciesHTML = staffSpeciesHTML + '</tr>'
	}
	
	document.getElementById("staffData").innerHTML = staffSpeciesHTML
}

function applyChanges(section, field){
	var patchurl = "https://aviivix-ecde9-default-rtdb.firebaseio.com/ZSUIMS/" + section + "/" + field + ".json";

	var xhr = new XMLHttpRequest();
	xhr.open("PATCH", patchurl);

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
	   if (xhr.readyState === 4) {
		  console.log(xhr.status);
		  console.log(xhr.responseText);
	   }
	};
	names = document.getElementById(field + "_names").innerHTML.split('<br>')
	
	data = '{"adult time": ' + document.getElementById(field + "_adult").innerHTML + ', "common names": ["' + names.join('","') + '"], "freq": ' + document.getElementById(field + "_freq").innerHTML + ', "max": ' + document.getElementById(field + "_max").innerHTML + ', "min": ' + document.getElementById(field + "_min").innerHTML + ', "odds": ' + document.getElementById(field + "_odds").innerHTML + ', "order": "' + document.getElementById(field + "_order").innerHTML + '", "pair type": "' + document.getElementById(field + "_pair").innerHTML + '", "family": "' + document.getElementById(field + "_family").innerHTML + '", "author": "' + document.getElementById(field + "_author").innerHTML + '"}'
	console.log(data)

	xhr.send(data);
}

function staffZoos(){
	
}

function staffAnimals(){
	
}

function showSpeciesList(){
	document.getElementById("main_data").innerHTML = "<br><br><br><div align=\"center\"><img src=\"https://cdn.discordapp.com/emojis/905527527655735349.gif\"></div>"
	document.getElementById("zoo_button").innerHTML = "Search Zoos"
	document.getElementById("admin_button").innerHTML = "Admin Tools"
	document.getElementById("species_button").innerHTML = "<b>Search Species</b>"
	document.getElementById("main_data").innerHTML = "\t<h3>Species Data</h3>\n\t\t<h1>Mammals</h1>\n\t\t<div id=\"mam_info\"></div>\n\t\t<h1>Birds</h1>\n\t\t<div id=\"bird_info\"></div>\n\t\t<h1>Herptiles</h1>\n\t\t<div id=\"herp_info\"></div>\n\t\t<h1>Fish</h1>\n\t\t<div id=\"fish_info\"></div>\n\t\t<h1>Invertebrates</h1>\n\t\t<div id=\"invert_info\"></div>"
	
	var ZooData = Http.responseText;
	var ZooJson = JSON.parse(ZooData);
	var IndList = Object.keys(ZooJson.Individuals);
	var Holdings = {}
	var HoldingHTML = ""
	
	for(let i = 0; i < IndList.length; i++){
		var species = ZooJson['Individuals'][IndList[i]]['scientific name']
		var sex = ZooJson['Individuals'][IndList[i]]['sex']
		var age = ZooJson['Individuals'][IndList[i]]['age']
		var owner = ZooJson['Individuals'][IndList[i]]['owner'];
		console.log(species);
		
		if (Object.keys(ZooJson['Individuals'][IndList[i]]).indexOf('subspecies_breed') == -1) {
			var subspecies = 'No Subspecific Status';
		} else if(ZooJson['Individuals'][IndList[i]]['subspecies_breed'] == '') {
			var subspecies = 'No Subspecific Status';
		} else {
			var subspecies = ZooJson['Individuals'][IndList[i]]['subspecies_breed'];
		}
		
		if(Object.keys(Holdings).indexOf(species) == -1){
			Holdings[species] = {}
			Holdings[species][subspecies] = {}
			Holdings[species][subspecies][owner] = { 'Adult': { "M": 0, "F": 0 }, 'Juv': { "M": 0, "F": 0 } }
		} else if(Object.keys(Holdings[species]).indexOf(subspecies) == -1) {
			Holdings[species][subspecies] = {}
			Holdings[species][subspecies][owner] = { 'Adult': { "M": 0, "F": 0 }, 'Juv': { "M": 0, "F": 0 } }
		} else if (Object.keys(Holdings[species][subspecies]).indexOf(owner) == -1) {
			Holdings[species][subspecies][owner] = { 'Adult': { "M": 0, "F": 0 }, 'Juv': { "M": 0, "F": 0 } }
		}
		Holdings[species][subspecies][owner][age][sex]++
	}
	
	for(let i = 0; i < Object.keys(Holdings).length; i++){
		species = Object.keys(Holdings)[i]
		speciesData = ZooJson['Species'][species]
		var HoldingHTML = HoldingHTML + "<h5>" + speciesData['common names'][0] + "</h5>"
		if (speciesData['common names'].length > 1){
			var HoldingHTML = HoldingHTML + "<h6>Alternate Names: " + speciesData['common names'].slice(1) + "</h6>"
		}
		
		for(let s = 0; s < Object.keys(Holdings[species]).length; s++){
			var subspecies = Object.keys(Holdings[species])[s]
			if (subspecies == 'No Subspecific Status'){
				var name = species
			} else {
				var name = species + ' ' + subspecies
			}
			var HoldingHTML = HoldingHTML + "<h4><i>" + name + "</i></h4>\n\t<div class=\"row\">"
			
			var cols = [[],[],[],[],[]];
			for(let o = 0; o < Object.keys(Holdings[species][subspecies]).length; o++){
				var owner = Object.keys(Holdings[species][subspecies])[o]
				
				if (Holdings[species][subspecies][owner]['Juv']['M'] + Holdings[species][subspecies][owner]['Juv']['F'] == 0) {
					if(ZooJson['Zoos'][owner]['status'] != 'Open'){
						var notation = '<p style=\"color:#72767d\">' + ZooJson['Zoos'][owner]['zoo_name'] + " (" + Holdings[species][subspecies][owner]['Adult']["M"] + '.' + Holdings[species][subspecies][owner]['Adult']["F"] + ")" + '</p>'
					} else {
						var notation = '<p>' + ZooJson['Zoos'][owner]['zoo_name'] + " (" + Holdings[species][subspecies][owner]['Adult']["M"] + '.' + Holdings[species][subspecies][owner]['Adult']["F"] + ')</p>'
					}
				} else {
					if(ZooJson['Zoos'][owner]['status'] != 'Open'){
						var notation = '<p style=\"color:#72767d\">' + ZooJson['Zoos'][owner]['zoo_name'] + " (" + Holdings[species][subspecies][owner]['Adult']["M"] + '.' + Holdings[species][subspecies][owner]['Adult']["F"] + '.' + Holdings[species][subspecies][owner]['Juv']["M"] + '.' + Holdings[species][subspecies][owner]['Juv']["F"] + ')' + '</p>'
					} else {
						var notation = '<p>' + ZooJson['Zoos'][owner]['zoo_name'] + " (" + Holdings[species][subspecies][owner]['Adult']["M"] + '.' + Holdings[species][subspecies][owner]['Adult']["F"] + '.' + Holdings[species][subspecies][owner]['Juv']["M"] + '.' + Holdings[species][subspecies][owner]['Juv']["F"] + ')</p>'
					}
				}
				cols[o%5].push(notation)
				console.log(cols)
			}
			var HoldingHTML = HoldingHTML + "<div class=\"column\"> " + cols[0].join(" ") + " </div><div class=\"column\"> " + cols[1].join(" ") + " </div><div class=\"column\"> " + cols[2].join(" ") + " </div><div class=\"column\"> " + cols[3].join(" ") + " </div><div class=\"column\"> " + cols[4].join(" ") + " </div></div>"
		}
	}
	document.getElementById("main_data").innerHTML = HoldingHTML
}

function getZooData(zoo_name){
	document.getElementById("zoo_button").innerHTML = "<b>Search Zoos</b>"
	document.getElementById("species_button").innerHTML = "Search Species"
	document.getElementById("main_data").innerHTML = "\t<h3><div id=\"current_zoo_name\"></div></h3>\n\t\t<div id=\"current_zoo_data\"></div>\n\t\t<h1>Held Species</h1>\n\t\t<div id=\"species_info\"></div>\n\t\t<h2>Birds</h2>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"bird_col_0\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"bird_col_1\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"bird_col_2\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"bird_col_3\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"bird_col_4\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<h2>Mammals</h2>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"mam_col_0\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"mam_col_1\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"mam_col_2\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"mam_col_3\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"mam_col_4\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<h2>Herptiles</h2>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"herp_col_0\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"herp_col_1\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"herp_col_2\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"herp_col_3\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"herp_col_4\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<h2>Fish</h2>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"fish_col_0\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"fish_col_1\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"fish_col_2\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"fish_col_3\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"fish_col_4\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<h2>Invertebrates</h2>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"invert_col_0\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"invert_col_1\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"invert_col_2\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"invert_col_3\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"column\">\n\t\t\t\t<div id=\"invert_col_4\"></div>\n\t\t\t</div>\n\t\t</div>";
	
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

