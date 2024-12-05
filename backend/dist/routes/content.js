"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = require("express");
const content_1 = require("../controllers/content");
exports.contentRouter = (0, express_1.Router)();
// fetching all the content
exports.contentRouter.get('/allContent', content_1.getContent);
// adding 
exports.contentRouter.post('/postContent', content_1.postContent);
// deleting
exports.contentRouter.delete('/delete', content_1.deleteContent);
