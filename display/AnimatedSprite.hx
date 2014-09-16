package flambepowertools.display;
import kit.asset.AssetPack;
import kit.display.Sprite;
import kit.display.Texture;
import kit.Entity;
import kit.SpeedAdjuster;
import kit.movie.Flipbook;
import kit.movie.Library;
import flambepowertools.display.AnimatedSprite.AnimationSet;
import flambepowertools.swf.MoviePlayer;

class AnimationSet
{
	public var animationSpeed (default, null):Float;
	public var animationName (default, null): String;
	public var frameSequence (default, null): Array<Int>;
	
	public function new(animationName : String, frameSequence : Array<Int>, animationSpeed : Float = 1 ) 
	{
		this.animationName = animationName;
		this.frameSequence = frameSequence;
		this.animationSpeed = animationSpeed;
	}
}

class AnimatedSprite extends Sprite
{
	static private inline var ANIMATION_SPEED_DIVIDER:Float = 10;
	
	var _animationList : Map<String, AnimationSet> ;
	var _flipBookArray:Array<Flipbook>;
	var _textureArray:Array<String>;
	var _moviePlayer:MoviePlayer;
	var _highestFrameCount : Int = 0;
	var _assetPack:AssetPack;
	
	// ============================================= PUBLIC FUNCTIONS ============================================= //
	public function addAnimation(animationName : String, frameArray : Array<Int>, animationSpeed : Float = 1)
	{
		_animationList.set(animationName, new AnimationSet(animationName, frameArray, animationSpeed));
		updateHighestFrameCount(frameArray.length);
	}
		
	public function playAnimation(animationName : String)
	{
		_moviePlayer.play(animationName);
	}
	
	public function playAnimationSequence(sequenceArray : Array<String>)
	{
		_moviePlayer.playSequence(sequenceArray);
	}
	
	public function loopAnimation(animationName : String)
	{
		_moviePlayer.loop(animationName);
	}
	
	// ============================================= MAIN ============================================= //
	public function new(assetPack : AssetPack, textureArray : Array<String>) 
	{
		super();		
		
		_assetPack = assetPack;
		_textureArray = textureArray;
		_animationList = new Map<String, AnimationSet>();
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
		for ( tAnimationSet in _animationList ) {			
			var animationSet : AnimationSet = tAnimationSet;
			
			var currentTextureArray : Array<Texture> = new Array<Texture>();
			for ( frameNumber in animationSet.frameSequence )
				currentTextureArray.push(_assetPack.getTexture(_textureArray[frameNumber]));
				
			var newFlipBook : Flipbook = new Flipbook(animationSet.animationName, currentTextureArray);
			newFlipBook.setDuration( animationSet.frameSequence.length * animationSet.animationSpeed / ANIMATION_SPEED_DIVIDER);
			_flipBookArray.push(newFlipBook);
		}
	}
	
	function setupMoviePlayer() 
	{		
		var lib : Library = Library.fromFlipbooks(_flipBookArray);
		_moviePlayer = new MoviePlayer(lib);	
		
		owner.addChild(new Entity().add(_moviePlayer));
	}
	
	// ============================================= HELPER ============================================= //
	function updateHighestFrameCount(currentFrameCount:Int) 
	{
		if ( currentFrameCount > _highestFrameCount )
			_highestFrameCount = currentFrameCount;
	}
}