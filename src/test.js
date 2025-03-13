"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {SubsquidClient} from "./client.js"
// @ts-ignore
var client_js_1 = require("./client.js");
var document = (0, client_js_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n {\n  shieldCommitments(limit: 10) {\n    blockNumber\n  }\n}\n"], ["\n {\n  shieldCommitments(limit: 10) {\n    blockNumber\n  }\n}\n"])));
var client = new client_js_1.SubsquidClient();
var data = client.request(document);
console.log(data);
var templateObject_1;
