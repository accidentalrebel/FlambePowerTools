package flambepowertools.input;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.Disposer;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.math.Point;
import flambe.System;
import flambe.util.Signal0;
import game.data.DebugConfig;
import game.data.GameData;

/**
 * ...
 * @author Karlo
 */
 
class SwipeManager extends Component
{
	public var onSwipeUp(get, null) : Signal0;
	public var onSwipeRight(get, null) : Signal0;
	public var onSwipeDown(get, null) : Signal0;
	public var onSwipeLeft(get, null) : Signal0;
	
	var _onSwipeUp : Signal0;
	var _onSwipeRight : Signal0;
	var _onSwipeDown : Signal0;
	var _onSwipeLeft : Signal0;
	
	var _disposer : Disposer;
	
	var _startingDebugSprite:FillSprite;
	var _releaseDebugSprite:FillSprite;
	
	var _pointerDownPos:Point;
	
	public function new() 
	{		
		_onSwipeUp = new Signal0();
		_onSwipeRight = new Signal0();
	    _onSwipeDown = new Signal0();
		_onSwipeLeft = new Signal0();
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		
		#if debug
			if ( DebugConfig.SHOW_SWIPE_DEBUG_SPRITES )
				setupDebugPoints();
		#end
		setupDisposer();
		setupTouchListeners();
	}	
	
	// ============================================= SETUP ============================================= //
	function setupDebugPoints() 
	{
		_startingDebugSprite = new FillSprite(0xFF0000, 10, 10);
		_startingDebugSprite.centerAnchor();
		_startingDebugSprite.disablePointer();
		owner.addChild(new Entity().add(_startingDebugSprite));
		
		_releaseDebugSprite = new FillSprite(0x0000FF, 10, 10);
		_releaseDebugSprite.centerAnchor();
		_releaseDebugSprite.visible = false;
		_releaseDebugSprite.disablePointer();
		owner.addChild(new Entity().add(_releaseDebugSprite));
	}
	
	function setupDisposer() 
	{
		_disposer = new Disposer();
		owner.addChild(new Entity().add(_disposer));
	}
	
	function setupTouchListeners() 
	{
		_disposer.connect1(System.pointer.down, onPointerDown);
		_disposer.connect1(System.pointer.up, onPointerUp);		
	}
	
	// ============================================= EVENTS ============================================= //
	function onPointerDown(pointerEvent : PointerEvent) 
	{
		var xPos : Float = pointerEvent.viewX / MainStage.computedStageScale;
		var yPos : Float = pointerEvent.viewY / MainStage.computedStageScale;
		
		_pointerDownPos = new Point(xPos, yPos);
		
		#if debug
			if ( _startingDebugSprite != null && _releaseDebugSprite != null ) {
				_startingDebugSprite.setXY(xPos, yPos);
				_releaseDebugSprite.visible = false;
			}
		#end
	}
	
	function onPointerUp(pointerEvent : PointerEvent) 
	{
		var xPos : Float = pointerEvent.viewX / MainStage.computedStageScale;
		var yPos : Float = pointerEvent.viewY / MainStage.computedStageScale;
		
		var pointerUpPos = new Point(xPos, yPos);
		if ( pointerUpPos.distanceTo(_pointerDownPos.x, _pointerDownPos.y) > GameData.SWIPE_DISTANCE_REQUIREMENT )
			handleSwipeDirectionDetection(_pointerDownPos, pointerUpPos);
		
		#if debug
			if ( _releaseDebugSprite != null ) {
				_releaseDebugSprite.setXY(xPos, yPos);
				_releaseDebugSprite.visible = true;
			}
		#end
	}
	
	// ============================================= HELPERS ============================================= //
	function handleSwipeDirectionDetection(pointerDownPos:Point, pointerUpPos:Point)
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
	
	// ============================================= DISPOSAL ============================================= //
	override public function onRemoved() 
	{
		super.onRemoved();		
		_disposer.dispose();
	}
	
	// ============================================= GETTERS AND SETTERS ============================================= //
	function get_onSwipeUp():Signal0 { return _onSwipeUp; }
	function get_onSwipeRight():Signal0 { return _onSwipeRight; }
	function get_onSwipeDown():Signal0 { return _onSwipeDown; }
	function get_onSwipeLeft():Signal0 { return _onSwipeLeft; }
}