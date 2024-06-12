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
    .when("/giohang",{templateUrl: "pages/giohang.html",controller: "myCtrl"})
    .when("/detail/:id",{templateUrl: "components/chitiet.html",controller: "myCtrl"},)
    .otherwise({templateUrl: "trangchu.html",controller: "myCtrl"})
});
app.controller("myCtrl",function ($scope, $rootScope, $routeParams, $http, $window) {
    $scope.products = [];
    $http.get("http://localhost:3000/products").then(function (response) {
        $scope.products = response.data;
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

    $scope.addCart=function(product){
        if(typeof $rootScope.cart=='undefined'){
            $rootScope.cart = [];
        }
        var index=$rootScope.cart.findIndex(item=>item.id==product.id);
        if(index==-1){
            product.quantity=1;
            $rootScope.cart.push(product);
        }else{
            $rootScope.cart[index].quantity++;
        }
        console.log($rootScope.cart);
    }
    $scope.remove = function(item) {
        const index = $scope.cart.indexOf(item);
        if (index > -1) {
            $scope.cart.splice(index, 1);
        }
        console.log('Cart Items after removal:', $scope.cart);
    };

    $scope.getTotal = function() {
        return $scope.cart.reduce((total, item) => {
            return total + (item.price_after * item.quantity);
        }, 0);
    };

    $scope.plus = function(item) {
        const index = $scope.cart.indexOf(item);
        if (index !== -1) {
            $scope.cart[index].quantity += 1;
        }
    };

    $scope.minus = function(item) {
        const index = $scope.cart.indexOf(item);
        if (index !== -1 && $scope.cart[index].quantity > 1) {
            $scope.cart[index].quantity -= 1;
        }
    };
});



