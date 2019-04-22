$(document).ready(function() {
	$("a.group").fancybox({
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	false
	});

	var $toc = $('.table-of-contents');

	$('.section.scrollspy').each(function(i, e) {
		var $this = $(this);
		var title = $this.find('.section-title').text();

		$toc.append('<li><a href="#' + $this.attr('id') + '">' + title + '</a></li>');
	});

	$('.scrollspy').scrollSpy();

	$('#tocWrapper').pushpin({
		top: $('nav.top-nav').height()
	})
});