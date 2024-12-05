"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
// Hash function generator for the link
const random = (n) => {
    const options = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let randomString = "";
    for (let i = 0; i < n; i++) {
        randomString += options[Math.floor(Math.random() * options.length)];
    }
    return randomString;
};
exports.random = random;
