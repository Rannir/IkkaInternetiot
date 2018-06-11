angular.module('ikka').
controller('mainController' , function($scope, $location, authService) {
    const ctrl = this;
    
    ctrl.ay = 'ayee it works';

    // authService.signupUser('http://localhost:3090/signup', 'ran@ran.il', '12345', 'ran', function() {
    //     console.log('yay');
    // });

    return ctrl;
});