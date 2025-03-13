"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubsquidClient = void 0;
// @ts-ignore
var graffle_1 = require("graffle");
var networks_js_1 = require("./networks.js");
var document = (0, graffle_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n {\n  shieldCommitments(limit: 10) {\n    blockNumber\n  }\n}\n"], ["\n {\n  shieldCommitments(limit: 10) {\n    blockNumber\n  }\n}\n"])));
var client = new graffle_1.GraphQLClient(networks_js_1.ETHEREUM_URL);
// export const result = await client.request(document);
var SubsquidClient = /** @class */ (function () {
    function SubsquidClient() {
        var _this = this;
        this.request = function (document) {
            return _this.client.request(document);
        };
        this.client = new graffle_1.GraphQLClient(networks_js_1.ETHEREUM_URL);
    }
    return SubsquidClient;
}());
exports.SubsquidClient = SubsquidClient;
var templateObject_1;
