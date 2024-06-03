var app=angular.module("myapp",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{templateUrl: "trangchu.html",controller: "myCtrl"})
    .when("/gioithieu",{templateUrl: "gioithieu.html",controller: "myCtrl"})
    .when("/lienhe",{templateUrl: "lienhe.html",controller: "myCtrl"})
    .when("/dangnhap",{templateUrl: "dangnhap.html",controller: "myCtrl"})
    .when("/dangky",{templateUrl: "dangky.html",controller: "myCtrl"})
    .when("/sanpham",{templateUrl: "sanpham.html",controller: "myCtrl"})
    .when("/dulichmiennam",{templateUrl: "dulichmiennam.html",controller: "myCtrl"})
    .when("/dulichchaua",{templateUrl: "dulichchaua.html",controller: "myCtrl"})
    .when("/test",{templateUrl: "test.html",controller: "myCtrl"})
    .when("/timkiem",{templateUrl: "timkiem.html",controller: "myCtrl"})
    .when("/giohang",{templateUrl: "giohang.html",controller: "myCtrl"})
    .when("/detail/:id",{templateUrl: "chitiet.html",controller: "myCtrl"},)
    .when("/giohang/:id",{templateUrl: "giohang.html",controller: "myCtrl"},)
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


