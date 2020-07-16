/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-14 14:27:17
 * @modify date 2020-07-14 14:27:17
 * @desc [description]
 */

const connection = require("../services/connection");
const { ResponseError, ResponseSuccess } = require("../services/responses");

const listCustomer = async function (req, res) {
  connection.query("select * from customer", function (error, results) {
    if (error) {
      ResponseError(res, {
        status: {
          code: "400",
          response: "error",
          message: error.code,
        },
      });
    } else {
      ResponseSuccess(res, {
        status: {
          code: "200",
          response: "Success",
          message: "Success Get Customer List",
        },
        results,
      });
    }
  });
};
module.exports.listCustomer = listCustomer;

const findCustomer = async function (req, res) {
  const id = req.params.id;
  connection.query("select * from customer where id = ?", [id], function (
    error,
    results
  ) {
    if (error) {
      ResponseError(res, {
        status: {
          code: "400",
          response: "error",
          message: error.code,
        },
      });
    } else {
      ResponseSuccess(res, {
        status: {
          code: "200",
          response: "Success",
          message: "Success Find Customer Data",
        },
        results,
      });
    }
  });
};
module.exports.findCustomer = findCustomer;

const addCustomer = async function (req, res) {
  const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const name = req.body.name;
  const email = req.body.email;
  const password = hash;
  const gender = req.body.gender;
  const is_married = req.body.is_married;
  const address = req.body.address;
  const created_at = new Date();
  const updated_at = new Date();

  connection.query(
    "insert into customer (name, email, password, gender, is_married, address, created_at, updated_at) values (?,?,?,?,?,?,?,?)",
    [
      name,
      email,
      password,
      gender,
      is_married,
      address,
      created_at,
      updated_at,
    ],

    function (error) {
      if (error) {
        ResponseError(res, {
          status: {
            code: "400",
            response: "error",
            message: error,
          },
        });
      } else {
        ResponseSuccess(res, {
          status: {
            code: "200",
            response: "Success",
            message: "Success Add Customer Data",
          },
          results: {
            name: name,
            email: email,
          },
        });
      }
    }
  );
};
module.exports.addCustomer = addCustomer;

const updateCustomer = async function (req, res) {
  const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = hash;
  const gender = req.body.gender;
  const is_married = req.body.is_married;
  const address = req.body.address;
  const updated_at = new Date();

  connection.query(
    "update customer set name = ?, email = ?, password = ?, gender = ?, is_married = ?, address = ?, updated_at = ? where id = ?",
    [name, email, password, gender, is_married, address, updated_at, id],
    function (error) {
      if (error) {
        ResponseError(res, {
          status: {
            code: "400",
            response: "error",
            message: error,
          },
        });
      } else {
        ResponseSuccess(res, {
          status: {
            code: "200",
            response: "Success",
            message: "Success Update Customer Data",
          },
          results: {
            name: name,
            email: email,
          },
        });
      }
    }
  );
};
module.exports.updateCustomer = updateCustomer;

const deleteCustomer = async function (req, res) {
  const id = req.params.id;
  connection.query("delete from customer where id = ?", [id], function (error) {
    if (error) {
      ResponseError(res, {
        status: {
          code: "400",
          response: "error",
          message: error.code,
        },
      });
    } else {
      ResponseSuccess(res, {
        status: {
          code: "200",
          response: "Success",
          message: "Success delete Customer Data",
        },
      });
    }
  });
};
module.exports.deleteCustomer = deleteCustomer;
