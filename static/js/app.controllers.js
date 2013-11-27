playlistApp.controller('GetPlaylistController', function($scope, $http, $routeParams, playlistService) {
    var base_url = 'http://reddit.com/r/';
    $scope.abs_url = '#/';

    $scope.listmodel = 'default';
    $scope.time = 'default';

    $scope.playlist = playlistService.getPlaylist();
    $scope.currentSong = 0;

    $scope.$on('NEXT_SONG', function(event) {
        $scope.nextSong();
    });

    $scope.$watch('listmodel', function(newVal, oldVal) {
        if(newVal == 'top') {
            $("#best-time").show();
        } else {
            $scope.time = 'default';
            $("#best-time").hide();
        }
    });

    var init = function() {
        if($routeParams.time != undefined) {
            $scope.time = $routeParams.time;
        }
        if($routeParams.sorting != undefined) {
            $scope.listmodel = $routeParams.sorting;
        }
        if($routeParams.subreddit != undefined) {
            $scope.subreddit = $routeParams.subreddit;
            $scope.getPlaylist();
        }
    }

    var abs_url = function() {
        var listmodel = '';
        var time = '';
        if($scope.listmodel != 'default') { listmodel = '/' +  $scope.listmodel; }
        if($scope.time != 'default') { time = '/' + $scope.time; }
        return '#/' + $scope.subreddit + listmodel + time;
    }

    var make_url = function(subreddit) {
        var extended_url = '';
        var time_url = '';

        if($scope.listmodel != 'default') {
            extended_url = '/' + $scope.listmodel + '/';
        }
        if($scope.time != 'default' && $scope.listmodel == 'top') {
            time_url = '&sort=top&t=' + $scope.time;
        }

        return base_url + $scope.subreddit + extended_url + '.json?jsonp=JSON_CALLBACK&limit=100' + time_url;
    }

    var validId = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
            if (match && match[7].length == 11){
                return 1;
            }else{
                return 0;
            }
    }

    var renderList = function(data) {
        angular.forEach(data.data.data.children, function (test) {
            if(test.data.domain == 'youtube.com' && validId(test.data.url)) {
                $scope.playlist.push({'title': test.data.title, 'url': test.data.url, 'score': test.data.score, 'reddit_url': 'http://reddit.com'+test.data.permalink, 'reddit_comments': test.data.num_comments});
            }
        });
    }

    $scope.nextSong = function() {
        next_song = $scope.currentSong+1;
        if(next_song >= $scope.playlist.length) {
            next_song = 0;
        }
        $scope.playSong(next_song);
    }

    $scope.prevSong = function() {
        prev_song = $scope.currentSong-1;
        if(prev_song < 0) {
            prev_song = $scope.playlist.length-1;
        }
        $scope.playSong(prev_song);
    }

    $scope.randSong = function() {
        $scope.playSong(Math.floor(Math.random()*$scope.playlist.length));
    }

    $scope.playSong = function(number) {
        $scope.currentSong = number;
        $scope.currentSongUrl = $scope.playlist[number].url;
        playByUrl($scope.playlist[number].url);
    }

    $scope.getPlaylist = function() {
        $scope.playlist = [];
        $scope.abs_url = abs_url();
        $scope.subreddit_json = $http({method: 'JSONP', url: make_url($scope.subreddit)}).then(function(response) {
            renderList(response);
            playByUrl($scope.playlist[0].url);
        });
    };

    init();

});