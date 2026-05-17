/**
* Simple JS-Check—remove no-js class and set js
*/
function js_is_enabled() {
	$('html').removeClass('no-js');
	$('html').addClass('js');
}

// jQuery extensions
jQuery.fn.extend({
    a11yShow: function () {
        return this.attr('aria-hidden', 'false').show();
    },
    a11yHide:function(){
        return this.attr('aria-hidden', 'true').hide();
    }
});

jQuery.fn.extend({
    a11yCollapsed: function () {
        return this.attr('aria-expanded', 'false');
        // return this.attr('aria-expanded', 'false').hide();
    },
    a11yExpanded:function(){
        return this.attr('aria-expanded', 'true');
        // return this.attr('aria-expanded', 'true').show();
    }
});

jQuery.fn.hasAttr = function(name) { 
   return this.attr(name) !== undefined;
};

// toggle element attribute
// $(this).closest('ul').find('> li.tree-parent').attr('aria-expanded', function (i, attr) {
//     return attr == 'true' ? 'false' : 'true'
// });

// $(function () {
//   if ($('').attr('aria-expanded') === true) {
//     $(this). … ;
//   }
// })



// ARIA
//.attr( "role", "tablist" );

/*
 * $(mySelector).myShow();
 * $(mySelector).myHide();
 */

/**
 * ============================================================================
 */

$(document).ready(function() {

	// remove no-js class and set js
	js_is_enabled();

	accordion();

	// mobile navigation
	$('#nav--small-toggle').attr('aria-expanded', 'false');
	$('.nav--list').a11yHide();

	// on click, add right aria attributes and
	$('#nav--small-toggle').on('click', function() {
		// toogle an attribute
		$(this).attr('aria-expanded', function (i, attr) {
		    return attr === 'true' ? 'false' : 'true';
		});

		if($(this).hasAttr('aria-expanded', 'true')) {
        alert('true');
    } else {
        alert('false');
    }



	});



	// Add the arrows
	// if () {
	//
	//     slider.on('click.as', '.as-prev-arrow, .as-next-arrow', function (e) {
	//         e.preventDefault();
	//
	//         if (running) {
	//             return;
	//         }
	//
	//         if ($(this).hasClass('as-prev-arrow')) {
	//             prev();
	//         } else {
	//             next();
	//         }
	//     });
	// }

	// find the first-child in every accordion Original: $('.accordion--title:first-child').addClass('open');
	// $('.accordion').find('.accordion--title:first').addClass('open');


}); // end document ready
