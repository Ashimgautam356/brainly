"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const signup_1 = require("./controllers/signup");
const signin_1 = require("./controllers/signin");
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/brainly');
app.post('/api/v1/signup', signup_1.signup);
app.post('/api/v1/signin', signin_1.signin);
app.get('api/v1/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.delete('api/v1/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.post('api/v1/brain/share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.get('api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.post('api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
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
