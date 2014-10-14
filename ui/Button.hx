package flambepowertools.ui;
import flambepowertools.utils.MiscUtils;
import game.Registry;
import kit.display.ImageSprite;
import kit.input.PointerEvent;
import kit.script.CallFunction;
import kit.script.Script;

/**
 * ...
 * @author Karlo
 */
class Button extends ImageSprite
{	
	static private inline var ON_PRESS_ANIMATION_SPEED:Float = 0.10;
	static private inline var ON_PRESS_SCALE_TARGET : Float = 0.90;
	
	var _onPressedAnimationScript:Script;
	var _isEnabled:Bool = true;
	
	// ============================================= PUBLIC ============================================= //
	public function enable()
	{
		this.alpha._ = 1;
		_isEnabled = true;
	}
	
	public function disable() 
	{
		this.alpha._ = 0.5;
		_isEnabled = false;
	}
	
	// ============================================= MAIN ============================================= //
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
		if ( !_isEnabled )
			return;
			
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
	
	// ============================================= DIPOSAL ============================================= //
	override public function dispose() 
	{
		super.dispose();
		_onPressedAnimationScript = null;
	}
}