package flambepowertools.swf;
import kit.movie.Library;

class MoviePlayer extends kit.movie.MoviePlayer
{
	var _sequenceArray:Array<String>;
	var _sequenceIndex:Int = 0;
	
	public function new(lib : Library) 
	{
		super(lib);
	}
	
	public function playSequence(sequenceArray : Array<String>, restart : Bool = true) : MoviePlayer
	{
		_sequenceArray = sequenceArray;
		play(_sequenceArray[_sequenceIndex]);
		
		return this;
	}
	
	override public function onUpdate(dt:Float) 
	{
		// If this update would end the oneshot movie, replace it with the looping movie
        if (_oneshotSprite != null && _oneshotSprite.position+dt > _oneshotSprite.symbol.duration) {
            _oneshotSprite = null;
            
			_sequenceIndex++;
			if ( _sequenceArray != null && _sequenceIndex < _sequenceArray.length )
				play(_sequenceArray[_sequenceIndex]);			
			else
				setCurrent(_loopingSprite);				
        }
	}
	
}