import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { io } from "socket.io-client";
import { UserContext } from "../context/user";
import React, { useEffect, useState, useContext } from "react";
import Contact from "../components/contact";
import Chat from "../components/text";

let socket;

function ComponentComplain() {
  const title = "Complain";
  document.title = "Inventory | " + title;
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  const [state] = useContext(UserContext);
  console.log(messages, "user");
  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: state.user.id,
      },
    });

    socket.on("new message", () => {
      console.log("contact : ", contact);
      socket.emit("load messages", contact?.id);
    });

    socket.on("connect_error", (err) => {
      console.error(err.massage);
    });
    loadContact();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const loadContact = () => {
    socket.emit("load admin contact");
    socket.on("admin contact", (data) => {
      const dataContact = {
        ...data,
        message:
          messages.length > 0
            ? messages[messages.length - 1].message
            : "Click here to start message",
      };
      setContacts([dataContact]);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
    socket.emit("load messages", data.id);
  };

  const loadMessages = () => {
    socket.on("messages", (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      }
      console.log(data, "dataMessages");
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      socket.emit("send message", data);
      e.target.value = "";
    }
  };

  return (
    <div style={{ marginTop: "50px", height: "90vh", width: "80vw" }}>
      <Container>
        <Row style={{ marginLeft: 30, marginRight: 30 }}>
          <Col sm={4}>
            <Contact
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
          <Col
            md={8}
            style={{
              height: "78vh",
              backgroundColor: "#DFDFDF",
              width: "60%",
            }}
            className="px-0"
          >
            <Chat
              contact={contact}
              messages={messages}
              user={state.user}
              sendMessage={onSendMessage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default ComponentComplain;
