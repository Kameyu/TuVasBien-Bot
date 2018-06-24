"use strict";
var Discord = require("discord.js")
var Config = require("./config.json")

/*	Function controller (adds lisibility)	*/
require("./controller.js")
require("./utils.js")()

/*	Main	*/
var Bot = new Discord.Client()
Bot.login(Config.token)
console.log("[Starting bot...]")

Bot.on("ready", function() {
	console.log("[Bot logged in successfully (token)]\n[Listening...]")
})

Bot.on("message", message => {
	if (message.author == Config.userID)
		return // Must not parse own messages. Performance concern.
	
	let args = message.content.split(" ")
	var chan = message.channel
	/*	!rekt	*/
	if (message.content.startsWith("!rekt"))
	{
		if (spamCheck(message, chan))
			return
		if (args[1])
		{
			if (args[1].startsWith("<@"))
			{
				chan.send(args[1]+", you got\n"+panelize("rekt"))
				console.log("[LOG] >>> "+message.author.username+" ("+message.author+")  >>> "+args[1]+", you got REKT")
				message.delete()
				.then(msg => console.log("[LOG] Message deleted for: "+msg.author.username))
				.catch(console.error)
				return
			}
			
			for (let [snow, usr] of chan.members)
			{
				var userID = usr.toString().replace(/[<@!>]/g, "")
				var userName = Bot.users.get(userID).username
				if (userName.toLowerCase().startsWith(args[1].toLowerCase()) ||	userName.toLowerCase().includes(args[1].toLowerCase()))
				{
					chan.send(usr+", you got\n"+panelize("rekt"))
					console.log("[LOG] >>> "+message.author.username+" ("+message.author+")  >>> "+userName+", you got REKT")
					message.delete()
					.then(msg => console.log("[LOG] Message deleted for: "+msg.author.username))
					.catch(console.error)
					return
				}
			}
			console.log("[ERR] \"" + args[1] + "\" introuvable ! (author: "+message.author.username+" ("+message.author+") )")
		}
		else
		{
			chan.send(message.author+" "+panelize("rekt")+" you.")
			console.log("[LOG] >>> "+message.author.username+" ("+message.author+")  REKT you")
			message.delete()
			.then(msg => console.log("[LOG] Message deleted for: "+msg.author.username))
			.catch(console.error)
		}
	}
	
	/*	!slide	*/
	if (!message.content.startsWith("!panel") && message.content.toLowerCase().replace(/ /g, "").includes("tuvasbien"))
	{
		if (spamCheck(message, chan))
			return
		chan.send("T\n  U\n\n      V\n         A\n            S\n\n                 B\n                     I\n                        E\n                            N\n                                  ?")
		console.log("[LOG] >>> "+message.author.username+" ("+message.author+")  >>> TU VAS BIEN ?")
		return
	}
	
	/*	!panel	*/
	if (message.content.startsWith("!panel"))
	{
		if (spamCheck(message, chan))
			return
		var num = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:" ]
		var src = message.content.substr(7) /* substr("!panel ") */
		
		if (src.length > 26 && message.author != Config.ownerID)
		{
			chan.send("Wow calme toi mec... Pas de phrases aussi longues. (**26 caractères max**)")
			console.log("[LOG] Buffer overflow. User: "+message.author)
			return
		}
		
		var dest = panelize(src)
		chan.send(dest)
		console.log("[LOG] >>> [PANEL] >>> "+message.author.username+" ("+message.author+")  >>> "+src)
		message.delete()
		.then(msg => console.log("[LOG] Message deleted for: "+msg.author.username))
		.catch(console.error)
		
	}
})
