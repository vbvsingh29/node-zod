import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "New",
  description:
    "sadContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of s",
  price: 10,
  image: "asdsa imaage url",
};

export const userPayload = {
  _id: userId,
  email: "testing@gmail.com",
  name: "Testing Tests",
};

export const expectedPayload = {
  __v: 0,
  _id: expect.any(String),
  createdAt: expect.any(String),
  description:
    "sadContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of s",
  image: "asdsa imaage url",
  price: 10,
  productId: expect.any(String),
  title: "New",
  updatedAt: expect.any(String),
  user: expect.any(String),
};

export const userInput = {
  email: "Testing@gmail.com",
  name: "Testing Tests",
  password: "Admin@123",
  passwordConfirmation: "Admin@123",
};
