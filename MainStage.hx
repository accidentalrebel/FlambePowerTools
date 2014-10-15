//
// MainStage.hx by AccidentalRebel
// https://github.com/accidentalrebel/AutoStageResize-Flambe
// http://www.accidentalrebel.com

package flambepowertools;
import kit.display.Sprite;
import kit.math.Point;
import kit.math.Rectangle;
import kit.System;

class MainStage
{	
	static public var computedStageScale(get, null) : Float;	
	static public var stageWidth(get, null) : Float;
	static public var stageHeight(get, null) : Float;
	static public var screenWidth(get, null) : Float;
	static public var screenHeight(get, null) : Float;
	static public var mainStageSprite(get, null) : Sprite;

	static private var _mainStageSprite:Sprite;
	static private var _designSizeWidth:Float;
	static private var _designSizeHeight:Float;	
	static private var _screenWidth:Float;
	static private var _screenHeight:Float;
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
		//return capPositionToMainStage(new Point(xPos, yPos));
		return new Point(xPos, yPos);
	}

	// ============================================= SETUP ============================================= //
	static private function setupMainStageSprite() 
	{
		_mainStageSprite = new Sprite();
		//_mainStageSprite.scissor = new Rectangle(0, 0, _designSizeWidth, _designSizeHeight);
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
		_screenWidth = getScreenWidth();
		_screenHeight = getScreenHeight();
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
	
	static private function getScreenHeight() : Float
	{
		return System.stage.height / _computedStageScale;
	}
	
	static private function getScreenWidth() : Float
	{
		return System.stage.width / _computedStageScale;
	}

	static function centerStage() 
	{
		var xDiff:Float = System.stage.width - (_designSizeWidth * _computedStageScale);
		var yDiff:Float = System.stage.height - (_designSizeHeight * _computedStageScale);

		_mainStageSprite.x._ = xDiff / 2 + (_designSizeWidth * _computedStageScale) / 2;
		_mainStageSprite.y._ = yDiff / 2 + (_designSizeHeight * _computedStageScale) / 2;
	}

	static private function capPositionToMainStage(position:Point) 
	{
		if ( position.x < 0 )
			position.x = 0;
		else if ( position.x > MainStage.stageWidth )
			position.x = MainStage.stageWidth;

		if ( position.y < 0 )
			position.y = 0;
		else if ( position.y > MainStage.stageHeight )
			position.y = MainStage.stageHeight;

		return position;
	}

	// ============================================= GETTERS AND SETTERS ============================================= //
	static function get_computedStageScale():Float { return _computedStageScale; }
	static function get_stageWidth():Float { return _designSizeWidth; }
	static function get_stageHeight():Float { return _designSizeHeight; }
	static function get_screenWidth():Float { return _screenWidth; }
	static function get_screenHeight():Float { return _screenHeight; }
	static function get_mainStageSprite():Sprite {	return _mainStageSprite; }
}