//module import start
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { useContext, useEffect } from "react";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
//module import end

export default function EditAdmin({
  show,
  handleClose,
  setMessage,
  message,
  id,
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    status: "",
  });
  console.log("id", id);
  const [statusUser, setStatusUser] = useState({
    status: "",
  });

  const getAdmin = async () => {
    try {
      const response = await API.get(`/getUser/` + id);
      setForm({
        username: response.data.data?.username,
        password: response.data.data?.password,
        status: response.data.data?.status,
      });
      console.log(response);
    } catch (error) {
      return console.log(error);
    }
  };
  console.log("form", form);
  useEffect(() => {
    getAdmin();
  }, [show]);

  const { username, password, status } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuperAdmin = () => {
    setStatusUser({
      status: "superAdmin",
    });
  };

  console.log(form, "babbb");
  const handAdmin = () => {
    setStatusUser({
      status: "admin",
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      const response = await API.patch("/update/" + id, body, config);
      console.log(response.data.data);
      setForm({
        username: "",
        password: "",
        status: "",
      });
      handleClose();
      setMessage();
      navigate("/sidebar/admin");
    } catch (error) {
      const alert = (
        <Alert severity="error" className="py-1">
          {error.response.data.message}||{error.response.data.error.message}
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <Modal show={show} onHide={handleClose}>
      {message && message}
      <Modal.Header closeButton>
        <Modal.Title>Edit Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Name"
              id="username"
              onChange={handleChange}
              value={username}
              name="username"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="password"
              id="password"
              onChange={handleChange}
              value={password}
              name="password"
            />
          </Form.Group>
          <Select
            displayEmpty
            value={status}
            style={{ width: "100%", marginBottom: "2vh" }}
            name="status"
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="" name="">
              <em>Placeholder</em>
            </MenuItem>
            <MenuItem value="superAdmin" onClick={handleSuperAdmin}>
              SuperAdmin
            </MenuItem>
            <MenuItem value="admin" onClick={handAdmin}>
              Admin
            </MenuItem>
          </Select>
          <Button variant="danger" type="submit">
            Add Data
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
