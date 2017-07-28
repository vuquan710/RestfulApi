var admin = require('../models/admin')

module.exports = {
    index : function (req, res) {
        admin.find()
        .exec(function(err, data){
            if(err) res.json({status : false , message : err});
            res.send(data);
          });
    }
}

