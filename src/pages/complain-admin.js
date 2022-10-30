//module import start
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { io } from "socket.io-client";
import { UserContext } from "../context/user";
import React, { useEffect, useState, useContext } from "react";
import Contact from "../components/contact";
import Chat from "../components/text";
//module import end

let socket;
export default function ComponentComplainAdmin() {
  const title = "Complain";
  document.title = "Inventory | " + title;

  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  // code here
  const [state] = useContext(UserContext);
  console.log("sta", state);

  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
      // code here
      query: {
        id: state.user.id,
      },
    });

    // code here
    socket.on("new message", () => {
      console.log("contact : ", contact);
      socket.emit("load messages", contact?.id);
    });

    loadContacts();
    // code here
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]); // code here

  const loadContacts = () => {
    socket.emit("load customer contacts");
    socket.on("customer contacts", (data) => {
      // filter just customers which have sent a message
      let dataContacts = data.filter(
        (item) =>
          item.status !== "superAdmin" &&
          (item.recipientMessage.length > 0 || item.senderMessage.length > 0)
      );
      dataContacts = dataContacts.map((item) => ({
        ...item,
        message:
          item.senderMessage.length > 0
            ? item.senderMessage[item.senderMessage.length - 1].massage
            : "Click here to start message",
      }));
      setContacts(dataContacts);
    });
  };

  // used for active style when click contact
  const onClickContact = (data) => {
    setContact(data);
    // code here
    socket.emit("load messages", data.id);
  };

  // code here
  const loadMessages = () => {
    socket.on("messages", (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      }
      loadContacts();
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
  console.log(contacts.length, "hhhe");
  return (
    <>
      <div style={{ marginTop: "50px", height: "90vh", width: "80vw" }}>
        <Container>
          {contacts?.length !== 0 ? (
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
          ) : (
            <div style={{ textAlign: "center" }}>
              <h1>No Compalin Here!!</h1>
              <img
                style={{ maxHeight: "70vh" }}
                src="https://cdn.dribbble.com/users/1078347/screenshots/2783279/no_messages.png"
                alt="no message"
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
