package flambepowertools.managers;
import kit.asset.AssetPack;
import kit.display.Font;

class FontManager
{
	static private var _assetPack:AssetPack;
	static private var _fontMap:Map<String, Font>;
	
	static public function setup(assetPack : AssetPack)
	{
		_assetPack = assetPack;
		_fontMap = new Map<String, Font>();
	}
	
	static public function getFont(fontPath : String) : Font
	{
		var currentFont : Font = _fontMap.get(fontPath);
		if ( currentFont == null ) {		
			currentFont = new Font(_assetPack, fontPath);
			_fontMap.set(fontPath, currentFont);
		}
		
		return currentFont;
	}
}