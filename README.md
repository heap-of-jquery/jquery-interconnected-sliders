# jQuery Interconnected Sliders

Note: this plugin isn't currently finished. It is in a very alpha state. An implementation of very similar code is used in one of my commercial products.

jQuery Interconnected Sliders is a tool to create sets of sliders that add up to a defined value -- a way of representing user controlled proportions of a fixed resource (say a percentage, a distribution of money or any other constrained value spread over multiple categories). 

jQuery Interconnected Sliders is dependent on jQuery and [$.noUiSlider](http://refreshless.com/nouislider/). We use noUiSlider instead of jQuery UI Slider both because of weight and out-of-the-box appearance.

## Instructions

1. Create the regions for your sliders ("parent regions"). 
2. Call $(".parentRegions").interconnectedSliders(options);
3. You're done. They're now interconnected sliders!

## Options

TODO.

## Screenshot
![Example](http://i.imgur.com/bjzm68t.png)

Note that in the above example, the sliders add up to 100. If a user changes any element, the others will update automatically (while locked sliders won't move). At all times (after all movements), the sliders will add up to their target value. 

## Known Issues

- This is currently incomplete!

## License 

Please retain this notice in ALL redistributions as well as a link back to the original repository.

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
