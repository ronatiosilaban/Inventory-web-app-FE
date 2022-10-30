import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import default_profile from "../assets/coffe.jpg";
import sendchat from "../assets/add.svg";
import { PATH_FILE } from "./../IP/ip";
export default function Contact({ dataContact, clickContact, contact }) {
  console.log(contact, "dataCon");
  const image = dataContact;
  console.log(dataContact, "image");
  return (
    <>
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <Row
              key={item.id}
              className={`contact p-2 ${
                contact?.id === item?.id && "contact-active"
              }`}
              onClick={() => {
                clickContact(item);
              }}
              style={{
                backgroundColor: "#DFDFDF",
                padding: 10,
                width: "100%",
                borderRadius: 10,
                marginRight: 10,
                marginTop: "10px",
              }}
            >
              <Col sm={2}>
                {item?.profile[0]?.image ? (
                  <img
                    src={PATH_FILE + item?.profile[0]?.image}
                    className="rounded-circle me-2 img-contact"
                    style={{ width: 50, height: 50 }}
                    alt="user avatar"
                  />
                ) : (
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa&pid=Api&P=0"
                    alt="user avatar"
                    class="rounded-circle"
                    style={{ height: 50, left: 0 }}
                  />
                )}
                {/* ) : (
                  <img
                    src={item.profile?.image || default_profile}
                    className="rounded-circle me-2 img-contact"
                    style={{ width: 50, height: 50 }}
                    alt="user avatar"
                  /> */}
              </Col>
              <Col>
                {/* <div className="ps-1 text-contact d-flex flex-column justify-content-around"> */}
                <p className="mb-0" style={{ marginTop: 10 }}>
                  {item.username}
                </p>
                {/* </div> */}
              </Col>
            </Row>
          ))}
        </>
      )}
    </>
  );
}
