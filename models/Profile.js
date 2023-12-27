const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
	firstName: String,
	lastName: String,
	phoneNo: String,
    avartar: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
	
});

const Profile = model("Profile", profileSchema)
module.exports = Profile; 