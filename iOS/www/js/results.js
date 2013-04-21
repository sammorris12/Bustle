$(document).ready(function() {

	// Ready
	
	$(function(){
		document.addEventListener("deviceready", onDeviceReady, false);
	})


    // Get Location 
    
    function onDeviceReady() {
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
	    
	    function onSuccess(position) {
	        
	        $('#thelist').load('http://bus.sammorr.is/application/views/backend/print-app.php', { lat: position.coords.latitude, long: position.coords.longitude }, LocationRefresh);
	        
	    }
	
	    function onError(error) {
	        alert("Can't locate position");
	    }
	 }
    
    // iScroll
    
    
var myScroll,
	pullDownEl, pullDownOffset,
	generatedCount = 0;

function pullDownAction () {

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
	    
	    function onSuccess(position) {
	        
	        $('#thelist').load('http://bus.sammorr.is/application/views/backend/print-app.php', { lat: position.coords.latitude, long: position.coords.longitude }, LocationRefresh);
	        
	    }
	
	    function onError(error) {
	        alert("Can't locate position");
	    }
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		hScroll: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
			} 
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} 
		},
		
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction();
			} 
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

function LocationRefresh() {
	
	myScroll.refresh();	
	
}

window.addEventListener('load', setTimeout(function () { loaded(); }, 200), false);
    

    
    
});