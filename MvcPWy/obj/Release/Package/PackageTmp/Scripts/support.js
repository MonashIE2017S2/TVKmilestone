var app = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngMap']);

app.controller('sfysCtrl',  function ($scope, $http, $filter) {
    $http.get("/api/Sfys")
        .then(function (response) {
            $scope.sfys = response.data;
            $scope.filteredSfys = $scope.sfys;
        });
    $http.get("/api/Suburb")
            .then(function (response) {
                $scope.suburb = response.data;
        });
    $http.get("/api/Region")
        .then(function (response) {
            $scope.region = response.data;
        });
    $scope.selSfys = function (item) {
        $scope.selected_sfys = item;
    };

    $scope.$on('mapInitialized', function (event, map) {
        $scope.map = map;
    });

    


    $scope.suburbChanged = function (item) {
        $scope.filteredSfys = $scope.sfys;
        $scope.selected_sfys = null; 
        if(item) {
            var selectedSuburb = $filter('filter')($scope.suburb, { postcode: item })[0];
            
        if (selectedSuburb) {
            var selectedRegion = $filter('filter')($scope.region, { name: selectedSuburb.regionName })[0];
            if (selectedRegion) {
                $scope.filteredSfys = $filter('filter')($scope.sfys, { regionName: selectedRegion.DETregion });
            }
        }
        }
    };
});
app.controller('childFirstCtrl', function ($scope, $http) {
    $http.get("/api/ChildFirst")
        .then(function (response) {
            $scope.childFirst = response.data;
        });

});
app.controller('supportCtrl', function ($scope, $http) {
   
    $http.get("/api/Support")
        .then(function (response) {
            $scope.support = response.data;
        });
    $scope.selItem = function (item) {
        $scope.selected_support = item;
    };

});
                                       