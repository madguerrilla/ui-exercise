'use strict';

import $ from 'jquery';

$('#sidebar').on('click', function() {
	$('#aside').stop().animate({
		height: 'toggle'
	}, 500);
});