package flambepowertools ;
import kit.display.Sprite;
import kit.Entity;
import kit.math.Matrix;
import kit.math.Point;
import kit.script.CallFunction;
import kit.script.Delay;
import kit.script.Script;
import kit.script.Sequence;
import flambepowertools.MainStage;

/**
 * ...
 * @author Karlo
 */
class MiscUtils
{	
	/**
	 * Calls the given function after a given delay duration
	 * @param	functionToCallAfterDelay
	 * @param	delayDuration
	 */
	public static function callWithDelay(callerEntity : Entity, functionToCallAfterDelay:CallFunction, delayDuration : Float = 1) : Script
	{				
		var toAddEntity : Entity = new Entity();
		callerEntity.addChild(toAddEntity);
		
		var callDelayScriptToUse : Script = new Script();
		toAddEntity.add(callDelayScriptToUse);
		
		var sequence : Sequence = new Sequence([
			new Delay(delayDuration),
			functionToCallAfterDelay
		]);
		callDelayScriptToUse.run(sequence);
		
		return callDelayScriptToUse;
	}	
	
	/**
	 * Gets the global coordinates of the given sprite
	 * @param	theSprite	the sprite to get the global coordinates from
	 * @return	The global 	x and y coordinates of the sprite
	 */
	static public function getGlobalCoordinates( theSprite : Sprite ) : Point
	{
		var matrix : Matrix = theSprite.getViewMatrix();
		return new Point(matrix.m02, matrix.m12);
	}
}