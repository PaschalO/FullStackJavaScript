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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const node_test_1 = require("node:test");
const fs = require("fs");
const resizeImage = require("../controller/index");
//const path = require('path');
const request = (0, supertest_1.default)(index_1.default);
//const PORT = 3000;
(0, node_test_1.describe)("Test endpoint response", () => {
    it("gets the valid api endpoint response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=300&height=300');
        expect(response.status).toEqual(200);
    }));
    it("gets the invalid api endpoint response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images/hello');
        expect(response.status).toBe(404);
    }));
});
(0, node_test_1.describe)("Test Image processing", () => {
    const filename = "fjord";
    const fileExtension = ".jpg";
    const width = '300';
    const height = '300';
    //const inputPath: string = `src/images/full/${filename}.${fileExtension}`;
    const outputPath = `src/images/thumb/${filename}_thumb.${fileExtension}`;
    const api = `/images?filename=${filename}&width=${width}&height=${height}`;
    it("should return an error if no query parameters are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/images`);
        expect(response.text).toBe("Invalid image parameters. Missing width or height parameters");
    }));
    it("should return an error if it is missing image width or height", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=300&height=300');
        console.log(response);
        expect(response.text).toBe('"Invalid image parameters. Missing width or height parameters"');
    }));
    it("should return an error if the file does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(api);
        expect(response.text).toBe("Image file does not exist or image parameters must be greater than 0");
    }));
    it("should return true if the resized image is in the thumb folder", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?filename=fjord&width=300&height=300');
        expect(fs.existsSync(outputPath)).toBeTrue();
    }));
});
