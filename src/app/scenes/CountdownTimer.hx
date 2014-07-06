package app.scenes;
import flambe.display.FillSprite;
import flambe.Entity;
import flambepowertools.scene.TransitionScene;
import flambepowertools.system.MainStage;

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
	}
}