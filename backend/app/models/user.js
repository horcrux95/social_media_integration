// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

        email        : String,
        password     : String,
    facebook         : {
        id           : { type : String , default : 0},
        token        : { type : String , default : 0},
        email        : { type : String , default : ''},
        name         : { type : String , default : 'No NAME'}
    },
    google           : {
        id           : { type : String , default : 0},
        token        : { type : String , default : 0},
        email        : { type : String , default : ''},
        img         : { type : String , default : 'No img'}
    },
    linkedIn           : {
        id           : { type : String , default : 0},
        token        : { type : String , default : 0},
        email        : { type : String , default : ''},
        name         : { type : String , default : 'No NAME'}
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
