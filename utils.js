/*	Misc needed functions	*/

module.exports = function() {
	
  this.isLetter = function (c) { return c.toLowerCase() != c.toUpperCase() },
  this.isNumber = function (c) { return !isNaN(parseInt(c)) },
  this.isSeparator = function(c) { return (c == "-" || c == "_" || c == "\'" || c == " " || c == "\"") },
  
  /*	PANELIZE TEXT	*/
  this.panelize = function(src) {
		var dest = ""
		var num = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:" ]
		for (var i = 0; i < src.length; i++)
		{
			if (isLetter(src[i]))
				dest = dest + ":regional_indicator_"+src[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")+":"
			else if (isNumber(src[i]))
				dest = dest + num[parseInt(src[i])] + " "
			else if (isSeparator(src[i]) && (isNumber(src[i+1]) || isLetter(src[i+1])))
				dest = dest + "    "
		}
		return dest
	}
	
	/*	SPAM CHECK	*/
  this.spamCheck = function(message, chan) {
		var fs = require("fs")
		var msgSettings = fs.readFileSync("messages.json")
		try {
			msgSettings = JSON.parse(msgSettings)
		} catch(e) {
			console.error("Could not parse message.json file:\n", e)
			return
		}
		var resIdx = msgSettings.data.findIndex(id => id.name === message.author.username)
		if (resIdx != -1)
		{
			if (message.createdTimestamp < msgSettings.data[resIdx].next)
			{
				var timeToWait = Math.round((msgSettings.data[resIdx].next - message.createdTimestamp) / 1000)
				chan.send("Wow wow, calme-toi **"+message.author.username+"** ! Attends encore **"+timeToWait+" secondes** !")
				return true
			}
			else
			{
				msgSettings.data[resIdx].next = message.createdTimestamp + 10000
				fs.writeFile("messages.json", JSON.stringify(msgSettings, null, "\t"), function(err){
					if (err)
						throw err
				})
				return false
			}
		}
		else
		{
			msgSettings.data.push(
			{
				name: message.author.username,
				next: Date.now()+10000
			})
			fs.writeFile("messages.json", JSON.stringify(msgSettings, null, "\t"), function(err){
				if (err)
					throw err
			})
			return false
		}
	}
 }