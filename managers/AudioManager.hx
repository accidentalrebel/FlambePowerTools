package flambepowertools.managers;
import kit.sound.Playback;
import game.Registry;
import kit.System;

/**
 * ...
 * @author Karlo
 */
class AudioManager
{
	static public var isAudioOn(get, null) : Bool;
	static private var _isAudioOn : Bool = true;
	
	static var _playbackMap : Map<String, Playback>;
	
	// ============================================= PUBLIC ============================================= //
	static public function setup()
	{
		_playbackMap = new Map<String, Playback>();
	}
	
	static public function playAudio(audioPath:String, volume : Float = 1) : Playback
	{
		var playback : Playback = Registry.assetPack.getSound(audioPath).play();
		playback.volume._ = volume;
		return playback;
	}
	
	static public function loopAudio(audioPath : String, restart : Bool = false, volume : Float = 1) : Playback
	{
		if ( restart )
			stopAudio(audioPath);
		
		var playback : Playback = _playbackMap.get(audioPath);
		if ( playback == null ) {
			playback = Registry.assetPack.getSound(audioPath).loop();
			_playbackMap.set(audioPath, playback);
		}
		else
			playback.sound.loop();
		
		playback.volume._ = volume;
		return playback;
	}
	
	static public function stopAudio(audioPath : String)
	{
		var playback : Playback = _playbackMap.get(audioPath);
		if ( playback != null ) {
			playback.dispose();
			_playbackMap.remove(audioPath);			
		}
	}
	
	static public function muteAudio()
	{
		_isAudioOn = false;
		updateAudioStatus();
	}
	
	static public function unmuteAudio()
	{
		_isAudioOn = true;
		updateAudioStatus();
	}
	
	static public function toggleAudioStatus()
	{
		if ( _isAudioOn )
			muteAudio();
		else
			unmuteAudio();
	}

	// ============================================= HELPERS ============================================= //
	static private function updateAudioStatus() 
	{
		if ( _isAudioOn )
			System.volume._ = 1;
		else
			System.volume._ = 0;
	}
	
	// ============================================= GETTERS AND SETTERS ============================================= //
	static function get_isAudioOn():Bool 
	{
		return _isAudioOn;
	}
}