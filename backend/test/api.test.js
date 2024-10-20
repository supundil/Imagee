// test/api.test.js
import request from "supertest";
import * as chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app from "../index.js"; // Ensure this import is correct
import User from "../models/ImageeUser.js";
import Image from "../models/image.model.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("API Tests", function () {
  this.timeout(10000); // Set timeout for all tests to 10 seconds
  let token;
  let userId;
  let imageId;

  // Connect to test database once before all tests
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.TEST_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  after(async () => {
    // Clean up test data
    await User.deleteMany();
    await Image.deleteMany();
    await mongoose.connection.close();
  });

  beforeEach(async function () {
    this.timeout(10000); // Set timeout for the beforeEach hook to 10 seconds

    // Create a test user
    const userResponse = await request(app)
      .post("/api/auth/signup")
      .send({
        email: `testuser-${Date.now()}@example.com`, // Unique email for each test run
        password: "password123",
        displayName: "Test User",
      });

    // Ensure the response contains success and user properties
    expect(userResponse.status).to.equal(201);
    expect(userResponse.body.success).to.be.true;

    userId = userResponse.body.user._id;

    // Log in to get a token
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: userResponse.body.user.email,
      password: "password123",
    });

    // Ensure the login response contains a token
    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.body.token).to.exist;

    token = loginResponse.body.token;
  });

  describe("Auth Routes", () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send({
          email: `newuser-${Date.now()}@example.com`, // Unique email for each test run
          password: "password123",
          displayName: "New User",
        });

      expect(response.status).to.equal(201);
      expect(response.body.success).to.be.true;
      expect(response.body.user).to.exist; // Check if user object exists
      expect(response.body.user).to.have.property("_id"); // Check if user has an ID
    });

    it("should log in an existing user", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: userId ? `testuser-${userId}@example.com` : "", // Use the created user's email for login
          password: "password123",
        });

      expect(response.status).to.equal(200);
      expect(response.body.token).to.exist;
    });

    it("should get user profile", async () => {
      const response = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("email"); // Check if email exists
    });
  });

  describe("Image Routes", () => {
    it("should upload a new image", async () => {
      const response = await request(app)
        .post("/api/images/upload")
        .set("Authorization", `Bearer ${token}`)
        .attach("imageData", "test/test-image.jpg") // Ensure you have a test image in the test folder
        .field("title", "Test Image")
        .field("description", "This is a test image")
        .field("tags", JSON.stringify(["test", "image"]))
        .field("allowComments", true);

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Image uploaded successfully");
      imageId = response.body.image._id; // Save the image ID for further tests
    });

    it("should get all images", async () => {
      const response = await request(app).get("/api/images/");

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });

    it("should get image by ID", async () => {
      const response = await request(app).get(`/api/images/${imageId}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("title", "Test Image");
    });

    it("should delete an image", async () => {
      const response = await request(app)
        .delete(`/api/images/${imageId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Image deleted successfully");
    });
  });
});
