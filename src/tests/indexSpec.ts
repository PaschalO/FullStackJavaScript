import app from "../index";
import supertest from "supertest";
import { describe } from "node:test";
const resizeImageImageHelper = require("../controller/index");

const request = supertest(app);
describe("Test endpoint response", () => {
	it("gets the valid api endpoint response", async () => {
		const response = await request.get(
			"/api/images?filename=fjord&width=300&height=300"
		);
		console.log(response);
		expect(response.status).toEqual(200);
	});

	it("gets the invalid api endpoint response", async () => {
		const response = await request.get("/api/images/hello");
		expect(response.status).toBe(404);
	});
});

describe("Test Image processing", () => {
	it("should return false if the height parameter is less than 1", async () => {
		const filename = "fjord";
		const width = 300;
		const height = 0;
		expect(
			await resizeImageImageHelper.resizeImageImageHelper(
				filename,
				width,
				height
			)
		).toEqual(false);
	});

	it("should return false if the width parameter is less than 1", async () => {
		const filename = "fjord";
		const width = 0;
		const height = 300;
		expect(
			await resizeImageImageHelper.resizeImageImageHelper(
				filename,
				width,
				height
			)
		).toBe(false);
	});

	it("should return false if the image file does not exist", async () => {
		const filename = "less";
		const width = 300;
		const height = 300;
		expect(
			await resizeImageImageHelper.resizeImageImageHelper(
				filename,
				width,
				height
			)
		).toBe(false);
	});

	it("should return true if the resized image is in the thumb folder", async () => {
		const filename = "fjord";
		const width = 300;
		const height = 300;
		expect(
			await resizeImageImageHelper.resizeImageImageHelper(
				filename,
				width,
				height
			)
		).toBe(true);
	});
});
