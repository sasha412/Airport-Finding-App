var myApp = angular.module('myApp',[]);

myApp.controller('AppController', ['$scope','$http', function ($scope, $http) {
    console.log('App controller initialized...');

    $scope.getAirports = function () {
        $http.get('/api/airports').success(function (res) {
            $scope.airports = res;
        });
    }

    $scope.findAirports = function () {
        $http.get('/api/airports/state/'+$scope.stateCode).success(function (res) {
            $scope.airports = res;
        })
    }

    $scope.findAirportByProx = function () {
        var location = {
            distance: $scope.location.distance
        }
        $http.get('/geocode/location?address='+$scope.location.address).success(function (loc_res) {
            location.lat = loc_res.locations[0].latitude;
            location.lon = loc_res.locations[0].longitude;

            $http.post('/api/airports/prox', location).success(function (res) {
                $scope.airports = res;
            });
        });
    }

}]);