import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    accountType:String,
    terms:Boolean
})

const shelterSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    shelterName: String,
    phone: String,
    address: String
})

const UserModel = mongoose.model("users", UserSchema);
const ShelterModel = mongoose.model("shelters", shelterSchema);

export { UserModel, ShelterModel };