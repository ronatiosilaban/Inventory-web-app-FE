import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../context/user";
import default_profile from "../assets/coffe.jpg";
import { PATH_FILE } from "./../IP/ip";

export default function Chat({ contact, user, messages, sendMessage }) {
  // const [state] = useContext(UserContext)
  console.log(contact, "message");
  const image = contact?.profile[0]?.image;
  return (
    <>
      {contact ? (
        <>
          <div
            style={{
              backgroundColor: "#C4C4C4",
              padding: 10,
              width: "100%",
              display: "flex",
            }}
            className="overflow-auto px-3 py-2"
          >
            <div>
              {image ? (
                <img
                  src={PATH_FILE + image}
                  alt="user avatar"
                  class="rounded-circle"
                  style={{ height: 50, left: 0 }}
                />
              ) : (
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa&pid=Api&P=0"
                  alt="user avatar"
                  class="rounded-circle"
                  style={{ height: 50, left: 0 }}
                />
              )}
            </div>
            <div style={{ marginTop: 10, marginLeft: "10px" }}>
              <p>{contact.username}</p>
            </div>
          </div>

          <div
            id="chat-messages"
            style={{ height: "60vh", backgroundColor: "#DFDFDF" }}
            className="overflow-auto px-3 py-2"
          >
            {messages.map((item, index) => (
              <div
                key={index}
                className={`d-flex py-1 ${
                  item.idSender == user.id
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  style={{
                    color: "rgb(202, 199, 199)",
                    lineHeight: "5px",
                    paddingLeft: "1rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    paddingRight: "1rem",
                    marginLeft: "0rem",
                    marginRight: "1rem",
                    marginBottom: "1rem",
                    borderRadius: 15,
                    backgroundColor: "#FFFFFF",
                    fontWeight: 500,
                    color: "black",
                    textAlign: "right",
                    // background: 'var(--right-msg-bg)'
                  }}
                >
                  {item.message}
                </div>

                {/* </div> */}
              </div>
            ))}
          </div>

          <div className="px-3">
            <textarea
              placeholder="Send Message"
              style={{ height: "6vh", width: "100%", borderRadius: 10 }}
              onKeyPress={sendMessage}
            />
          </div>
        </>
      ) : (
        <div
          style={{ height: "89.5vh" }}
          className="h4 d-flex justify-content-center align-items-center"
        >
          No Message
        </div>
      )}
    </>
  );
}
// style={{
//     color: 'rgb(202, 199, 199)',
//     lineHeight: '5px',
//     paddingLeft: '1rem',
//     paddingTop: '1rem',
//     paddingBottom: '1rem',
//     paddingRight: '1rem',
//     marginLeft: '0rem',
//     marginRight: '1rem',
//     marginBottom: '1rem',
//     borderRadius: 15,
//     backgroundColor: '#FFFFFF',
//     fontWeight: 500,
//     color: 'black',
//     textAlign: 'right'
//     // background: 'var(--right-msg-bg)'
// }}
