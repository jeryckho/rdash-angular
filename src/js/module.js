// Initialize Firebase
var config = {
	apiKey: 'AIzaSyCVuiGN3qctfKhGnzYJzwOF7c3WQsgJs8c',
	authDomain: 'premier-proj.firebaseapp.com',
	databaseURL: 'https://premier-proj.firebaseio.com',
	storageBucket: 'premier-proj.appspot.com',
};
firebase.initializeApp(config);
angular.module('KMS', ['firebase','ui.bootstrap', 'ui.router', 'ngCookies']);