/*!
 * observer.js - A UX Tracking Infromation Generator
 *
 * Copyright (c) 2014 Barış Güler
 * http://hwclass.github.io
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * github.com/hwclass/observer/README.md
 * Script Guideline
 *
 * Launch  : September 2014
 * Version : 0.1.0
 * Released: September xxx, 2014
 *
 *
 * tracks user interactions over a page in order to supply informations for user experience statistics 
 */

var observer = (function(w, undefined) {

	var inputs = document.getElementsByTagName('input');

	var log = function (message) {
		console.log(message);
	}

	var logInputs = function() {
		for (var countForInputs = 0, len = inputs.length; countForInputs < len; countForInputs++) {
			log(inputs[countForInputs].name);
		}
	}

	return {
		logInputs : logInputs
	}

})(window);

