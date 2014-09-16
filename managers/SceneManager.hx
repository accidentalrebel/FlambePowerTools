package flambepowertools.managers;
import kit.Entity;
import kit.scene.Director;
import kit.scene.Scene;
import kit.System;

/**
 * ...
 * @author Karlo
 */
class SceneManager
{
	static private var _sceneDirector:Director;
	
	static public function setup()
	{
		_sceneDirector = new Director();
		System.root.add(_sceneDirector);
	}
	
	static public function switchScene(toScene : Scene)
	{
		var newEntity : Entity = new Entity();
		newEntity.add(toScene);
		
		_sceneDirector.legacyUnwindToScene(newEntity);
	}
	
	static public function pushScene(toScene : Scene)
	{
		var newEntity : Entity = new Entity();
		newEntity.add(toScene);
		
		_sceneDirector.legacyPushScene(newEntity);
	}
	
	static public function popScene() 
	{
		_sceneDirector.popScene();
	}
}