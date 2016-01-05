/**
 * Author Lazarenko Dmytro <dlazarenko.ua@gmail.com>
 * © 2016 Deel
 *
 * License: MIT
 */

(function(window, angular, undefined) {'use strict';

 angular.module('canTranslate', []).factory('$canTranslate', ['$rootScope',
  function($rootScope) {
    return {
      _defLang:"en",
      _toLang:"en",
      defaultLanguage: function(language){
        this._defLang = language;
      },
      translate: function(toLanguage){
        //if(this._toLang != toLanguage){
          this._toLang = toLanguage;
          $rootScope.$broadcast('canTranslateChangedLanguage');
		  console.log(">>lang changed to: "+toLanguage);
        //}
      }
    };

  }])

      
})(window, window.angular);