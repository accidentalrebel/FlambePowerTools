package app.scenes;
import flambe.display.FillSprite;
import flambe.Entity;
import flambe.scene.FadeTransition;
import flambe.script.CallFunction;
import flambepowertools.scene.TransitionScene;
import flambepowertools.system.MainStage;
import flambepowertools.utils.MiscUtils;

class TestScene extends TransitionScene
{
	public function new() 
	{
		super(true);
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		
		owner.addChild(new Entity().add(new FillSprite(0x00FFFF, MainStage.width, MainStage.height)));
	}
	
	function goToTestScene() 
	{
		Main.sceneManager.switchToScene(new TestScene(), new FadeTransition(3), 3);
	}
	
	override public function onEnterTransitionFinished() 
	{
		super.onEnterTransitionFinished();
		trace("TestScene EnterTransitionFinished");
	}
	
	override public function onEnterTransitionStarted() 
	{
		super.onEnterTransitionStarted();
		trace("TestScene EnterTransitionStarted");
	}
	
	override public function onExitTransitionStarted() 
	{
		super.onExitTransitionStarted();
		trace("TestScene ExitTransitionStarted");
	}
	
	override public function onExitTransitionFinished() 
	{
		super.onExitTransitionFinished();
		trace("TestScene ExitTransitionFinished");
	}
}