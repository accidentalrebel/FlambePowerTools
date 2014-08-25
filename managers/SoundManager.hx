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
	
	static public function loopAudio(bgmPath : String, restart : Bool = false)
	{
		if ( restart )
			stopAudio(bgmPath);
		
		var playback : Playback = _playbackMap.get(bgmPath);
		if ( playback == null ) {
			playback = Registry.assetPack.getSound(bgmPath).loop();
			_playbackMap.set(bgmPath, playback);
		}
		else {
			playback.sound.loop();
		}
	}
	
	static public function stopAudio(bgmPath : String)
	{
		var playback : Playback = _playbackMap.get(bgmPath);
		if ( playback != null ) {
			playback.dispose();
			_playbackMap.remove(bgmPath);
		}
	}
}