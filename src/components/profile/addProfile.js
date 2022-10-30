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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function AddProfile(theme) {
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

  console.log("profile", form);
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0]);
      formData.set("name", form.name.toLocaleLowerCase());
      formData.set("phone", form.phone);
      formData.set("desc", form.desc);
      formData.set("possition", form.possition);
      formData.set("address", form.address);

      const response = await API.post("/addProfile", formData, config);

      console.log("data sudah ada ", response.data.status);

      navigate("/sidebar/profiles");
    } catch (error) {
      // console.log(error);
      const alert = (
        <Alert severity="error" className="py-1">
          {error.response.data.message}
        </Alert>
      );
      setMessage(alert);
      console.log("error", error);
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
                src=" https://wallpapercave.com/wp/wp9566480.png"
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
                  label="Phone Number"
                  type="number"
                  autoComplete="current-password"
                  className={cssModules.form}
                />
              </div>
              <div className={cssModules.forms}>
                <TextField
                  required
                  id="possition"
                  onChange={handleChange}
                  name="possition"
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
                  label="Address"
                  type="text"
                  autoComplete="current-password"
                  className={cssModules.form}
                />
              </div>
              <div className={cssModules.forms}>
                <TextField
                  required
                  id="desc"
                  onChange={handleChange}
                  name="desc"
                  label="Description"
                  type="text"
                  autoComplete="current-password"
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
}
