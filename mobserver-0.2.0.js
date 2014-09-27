/*!
 * mobserver.js - A UX Tracking Information Generator
 *
 * Copyright (c) 2014 Barış Güler
 * http://hwclass.github.io
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * github.com/hwclass/mobserver/README.md
 * Script Guideline
 *
 * Launch  : September 2014
 * Version : 0.2.0
 * Released: September xxx, 2014
 *
 *
 * tracks user interactions over a page in order to supply informations for user experience statistics 
 */

var mobserver = (function(w, undefined) {

	var config = {
		timer : 0,
		currentTime : 0,
		fullPageTimer : 0,
		fullPageTimeCounter : 0,
		focusedElement : '',
		prevFocusedElement : '',
		prevFocusedElementWaitTime : ''
	};

	var inputs = document.getElementsByTagName('input');

	var addEvent = function (elem, event, fn) {
		function listenHandler(e) {
			var ret = fn.apply(this, arguments);
			if (ret === false) {
				event.stopPropagation();
				event.preventDefault();
			}
			return(ret);
		}
		if (elem.addEventListener) {
			elem.addEventListener(event, listenHandler, false);
		} else if (elem.attachEvent) {
			elem.attachEvent ("on" + type, fn);
		} else {
			elem.attachEvent("on" + event, attachHandler);
		}
	}

	w.onmousemove = handleMouseMove;

  var handleMouseMove = function (event) {
      event = event || w.event;
      log('X: ' +  event.clientX + ' Y: ' +  event.clientY);
  };

  var calculateOnFocus = function(event) {
  	config.currentTime, config.timer = 0;
  	if (!isNull(config.prevFocusedElement) && !isUndefined(config.prevFocusedElement)) {
  		log('Previously focused element : ' + (config.prevFocusedElement !== '' ? config.prevFocusedElement : '***empty***') );
  		startTimer(event.target.name);
  		config.focusedElement = event.target.name;
  	}
  	log('Focused on : ' + event.target.name);
  }

  var calculateOnBlur = function(event) {
  	config.currentTime, config.timer = 0;
  	log('Focused off : ' + event.target.name);
  }

  var startTimer = function () {
  	console.clear();
	  log('Total wait time on ' + (isEmptyAsString(config.focusedElement)?'body':config.focusedElement) + ': ' + millisecondsToStr(config.timer));
	  config.timer += 1000;
	  config.currentTime = setTimeout(startTimer, config.timer + 1000);
  }

  var startFullPageTimer = function () {
  	config.fullPageTimer += 1000;
  	config.fullPageTimeCounter = setTimeout(startFullPageTimer, config.fullPageTimer + 1000);
  	return this;
  }

  var trackEvents = function () {
		for (var countForInputs = 0, len = inputs.length; countForInputs < len; countForInputs++) {
  		addEvent(inputs[countForInputs], 'focus', calculateOnFocus);
  		addEvent(inputs[countForInputs], 'blur', calculateOnBlur);
  	}
  	return this;
  }

  function millisecondsToStr (milliseconds) {
      function numberEnding (number) {
          return (number > 1) ? 's' : '';
      }
      var temp = Math.floor(milliseconds / 1000);
      var years = Math.floor(temp / 31536000);
      var days = Math.floor((temp %= 31536000) / 86400);
      if (days) {
          return days + ' day' + numberEnding(days);
      }
      var hours = Math.floor((temp %= 86400) / 3600);
      if (hours) {
          return hours + ' hour' + numberEnding(hours);
      }
      var minutes = Math.floor((temp %= 3600) / 60);
      if (minutes) {
          return minutes + ' minute' + numberEnding(minutes);
      }
      var seconds = temp % 60;
      if (seconds) {
          return seconds + ' second' + numberEnding(seconds);
      }
      return 'less than a second';
  }

	var logInputs = function() {
		for (var countForInputs = 0, len = inputs.length; countForInputs < len; countForInputs++) {
			log('input name: ' + inputs[countForInputs].name + (inputs[countForInputs].type === 'button' ? '' : ', ' + 'value: ' + inputs[countForInputs].value) );
		};
		return this;
	};

	var isEmptyAsString = function (obj) {
		return (obj === '' ? true : false);
	};	

	var isNull = function (obj) {
		return (typeof obj === null ? true : false);
	};

	var isUndefined = function (obj) {
		return (typeof obj === undefined ? true : false);
	}

	var log = function (message) {
		console.log(message);
	};

	return {
		logInputs : logInputs,
		trackEvents : trackEvents,
		startTimer : startTimer,
		startFullPageTimer : startFullPageTimer
	}

})(window);