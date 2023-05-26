import { Request, Response } from "express";
import { readdir } from "node:fs/promises";
import * as path from "path";
import sharp from "sharp";
import * as fs from "fs";

const getFileExtension = async (filename: string): Promise<unknown> => {
	try {
		const inputFolderPath = `/../../images/full`;
		const supportedFormat: string[] = ["jpg", "svg"];
		const files: string[] = await readdir(
			path.join(__dirname, inputFolderPath)
		);

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

const resizeImageImageHelper = async (
	filename: string,
	width: number,
	height: number
): Promise<boolean> => {
	try {
		const fileExtension = await getFileExtension(filename);

		if (fileExtension === -1) return false;

		const outputPath = `/../../images/thumb/${filename}_thumb.${fileExtension}`;
		const inputPath = `/../../images/full/${filename}.${fileExtension}`;

		await sharp(path.join(__dirname, inputPath))
			.resize({
				width,
				height,
				background: { r: 255, g: 255, b: 255, alpha: 0.5 }
			})
			.toFile(path.join(__dirname, outputPath));

		return true;
	} catch (e) {
		return false;
	}
};

const resizeImage = async (req: Request, res: Response): Promise<void> => {
	const filename: string = req.query.filename as string;
	const width: number = parseInt(<string>req.query.width);
	const height: number = parseInt(<string>req.query.height);

	const resize = await resizeImageImageHelper(filename, width, height);

	if (!resize) {
		res.status(400).send(
			`Image file does not exist, file format not supported, or the height and width parameters are less than 0`
		);
	} else {
		const fileExtension = await getFileExtension(filename);
		const outputPath = `/../../images/thumb/${filename}_thumb.${fileExtension}`;

		const options: { maxAge: number; cacheControl: boolean } = {
			maxAge: 172800000,
			cacheControl: true
		};

		// if the generated image already exists, serve that instead
		if (fs.existsSync(path.join(__dirname, outputPath))) {
			res.status(200).sendFile(path.join(__dirname, outputPath));
		}

		// else serve a new generated image
		res.status(200).sendFile(path.join(__dirname, outputPath), options);
	}
};

module.exports = {
	resizeImageImageHelper,
	resizeImage
};
