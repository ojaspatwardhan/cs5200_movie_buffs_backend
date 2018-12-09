const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const cookingSchoolSchema = mongoose.Schema({
    name: { type:String, required: true},
    image: { type:String, required: true},
    noOfSeats: { type:Number, required: true},
    duration: { type:String, required: true},
    enrolledUser: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {collection: "cookingSchool"});

cookingSchoolSchema.plugin(uniqueValidator);

module.exports = cookingSchoolSchema;
