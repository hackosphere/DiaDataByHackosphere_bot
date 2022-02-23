// DIA api
//require('total4');
exports.DIA =  {
    getPrice : function(symbole,callback){
            if(typeof symbole == 'undefined'){
                return;
            };
            // Parse message
            var api_link = 'http://api.diadata.org/v1/quotation/';
            // Make DIA api call
            var opt = {};
            opt.url = api_link + symbole.toUpperCase();
            opt.callback = function(err,res){
            var jsonBody = res.body.parseJSON(true);// convert response to json

            var response = { name : jsonBody.Name, price : jsonBody.Price,error: false};
            if(res.status != 200){
                response.error = true;
            }

            callback(response);
            }
            
            REQUEST(opt);

    }
}