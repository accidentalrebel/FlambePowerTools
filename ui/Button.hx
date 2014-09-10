package flambepowertools.ui;
import flambe.display.ImageSprite;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Script;
import game.Registry;

/**
 * ...
 * @author Karlo
 */
class Button extends ImageSprite
{	
	static private inline var ON_PRESS_ANIMATION_SPEED:Float = 0.10;
	static private inline var ON_PRESS_SCALE_TARGET : Float = 0.90;
	
	var _onPressedAnimationScript:Script;
	
	public function new(?texturePath : String) 
	{
		super(Registry.assetPack.getTexture(texturePath));		
		this.centerAnchor();
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		
		setupPressListeners();
	}
	
	// ============================================= SETUP ============================================= //
	function setupPressListeners() 
	{
		this.pointerDown.connect(onPressedDown);
		this.pointerUp.connect(onPressedUp);
	}
	
	// ============================================= EVENTS ============================================= //
	function onPressedDown(pointerEvent : PointerEvent) 
	{
		playOnPressedAnimation();
	}
	
	function onPressedUp(pointerEvent : PointerEvent) 
	{		
	}
	
	// ============================================= ANIMATIONS ============================================= //
	function playOnPressedAnimation() 
	{		
		if ( _onPressedAnimationScript != null )
			_onPressedAnimationScript.dispose();
		
		this.scaleX.animateTo(ON_PRESS_SCALE_TARGET, ON_PRESS_ANIMATION_SPEED);
		this.scaleY.animateTo(ON_PRESS_SCALE_TARGET, ON_PRESS_ANIMATION_SPEED);		
		
		_onPressedAnimationScript = MiscUtils.callWithDelay(owner, new CallFunction(playGrowBackAnimation), ON_PRESS_ANIMATION_SPEED);
	}
	
	function playGrowBackAnimation() {
		this.scaleX.animateTo(1, ON_PRESS_ANIMATION_SPEED);
		this.scaleY.animateTo(1, ON_PRESS_ANIMATION_SPEED);
	}
}