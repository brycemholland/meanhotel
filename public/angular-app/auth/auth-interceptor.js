angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($q, $window){
  return {
    request: request,
    response: response,
    responseError: responseError
  }

  function request(config){
    config.headers = config.headers || {};
    if ($window.sessionsStorage.token){
      config.headers.Authorization = 'Bearer' + $window.sessionsStorage.token;
    }
    return config;
  }

  function response(response){
    if (response.status === 200 && $window.sessionsStorage.token && !AuthFactory.isLoggedIn){
      AuthFactory.isLoggedIn = true;
    }
    if (response.status == 401){
      AuthFactory.isLoggedIn = false;
    }
    return response || $q.when(response);
  }

  function responseError(rejection){
    if (rejection.status === 401 || rejection.status === 403){
      delete $window.sessionsStorage.token;
      AuthFactory.isLoggedIn = false;
      $location.path('/');
    }
    return $q.reject.rejection;
  }
}