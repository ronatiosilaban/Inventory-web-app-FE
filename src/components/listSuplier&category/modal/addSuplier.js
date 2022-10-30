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

export default function AddSuplier({ show, handleClose, setMessage, message }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const { name, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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

      const response = await API.post("/addSuplier", body, config);
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
        <Modal.Title>Add Suplier</Modal.Title>
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
            Add Data
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
