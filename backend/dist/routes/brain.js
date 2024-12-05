"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brainRouter = void 0;
const express_1 = require("express");
const brain_1 = require("../controllers/brain");
exports.brainRouter = (0, express_1.Router)();
exports.brainRouter.post('/share', brain_1.postBrain);
exports.brainRouter.get('/:shareLink', brain_1.getBrain);
