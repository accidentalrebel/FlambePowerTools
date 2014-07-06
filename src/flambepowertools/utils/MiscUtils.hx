package flambepowertools.utils;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;

class MiscUtils
{
	public static function callWithDelay(?callerEntity : Entity, functionToCall:CallFunction, delayDuration : Float = 1)
	{		
		var entityScript : Script = callerEntity.get(Script);
		if ( entityScript == null ) {
			entityScript = new Script();
			callerEntity.add(entityScript);
		}
		
		var sequence : Sequence = new Sequence([
			new Delay(delayDuration),
			functionToCall
		]);
		entityScript.run(sequence);
	}
}