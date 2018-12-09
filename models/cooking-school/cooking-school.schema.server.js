const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const cookingSchoolSchema = mongoose.Schema({
    noOfSeats: { type:Number, required: true},
    duration: { type:String, required: true},
    enrolledUser: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {collection: "cooking-school"});

cookingSchoolSchema.plugin(uniqueValidator);

module.exports = cookingSchoolSchema;
