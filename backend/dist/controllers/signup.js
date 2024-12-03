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
exports.signup = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserSchema = zod_1.z.object({
        userName: zod_1.z.string().email({ message: "should be in a email format" }),
        password: zod_1.z.string().min(8, { message: "minimum length should be 8" }).max(20).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
            message: 'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
        })
    });
    const isValidInput = UserSchema.safeParse(req.body);
    if (!isValidInput.success) {
        const validationError = isValidInput.error.formErrors;
        res.status(411).json({
            "userName": validationError.fieldErrors.userName,
            "passwrod": validationError.fieldErrors.password
        });
        return;
    }
    const { userName, password } = req.body;
    const isUserAlreadyExists = yield db_1.userModel.findOne({ userName: userName });
    if (!isUserAlreadyExists) {
        const hashedPassword = String(yield bcrypt_1.default.hash(password, 5));
        try {
            yield db_1.userModel.create({
                userName: userName,
                password: hashedPassword
            });
            res.status(200).json({
                "message": "signed up sucessfully"
            });
        }
        catch (e) {
            res.status(500).json({
                "message": "server error",
                "error": e
            });
        }
    }
    else {
        res.status(403).json({
            "message": "user already exists with the userName"
        });
    }
});
exports.signup = signup;
