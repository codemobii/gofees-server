// Import external modules

import { sign } from "jsonwebtoken";
import { useEmail } from "../helpers/email.helper";
import schoolModel, { findOne, updateOne } from "../models/school.model";

// Initiate email helper

const { sendEmail } = useEmail();

// Code generator

function makeRef(length) {
  var result = "";
  var characters = "123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// ************* MAIN CONTENTS ******************* //

// Register a new user

export function register(request, response) {
  const school = new schoolModel({
    email: request.body.email,
    phone: request.body.phone,
    name: request.body.name,
  });
  school
    .save()
    .then(() => {
      response.status(200).send({
        message: "Account Created Successfully",
        error: false,
      });
      sendEmail(
        request.body.email,
        "Verify Your Account",
        `Hello ${request.body.name}. 
        <br />
        Thank you for registering at SchoolFees, Your account is awaiting verification`
      );
    })
    .catch((er) => {
      response.status(500).send({
        message: "Error creating user",
        error: true,
        er,
      });
    });
}

// Verify code

export function verifyCode(request, response) {
  findOne({ email: request.body.email })
    .then((user) => {
      // return success response
      response.status(200).send({
        message: "School verified successfully",
        user,
        error: false,
      });
      sendEmail(
        request.body.email,
        "Welcome to SchoolFee",
        "Thank you for joining TeamUp. We wish to satisfy you financial management needs."
      );
    })
    .catch((e) => {
      response.status(404).send({
        message: "Invalid reset code supplied.",
        e,
        error: true,
      });
    });
}

// Login user here

export function login(request, response) {
  findOne({ email: request.body.email })
    .then((user) => {
      if (request.body.password !== user.password) {
        response.status(400).send({
          message: "Passwords does not match",
          status: false,
        });
      } else {
        //   create JWT token
        const token = sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        updateOne(
          { email: request.body.email },
          {
            token: token,
          },
          { new: true }
        )
          .then(() => {
            //   return success response
            response.status(200).send({
              message: "Login Successful",
              token,
              user,
              error: false,
            });
          })
          .catch(() => {
            response.status(404).send({
              message: "No account associated with this email",
              error: true,
              err,
            });
          });
      }
    })
    .catch((err) => {
      response.status(404).send({
        message: "No account associated with this email",
        error: true,
        err,
      });
    });
}

// Logout bro

export function logout(request, response) {
  updateOne(
    { token: request.body.token },
    {
      token: null,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: "No account associated with this token",
          error: true,
        });
      } else {
        response.status(200).send({
          message: "Successfully logged out",
          error: false,
        });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return response.status(404).send({
          message: "No account associated with this email",
          err,
          error: true,
        });
      }

      return response.status(500).send({
        message: "Error sending reset code",
        err,
        error: true,
      });
    });
}
