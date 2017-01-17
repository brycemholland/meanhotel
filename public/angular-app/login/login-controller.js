angular.module('meanhotel').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory){
  var vm = this;

  vm.isLoggedIn = function(){
    if (AuthFactory.isLoggedIn){
      return true;
    } else {
      return false;
    }
  };
  
}