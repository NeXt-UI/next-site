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

/**
 * Send AJAX request
 */
function sendFeedback() {

	var apiHost = window.location.hostname;
	var apiPort = 9001;
	var apiUrl = "http://" + apiHost + ":" + apiPort + "/";

	var data = {
		"name": $("#name").val(),
		"contacts": $("#contacts").val(),
		"message": $("#message").val()
	};

	$.post({
		"url": apiUrl,
		"data": data,
		"timeout": 5000,
		"dataType": "json"
	})
		.done(function (res) {
			console.log("ok", res);
			if(isRealObject(res)){
				if(res.hasOwnProperty("status") && res.hasOwnProperty("text")){
					if(res.status == "ok"){
						printSuccess(res.text);
					}
					else if(res.status == "fail"){
						printError(res.text);
					}
					else{
						printError("Unknown error");
					}
				}
				else{
					printError("Invalid response from server.");
				}
			}
			else{
				printError("Invalid response from server.");
			}
		})
		.fail(function (res) {
			console.log("fail", res);
			if(isRealObject(res)){
				if(res.hasOwnProperty("status") && res.hasOwnProperty("text")){
					if(res.status == "fail"){
						printSuccess(res.text);
					}
					else if(res.status == "ok"){
						printError(res.text);
					}
					else{
						printError("Unknown error");
					}
				}
				else{
					printError("Invalid response from server.");
				}
			}
			else{
				printError("Invalid response from server.");
			}
		});

	function printSuccess(msg) {
		console.log(msg);
		swapClasses("request-success", "request-error", msg);
	}

	function printError(msg) {
		console.log(msg);
		swapClasses("request-error", "request-success", msg);
	}

	function swapClasses(activeClass, inactiveClass, msg){
		$("#" + inactiveClass)
			.empty()
			.removeClass("request " + inactiveClass)
			.addClass("display-none");

		$("#" + activeClass)
			.empty()
			.removeClass("display-none")
			.addClass("request " + activeClass)
			.append(msg);
	}

	return false;
}

/**
 * Is obj a real object?
 * @param obj
 * @returns {boolean}
 */
function isRealObject(obj){
	return typeof obj == "object" && obj !== null;
}