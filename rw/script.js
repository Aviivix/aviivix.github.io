// Carousel Shit

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

screenshots = ["cloudfall.png", "five-valleys.png", "himeville_animal_park.png", "hope.png", "itaoca.png", "losjon.png", "serra_mondiale.png", "zoo_moss.png"]
images = []
function preload() {
    for (var i = 0; i < screenshots.length; i++) {
        images[i] = new Image();
		console.log('assets/screenshots/' + screenshots[i])
        images[i].src = preload['assets/screenshots/' + screenshots[i]];
    }
}

//-- usage --//
preload(screenshots)

screenIndex = 0

cur = document.querySelector('.carousel_container_main')
nxt = document.querySelector('.carousel_container_next')

function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}

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
	
	
},4000);
