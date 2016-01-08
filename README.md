# can-translate
Simple usage directive for AngularJS. auto translate to 20+ languages.
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
angular.module('myApp', ['canTranslate']);
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
var moduleKey = "YOU_PERSONAL_MODULE_KEY";
var defaultLanguage = "en-gb";
$canTranslate.init(moduleKey, defaultLanguage);
$canTranslate.translate("fr");
...
}
```
You can register module key [here](http://can-translate.appspot.com).
Text `"Set profile photo!"` will be translated to French,
the `can-translate` directive will replace the element content with the result from 
`localstorage` or external translate service.

##Supported Languages

`en-gb` -  English(United Kingdom)
`es-es` -  Spanish (Spain)
`hi-in` -  Hindi (India)
`ru-ru` -  Russian (Russia)
`ar-sa` -  Arabic (Saudi Arabia)
`pt-pt` -  Portuguese (Portugal)
`bn-in` -  Bengali (India)
`fr-fr` -  French (France)
`id-id` -  Indonesian (Indonesia)
`de-de` -  German (Germany)
`ja-ja` -  Japanese (Japan)
`fa-ir` -  Farsi (Iran)
`ur-pk` -  Urdu (Islamic Republic of Pakistan)
`vi-vn` -  Vietnamese (Viet Nam)
`jw-id` -  Javanese (Indonesia)
`ta-lk` -  Tamil (Sri Lanka)
`ko-kr` -  Korean (Korea)
`tr-tr` -  Turkish (Turkey)
`it-it` -  Italian (Italy)
`th-th` -  Thai (Thailand)
`pl-pl` -  Polish (Poland)
`uk-ua` -  Ukrainian (Ukraine)


## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
