package flambepowertools ;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.math.Matrix;
import flambe.math.Point;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
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