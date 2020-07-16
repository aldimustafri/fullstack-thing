/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-16 14:51:06
 * @modify date 2020-07-16 14:51:06
 * @desc [description]
 */

import React, { useState, Fragment, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Axios from "axios";

function EditCustomer({ onHide, data, updateCustomer }) {
  const [item, setItem] = useState(data);

  useEffect(() => {
    setItem(data);
  }, [data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setItem({ ...item, [name]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const id = item.id;
    const url = `http://localhost:5000/customer/update/${id}`;

    try {
      const response = await Axios.put(url, {
        name: item.name,
        email: item.email,
        password: item.password,
        gender: item.gender,
        is_married: item.is_married,
        address: item.address,
      });
      console.log(response);
      updateCustomer(item.id, item);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              value={item.name}
              // onChange={(event) => setName(event.target.value)}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={item.email}
              //   onChange={(event) => setEmail(event.target.value)}
              onChange={handleInputChange}
              name="email"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={item.password}
              //   onChange={(event) => setPassword(event.target.value)}
              onChange={handleInputChange}
              name="password"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={item.gender}
              //   onChange={(event) => setGender(event.target.value)}
              onChange={handleInputChange}
              name="gender"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Marital Status</Form.Label>
            <Form.Control
              as="select"
              value={item.is_married}
              //   onChange={(event) => setMarried(event.target.value)}
              onChange={handleInputChange}
              name="is_married"
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
              value={item.address}
              //   onChange={(event) => setAddress(event.target.value)}
              onChange={handleInputChange}
              name="address"
            />
          </Form.Group>

          <Button variant="primary" onClick={onHide} type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Fragment>
  );
}

export default EditCustomer;
