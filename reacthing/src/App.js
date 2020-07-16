/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-15 16:16:14
 * @modify date 2020-07-15 16:16:14
 * @desc [description]
 */
import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";

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
  const [id, setId] = useState();

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

  async function handleDelete(event) {
    event.preventDefault();
    const url = `http://localhost:5000/customer/delete/${id}`;

    try {
      const response = await Axios.delete(url);
      console.log(response);
      // setValue()
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("value: ", id);
  return (
    <Fragment>
      <AddCustomer addCustomer={addCustomer} />
      {value ? (
        <div>
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
                      variant="warning"
                      onClick={() => {
                        editCustomer(item);
                      }}
                    >
                      Edit
                    </Button>

                    <form onSubmit={handleDelete}>
                      <Button
                        variant="danger"
                        value={item.id}
                        onClick={(event) => setId(event.target.value)}
                        type="submit"
                      >
                        Delete
                      </Button>
                    </form>
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
    </Fragment>
  );
}

export default App;
