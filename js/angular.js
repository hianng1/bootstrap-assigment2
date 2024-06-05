var app=angular.module("myapp",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{templateUrl: "pages/trangchu.html",controller: "myCtrl"})
    .when("/gioithieu",{templateUrl: "pages/gioithieu.html",controller: "myCtrl"})
    .when("/lienhe",{templateUrl: "pages/lienhe.html",controller: "myCtrl"})
    .when("/dangnhap",{templateUrl: "pages/dangnhap.html",controller: "myCtrl"})
    .when("/dangky",{templateUrl: "pages/dangky.html",controller: "myCtrl"})
    .when("/dulichmiennam",{templateUrl: "pages/dulichmiennam.html",controller: "myCtrl"})
    .when("/dulichchaua",{templateUrl: "pages/dulichchaua.html",controller: "myCtrl"})
    .when("/test",{templateUrl: "test.html",controller: "myCtrl"})
    .when("/timkiem",{templateUrl: "components/timkiem.html",controller: "myCtrl"})
    .when("/giohang",{templateUrl: "components/giohang.html",controller: "myCtrl"})
    .when("/detail/:id",{templateUrl: "components/chitiet.html",controller: "myCtrl"},)
    .when("/giohang/:id",{templateUrl: "components/giohang.html",controller: "myCtrl"},)
    .otherwise({templateUrl: "trangchu.html",controller: "myCtrl"})
});
app.controller("myCtrl",function ($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];
        $http.get("http://localhost:3000/products").then(function (reponse) {
            $scope.products = reponse.data;
            console.log($scope.products);
            $scope.detailPro=$scope.products.find(item=>item.id==$routeParams.id);
        });
    $scope.sort='price_after';
    $scope.tang=function(){
        $scope.sort='price_after';
    }
    $scope.giam=function(){
        $scope.sort='-price_after';
    }
 });  
 app.controller("DetailController", function ($scope, $routeParams, $http) {
    $scope.product = {};
    $http.get("http://localhost:3000/products/" + $routeParams.id).then(function (response) {
        $scope.product = response.data;
    }, function (error) {
        console.log('Error loading product:', error);
    });
});
$(document).ready(function() {
    $('#increment').click(function() {
        var value = parseInt($('#number').val(), 10);
        value = isNaN(value) ? 0 : value;
        value++;
        $('#number').val(value);
    });

    $('#decrement').click(function() {
        var value = parseInt($('#number').val(), 10);
        value = isNaN(value) ? 0 : value;
        value--;
        $('#number').val(value);
    });
});


