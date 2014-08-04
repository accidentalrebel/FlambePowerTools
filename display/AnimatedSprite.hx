package flambepowertools.display;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.SpeedAdjuster;
import flambe.swf.Flipbook;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import urgame.managers.AssetManager;

class AnimationSet
{
	public var animationName (default, null): String;
	public var frameSequence (default, null): Array<Int>;
	
	public function new(animationName : String, frameSequence : Array<Int>) 
	{
		this.animationName = animationName;
		this.frameSequence = frameSequence;
	}
}

class AnimatedSprite extends Sprite
{
	var _animationList : Array<AnimationSet> ;
	var _flipBookArray:Array<Flipbook>;
	var _textureArray:Array<String>;
	var _moviePlayer:MoviePlayer;
	var _animationSpeedAdjuster:SpeedAdjuster;
	
	// ============================================= PUBLIC FUNCTIONS ============================================= //
	public function setupAnimation(animationName : String, frameArray : Array<Int>)
	{
		_animationList.push(new AnimationSet(animationName, frameArray));
	}
	
	public function playAnimation(animationName : String, ?animationSpeed : Float)
	{
		_moviePlayer.loop(animationName);
		
		if ( animationSpeed != null )
			_animationSpeedAdjuster.scale._ = animationSpeed;
	}
	
	// ============================================= MAIN ============================================= //
	public function new(textureArray : Array<String>) 
	{
		super();		
		
		_textureArray = textureArray;
		_animationList = new Array<AnimationSet>();
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		
		setupFlipbookArray();
		setupAnimations();
		setupMoviePlayer();
	}
	
	// ============================================= SETUP ============================================= //
	function setupFlipbookArray() 
	{
		_flipBookArray = new Array<Flipbook>();
	}
	
	function setupAnimations() 
	{			
		var currentTextureArray : Array<Texture> = new Array<Texture>();
		for ( tAnimationSet in _animationList ) {			
			var animationSet : AnimationSet = tAnimationSet;
			for ( frameNumber in animationSet.frameSequence )
				currentTextureArray.push(AssetManager.mainAssetPack.getTexture(_textureArray[frameNumber]));
				
			trace("setting up animation for " + animationSet.animationName);
			_flipBookArray.push(new Flipbook(animationSet.animationName, currentTextureArray));
		}
	}
	
	function setupMoviePlayer() 
	{
		var lib : Library = Library.fromFlipbooks(_flipBookArray);
		_moviePlayer = new MoviePlayer(lib);
		
		_animationSpeedAdjuster = new SpeedAdjuster(2);		
		
		var moviePlayerEntity : Entity = new Entity();
		moviePlayerEntity.add(_moviePlayer);
		moviePlayerEntity.add(_animationSpeedAdjuster);
		owner.addChild(moviePlayerEntity);
	}
}