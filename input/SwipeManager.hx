package flambepowertools.input;
import flambe.Component;
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
		
		setupDisposer();
		setupTouchListeners();
	}
	
	// ============================================= SETUP ============================================= //
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
		
	}
	
	function onPointerUp(pointerEvent : PointerEvent) 
	{
		
	}
	
	// ============================================= DISPOSAL ============================================= //
	override public function onRemoved() 
	{
		super.onRemoved();		
		_disposer.dispose();
	}
}