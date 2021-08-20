const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const fs = require('fs');

const Discord = require('discord.js');

const client = new Discord.Client();

const token = 'Nzk3MTUzMzE1NzU4NDA3NzEw.X_iU4A.NB2mAITEXzeuBG56Fx52mWVsN9M';

const PREFIX = '>';

const CPREFIX = 'Nexus,';

const readline = require('readline');

var basedlistnum = [];

var basedtxt = 'basedlist.txt';

client.on('ready', () => {
    console.log('NEXUS is online!');

})

client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "main");
    if(!channel) return;

    channel.send(`Welcome to The Nest ${member}, my name is N.E.X.U.S and I am here to assist you! Head to the Setup category to add roles, and ask staff for help if you find yourself needing it. Have fun, Sparrow!`)

    

} );

client.on('message', (message) => {




    })



    client.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {

        case 'say':
            if(!message.member.roles.cache.some(r => r.name === "Blue Jay"))  return message.channel.send('My apologies, but you do not have that level of authority to access that protocol.')
            .then(msg => msg.delete(5000));
            message.delete()

            if(message.content.startsWith(">say")) {
                message.channel.send((message.content.replace('>say',``)));
            };
            break;

        case 'addbased':
            if(!message.member.roles.cache.some(r => r.name === "Swans"))  return message.channel.send('My apologies, but you do not have that level of authority to access that protocol.')
            .then(msg => msg.delete(5000));
            message.delete()

            if(message.content.startsWith(">addbased")) {
                var newbased = message.content.replace('>addbased',``);
                if (newbased==="") {
                    message.channel.send('There is no message being added, please add a phrase after the command.');
                    break;
                }
                fs.appendFile('basedlist.txt', newbased + '\n', function (err) {
                    if (err) throw err;
                });
                message.channel.send(`${message.author.username} have added a new based statement: ` + newbased);
                
            };
            break;

        case 'addbasedbulk':
            if(!message.member.roles.cache.some(r => r.name === "Swans"))  return message.channel.send('My apologies, but you do not have that level of authority to access that protocol.')
            .then(msg => msg.delete(5000));
            message.delete()

            if(message.content.startsWith(">addbasedbulk")) {
                var newbasedbulk = message.content.replace('>addbasedbulk',``);
                var bulklist = newbasedbulk.split('\n');
                for (var i = 0; i < bulklist.length; i++) {
                    var newbased = bulklist[i];
                    fs.appendFile('basedlist.txt', newbased + '\n', function (err) {
                        if (err) throw err;
                    });
                    message.channel.send(`${message.author.username} have added a new based statement from bulk: ` + newbased);
                }
                fs.readFile('basedlist.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }
    
                    if (data === "") {
                        message.channel.send("The basedlist is currently empty.")
                    }
    
                    else {
                        message.channel.send("The based bulk has been finished, and is composed of the following:");
                        message.channel.send("" + data);
                    }
                    
                })


                };   
                break;

        case 'removebased':
            if(!message.member.roles.cache.some(r => r.name === "Blue Jay"))  return message.channel.send('My apologies, but you do not have that level of authority to access that protocol.')
            .then(msg => msg.delete(5000));
            message.delete()

            if(message.content.startsWith(">removebased")) {
                var data = fs.readFileSync('basedlist.txt', 'utf-8');
                var ip = message.content.replace('>removebased',``);

                var newValue = data.replace(new RegExp(ip), '');
                fs.writeFileSync('basedlist.txt', newValue, 'utf-8');

                // var removebased = message.content.replace('>removebased',``);
                // var badword;
                // var badwordnum;

                // for (var i = 0; i < basedlist.length; i++) {
                //     if (removebased == (basedlist[i])) {
                //         badword = basedlist[i];
                //         badwordnum = i;
                //         break;
                //     }
                // }
                message.channel.send("You have removed a statement for being unbased: " + ip);
            };
            break;

        case 'clearbased':
            if(!message.member.roles.cache.some(r => r.name === "Blue Jay"))  return message.channel.send('My apologies, but you do not have that level of authority to access that protocol.')
            .then(msg => msg.delete(5000));
            message.delete()

            if(message.content.startsWith(">clearbased")) {
                fs.truncate('basedlist.txt', 0, function() {console.log('done')})
                message.channel.send("The basedlist has been cleared.");
            };
            break;

                 
        case 'based':
            if (message.content.startsWith(">based")) {

                fs.readFile('basedlist.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    if (data === "") {
                        message.channel.send("The basedlist is currently empty, and thus there is nothing to say.")
                    }

                    else {
                        var basedlist = data.split('\n');
                        var basednum;
                        var basedword;
                        basednum = Math.floor(Math.random() * basedlist.length);
                        basedword = basedlist[basednum];
                        message.channel.send(basedword);
                    }
                })
             
            };
            break;


        case 'checkbasedlist':
            
            if (message.content.startsWith(">checkbasedlist")) {

                message.channel.send("The basedlist consists of:");
                const rl = readline.createInterface({
                    input: fs.createReadStream('basedlist.txt'),
                    output: process.stdout,
                    terminal: false
                });
    
                rl.on('line', (line) => {
                    message.channel.send(line);
                });

            };
            break;
            

    
    }
})

client.on('message', message=>{
    
    let args = message.content.substring(CPREFIX.length).split(" ");

    switch(args[0]) {

        case 'say':
            if(message.content.startsWith("Nexus, say")) {
                message.channel.send((message.content.replace('>say',``)));
            };
            break;     
    
    }
})

client.login(token);
