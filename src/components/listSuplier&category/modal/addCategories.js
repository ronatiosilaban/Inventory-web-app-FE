import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user";
import { useContext, useEffect } from "react";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../../config/api";
import Alert from "@mui/material/Alert";

export default function AddCategories({
  show,
  handleClose,
  setMessage,
  message,
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "",
  });

  const { category } = form;

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

      const response = await API.post("/addCategory", body, config);
      console.log(response.data.data);
      setForm({
        category: "",
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
        <Modal.Title>Add Categories</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Category"
              id="category"
              onChange={handleChange}
              value={category}
              name="category"
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
