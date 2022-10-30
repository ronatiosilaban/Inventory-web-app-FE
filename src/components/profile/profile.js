//module import start
import cssModules from "../../styles/profile.module.css";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { PATH_FILE } from "../../IP/ip";
import { Link } from "react-router-dom";

//module import end

export default function Profile(theme) {
  const [state] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleCloses = () => setShow(false);
  const handleShows = () => setShow(true);
  const [message, setMessage] = useState();

  //router get data
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/getProfiles");
    return response.data.data;
  });

  return (
    <>
      <div
        className={cssModules.container}
        style={
          theme.theme === "light"
            ? { backgroundColor: "#E6E6E6" }
            : { backgroundColor: "#393E46" }
        }
      >
        <div className={cssModules.title}>
          <Grid container spacing={0}>
            <Grid item xs={11}>
              <h1>My Profiles</h1>
            </Grid>
            {profile ? (
              <Grid item xs={1}>
                <Link to={`/editProfile/` + profile?.id}>
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    align="right"
                    className={cssModules.button}
                    bottom={0}
                  >
                    <EditIcon />
                  </Button>
                </Link>
              </Grid>
            ) : (
              <Grid item xs={1}>
                <Link to="/addProfile">
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    align="right"
                    className={cssModules.button}
                    bottom={0}
                  >
                    <EditIcon />
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </div>
        <div className={cssModules.flex}>
          <div style={cssModules.images}>
            {profile ? (
              <img
                className={cssModules.image}
                src={PATH_FILE + profile?.image}
                alt="Profile"
              />
            ) : (
              <img
                className={cssModules.image}
                src=" https://wallpapercave.com/wp/wp9566480.png"
                alt="Profile"
              />
            )}
          </div>
          <div className={cssModules.text}>
            <div className={cssModules.name}>
              <span>Name : </span> <span> {profile?.name}</span>
            </div>
            <div className={cssModules.name}>
              <span>Phone : </span>
              <span> {profile?.phone}</span>
            </div>
            <div className={cssModules.name}>
              <span>Possition : </span>
              <span> {profile?.possition}</span>
            </div>
            <div className={cssModules.text}>
              <address>
                {" "}
                <span>Address : </span>
                <span> {profile?.address}</span>
              </address>
            </div>
            <div className={cssModules.text}>
              <address>
                {" "}
                <span>Description : </span>
                <span> {profile?.desc}</span>
              </address>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
