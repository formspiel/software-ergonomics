//
// General Functions
//

// JS-Check—remove no-js class and set js
function js_is_enabled() {
	$('html').removeClass('no-js');
	$('html').addClass('js');
}


//
// jQuery extensions
//
jQuery.fn.extend({
    a11yShow: function () {
        return this.attr('aria-hidden', 'false');
        // return this.attr('aria-hidden', 'false').show();
    },
    a11yHide:function(){
        return this.attr('aria-hidden', 'true');
        // return this.attr('aria-hidden', 'true').hide();
    },
    a11yCollapsed: function () {
        return this.attr('aria-expanded', 'false');
        // return this.attr('aria-expanded', 'false').hide();
    },
    a11yExpanded:function(){
        return this.attr('aria-expanded', 'true');
        // return this.attr('aria-expanded', 'true').show();
    },

		// by https://gist.github.com/KyleMit
		// useage: $(selector).toggleAttr("required"); $(selector).toggleAttr("required", true); $(selector).toggleAttr("required", false);
    toggleAttr: function (attr, turnOn) {
        var justToggle = (turnOn === undefined);
        return this.each(function () {
            if ((justToggle && !$(this).is("[" + attr + "]")) ||
                (!justToggle && turnOn)) {
                $(this).attr(attr, attr);
            } else {
                $(this).removeAttr(attr);
            }
        });
    }
});

jQuery.fn.hasAttr = function(name) {
   return this.attr(name) !== undefined;
};


//
// Document Functions
//
$(document).ready(function() {
	// remove no-js class and set js
	js_is_enabled();


	// navigation
	$('#js-toggleNav').a11yCollapsed();
	$('.nav--main-list').hide();

	// when user clicks nav button
	$('#js-toggleNav').on('click', function() {
		// toogle an attribute
		$(this).attr('aria-expanded', function (i, attr) {
		    return attr === 'true' ? 'false' : 'true';
		});
		$('.nav--main-list').toggle();
		$('.nav--main-list a').first().focus();
	});

});
