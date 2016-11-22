$(document).ready(function () {
	var docsLink = $('.js-docs');
	var dropdownMenu = $('.m-dropdown-menu');
	docsLink.click(function () {
		dropdownMenu.toggle();
	});
	docsLink.mouseenter(function () {
		dropdownMenu.show();
	});
	docsLink.mouseleave(function () {
		dropdownMenu.hide();
	});
	dropdownMenu.mouseenter(function () {
		dropdownMenu.show();
	});
	dropdownMenu.mouseleave(function () {
		dropdownMenu.hide();
	});

});

/**
 * A function to wrap up jQuery scrollTop behavior
 * @param htmlId {String} HTML id to scroll to
 */
function scrollToId(htmlId) {
	var selectedEl = $("#" + htmlId);
	$('html, body').animate({
		scrollTop: selectedEl.offset().top
	}, 1000);
}
