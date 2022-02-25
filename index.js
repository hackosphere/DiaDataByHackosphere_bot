const { Telegraf } = require("telegraf"); // import telegram module
const DIA =  require('./components/api').DIA; //import  DIA API local module
const Utils = require('./components/utils');// import some usefull functions
require("total4"); // import totaljs Libray
require('dotenv').config();// import .env file
var bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(function(context){
    //handle welcome message
    context.reply(Welcome to Hackosphere. Try /price {CoinSymbole}. We provide DaiData.);

});

bot.help(function(context){
    // handle help message
    context.reply(Type /price {CoinSymbole}  ------ Get the current price);
});
bot.on('message',function(context){
     Utils.validate(context, function(data){
                // if command is not valid quit
                if(!data.isValidCommand){
                    return;
                };

                // if no params is provided
                if(data.params.length == 0){
                    context.reply('CommandError : Parameter is missing! Try this /price btc');
                };
                switch(data.command){
                    case '/price' : 
                        var symbole = data.params[0];
                        DIA.getPrice(symbole,function(response){
                            if(response.error){
                                context.reply('This coin is not listed yet');
                                return;
                            };
                            context.reply(COIN : ${response.name}\nPRICE : ${response.price}\nDiaData by Hackosphere Bot);
                        });
                        break;
                    default :
                        context.reply('Unknown Command');
                }
     });
});
bot.launch();
