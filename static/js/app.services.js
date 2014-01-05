playlistApp.service('playlistService', ['$window', '$rootScope', function($window, $rootScope) {
    playlist = [];

    this.getPlaylist = function() {
        return playlist;
    }
}]);

playlistApp.service('soundcloudService', ['$window', '$rootScope', function($window, $rootScope) {
	$window.widgetIframe = document.getElementById('sc-widget'),
	$window.widget       = SC.Widget($window.widgetIframe);

	$window.newWidgetUrl = 'http://api.soundcloud.com/tracks/',
	$window.CLIENT_ID    = '321811ac3aed726a88ae3e32e9de2f1f';

	widget.bind(SC.Widget.Events.FINISH, function() {
        $rootScope.$broadcast('NEXT_SONG', event);
    });
}]);

playlistApp.service('youtubeService', ['$window', '$rootScope', function($window, $rootScope) {
	var player;

	$window.onYouTubeIframeAPIReady = function() {
		player = new YT.Player('player', {
			height: '335',
			width: '540',
			videoId: null,
			events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': onPlayerError
			},
		});
	}

	$window.playByUrl = function(url) {
		if($rootScope.ready) {
			url_f = formatUrl(url);
			player.loadVideoByUrl(url_f);
			$("#current_url").html(url);
			player.playVideo();

			if(!$rootScope.$$phase) {
				$rootScope.$apply();
			}
		}
	}

	$window.stopYtPlayer = function() {
		player.stopVideo();
	}

    $window.onPlayerReady = function() {
    	$rootScope.$broadcast('YOUTUBE_PLAYER_READY', event);
    	$rootScope.ready = true;
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
}]);