// Carousel Shit

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

screenshots = ["cloudfall.png", "five-valleys.png", "himeville_animal_park.png", "hope.png", "itaoca.png", "losjon.png", "serra_mondiale.png", "zoo_moss.png"]
screenIndex = 0

cur = document.querySelector('.carousel_container_main')
nxt = document.querySelector('.carousel_container_next')


time=setInterval(async function(){
	if (screenIndex + 1 == screenshots.length) {
		screenIndex = 0
	} else {
		screenIndex = screenIndex + 1
	}
	
	nxt.style.backgroundImage = 'url(assets/screenshots/' + screenshots[screenIndex] + ')'
	
	cur.style.marginLeft = '100%'
	nxt.style.marginLeft = '0px'
	
	await new Promise(r => setTimeout(r, 1000));
	
	cur.style.transition = 'margin 0s'
	nxt.style.transition = 'margin 0s'
	
	await new Promise(r => setTimeout(r, 50));
	cur.style.backgroundImage = 'url(assets/screenshots/' + screenshots[screenIndex] + ')'
	cur.style.marginLeft = '0px'
	nxt.style.marginLeft = '-100%'
	
	await new Promise(r => setTimeout(r, 50));
	cur.style.transition = 'margin 0.5s'
	nxt.style.transition = 'margin 0.5s'
	
	
	if (screenIndex + 1 == screenshots.length) {
		document.getElementById('carousel_preload').style.backgroundImage = 'url(assets/screenshots/' + screenshots[0] + ')'
	} else {
		document.getElementById('carousel_preload').style.backgroundImage = 'url(assets/screenshots/' + screenshots[screenIndex+1] + ')'
	}
	
	
},4000);
