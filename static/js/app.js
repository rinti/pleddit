var playlistApp = angular.module('playlistApp', []);

angular.module('playlistApp').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

playlistApp.run(function() {
    // Init Youtube API
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

playlistApp.config(function($routeProvider) {
$routeProvider
    .when('/', {
      controller: 'GetPlaylistController',
      templateUrl: 'static/partials/_get_playlist.html'  
    })
    .when('/:subreddit', {
      controller: 'GetPlaylistController',
      templateUrl: 'static/partials/_get_playlist.html'  
    })
    .when('/:subreddit/:sorting', {
      controller: 'GetPlaylistController',
      templateUrl: 'static/partials/_get_playlist.html'  
    })
    .when('/:subreddit/:sorting/:time', {
      controller: 'GetPlaylistController',
      templateUrl: 'static/partials/_get_playlist.html'  
    })
    .when('/user/:username/m/:playlist', {
      controller: 'GetPlaylistController',
      templateUrl: 'static/partials/_get_playlist.html'  
    })
    .otherwise({redirectTo:'/'});
});