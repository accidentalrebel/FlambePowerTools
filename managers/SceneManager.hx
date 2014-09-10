package flambepowertools.managers;
import flambe.Entity;
import flambe.scene.Director;
import flambe.scene.Scene;
import flambe.System;

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
		
		_sceneDirector.unwindToScene(newEntity);
	}
	
	static public function pushScene(toScene : Scene)
	{
		var newEntity : Entity = new Entity();
		newEntity.add(toScene);
		
		_sceneDirector.pushScene(newEntity);
	}
	
	static public function popScene() 
	{
		_sceneDirector.popScene();
	}
}