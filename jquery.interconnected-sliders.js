/*
License - you must retain this notice in ALL redistributions

Copyright 2013 Giuseppe Burtini      https://github.com/gburtini

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this library except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
   
*/


(function($) {
	var methods = {
		create: function(options) {
			var defaults = {
				sliders: null,		// the list of sliders CONTAINERS.
				settings: {},		// slider settings
				field: ".field",	// the selector within the container that is the actual noUiSlider.
				lock: true, 		// locks will be added automatically, with class ".interconnectedLock"
				text: true,		// text will be added automatically, with class ".interconnectedPercent"
				target: 100.0,		// the total they should add up to,
				round_factor: 1		// set to 10 to round to single decimal, 100 to round to two decimal.
			}, settings = $.extend(defaults, options);
			var DEFAULT_LOCK_CLASS = ".interconnectedLock";
			var DEFAULT_TEXT_CLASS = ".interconnectedPercent";

			if(!(settings.sliders))
				settings.sliders = $(this);

			var addUp = function(list) {
				list.each(function() {
					var reading = parseFloat($(this).val());
					if(!isNaN(reading)) {
						sum += reading;
					}
				});
				return sum;
			}

			var makeField = function(type, classes) {
				return $("<" + type + ">").addClass(classes.join(" "));
			}

			var lock_selector = DEFAULT_LOCK_CLASS;
			if(settings.lock === true) {
				var newLabel = makeField("label", [DEFAULT_LOCK_CLASS]);
				var newLock = makeField("input type='checkbox'", [DEFAULT_LOCK_CLASS]);
				newLock.appendTo(newLabel);
				$("Lock").appendTo(newLabel);

				settings.sliders.each(function() {
					$(newLabel).appendTo($(this));
				});
			} else if(settings.lock != false) {
				lock_selector = settings.lock;
			}

			var text_selector = DEFAULT_TEXT_CLASS;
			if(settings.text === true) {
				var newPercent = makeField("span", [DEFAULT_TEXT_CLASS]);
				
				settings.sliders.each(function() {
					$(newPercent).appendTo($(this));
				});
			} else if(settings.text != false) {
				text_selector = settings.text;
			}

			var onSlide = function(current) {
				var sum = addUp(settings.sliders.find(settings.field));	
				var diff = settings.target - sum;
				var $iter = settings.sliders;
	
				var lock_selector, text_selector;

				var sum_locked = 0;
				// to do locks, use this strategy... remove from sum, remove from $fields.
				settings.sliders.each(function() {
					// TODO: identify locks somehomw.
					if($(this).find("input[type='checkbox']" + lock_selector + ":checked").length > 0) {
						// we're locked.
						$iter = $iter.not($(this).find(settings.field));
						var reading = $(this).find(settings.field).val();

						sum -= reading;
						sum_locked += reading; 

						$(this).find(settings.field).noUiSlider("disabled", true);
					} else {
						$(this).find(settings.field).noUiSlider("disabled", false);
					}
				});


				// NOTE: how to do a -stable- round to n decimals? probably just check if the value is less than the smallest rounded change (1/settings.round_factor)
				if((Math.round(diff * settings.round_factor) / settings.round_factor) == 0)
					return true;

				if(typeof(current) != "undefined" && settings.sliders.length > 1) {
					if( current.val() + total_locked > settings.target)
					{
						// you tried to drag the slider past the highest value it is currently allowed.
						current.val(settings.target - total_locked);
						return;
					}

					// don't consider the one you're currently sliding (don't want adjustments to "fight" the user).
					sum -= current.val();
					$iter = $iter.not(current);
				}

				var exiting = false;
				$iter.each(function() {
					if(!exiting) {
						var reading = parseFloat($(this).val());
						var sf = (reading / sum);
						if(reading == 0)
							sf = 0;
						if(reading == 0 && sum == 0) {
							// special case for initialization.
							sf = 1;
							exiting = true;
						}
						$(this).val( $(this).val() + (diff*sf) );
						$(this).next(text_selector).text($(this).val());
					}
				});

				if(typeof(current) != "undefined")
					current.next(text_selector).text(f.val());
				
				return true;
			};

			var oldSlide = settings.settings['slide'];
			settings.sliders.each(function() {
				settings.settings['slide'] = function() { oldSlide(); onSlide($(this).find(settings.field) };
				$(this).find(settings.field).noUiSlider(settings.settings);
			});

		},

		destroy: function() {
	 	}
	}

	$.fn.interconnectedSliders = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.create.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.interconnectedSliders' );
		}   
	};
})(jQuery);

