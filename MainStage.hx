//
// MainStage.hx by AccidentalRebel
// https://github.com/accidentalrebel/AutoStageResize-Flambe
// http://www.accidentalrebel.com

package flambepowertools;
import flambe.display.Sprite;
import flambe.math.Point;
import flambe.math.Rectangle;
import flambe.System;

class MainStage
{	
	static public var computedStageScale(get, null) : Float;	
	static public var width(get, null) : Float;
	static public var height(get, null) : Float;
	static public var mainStageSprite(get, null) : Sprite;

	static private var _mainStageSprite:Sprite;
	static private var _designSizeWidth:Float;
	static private var _designSizeHeight:Float;
	static private var _computedStageScale:Float;

	static public function init(designSizeWidth : Float, designSizeHeight : Float) 
	{
		_designSizeWidth = designSizeWidth;
		_designSizeHeight = designSizeHeight;

		setupMainStageSprite();
		setupStageResizeListener();

		resizeStage();
	}

	static public function convertToMainStageCoordinates(positionToConvert : Point) : Point
	{
		var xPos : Float = (positionToConvert.x - _mainStageSprite.x._) / _computedStageScale;
		var yPos : Float = (positionToConvert.y - _mainStageSprite.y._) / _computedStageScale;
		return capPositionToMainStage(new Point(xPos, yPos));
	}

	// ============================================= SETUP ============================================= //
	static private function setupMainStageSprite() 
	{
		_mainStageSprite = new Sprite();
		_mainStageSprite.scissor = new Rectangle(0, 0, _designSizeWidth, _designSizeHeight);
		System.root.add(_mainStageSprite);
	}

	static function setupStageResizeListener() 
	{
		System.stage.resize.connect(onStageResize);
	}

	// ============================================= EVENTS ============================================= //
	static function onStageResize()
	{
		resizeStage();
	}

	// ============================================= HELPER FUNCTIONS ============================================= //
	static function resizeStage() 
	{		
		_computedStageScale = computeScaleAccordingToNewStageDimensions();     	
		_mainStageSprite.setScale(_computedStageScale);

		centerStage();
	}

	static function computeScaleAccordingToNewStageDimensions() : Float
	{
		var currentStageWidth : Float = System.stage.width;
		var currentStageHeight : Float = System.stage.height;

		var idealWidth  : Float = _designSizeWidth;
		var idealHeight : Float = _designSizeHeight;

		var computedScale : Float = 1;
		if ( currentStageWidth / idealWidth < currentStageHeight / idealHeight ) 
			computedScale = currentStageWidth/idealWidth;
		else 
			computedScale = currentStageHeight / idealHeight;    

		return computedScale;
	}

	static function centerStage() 
	{
		var xDiff:Float = System.stage.width - (_designSizeWidth * _computedStageScale);
		var yDiff:Float = System.stage.height - (_designSizeHeight * _computedStageScale);

		_mainStageSprite.x._ = xDiff / 2;
		_mainStageSprite.y._ = yDiff / 2;
	}

	static private function capPositionToMainStage(position:Point) 
	{
		if ( position.x < 0 )
			position.x = 0;
		else if ( position.x > MainStage.width )
			position.x = MainStage.width;

		if ( position.y < 0 )
			position.y = 0;
		else if ( position.y > MainStage.height )
			position.y = MainStage.height;

		return position;
	}

	// ============================================= GETTERS AND SETTERS ============================================= //
	static function get_computedStageScale():Float { return _computedStageScale; }
	static function get_width():Float { return _designSizeWidth; }
	static function get_height():Float { return _designSizeHeight; }
	static function get_mainStageSprite():Sprite {	return _mainStageSprite; }
}