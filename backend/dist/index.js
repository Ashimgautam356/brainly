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
const userAuth_1 = require("./middleware/userAuth");
const content_1 = require("./routes/content");
const brain_1 = require("./routes/brain");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: './.env' });
// CORS setup
// app.use(cors())
app.use((0, cors_1.default)({
    origin: ['https://brainly-nu.vercel.app/', 'http://localhost:5173'],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true
}));
app.use(express_1.default.json());
// // Handle preflight requests
// app.options('*', (req, res) => {
//     res.header("Access-Control-Allow-Origin", "https://brainly-nu.vercel.app");
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.status(204).end();
// });
app.post('/api/v1/signup', signup_1.signup);
app.post('/api/v1/signin', signin_1.signin);
app.use(userAuth_1.userAuth);
app.use('/api/v1/content', content_1.contentRouter);
app.use('/api/v1/brain', brain_1.brainRouter);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`${process.env.MONGO_URL}`)
            .then((res) => console.log("Connected to MongoDB"))
            .catch((error) => console.error("MongoDB connection error:", error));
        app.listen(3000);
    });
}
main();
