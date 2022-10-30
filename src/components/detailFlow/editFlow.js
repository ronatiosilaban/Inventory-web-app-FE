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
import { useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
//module import end

export default function EditFlow({
  show,
  handleClose,
  setMessage,
  message,
  idShow,
}) {
  const [amounts, setAmounts] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nameRecipients: "",
    status: "",
    date: "",
    amount: "",
    idList: id,
  });

  const [statusUser, setStatusUser] = useState({
    status: "",
  });

  const { nameRecipients, status, date, amount } = form;
  //get data & set data to state
  const getFlow = async () => {
    try {
      const response = await API.get(`/getFlows/` + idShow);
      setForm({
        nameRecipients: response.data.data?.user?.nameRecipients,
        status: response.data.data?.user?.status,
        date: response.data.data?.user?.date,
        amount: response.data.data?.user?.amount,
      });
      console.log("res", response);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getFlow();
  }, [show]);

  //handle status data
  const handleIN = () => {
    setStatusUser({
      status: "IN",
    });
  };

  const handleOUT = () => {
    setStatusUser({
      status: "OUT",
    });
  };

  //handle changes values
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setAmounts(form.amount);
  }, [form]);

  //handle submit action
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // const body = JSON.stringify(form);

      const Data = {
        nameRecipients: form.nameRecipients,
        status: form.status,
        date: form.date,
        amount: amounts,
        idList: id,
      };
      console.log(Data);

      const response = await API.patch("/updateFlow/" + idShow, Data, config);
      console.log(response.data.data);
      setForm({
        nameRecipients: "",
        status: "",
        date: "",
        amount: "",
        idList: "",
      });
      handleClose();
      setMessage();
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
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Name"
              id="nameRecipients"
              onChange={handleChange}
              value={nameRecipients}
              name="nameRecipients"
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
            <MenuItem value="IN" onClick={handleIN}>
              IN
            </MenuItem>
            <MenuItem value="OUT" onClick={handleOUT}>
              OUT
            </MenuItem>
          </Select>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="date"
              placeholder="date"
              id="date"
              onChange={handleChange}
              value={date}
              name="date"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              required
              type="number"
              placeholder="qty"
              id="amount"
              onChange={handleChange}
              value={amount}
              name="amount"
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
