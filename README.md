# can-translate
Simple usage directive for AngularJS. auto translate to 60+ languages.
A localization module for [AngularJS](http://angularjs.org/).


## Getting started

### Module setup
The easiest way to install the `can-translate` module is via
[NPM](https://www.npmjs.com/):

```shell
npm install can-translate --save
```

You can then include `can-translate` after including its dependency,
[angular](https://angularjs.org/) 

```html
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/can-translate/can-translate.js"></script>
```

Then add `canTranslate` as a dependency for your app:

```javascript
angular.module('myApp', ['canTranslate'].  
```

## Usage Examples

### can-translate directive

#### Module using the element content
Any HTML element which can contain text nodes can be localized simply by adding
the `can-translate` attribute:

```html
<p can-translate>Set profile photo</p>
```

And when you want translate, run this function:

```html
module.controller('SomeCtrl', function($canTranslate, ....){
var moduleKey = "YOUR_PERSONAL_MODULE_KEY";
var defaultLanguage = "en-gb";
$canTranslate.init(moduleKey, defaultLanguage);
$canTranslate.translate("fr-fr");
...
}
```
You can register module key [here](http://can-translate.appspot.com).
Text `"Set profile photo!"` will be translated to French,
the `can-translate` directive will replace the element content with the result from 
`localstorage` or external translate service.

##Supported Languages

`en-gb` -  English (United Kingdom).  
`es-es` -  Spanish (Spain).  
`hi-in` -  Hindi (India).  
`ru-ru` -  Russian (Russia).  
`ar-sa` -  Arabic (Saudi Arabia).  
`pt-pt` -  Portuguese (Portugal).  
`bn-in` -  Bengali (India).  
`fr-fr` -  French (France).  
`id-id` -  Indonesian (Indonesia).  
`de-de` -  German (Germany).  
`ja-ja` -  Japanese (Japan).  
`fa-ir` -  Farsi (Iran).  
`ur-pk` -  Urdu (Islamic Republic of Pakistan).  
`vi-vn` -  Vietnamese (Viet Nam).  
`jw-id` -  Javanese (Indonesia).  
`ta-lk` -  Tamil (Sri Lanka).  
`ko-kr` -  Korean (Korea).  
`tr-tr` -  Turkish (Turkey).  
`it-it` -  Italian (Italy).  
`th-th` -  Thai (Thailand).  
`pl-pl` -  Polish (Poland).  
`uk-ua` -  Ukrainian (Ukraine).  
`bg-bg` -  Bulgarian (Bulgaria).  
`hu-hu` -  Hungarian (Hungary).  
`bs-ba` -  Bosnian (Bosnia and Herzegovina).  
`nl-nl` -  Dutch (Netherlands).  
`el-gr` -  Greek (Greece).  
`ka-ge` -  Georgian (Georgia).  
`is-is` -  Icelandic (Iceland).  
`kk-kz` -  Kazakh (Kazakhstan).  
`lv-lv` -  Latvian (Latvia).  
`lt-lt` -  Lithuanian (Lithuania).  
`lb-lu` -  Luxembourgish (Luxembourg).  
`mk-mk` -  FYRO Macedonian (Former Yugoslav Republic of Macedonia).  
`de-ch` -  German (Switzerland).  
`no-no` -  Norwegian (Norway).  
`ro-ro` -  Romanian (Romania).  
`sr-rs` -  Serbian (Serbia and Montenegro).  
`sk-sk` -  Slovak (Slovakia).  
`sl-si` -  Slovenian (Slovenia).  
`fi-fi` -  Finnish (Finland).  
`hr-hr` -  Croatian (Croatia).  
`cs-cz` -  Czech (Czech Republic).  
`sv-se` -  Swedish (Sweden).  
`et-ee` -  Estonian (Estonia).  
`gd-gb` -  Scottish Gaelic (United Kingdom).  
`be-by` -  Belarusian (Belarus).  
`az-az` -  Azeri (Azerbaijan).  
`sq-al` -  Albanian (Albania).  
`hy-am` -  Armenian (Armenia).  
`eu-es` -  Basque (Spain).  
`he-il` -  Hebrew (Israel).  
`ky-kg` -  Kyrgyz (Kyrgyzstan).  
`zh-cn` -  Chinese (S).    
`zh-hk` -  Chinese (Hong Kong).   
`zh-sg` -  Chinese (Singapore).   
`zh-tw` -  Chinese (T).  
`ku-tr` -  Kurdish (Turkey).  
`lo-la` -  Lao (Laos).  
`mn-mn` -  Mongolian (Mongolia).  
`ps-pk` -  Pashto (Afghanistan).  
`uz-uz` -  Uzbek (Uzbekistan).  
Coming soon other languages.

Json list with all languages [here](http://can-translate.appspot.com/languages.js).


## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
