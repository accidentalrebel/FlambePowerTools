package flambepowertools.managers;

import flambe.Component;
import flambe.Entity;
import flambe.scene.Director;
import flambe.scene.Scene;
import flambe.System;
import flambepowertools.scene.TransitionScene;

class SceneManager extends Component
{	
	var _sceneDirector : Director;
	
	public function new()
	{
	
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		
		_sceneDirector = new Director();		
		owner.add(_sceneDirector);
	}
	
	// ============================================= PUBLIC FUNCTIONS ============================================= //
	public function switchToScene(sceneToSwitchTo : TransitionScene)
	{
		var sceneEntity : Entity = new Entity();
		sceneEntity.add(sceneToSwitchTo);
		
		_sceneDirector.unwindToScene(sceneEntity);
	}
}