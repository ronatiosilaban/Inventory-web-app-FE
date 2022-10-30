//import module start
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user";
import { useContext, useEffect } from "react";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../../config/api";
import Alert from "@mui/material/Alert";
//import module end

export default function EditSuplier({
  show,
  handleClose,
  setMessage,
  message,
  id,
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  //router get data & set data to state

  const getSupplierId = async () => {
    try {
      const response = await API.get(`/getSuplier/` + id);
      setForm({
        name: response.data.data.user[0]?.name,
        phone: response.data.data.user[0]?.phone,
        address: response.data.data.user[0]?.address,
      });
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getSupplierId();
  }, [show]);

  const { name, phone, address } = form;

  //handle changes values

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //handle submit action
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      const response = await API.patch(`/updateSuplier/` + id, body, config);
      console.log(response.data.data);
      setForm({
        name: "",
        address: "",
        phone: "",
      });
      handleClose();
      setMessage();
      navigate("/sidebar/list");
    } catch (error) {
      const alert = (
        <Alert severity="error" className="py-1">
          {error.response.data.message}
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
        <Modal.Title>Edit Suplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Name"
              id="name"
              onChange={handleChange}
              value={name}
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Phone"
              id="phone"
              onChange={handleChange}
              value={phone}
              name="phone"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Address"
              id="address"
              onChange={handleChange}
              value={address}
              name="address"
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Edit Data
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
