"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const signup_1 = require("./controllers/signup");
const signin_1 = require("./controllers/signin");
const userAuth_1 = require("./middleware/userAuth");
const content_1 = require("./routes/content");
const brain_1 = require("./routes/brain");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly');
app.post('/api/v1/signup', signup_1.signup);
app.post('/api/v1/signin', signin_1.signin);
app.use(userAuth_1.userAuth);
app.use('/api/v1/content', content_1.contentRouter);
app.use('/api/v1/brain', brain_1.brainRouter);
app.listen(3001, () => {
    console.log("server is up!!!!!");
});
// async function main(){
//     await mongoose.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly')
//     app.listen(3001,()=>{
//         console.log("server is up!!!!!")
//     })
// }
// main()
