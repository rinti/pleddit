playlistApp.service('playlistService', ['$window', '$rootScope', function($window, $rootScope) {
    playlist = [];

	var player;

	$window.onYouTubeIframeAPIReady = function() {
		player = new YT.Player('player', {
			height: '335',
			width: '540',
			videoId: '',
			events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': onPlayerError
			}
		});
	}

	$window.playByUrl = function(url) {
		url_f = formatUrl(url);
		player.loadVideoByUrl(url_f);
		$("#current_url").html(url);
		player.playVideo();
		$rootScope.$apply();
	}

    $window.onPlayerReady = function() {
    	// 
    }

	$window.onPlayerError = function(event) {
		$rootScope.$broadcast('NEXT_SONG', event);
	}

	$window.getId = function(url) {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match && match[7].length == 11){
			return match[7];
		}else{
			return 'cuq_y8Ugf5g';
		}
	}

	$window.formatUrl = function(url) {
		return 'http://youtube.com/v/' + getId(url) + '?version=3';
	}

	$window.onPlayerStateChange = function(event) {
		if(event.data == 0) {
			$rootScope.$broadcast('NEXT_SONG', event);
		}
	}

    this.getPlaylist = function() {
        return playlist;
    }
}]);