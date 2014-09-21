package flambepowertools.utils;

/**
 * ...
 * @author Karlo
 */
class RandomUtil
{
	public static function randomMinMax( min : Float, max : Float ) : Float
	{
		return min + ( max - min ) * Math.random();		
	}
}