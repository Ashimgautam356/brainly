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
exports.signin = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLoginSchema = zod_1.z.object({
        userName: zod_1.z.string().email(),
        password: zod_1.z.string()
    });
    // type userType = z.infer<typeof userLoginSchema>
    const isSchemaValid = userLoginSchema.safeParse(req.body);
    if (!isSchemaValid.success) {
        const validationError = isSchemaValid.error.formErrors;
        res.status(411).json({
            "userName": validationError.fieldErrors.userName,
            "passwrod": validationError.fieldErrors.password
        });
        return;
    }
    const { userName, password } = req.body;
    const user = yield db_1.userModel.findOne({ userName: userName });
    if (!user) {
        res.status(404).json({
            "message": "user not found with that userName"
        });
        return;
    }
    const verifyPassword = yield bcrypt_1.default.compare(password, String(user === null || user === void 0 ? void 0 : user.password));
    if (!verifyPassword) {
        res.status(403).json({
            "message": "wrong password"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        id: String(user._id)
    }, "this is secrete");
    res.status(200).json({
        "token": token
    });
});
exports.signin = signin;
