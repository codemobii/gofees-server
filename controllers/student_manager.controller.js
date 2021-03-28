// Import modules

import feeModel from "../models/fee.model";
import invoiceModel from "../models/invoice.model";
import paymentModel from "../models/payment.model";
import studentModel from "../models/student.model";

// Get student's initiated payments

export function getPayments(req, res) {
  paymentModel
    .find({ student: req.query.student })
    .populate("Fee")
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

// Get student's fees

export function getFees(req, res) {
  studentModel
    .findById(req.query.student)
    .then((school) => {
      feeModel
        .find({ school: school._id, class: req.query.class })
        .then((data) => {
          res.status(200).send({
            message: "Successfully",
            data,
            error: false,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: "Error retrieving fees",
            error: true,
            err,
          });
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "School not found",
          err,
          error: true,
        });
      }
      return res.status(500).send({
        message: "Error retrieving school",
        error: true,
        err,
      });
    });
}

// Get student's invoices

export function getInvoices(req, res) {
  invoiceModel
    .find({ student: req.query.student })
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

// Get single invoice

export function getSingleInvoice(req, res) {
  invoiceModel
    .findById(req.params.id)
    .populate("Payment")
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

// Get payment

// Verfy payment

// Update student's profile
