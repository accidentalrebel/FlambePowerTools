package flambepowertools.managers;
import flambe.sound.Playback;
import game.Registry;

/**
 * ...
 * @author Karlo
 */
class SoundManager
{
	static var _playbackMap : Map<String, Playback>;
	
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
}