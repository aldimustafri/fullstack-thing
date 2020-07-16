/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-15 17:00:19
 * @modify date 2020-07-15 17:00:19
 * @desc [description]
 */

import React, { useState, Fragment } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Axios from "axios";

function AddCustomer({ addCustomer }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState("Men");
  const [is_married, setMarried] = useState("0");
  const [address, setAddress] = useState();

  const stateX = {
    id: null,
    name: name,
    email: email,
    password: password,
    gender: gender,
    is_married: is_married,
    address: address,
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:5000/customer/add";

    try {
      const response = await Axios.post(url, {
        name: name,
        email: email,
        password: password,
        gender: gender,
        is_married: is_married,
        address: address,
      });
      console.log(response);
      addCustomer(stateX);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginBottom: "10px" }}
      >
        Add Customer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Your name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setGender(event.target.value)}
                value={gender}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setMarried(event.target.value)}
                value={is_married}
              >
                <option value="0">Single</option>
                <option value="1">Married</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={handleClose} type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default AddCustomer;
