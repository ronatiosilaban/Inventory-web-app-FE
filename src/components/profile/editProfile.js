//module import start
import React from "react";
import cssModules from "../../styles/profile.module.css";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { PATH_FILE } from "../../IP/ip";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { useParams } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//module import end

const EditProfile = (theme) => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState();

  const [form, setForm] = useState({
    image: "",
    name: "",
    phone: "",
    desc: "",
    possition: "",
    address: "",
  });

  //router get data
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/getProfiles");

    return response.data.data;
  });

  //set data response to state
  useEffect(() => {
    if (profile) {
      setPreview(PATH_FILE + profile.image);
      setForm({
        ...form,
        name: profile.name,
        desc: profile.desc,
        phone: profile.phone,
        address: profile.address,
        possition: profile.possition,
      });
    }
  }, [profile]);

  //handle changes values data
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  //handle submit action
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name.toLocaleLowerCase());
      formData.set("phone", form.phone);
      formData.set("desc", form.desc);
      formData.set("possition", form.possition);
      formData.set("address", form.address);

      // Insert product data
      const response = await API.patch(
        "/updateProfile/" + id,
        formData,
        config
      );

      console.log("respone", response);

      navigate("/sidebar/dashboard");
    } catch (error) {
      console.log("err", error);
      const alert = (
        <Alert severity="error" className="py-1">
          {error.response.data.message}
        </Alert>
      );
      setMessage(alert);
    }
  });
  return (
    <>
      <Link to="/sidebar/profiles">
        <Button
          startIcon={<ChevronLeftIcon />}
          style={{ position: "fixed", top: 0 }}
        >
          Back
        </Button>
      </Link>
      <div
        className={cssModules.container}
        style={
          theme.theme === "light"
            ? { backgroundColor: "#E6E6E6" }
            : { backgroundColor: "#393E46" }
        }
      >
        {message && message}
        <div>
          <h1 style={{ textAlign: "center" }}>Edit Profiles</h1>
        </div>
        <div className={cssModules.flex}>
          <div style={cssModules.images}>
            {preview ? (
              <img className={cssModules.image} src={preview} alt="Profile" />
            ) : (
              <img
                className={cssModules.image}
                src="https://wallpapercave.com/wp/wp9566480.png"
                alt="Profile"
              />
            )}
          </div>
          <div className={cssModules.text}>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className={cssModules.forms}>
                <TextField
                  required
                  id="name"
                  onChange={handleChange}
                  value={form?.name}
                  name="name"
                  label="Full Name"
                  // defaultValue="username"

                  className={cssModules.form}
                />
              </div>
              <div className={cssModules.forms}>
                <TextField
                  required
                  id="phone"
                  onChange={handleChange}
                  name="phone"
                  value={form?.phone}
                  label="Phone Number"
                  type="text"
                  autoComplete="current-password"
                  className={cssModules.form}
                />
              </div>
              <div className={cssModules.forms}>
                <TextField
                  required
                  id="possition"
                  onChange={handleChange}
                  name="posstion"
                  value={form?.possition}
                  label="Possition"
                  type="text"
                  autoComplete="current-password"
                  className={cssModules.form}
                />
              </div>
              <div className={cssModules.forms}>
                <TextField
                  required
                  id="address"
                  onChange={handleChange}
                  name="address"
                  value={form?.address}
                  label="Address"
                  type="address"
                  className={cssModules.form}
                />
              </div>
              <div className={cssModules.forms}>
                <TextField
                  required
                  id="desc"
                  onChange={handleChange}
                  name="desc"
                  value={form?.desc}
                  label="Description"
                  type="text"
                  className={cssModules.form}
                />
              </div>
              <div>
                <input
                  type="file"
                  hidden
                  id="upload"
                  name="image"
                  onChange={handleChange}
                />
                <label for="upload" className={cssModules.ImageIcon}>
                  <ImageIcon />
                  <p>IMAGE</p>
                </label>
              </div>
              <div style={{ width: "30vw", textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  className={cssModules.button}
                  bottom={0}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
