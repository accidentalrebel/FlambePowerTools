package flambepowertools.common;

import flambe.Component;
import flambe.util.Signal0;
import flambe.util.Signal0.Listener0;

class CountdownTimer extends Component
{	
	public var currentTime(get, null): Float;
	
	var _onCountdownEnd : Signal0;
	var _currentTime : Float;
	var _canCount : Bool = false;
	
	public function new() 
	{
		
	}
	
	override public function onUpdate(dt:Float) 
	{
		if ( !_canCount )
			return;
		
		super.onUpdate(dt);
		
		_currentTime -= dt;
		
		if ( hasReachedZero() )
			onCountdownFinished();
	}
	
	// ======================================== TIME CONTROL ===========================================
	public function start(startingTime : Float, functionToCallOnCountdownFinished : Listener0)
	{
		reset();
		setupCountdownSignal(functionToCallOnCountdownFinished);	
		
		_currentTime = startingTime;		
		_canCount = true;
	}
	
	public function pause()
	{	
		_canCount = false;
	}
	
	public function resume()
	{
		_canCount = true;
	}
	
	public function reset()
	{
		_onCountdownEnd = null;
		_canCount = false;
		_currentTime = 0;		
	}
	
	// ======================================== MISC FUNCTIONS ===========================================
	function setupCountdownSignal(functionToCall:Listener0) 
	{
		if ( _onCountdownEnd == null )
			_onCountdownEnd = new Signal0();
		
		_onCountdownEnd.connect(functionToCall).once();
	}
	
	function onCountdownFinished() 
	{
		_onCountdownEnd.emit();
	}

	function hasReachedZero() : Bool
	{
		if ( _currentTime <= 0 ) 
			return true;
		
		return false;
	}
	
	// ======================================== GETTER AND SETTERS ===========================================
	function get_currentTime():Float {	return _currentTime; }
	
	// ============================================= DISPOSAL ============================================= //
	override public function onRemoved() 
	{
		super.onRemoved();
		_onCountdownEnd = null;
	}
}