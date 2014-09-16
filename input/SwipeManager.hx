package flambepowertools.input;
import kit.Component;
import kit.display.FillSprite;
import kit.Disposer;
import kit.Entity;
import kit.input.PointerEvent;
import kit.math.Point;
import kit.System;
import kit.util.Signal0;
import game.data.DebugConfig;
import game.data.GameData;

/**
 * ...
 * @author Karlo
 */
 
class SwipeManager extends Component
{
	static public inline var REQUIRED_SWIPE_DURATION:Float = 0.5;
	
	public var onSwipeUp(get, null) : Signal0;
	public var onSwipeRight(get, null) : Signal0;
	public var onSwipeDown(get, null) : Signal0;
	public var onSwipeLeft(get, null) : Signal0;	
	
	var _onSwipeUp : Signal0;
	var _onSwipeRight : Signal0;
	var _onSwipeDown : Signal0;
	var _onSwipeLeft : Signal0;
	
	var _pointerDownPos:Point;
	
	// ============================================= PUBLIC FUNCTIONS ============================================= //
	public function handleSwipeDirectionDetection(pointerDownPos:Point, pointerUpPos:Point)
	{
		var distanceX : Float = Math.abs(pointerDownPos.x - pointerUpPos.x);
		var distanceY : Float = Math.abs(pointerDownPos.y - pointerUpPos.y);
		if ( distanceY > distanceX ) {
			if ( pointerUpPos.y > pointerDownPos.y )
				_onSwipeDown.emit();
			else
				_onSwipeUp.emit();
		}
		else {
			if ( pointerUpPos.x > pointerDownPos.x )
				_onSwipeRight.emit();
			else
				_onSwipeLeft.emit();
		}
	}
	
	// ============================================= MAIN ============================================= //
	public function new() 
	{		
		_onSwipeUp = new Signal0();
		_onSwipeRight = new Signal0();
	    _onSwipeDown = new Signal0();
		_onSwipeLeft = new Signal0();
	}
	
	// ============================================= GETTERS AND SETTERS ============================================= //
	function get_onSwipeUp():Signal0 { return _onSwipeUp; }
	function get_onSwipeRight():Signal0 { return _onSwipeRight; }
	function get_onSwipeDown():Signal0 { return _onSwipeDown; }
	function get_onSwipeLeft():Signal0 { return _onSwipeLeft; }
}