exports.validate = function(context, callback){
    
    // validate message event
    var payload = { isValidCommand : true,command : '', params : [],isPrivateChat : false,missingParameter : false}
    var message =  context.update.message;
    var tab = message.text.split(' ');// plit the message based on space(' ')
    payload.command = tab[0];
    var root = tab[0].split('');
    if(root[0] !=  '/'){
        // check if command isvalid if '/' is existing
        payload.isValidCommand = false;
    };

    if(message.chat.type == 'private'){
        // check whether message comes from private or public chat
        payload.isPrivateChat = true;
    };

    //push the parameters into payload.params
    for( var i = 0, length = tab.length; i < length; i++){
        if(i > 0){

            payload.params.push(tab[i]);
        }
    };
    
    if(tab.length == 0){
        // set missingParameter to true if no additional params are provided
        payload.missingParameter = true;
    };
    // console.log(payload);
    callback(payload);
}