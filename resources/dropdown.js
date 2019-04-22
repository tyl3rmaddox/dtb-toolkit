$(document).ready(function() {
	$(".dropdown-button").dropdown({
		inDuration: 550,
      	outDuration: 225,
      	constrainWidth: true, // Does not change width of dropdown to that of the activator
      	hover: true, // Activate on hover
      	gutter: 0, // Spacing from edge
     	belowOrigin: true, // Displays dropdown below the button
      	stopPropagation: false // Stops event propagation
	});
});