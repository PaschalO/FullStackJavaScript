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
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const path = require("path");
const sharp = require("sharp");
const getFileExtension = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield (0, promises_1.readdir)(`src/images/full`);
        const supportedFormat = ["jpg", "svg"];
        for (const file of files) {
            const splitFileName = file.split(".");
            if (splitFileName[0] === filename) {
                if (supportedFormat.indexOf(splitFileName[1]) > -1)
                    return splitFileName[1];
                return -1;
            }
        }
    }
    catch (error) {
        console.log(`printing from line 21 ${error}`);
    }
});
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    try {
        const fileExtension = yield getFileExtension(filename);
        // check if the provided file extension is supported
        if (fileExtension === -1) {
            res.status(400).send("Invalid query parameters. Provide a filename, width and height");
            return;
        }
        if (Number.isNaN(width) || Number.isNaN(height)) {
            res.status(400).send("Invalid image parameters. Missing width or height parameters");
            return;
        }
        // cache properties
        const options = {
            maxAge: 172800000,
            cacheControl: true
        };
        yield sharp(`src/images/full/${filename}.${fileExtension}`)
            .resize({
            width,
            height,
            background: { r: 255, g: 255, b: 255, alpha: 0.5 }
        })
            .toFile(`src/images/thumb/${filename}_thumb.${fileExtension}`);
        res.status(200).sendFile(path.resolve(`src/images/thumb/${filename}_thumb.${fileExtension}`), options);
    }
    catch (error) {
        res.status(400).send(`Image file does not exist or image parameters must be greater than 0 ${error}`);
    }
});
module.exports = {
    resizeImage
};
