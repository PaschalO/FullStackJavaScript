import app from "../index";
import supertest from "supertest";
import { describe } from "node:test";
const fs = require("fs");
//const path = require('path');

const request = supertest(app);
//const PORT = 3000;

describe("Test endpoint response", () => {
	it("gets the valid api endpoint response", async (done) => {
		const response = await request.get('/api/images?filename=fjord&width=300&height=300');
		expect(response.status).toEqual(200);
		done();
	});

	it("gets the invalid api endpoint response", async (done) => {
		//const NotFound = `http://localhost:3000/api/images/hello`;
		const response = await request.get('/api/images/hello');
		expect(response.status).toBe(404);
		done();
	});
});

describe("Test Image processing", () => {
	const filename: string = "fjord";
	const fileExtension = ".jpg";
	const width: number = 300;
	const height: number = 300;
	//const inputPath: string = `src/images/full/${filename}.${fileExtension}`;
	const outputPath = `src/images/thumb/${filename}_thumb.${fileExtension}`;
	const api: string = `/api/images?filename=${filename}&width=${width}&height=${height}`;

	it("should return an error if the extension is not supported", async () => {
		const response = await request.get(api);
		expect(response.text).toBe(
			"Invalid query parameters. Provide a filename, width and height"
		);
	});

	it("should return an error if it is missing image width or height", async () => {
		const response = await request.get(api);
		expect(response.text).toBe(
			'"Invalid image parameters. Missing width or height parameters"'
		);
	});

	it("should return an error if the file does not exist", async () => {
		const response = await request.get(api);
		expect(response.text).toBe(
			"Image file does not exist or image parameters must be greater than 0"
		);
	});

	it("should return true if the resized image is in the thumb folder", async () => {
		await request.get(api);
		expect(fs.existsSync(outputPath)).toBeTrue();
	});
});
