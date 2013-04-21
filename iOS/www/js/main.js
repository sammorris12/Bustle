$(document).ready(function() {

// Ready
		
// document.addEventListener("deviceready", onDeviceReady, false);

 // function onDeviceReady() {
   		pullDownActionStops();


// Initalise iScroll    
    
	var myScroll,
	pullDownEl, pullDownOffset,
	generatedCount = 0
	
// Loading

	var loadingMessages = Array('Just Loading...', 'Contacting Bus Gods...', 'Reticulating Splines...', 'Please Hold...', 'Looking Down The Street...', 'Ermm....', 'Making Up Bus Routes...', 'Repointing GPS Laser...', 'Affirmative, Dave')

	function loadingList() {
		$('#pullDown').removeClass('flip').toggleClass('loading');
		var loadingMessage = loadingMessages[Math.floor(Math.random()*loadingMessages.length)];
		$(".pullDownLabel").html(loadingMessage);
	}
	

// On Click... 
	
	jQuery.ajax_success_enable = function ajax_success_enable() {
		clearList();
		pullDownActionBus();
		$(".back").css('display', 'inline');
	}
	
// Back Button Nonsense
		
	$('.back').click(function(){
		$(".back").css('display', 'none');
		$('.aboutPanel').css('display','none');
		clearList();
		pullDownActionStops ();
	});
	
// About Button Nonsense
	
	$('.about').click(function(){
		$(".aboutBack").css('display', 'inline');
		$('.aboutPanel').css('display','inline');
		newScroll = new iScroll('aboutwrapper', { fixedScrollbar : false, hScrollbar : false, vScrollbar : true });
	});
	
	$('.aboutBack').click(function(){
		$(".back").css('display', 'none');
		$('.aboutPanel').css('display','none');
		
		if (currentPage=="buses") {
			$(".back").css('display', 'inline');
		}
		
	});
	
// Scroll on Status Tap

	$('#header').click(function() {
		$('#scroller').toggleClass('headerscroll');
		$('#scroller').css( "-webkit-transform","translate(0px, -66px)" );
	});  

// Loading

function clearList() {
	$('#thelist').empty();
}
	
// Retrive Stops List

function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }

function pullDownActionStops() {

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
	    
	    function onSuccess(position) {
	    
	    var currentLat = position.coords.latitude;
	    var currentLong = position.coords.longitude;
	    
	    	$.ajax({
			    type: "POST",
			    url: "http://bus.sammorr.is/application/views/backend/stops-app-1.01.php",
			    beforeSend: function() {
			    	loadingList();
			    },
			    timeout: 20000,
			    data: { lat: position.coords.latitude, long: position.coords.longitude },
			    success: function(data) {
			    	$('#thelist').html(data);
			    	LocationRefresh();
			    	
			    },
			    error: function(x, t, m) {
			    	if(t==="timeout") {
				    	$("#thelist").html("<li class='failure'><h2>You wait ages for a bus...</h2><p>This was taking too long, please try again.</p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li><li class='failure'><h2>You wait ages for a bus...</h2><p>This was taking too long, please try again.</p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li>");	
				    	LocationRefresh();
			    	} else {
				    	$("#thelist").html("<li class='failure'><h2>Eternal nothingness is fine if you happen to be dressed for it</h2><p>Either you've got no internet or we're having some issues.</p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li>");	
				    	LocationRefresh();
			    	}
				}
			});
	        
	     }
	
	    function onError(error) {
	    
	    	$("#thelist").html("<li class='failure'><h2>Targeting systems are down sir</h2><p>We seem to be having some issues finding you. You might have disabled your GPS.</p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li>");	
	   
	    }
	   	    
	    currentPage = "stops";
	    
	    $("#scroller").removeClass();
	    $("#scroller").addClass("stops");

}

// Retrive Bus List

function pullDownActionBus() {
		
		$.ajax({
			type: "POST",
			url: "http://bus.sammorr.is/application/views/backend/buses-app-1.01.php",
			// async: false,
			beforeSend: function() {
				loadingList(); 
			},
			timeout: 20000,
			data: { stop_id : stop_id },
			success: function(data) {
				$('#thelist').html(data);
				LocationRefresh();
			},
			error: function() {
				$("#thelist").append("<li class='failure'><h2>Looks like you're walking today</h2><p>We can't find any buses due to arrive at this stop. </p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li>");
			},
			error: function(x, t, m) {
			    if(t==="timeout") {
				    $("#thelist").html("<li class='failure'><h2>You wait ages for a bus...</h2><p>This was taking too long, please try again.</p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li><li class='failure'><h2>You wait ages for a bus...</h2><p>This was taking too long, please try again.</p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li>");	
				    LocationRefresh();
			    } else {
				    $("#thelist").html("<li class='failure'><h2>Eternal nothingness is fine if you happen to be dressed for it</h2><p>Either you've got no internet or we're having some issues.</p><p>Please <a href='mailto:mail@sammorrisdesign.co.uk'>contact us</a> if you think something is wrong</p></li>");	
				    LocationRefresh();
			    }
			}
		});
 
	 currentPage = "buses";
	 
	 $("#scroller").removeClass();
	 $("#scroller").addClass("buses");

}

// Pull to Refresh & iScroll

	function loaded() {
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;

		myScroll = new iScroll('wrapper', {
			useTransition: true,
			vScrollbar: true,
			fixedScrollbar: false,
			topOffset: pullDownOffset,
			onRefresh: function () {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				} 
			},
			onScrollMove: function () {
				$('#thelist li').removeClass('active_link');
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
					$('#scroller').css( "-webkit-transform","translate(0px, 0px) scale(1) translateZ(0px)" );
						if (currentPage=="stops") {
							pullDownActionStops();
						}
						if (currentPage=="buses") {
							pullDownActionBus();
						}
						
				} 
			}
		});
		
		setTimeout(function (){ document.getElementById('wrapper').style.left = '0'; }, 800);
	}	
	
// On Refresh Get Height

function LocationRefresh() {
	myScroll.refresh();
	myScroll.scrollTo(0,0,0);
	$('#pullDown').css( "margin-top","0px" );
}

window.addEventListener('load', setTimeout(function () { loaded(); }, 200), false);

// }
	
});