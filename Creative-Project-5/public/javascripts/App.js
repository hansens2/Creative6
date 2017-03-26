var app = window.angular.module('app', []);
app.controller('mainCtrl', mainCtrl);
var api_root = "/message";
function mainCtrl($scope, $http) {
    $scope.name = "";
    $scope.sendingMessage = "";
    $scope.pin = "";
    $scope.retrievePin = "";
    $scope.retrieveName = "";
    $scope.retrievedMessage = "Secret Message";

    $scope.postMessage = function () {
        $http.post(api_root, { name: $scope.name, message: $scope.message })
            .then(function (resp) {
                if (resp) {
                    $scope.pin = resp.data;
                }
                else {
                    console.log("Some error occured");
                }

            })
    }

    $scope.getMessage = function () {
        $http.get(api_root + '/' + 31 * $scope.retrieveName * $scope.retrievePin)
            .then(function (resp) {
                $scope.retrievedMessage = resp.data;
            })
    }
}
