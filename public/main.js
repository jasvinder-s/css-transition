var oldElementNumber = 0;
var MAX_ELEMENTS = 9;
$(document).ready(function()  {
	var sectionHeight = $('#right section').height();
	var NUM_SECTIONS = 9;
	// One third of section is in focus all the time
	var SECTION_ROTATE_FACTOR = 3
	var MAX_SECTION = (NUM_SECTIONS) * SECTION_ROTATE_FACTOR;
	
	var currentSection = 0;
	
	var currentTop = 0;
	 
	$("#section_0").attr("tabindex",-1).focus();
	
	$('.flipper').css("transform", "rotateY(" + 0+ "deg)");
	$('.col-0' ).css("transform", "rotateY(" + 180+ "deg)");
		 
	$(document).on("click", function() {		 
		$("#section_0").attr("tabindex",-1).focus();
	});
	
	$(document).bind('keypress', function(e) {
		//up
		if(e.keyCode == 38) {
			
			if(currentSection > 0) {
				var randomSectionDecrement = getRandomSectionChangeFactor();
				currentSection = currentSection - randomSectionDecrement;
				currentTop = currentTop - (sectionHeight/3) * randomSectionDecrement;
				
				$('#right').animate({scrollTop: currentTop},getRandomMilliSeconds());
				
				var elementNumber = getElementNumber(currentSection, "up");
				if(elementNumber != oldElementNumber) {
					$('.flipper').css("transform", "rotateY(" + 0+ "deg)");
					$('.col-'+elementNumber ).css("transform", "rotateY(" + 180+ "deg)");
					oldElementNumber = elementNumber;
				} 
			}
			
		} else if(e.keyCode == 40) { //down
			if(currentSection < MAX_SECTION) {
				//currentSection = currentSection + 1;
				var randomSectionIncrement = getRandomSectionChangeFactor();
			 	currentSection = currentSection + randomSectionIncrement;
				currentTop = currentTop + (sectionHeight/3) * randomSectionIncrement;
				$('#right').animate({scrollTop: currentTop},getRandomMilliSeconds());
				
				var elementNumber = getElementNumber(currentSection, "down");
				
				if(elementNumber != oldElementNumber) {
					$('.flipper').css("transform", "rotateY(" + 0+ "deg)");
					$('.col-'+elementNumber ).css("transform", "rotateY(" + 180+ "deg)");
					oldElementNumber = elementNumber;
				} 
			}
			 
		} 
		
	});
});
 

 
function getElementNumber(currentSection, type) {
	if(currentSection == 0) {
		return 0;
	}
	var elementNumber;
	if(currentSection % 3 == 0) {
		elementNumber =  currentSection / 3;
		if(elementNumber <= MAX_ELEMENTS-1) {
			return elementNumber;
		}
	}
		
	elementNumber =  Math.floor(currentSection / 3);
	
	if(elementNumber >= MAX_ELEMENTS -1) {
		return MAX_ELEMENTS-1;
	} else {
		if(type ="down") {
			return elementNumber + 1;
		} else {
			return elementNumber -1;
		}
	}
}

// How much time taken for vertical scroll
function getRandomMilliSeconds() {
	var max = 800, min = 400;
	var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomNumber;
}

function getRandomSectionChangeFactor() {
	var max = 3, min = 1;
	var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomNumber;
	
}