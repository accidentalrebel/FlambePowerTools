package flambepowertools ;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.math.Matrix;
import flambe.math.Point;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;

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
}