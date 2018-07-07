"use strict";
var Discord = require("discord.js")
var Config = require("./config.json")

/* Function controller (adds lisibility) */
require("./controller.js")
require("./utils.js")()

/* Main */
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
	
	/* Check for any spam */
	if (spamCheck(message, chan))
			return
		
	/* !rekt */
	if (message.content.startsWith("!rekt"))
	{
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
			
			/* Get a list of users in the channel where the command was sent */
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
	
	/* tu vas bien ? */
	if (!message.content.startsWith("!panel") && message.content.toLowerCase().replace(/ /g, "").includes("tuvasbien"))
	{
		chan.send("T\n\tU\n\n"+
				  "\t\t\tV\n\t\t\t\tA\n\t\t\t\t\t S\n\n"+
				  "\t\t\t\t\t\t\tB\n\t\t\t\t\t\t\t\tI\n\t\t\t\t\t\t\t\t\tE\n\t\t\t\t\t\t\t\t\t\tN\n"+
				  "\t\t\t\t\t\t\t\t\t\t\t?")
		console.log("[LOG] >>> "+message.author.username+" ("+message.author+")  >>> TU VAS BIEN ?")
		return
	}
	
	if (message.content.startsWith("!runtest") && message.author == Config.ownerID)
	{
		/* do shit for test purpose here */
		console.log("[LOG] >>> "+message.author.username+" ("+message.author+")  >>> TEST")
		return
	}
	
	/* !panel */
	if (message.content.startsWith("!panel"))
	{
		var src = message.content.substr(7) /* substract "!panel " */
		
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
