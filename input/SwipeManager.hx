package flambepowertools.input;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.Disposer;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.System;
import flambe.util.Signal0;

/**
 * ...
 * @author Karlo
 */
class SwipeManager extends Component
{
	var _onSwipeUp : Signal0;
	var _onSwipeRight : Signal0;
	var _onSwipeDown : Signal0;
	var _onSwipeLeft : Signal0;
	var _disposer : Disposer;
	var _startingDebugSprite:FillSprite;
	var _releaseDebugSprite:FillSprite;
	
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
		owner.addChild(new Entity().add(_startingDebugSprite));
		
		_releaseDebugSprite = new FillSprite(0x0000FF, 10, 10);
		_releaseDebugSprite.centerAnchor();
		_releaseDebugSprite.visible = false;
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
		#if debug
			var xPos : Float = pointerEvent.viewX / MainStage.computedStageScale;
			var yPos : Float = pointerEvent.viewY / MainStage.computedStageScale;
		
			_startingDebugSprite.setXY(xPos, yPos);
			_releaseDebugSprite.visible = false;
		#end
	}
	
	function onPointerUp(pointerEvent : PointerEvent) 
	{
		#if debug
			var xPos : Float = pointerEvent.viewX / MainStage.computedStageScale;
			var yPos : Float = pointerEvent.viewY / MainStage.computedStageScale;
			
			_releaseDebugSprite.setXY(xPos, yPos);
			_releaseDebugSprite.visible = true;
		#end
	}
	
	// ============================================= DISPOSAL ============================================= //
	override public function onRemoved() 
	{
		super.onRemoved();		
		_disposer.dispose();
	}
}