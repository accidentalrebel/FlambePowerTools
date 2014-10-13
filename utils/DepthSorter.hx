package flambepowertools.utils;
import kit.display.Sprite;
import kit.Entity;

/**
 * ...
 * @author Karlo Licudine
 */
class DepthSorter
{	
	// ============================================= PUBLIC ============================================= //
	static public function sort(layerToSort : Entity, sorterFunctionTouse : Array<Sprite> -> Array<Sprite>)
	{
		var spriteList : Array<Sprite> = getAllSpritesFromLayer(layerToSort);
		spriteList = sorterFunctionTouse(spriteList);		
		reorderSpritesAccordingToArray(layerToSort, spriteList);
	}
	
	static public function sortSpriteArrayAccordingToYPosition(spriteList:Array<Sprite>) : Array<Sprite>
	{
		function sortAccodingToYPos(sprite1 : Sprite, sprite2 : Sprite) : Int
		{
			if ( sprite1.y._ > sprite2.y._ )
				return 1;
			else if ( sprite1.y._ < sprite2.y._ )
				return -1;
			else
				return 0;
		}
		
		spriteList.sort(sortAccodingToYPos);
		return spriteList;
	}
	
	// ============================================= HELPERS ============================================= //
	static function getAllSpritesFromLayer(layerToSort) : Array<Sprite>
	{
		var spriteList : Array<Sprite> = new Array<Sprite>();
		var currentEntity : Entity = layerToSort.firstChild;
		
		while ( currentEntity != null ) {
			var currentSprite : Sprite = currentEntity.get(Sprite);
			if ( currentSprite != null ) {
				spriteList.push(currentSprite);
			}
			currentEntity = currentEntity.next;
		}
		
		return spriteList;
	}
	
	static function reorderSpritesAccordingToArray(layerToSort : Entity, spriteList:Array<Sprite>) 
	{
		for ( tSprite in spriteList ){
			var sprite : Sprite = tSprite;
			layerToSort.addChild(sprite.owner, true);
		}
	}
}