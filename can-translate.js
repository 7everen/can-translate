/**
 * Author Lazarenko Dmytro <dlazarenko.ua@gmail.com>
 * © 2016 Deel
 *
 * License: MIT
 */

(function() {'use strict';

 angular.module('canTranslate', []).factory('$canTranslate', ['$rootScope', '$http',
  function($rootScope, $http) {
    return {
      _defLang:"en",
      _moduleKey:"",
      _toLang:"en",
      init: function(moduleKey, defaultLanguage){
        this._moduleKey = moduleKey;
        this._defLang = defaultLanguage;
      },
      translate: function(toLanguage){
        this._toLang = toLanguage;
        $rootScope.$broadcast('canTranslateChangedLanguage');
      }
    };

  }]).directive('canTranslate', function($compile, _canTranslateStorage) {

   var fromPath = function( path, obj ) {
     return path.split('.').reduce( function( prev, curr ) {
       return prev[curr];
     }, obj || this );
   };

   return {
     restrict: 'A',
     replace: true,
     compile: function(element, attributes) {
       var isFirst = true;
       var pattern = /(\{\{[^\}]+\}\})/g;
       var text = element.text();
       var considerBinding = false;
       return function (scope, element, attrs, controller) {

         considerBinding = attrs.considerBinding=="true"?true:false;
         if(isFirst){
           isFirst = false;

           angular.forEach(text.match(pattern), function(variableFull) {
             var variable = variableFull.substr(2, variableFull.length-4).trim();
             scope.$watch(variable, function(value) {
               refresh();
             });
           });

         }

         var rendering = function(value){
           var content;
           var compiled;
           if(element[0].nodeName.toLowerCase() == "span"){
             content = element.html(value).contents();
             compiled = $compile(content);
           }else{
             content = angular.element('<span></span>').html(value).contents();
             compiled = $compile(content);
             element.html('');
             element.append(content);
           }
           compiled(scope);
         };

         var refresh = function(){
           var pattern = /([\s\.\,\?\!]+)/g;
           var patternReplace = /(\{\{[^\}]+\}\})/g;
           var arr = text.split(pattern);
           arr = arr?arr:[];
           for(var i=0; i<arr.length; i++){
             var item = arr[i];
             if(considerBinding) {
               arr[i] = item.replace(patternReplace, function (str, p1, offset, s) {
                 var path = str.substr(2, str.length-4).trim();
                 return fromPath(path, scope);
               });
             }else{
               arr.splice(i, 1);
               var lastPos = 0;
               item.replace(patternReplace, function(str, p1, offset, s) {
                 if(offset-lastPos>0) {
                   arr.splice(i, 0, item.substring(lastPos, offset)); //before
                   i++;
                 }
                 arr.splice(i, 0, str); //
                 i++;
                 lastPos = offset+str.length;
                 return str;
               });
               if(item.length>lastPos)
                arr.splice(i, 0, item.substring(lastPos));
             }
           }

           var countTransl = arr.length;
           for(var i=0; i<arr.length; i++){
             _canTranslateStorage.internTranslate(arr[i], function(original, translate){
               if(translate.match(patternReplace)){
                 var path = translate.substr(2, translate.length-4).trim();
                 translate = fromPath(path, scope);
               }
               arr[arr.indexOf(original)] = translate;
               countTransl--;
               if(countTransl==0){
                 rendering(arr.join(""));
               }
             });
           }
         };
         scope.$on("canTranslateChangedLanguage", refresh);
       };
     }
   };
 }).factory('_canTranslateStorage', ['$window', '$canTranslate', '$http', '$timeout',
   function($window, $canTranslate, $http, $timeout) {
     return {
       set: function(lang, key, value) {
         $window.localStorage["_canTranslateModuleStorage_"+lang+"_"+key] = value;
       },

       get: function(lang, key, defaultValue) {
         return $window.localStorage["_canTranslateModuleStorage_"+lang+"_"+key] || defaultValue;
       },
       hashFnv32a: function(str, asString, seed) {
         var i, l,
           hval = (seed === undefined) ? 0x811c9dc5 : seed;

         for (i = 0, l = str.length; i < l; i++) {
           hval ^= str.charCodeAt(i);
           hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
         }
         if( asString ){
           // Convert to 8 digit hex string
           return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
         }
         return hval >>> 0;
       },
       dirtyPrefix: function(text) {
         var p = text.match(/^[\s\.\,\?\!]+/);
         return p?p[0]:"";
       },
       dirtySuffix: function(text) {
         var s = text.match(/[\s\.\,\?\!]+$/);
         return s?s[0]:"";
       },
       clearText: function(text){
         var prefix = this.dirtyPrefix(text);
         var suffix = this.dirtySuffix(text);
         if(suffix.length)
           text = text.substr(0, text.length-suffix.length);
         if(prefix.length)
           text = text.substr(prefix.length);
         text = text.toLowerCase();
         return text;
       },

       lastLanguage:$canTranslate._defLang,
       timeoutCollector: null,
       callRequested: false,
       callData: {hash:[], text:[], callback:[]},

       clean: function(){
         this.callData.hash.splice(0, this.callData.hash.length);
         this.callData.text.splice(0, this.callData.text.length);
         this.callData.callback.splice(0, this.callData.callback.length);
         if(this.timeoutCollector){
           $timeout.cancel(this.timeoutCollector);
           this.callRequested = false;
           this.timeoutCollector = null;
         }
       },

       changeCaseToOriginal: function(original, translated){
         var firstIsUpper = false;
         var prefix = this.dirtyPrefix(original);
         var suffix = this.dirtySuffix(original);
         var first = true;
         var allIsCapitalize = true;
         original.replace(/[^\s\.\,\?\!]+/g, function(txt){
           if(txt.charAt(0) == txt.charAt(0).toUpperCase()){
             if(first)
               firstIsUpper = true;
           }else{
             if(allIsCapitalize)
               allIsCapitalize = false;
           }
           first = false;
           return "";
         });

         first = true;
         translated = translated.replace(/[^\s\.\,\?\!]+/g, function(txt){
           var result;
           if((firstIsUpper && first) || allIsCapitalize){
             result = txt.charAt(0).toUpperCase() + txt.substr(1);
           }else{
             result = txt;
           }
           first = false;
           return result;
         });

         return prefix + translated + suffix;
       },

       internTranslate: function(value, callback){
         var ths = this;
         if($canTranslate._defLang == $canTranslate._toLang || value.match(/[\s\.\,\?\!]+/) || value.match(/\{\{[^\}]+\}\}/) || !value.length){
           callback(value, value);
         }else{
           if(this.lastLanguage != $canTranslate._toLang){
             this.lastLanguage = $canTranslate._toLang;
             this.clean();
           }
           var hash = this.hashFnv32a(this.clearText(value));
           var result// = this.get($canTranslate._toLang, hash);
           if(result){
             callback(value, this.changeCaseToOriginal(value, result));
           }else{
             //call to translate server
             this.callToOwnTrigger(hash, value, callback);
           }
         }

       },

       callToOwnTrigger: function(hash, value, callback){
         var ths = this;
         if(!this.callRequested){
           this.clean();
           this.callRequested = true;
           this.timeoutCollector = $timeout(function(){
             ths.callRequested = false;

             var toLang = $canTranslate._toLang;
             var fromLang = $canTranslate._defLang;

             ths.getJsonp(function(jsonp){
               jsonp.getTranslates($http, ths.callData.text, fromLang, toLang, function(items){
                 ths.setTranslates(items, toLang);
               });
             });
           }, 100);
         }
         this.callData.hash.push(hash);
         this.callData.text.push(value);
         this.callData.callback.push(callback);
       },

       setTranslates: function(items, toLang){
         for(var i=0; i<items.length; i++){
           this.set(toLang, items[i].hash, items[i].translate);
           var pos = this.callData.hash.indexOf(items[i].hash);
           if(pos>-1){
             this.callData.hash.splice(pos, 1);
             var original = this.callData.text.splice(pos, 1)[0];
             var cased = this.changeCaseToOriginal(original, items[i].translate);
             this.callData.callback.splice(pos, 1)[0](original, cased);
           }
         }

         this.clean();
       },

       /*Get jsonp functions from server if not exists*/
       jsonp: null,
       getJsonp: function(callback){
         if(this.jsonp){
           this.jsonp;
         }else{
           var ths = this;
           $http.jsonp("http://can-translate.appspot.com/jsonp?callback=JSON_CALLBACK&key="+$canTranslate._moduleKey)
             .success(function(data){
               ths.jsonp = data;
               callback(data);
             });
         }
       }

     };
   }])

})();
