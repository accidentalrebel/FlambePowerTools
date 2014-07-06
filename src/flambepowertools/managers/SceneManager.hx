package flambepowertools.managers;

import flambe.Component;
import flambe.Entity;
import flambe.scene.Director;
import flambe.scene.Scene;
import flambe.scene.Transition;
import flambe.script.CallFunction;
import flambe.System;
import flambepowertools.scene.TransitionScene;
import flambepowertools.utils.MiscUtils;

class SceneManager extends Component
{	
	var _sceneDirector : Director;
	var _oldTransitionScene:TransitionScene;
	
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
	public function switchToScene(sceneToSwitchTo : TransitionScene, ?transitionToUse : Transition, duration : Float = 0)
	{
		var sceneEntity : Entity = new Entity();
		sceneEntity.add(sceneToSwitchTo);
		
		callOnExitTransitionStarted();
		callOnEnterTransitionStarted(sceneToSwitchTo);
		
		_sceneDirector.unwindToScene(sceneEntity, transitionToUse);
		
		MiscUtils.callWithDelay(_sceneDirector.owner, new CallFunction(onTransitionFinished), duration);
	}
	
	function onTransitionFinished() 
	{
		callOnEnterTransitionFinished();
		callOnExitTransitionFinished();
	}
	
	// ============================================= HELPER FUNCTIONS ============================================= //
	function callOnExitTransitionStarted() 
	{
		_oldTransitionScene = getTransitionSceneFromTopScene();
		if ( _oldTransitionScene != null )
			_oldTransitionScene.onExitTransitionStarted();
	}
	
	function callOnEnterTransitionStarted(newTransitionScene : TransitionScene) 
	{
		newTransitionScene.onEnterTransitionStarted();
	}
	
	function callOnExitTransitionFinished() 
	{
		if ( _oldTransitionScene == null )
			return;
		
		_oldTransitionScene.onExitTransitionFinished();
		_oldTransitionScene = null;
	}
	
	function callOnEnterTransitionFinished()
	{
		var newTransitionScene : TransitionScene = getTransitionSceneFromTopScene();
		if ( newTransitionScene != null )
			newTransitionScene.onEnterTransitionFinished();
	}
	
	function getTransitionSceneFromTopScene() : TransitionScene
	{
		var topScene : Entity = _sceneDirector.topScene;
		if ( topScene == null )
			return null;
		
		return topScene.get(TransitionScene);
	}
}