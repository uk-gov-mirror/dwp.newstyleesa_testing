/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Autocomplete
// var autocomplete = document.querySelector('[data-source]')
// if (autocomplete) {
//   accessibleAutocomplete.enhanceSelectElement({
//     // showNoOptionsFound: false;
//     defaultValue: '',
//     selectElement: autocomplete
//   })
// }

// COOKIE BANNER START

function initializeAnalytics() {
	var acceptAllCookies = localStorage.getItem('acceptAllCookies')
	if (acceptAllCookies == 'true') {
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())
		gtag('config', 'UA-XXXXXXXX-XX')
	}
}

initializeAnalytics()

function deleteAllCookies() {
	var cookies = document.cookie.split(';')

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i]
		var eqPos = cookie.indexOf('=')
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
	}
}

function processCookiesToggle() {
	var acceptAllCookies = window.localStorage.getItem('acceptAllCookies')
	if (acceptAllCookies == 'true') {
		$('.toggle-cookies .accept-cookies').hide()
		$('.toggle-cookies .functional-cookies').show()
	} else {
		$('.toggle-cookies .accept-cookies').show()
		$('.toggle-cookies .functional-cookies').hide()
	}
}

function saveCookieChoice(allow) {
	window.localStorage.setItem('acceptAllCookies', allow)
	window.localStorage.setItem('seenCookieBanner', true)
	var $cookieBanner = $('.casa-cookie-banner')
	if (!allow) {
		deleteAllCookies()
		$cookieBanner.addClass('casa-cookie-banner-show-reject')
	} else {
		$cookieBanner.addClass('casa-cookie-banner-show-accept')
	}
	processCookiesToggle()
	initializeAnalytics()
}

function processCookieBanner() {
	var seenCookieBanner = window.localStorage.getItem('seenCookieBanner')
	if (seenCookieBanner == null) {
		window.localStorage.setItem('seenCookieBanner', 'false')
	}
	var $cookieBanner = $('.casa-cookie-banner')
	if (!(seenCookieBanner == 'true')) {
		$('body').prepend($cookieBanner)
		$cookieBanner.css('display', 'block')
	} else {
		$cookieBanner.remove()
	}
	processCookiesToggle()
}

function hideCookieBanner() {
	var $cookieBanner = $('.casa-cookie-banner')
	$cookieBanner.remove()
}

processCookieBanner()

// COOKIE BANNER END

// Set month names
var monthNames = [
	"January", "February", "March",
	"April", "May", "June", "July",
	"August", "September", "October",
	"November", "December"
  ];
  
  // Show current date
  date = new Date();
  y = date.getFullYear();
  m = date.getMonth();
  d = date.getDate();
  
  if(document.querySelector(".date")) {
	document.querySelector(".date").innerHTML = d + " " + monthNames[m] + " " + y;
  }
  
  // Show future date
  newDate = new Date();
  var numberOfDaysToAdd = 14;
  newDate.setDate(newDate.getDate() + numberOfDaysToAdd);
  ny = newDate.getFullYear();
  nm = newDate.getMonth();
  nd = newDate.getDate();
  
  if(document.querySelector(".new-date")) {
	document.querySelector(".new-date").innerHTML = nd + " " + monthNames[nm] + " " + ny;
  }