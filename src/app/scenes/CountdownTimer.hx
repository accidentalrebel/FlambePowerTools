package app.scenes;
import flambe.display.FillSprite;
import flambe.Entity;
import flambe.scene.FadeTransition;
import flambe.script.CallFunction;
import flambepowertools.managers.SceneManager;
import flambepowertools.scene.TransitionScene;
import flambepowertools.system.MainStage;
import flambepowertools.utils.MiscUtils;

class CountdownTimer extends TransitionScene
{
	public function new() 
	{
		super(true);
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		
		owner.addChild(new Entity().add(new FillSprite(0xFF00FF, MainStage.width, MainStage.height)));
		MiscUtils.callWithDelay(owner, new CallFunction(goToTestScene), 5);
	}
	
	function goToTestScene() 
	{
		Main.sceneManager.switchToScene(new TestScene(), new FadeTransition(3), 3);
	}
	
	override public function onEnterTransitionFinished() 
	{
		super.onEnterTransitionFinished();
		trace("CountdownTimer EnterTransitionFinished");
	}
	
	override public function onEnterTransitionStarted() 
	{
		super.onEnterTransitionStarted();
		trace("CountdownTimer EnterTransitionStarted");
	}
	
	override public function onExitTransitionStarted() 
	{
		super.onExitTransitionStarted();
		trace("CountdownTimer ExitTransitionStarted");
	}
	
	override public function onExitTransitionFinished() 
	{
		super.onExitTransitionFinished();
		trace("CountdownTimer ExitTransitionFinished");
	}
}