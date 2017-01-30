(function() {
    "use strict";

    var module = angular.module("psMovies");
    var serverUrl = 'https://well-on-track.com:8443';

    function fetchMovies($http) {
        return $http.get("movies.json")
                    .then(function(response) {
                        return response.data;
                    });
    }
    function fetchChallengeMembers($http) {
         return $http.get(serverUrl + '/v1/CFWEvents?code=' + 'RSMCFW16'
             ,
             {
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded'
                 }
             }
             ).then(function(response) {
                        return response.data;
         });
     }

    function controller($http) {
        var model = this;
        model.movies = [];

        model.$onInit = function() {
            model.challengeList = fetchChallengeMembers($http).then(function(x){
                model.challengeList = x;
            });
            
            fetchMovies($http).then(function(movies) {
                model.movies = movies;    
            });
                
            
        };
        
        model.upRating = function(movie) {
            if(movie.rating < 5) {
                movie.rating += 1;
            }
        };
        
        model.downRating = function(movie) {
            if(movie.rating > 1) {
                movie.rating -= 1;
            }
        };
        
    }

    module.component("movieList", {
        templateUrl: "ps-movies/movie-list.component.html",
        controllerAs: "model",
        controller: ["$http", controller]
    });

} ());