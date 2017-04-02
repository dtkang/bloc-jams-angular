(function() {
    function SongPlayer() {
        /**
        * @desc Instance of SongPlayer object
        * @type {Object}
        */        
        var SongPlayer = {};

        /**
        * @desc Current song
        * @type {Object}
        */        
        var currentSong = null;
        
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
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
        };
        
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
            
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function pause
        * @desc Pauses the current song
        * @param {Object} song
        */        

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();