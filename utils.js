/*	Misc needed functions	*/

module.exports = function() {
	
  this.isLetter = function (c) { return c.toLowerCase() != c.toUpperCase() },
  this.isNumber = function (c) { return !isNaN(parseInt(c)) },
  this.isSeparator = function(c) { return (c == '-' || c == '_' || c == '\'' || c == ' ' || c == '"') },
  this.panelize = function(src) {
		var dest = ''
		for (var i = 0; i < src.length; i++)
		{
			if (isLetter(src[i]))
				dest = dest + ':regional_indicator_'+src[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")+':'
			else if (isNumber(src[i]))
				dest = dest + num[parseInt(src[i])] + ' '
			else if (isSeparator(src[i]) && (isNumber(src[i+1]) || isLetter(src[i+1])))
				dest = dest + '    '
		}
		return dest
	}
}
