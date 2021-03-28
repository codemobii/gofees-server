// Import modules

import { default as schoolModel } from "../models/school.model";
import { default as walletModel } from "../models/wallet.model";
import { default as studentModel } from "../models/student.model";
import { default as classModel } from "../models/class.model";
import { default as feeModel } from "../models/fee.model";
import { default as paymentModel } from "../models/payment.model";

// Update school profile

export function updateSchool(request, response) {
  // Find Course and update it with the request body
  schoolModel
    .findById(request.params.id)
    .then((data) => {
      schoolModel
        .findByIdAndUpdate(
          request.params.id,
          {
            phone: request.body.phone || data.phone,
            name: request.body.name || data.name,
          },
          { new: true }
        )
        .then((school) => {
          //   return success response
          response.status(200).send({
            message: "Profile updated successfully",
            school,
            error: false,
          });
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return response.status(404).send({
              message: "Profile not found with id",
              err,
              error: true,
            });
          }
          return response.status(500).send({
            message: "Error updating profile with id",
            err,
            error: true,
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving profile data.",
        err,
        error: true,
      });
    });
}

// Update school wallet api

export function updateWallet(request, response) {
  // Find Course and update it with the request body
  walletModel
    .findOne({ school: request.params.id })
    .then((data) => {
      walletModel
        .findByIdAndUpdate(
          data.id,
          {
            public_key: request.body.public_key || data.public_key,
            _token: request.body._token || data._token,
          },
          { new: true }
        )
        .then((school) => {
          //   return success response
          response.status(200).send({
            message: "Wallet updated successfully",
            school,
            error: false,
          });
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return response.status(404).send({
              message: "Wallet not found",
              err,
              error: true,
            });
          }
          return response.status(500).send({
            message: "Error updating wallet",
            err,
            error: true,
          });
        });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while retrieving wallet data.",
        err,
        error: true,
      });
    });
}

// Add a new student

export function addStudent(request, response) {
  const student = new studentModel({
    email: request.body.email || "",
    phone: request.body.phone || "",
    studentId: request.body.studentId,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    school: request.body.school,
    class: request.body.class,
    passport: request.body.passport || null,
  });

  student
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Student profile created successfully",
        data,
        error: false,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while creating the student profile.",
        err,
        error: true,
      });
    });
}

// Get students (Filtered)

export function getStudents(request, response) {
  if (request.request.class) {
    studentModel
      .find({ school: request.query.school, class: request.query.class })
      .populate("class")
      .then((data) => {
        //   return success response
        response.status(200).send({
          message: "Successfully",
          data,
          error: false,
        });
      })
      .catch((err) => {
        response.status(500).send({
          message: "Some error occurred while retrieving students.",
          err,
          error: true,
        });
      });
  } else {
    studentModel
      .find({ school: request.params.school })
      .populate("class")
      .then((data) => {
        //   return success response
        response.status(200).send({
          message: "Successfully",
          data,
          error: false,
        });
      })
      .catch((err) => {
        response.status(500).send({
          message: "Some error occurred while retrieving students.",
          err,
          error: true,
        });
      });
  }
}

// Get a student

export function getSingleStudent(req, res) {
  studentModel
    .findById(req.params.id)
    .then((data) => {
      res.status(200).send({
        message: "Successfully",
        data,
        error: false,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Student not found",
          err,
          error: true,
        });
      }
      return res.status(500).send({
        message: "Error retrieving student",
        error: true,
        err,
      });
    });
}

// Add a class

export function addClass(request, response) {
  const classData = new classModel({
    school: request.body.school,
    name: request.body.name,
  });
  classData
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Class created successfully",
        data,
        error: false,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while creating the class.",
        err,
        error: true,
      });
    });
}

// Add a new fees

export function addFees(request, response) {
  const fee = new feeModel({
    school: request.body.school,
    class: request.body.class,
    amount: request.body.amount,
    chunks: request.body.chunks,
  });
  fee
    .save()
    .then((data) => {
      //   return success response
      response.status(200).send({
        message: "Fee created successfully",
        data,
        error: false,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message: "Some error occurred while creating the fee.",
        err,
        error: true,
      });
    });
}

// Get all fees

export function getFees(request, response) {
  if (request.request.class) {
    feeModel
      .find({ school: request.query.school, class: request.query.class })
      .populate("class")
      .then((data) => {
        //   return success response
        response.status(200).send({
          message: "Successfully",
          data,
          error: false,
        });
      })
      .catch((err) => {
        response.status(500).send({
          message: "Some error occurred while retrieving fees.",
          err,
          error: true,
        });
      });
  } else {
    feeModel
      .find({ school: request.params.school })
      .populate("class")
      .then((data) => {
        //   return success response
        response.status(200).send({
          message: "Successfully",
          data,
          error: false,
        });
      })
      .catch((err) => {
        response.status(500).send({
          message: "Some error occurred while retrieving fees.",
          err,
          error: true,
        });
      });
  }
}

// Get a fee

export function getSingleFee(req, res) {
  feeModel
    .findById(req.params.id)
    .then((data) => {
      res.status(200).send({
        message: "Successfully",
        data,
        error: false,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Fee not found",
          err,
          error: true,
        });
      }
      return res.status(500).send({
        message: "Error retrieving fee",
        error: true,
        err,
      });
    });
}

// Get payments

export function getPayments(req, res) {
  paymentModel
    .find({ fee: req.query.fee })
    .then((data) => {
      res.status(200).send({
        message: "Successfully",
        data,
        error: false,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving payments",
        error: true,
        err,
      });
    });
}
