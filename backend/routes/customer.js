/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-14 14:24:55
 * @modify date 2020-07-14 14:24:55
 * @desc [description]
 */

const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/CustomerController");

router.get("/list", CustomerController.listCustomer);
router.get("/:id", CustomerController.findCustomer);
router.post("/add", CustomerController.addCustomer);
router.put("/update/:id", CustomerController.updateCustomer);
router.delete("/delete/:id", CustomerController.deleteCustomer);
module.exports = router;
