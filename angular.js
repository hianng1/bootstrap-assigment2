var app=angular.module("myapp",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{templateUrl: "trangchu.html",controller: "myCtrl"})
    .when("/gioithieu",{templateUrl: "gioithieu.html",controller: "myCtrl"})
    .when("/lienhe",{templateUrl: "lienhe.html",controller: "myCtrl"})
    .when("/dangnhap",{templateUrl: "dangnhap.html",controller: "myCtrl"})
    .when("/dangky",{templateUrl: "dangky.html",controller: "myCtrl"})
    .when("/sanpham",{templateUrl: "sanpham.html",controller: "myCtrl"})
    .when("/detail/:id",{templateUrl: "chitiet.html",controller: "myCtrl"},)
    .otherwise({templateUrl: "trangchu.html",controller: "myCtrl"})
});
app.controller("myCtrl",function ($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];
        $http.get("http://localhost:3000/products").then(function (reponse) {
            $scope.products = reponse.data;
            console.log($scope.products);
            $scope.detailPro=$scope.products.find(item=>item.id==$routeParams.id);
        });
 });  
 app.controller("DetailController", function ($scope, $routeParams, $http) {
    $scope.product = {};
    $http.get("http://localhost:3000/products/" + $routeParams.id).then(function (response) {
        $scope.product = response.data;
    }, function (error) {
        console.log('Error loading product:', error);
    });
});
function closeModalAndNavigate() {
    $('#exampleModal').modal('hide'); // Đóng modal sử dụng jQuery và Bootstrap
    window.location.href = '#!dangnhap'; // Chuyển hướng người dùng
}