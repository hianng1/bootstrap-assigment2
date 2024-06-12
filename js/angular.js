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

    // Khởi tạo giỏ hàng từ local storage hoặc tạo mới nếu không có
    if ($window.localStorage.getItem('cart')) {
        $rootScope.cart = JSON.parse($window.localStorage.getItem('cart'));
    } else {
        $rootScope.cart = [];
    }

    $scope.addCart=function(product){
        var index=$rootScope.cart.findIndex(item=>item.id==product.id);
        if(index==-1){
            product.quantity=1;
            $rootScope.cart.push(product);
        }else{
            $rootScope.cart[index].quantity++;
        }
        // Lưu giỏ hàng vào local storage
        $window.localStorage.setItem('cart', JSON.stringify($rootScope.cart));
        console.log($rootScope.cart);
    }

    $scope.plus = function(item) {
        item.quantity += 1;
        updateTotal();  // Cập nhật tổng tiền sau khi thay đổi số lượng
    };

    // Giảm số lượng sản phẩm
    $scope.minus = function(item) {
        if (item.quantity > 1) {  // Đảm bảo số lượng không giảm xuống dưới 1
            item.quantity -= 1;
            updateTotal();  // Cập nhật tổng tiền sau khi thay đổi số lượng
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    $scope.remove = function(item) {
        var index = $rootScope.cart.indexOf(item);
        if (index !== -1) {
            $rootScope.cart.splice(index, 1);  // Xóa sản phẩm ra khỏi mảng
            updateTotal();  // Cập nhật tổng tiền sau khi xóa sản phẩm
            
            $timeout(function() {  // Sử dụng $timeout để đảm bảo cập nhật UI
                updateTotal();  // Đảm bảo tổng tiền được cập nhật lại
            });
        }
    };

    // Tính tổng tiền của giỏ hàng
    $scope.total = function() {
        var total = 0;
        $rootScope.cart.forEach(function(item) {
            total += item.price * item.quantity;  // Tính tổng tiền của mỗi sản phẩm
        });
        return total;
    };
});



