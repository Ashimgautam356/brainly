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
exports.userAuth = void 0;
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = req.headers.token;
    if (!userToken) {
        res.status(404).json({
            "message": "token not foudn"
        });
        return;
    }
    const isValidToken = jsonwebtoken_1.default.verify(String(userToken), "this is secrete");
    if (!isValidToken) {
        res.status(404).json({
            "message": "invalid user"
        });
        return;
    }
    const abc = jsonwebtoken_1.default.decode(String(userToken));
    console.log(typeof (abc), abc);
    const user = yield db_1.userModel.findById({ _id: abc === null || abc === void 0 ? void 0 : abc.id });
    req.body.user = user;
    next();
});
exports.userAuth = userAuth;
