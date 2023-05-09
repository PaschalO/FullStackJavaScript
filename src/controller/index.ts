import { Request, Response } from "express";
import { readdir } from "node:fs/promises";
const path = require("path");
const sharp = require("sharp");
const getFileExtension = async (filename: string): Promise<unknown> => {
	try {
		const files: string[] = await readdir(`src/images/full`);
		const supportedFormat: string[] = ["jpg", "svg"];
		for (const file of files) {
			const splitFileName: string[] = file.split(".");
			if (splitFileName[0] === filename) {
				if (supportedFormat.indexOf(splitFileName[1]) > -1)
					return splitFileName[1];
				return -1;
			}
		}
	} catch (error) {
		console.log(`printing from line 21 ${error}`);
	}
};

const resizeImage = async (req: Request, res: Response): Promise<void> => {
	const filename: string = req.query.filename as string;
	const width: number = parseInt(<string>req.query.width);
	const height: number = parseInt(<string>req.query.height);
	const parms = console.log(req);

	try {
		const fileExtension = await getFileExtension(filename);
		// check if the provided file extension is supported
		if (fileExtension === -1) {
			res.status(400).send(
				"Invalid query parameters. Provide a filename, width and height"
			);
			return;
		}

		if (Number.isNaN(width) || Number.isNaN(height)) {
			res.status(400).send(
				"Invalid image parameters. Missing width or height parameters"
			);
			return;
		}
		// cache properties
		const options: { maxAge: number; cacheControl: boolean } = {
			maxAge: 172800000,
			cacheControl: true
		};
		await sharp(`src/images/full/${filename}.${fileExtension}`)
			.resize({
				width,
				height,
				background: { r: 255, g: 255, b: 255, alpha: 0.5 }
			})
			.toFile(`src/images/thumb/${filename}_thumb.${fileExtension}`);

		res.status(200).sendFile(
			path.resolve(`src/images/thumb/${filename}_thumb.${fileExtension}`),
			options
		);
	} catch (error) {
		res.status(400).send(
			`Image file does not exist or image parameters must be greater than 0 ${error}`
		);
	}
};

module.exports = {
	resizeImage
};
