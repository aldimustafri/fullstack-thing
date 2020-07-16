/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-15 16:16:14
 * @modify date 2020-07-15 16:16:14
 * @desc [description]
 */
import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { Table, Button, Modal, Container, Row } from "react-bootstrap";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const url = "http://localhost:5000/customer/list";

  const initialX = {
    id: null,
    name: "",
    email: "",
    password: "",
    gender: "",
    is_married: "",
    address: "",
  };
  const [data, setData] = useState(initialX);

  const [value, setValue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios.get(url);
        setValue(result.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addCustomer = (stateX) => {
    stateX.id = value.length + 1;
    setValue([...value, stateX]);
  };

  const editCustomer = (item) => {
    setShow(true);
    setData({
      id: item.id,
      name: item.name,
      email: item.email,
      password: item.password,
      gender: item.gender,
      is_married: item.is_married,
      address: item.address,
    });
  };

  const updateCustomer = (id, updatedCustomer) => {
    setShow(false);
    setValue(value.map((item) => (item.id === id ? updatedCustomer : item)));
  };

  async function deleteCustomer(id) {
    const url = `http://localhost:5000/customer/delete/${id}`;

    try {
      const response = await Axios.delete(url);
      console.log(response);
      setValue(value.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="col-md-12">
        <AddCustomer addCustomer={addCustomer} />
        {value ? (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Gender</th>
                  <th>Marital Status</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {value.map((item) => (
                  <tr key={item.id}>
                    <td>1</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.gender}</td>
                    <td>{item.is_married == 0 ? "Single" : "Married"}</td>
                    <td>{item.address}</td>
                    <td>
                      <Button
                        style={{ margin: "2px" }}
                        variant="warning"
                        onClick={() => {
                          editCustomer(item);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        style={{ margin: "2px" }}
                        variant="danger"
                        value={item.id}
                        onClick={() => deleteCustomer(item.id)}
                        type="submit"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div></div>
        )}

        <Modal show={show} onHide={handleClose}>
          <EditCustomer
            onHide={handleClose}
            data={data}
            updateCustomer={updateCustomer}
          />
        </Modal>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
