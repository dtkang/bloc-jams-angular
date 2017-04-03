(function() {
    function SongPlayer(Fixtures) {
        /**
        * @desc Instance of SongPlayer object
        * @type {Object}
        */        
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum();
        
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */        
        var currentBuzzObject = null;
        
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                songPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            songPlayer.currentSong = song;
        };
        
        /**
        * @desc Returns the index of the song passed in
        * @param {Object} song
        */        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };        
        
        
        /**
        * @desc Current song
        * @type {Object}
        */        
        SongPlayer.currentSong = null;

        /**
        * @function playSong
        * @desc Plays the current Buzz object
        * @param {Object} song
        */        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        

        /**
        * @function play
        * @desc Loads up the next song and plays it
        * @param {Object} song
        */        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (songPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
            }

        };

        /**
        * @function pause
        * @desc Pauses the current song
        * @param {Object} song
        */        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous
        * @desc Moves current song to the previous one
        */        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }            
        };        
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

