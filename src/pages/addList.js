//module import start
import * as React from "react";
import Select from "@mui/material/Select";
import cssModules from "../styles/add.module.css";
import { useState, useEffect } from "react";
import Image from "../components/images/image";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ImageIcon from "@mui/icons-material/Image";
import Images from "../components/images/images";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import Alert from "@mui/material/Alert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
//module import end

export default function AddList() {
  const title = "Add List";
  document.title = "Inventory | " + title;
  const [personName, setPersonName] = React.useState([]);
  const [personCategory, setPersonCategory] = React.useState("");
  const [personNameS, setPersonNameS] = React.useState([]);
  const [personSuplier, setPersonSuplier] = React.useState("");
  const [Suplier, setSupliers] = useState([]);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    image: "",
    name: "",
    amount: "",
    desc: "",
  });
  const [message, setMessage] = useState();

  let navigate = useNavigate();
  //router get data start
  let { data: Category } = useQuery("productsCache", async () => {
    const response = await API.get("getCategorys");
    return response.data.data.user;
  });

  const getSupliers = async () => {
    try {
      const response = await API.get("/getSupliers");
      setSupliers(response.data.data.user);
    } catch (error) {
      return console.log(error);
    }
  };
  useEffect(() => {
    getSupliers();
  }, []);
  //router get data end

  //handle change start
  const handleChangeCategori = (e) => {
    const {
      target: { value },
    } = e;
    setPersonName(value);
  };
  const handleChangeSupiers = (e) => {
    const {
      target: { value },
    } = e;
    setPersonNameS(value);
  };

  const handleChangeCategory = (id) => {
    setPersonCategory(id);
  };
  const handleChangeSupier = (id) => {
    setPersonSuplier(id);
  };

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
  //handle change end

  //submit action
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
      formData.set("desc", form.desc);
      formData.set("qty", form.amount);
      formData.set("idSuplier", personSuplier);
      formData.set("idCategory", personCategory);
      const response = await API.post("/addList", formData, config);
      console.log("res", response);
      navigate("/sidebar/dashboard");
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
    <div>
      <div>{message && message}</div>
      <Link to="/sidebar/dashboard">
        <Button
          startIcon={<ChevronLeftIcon />}
          style={{ position: "relative", top: 0 }}
        >
          Back
        </Button>
      </Link>
      <div className={cssModules.flex}>
        <Box flex={6} p={5} className={cssModules.display}>
          <h2>Add New Product</h2>
          <form
            onSubmit={(e) => handleSubmit.mutate(e)}
            className={cssModules.input}
          >
            <Images preview={preview} />

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
            <InputLabel id="product" className={cssModules.prev}>
              Name Product
            </InputLabel>
            <OutlinedInput
              type="text"
              id="product"
              placeholder="Product Name"
              className={cssModules.form}
              name="name"
              onChange={handleChange}
            />
            <InputLabel id="product" className={cssModules.prev}>
              Qty
            </InputLabel>
            <OutlinedInput
              type="number"
              id="product"
              placeholder="Qty"
              className={cssModules.form}
              name="amount"
              onChange={handleChange}
            />
            <InputLabel id="description" className={cssModules.prev}>
              Dedcription
            </InputLabel>
            <OutlinedInput
              type="text"
              id="description"
              placeholder="Dedcription"
              className={cssModules.form}
              name="desc"
              onChange={handleChange}
            />
            <InputLabel
              id="demo-simple-select-label"
              className={cssModules.prev}
            >
              category
            </InputLabel>
            <Select
              displayEmpty
              value={personName}
              className={cssModules.form}
              onChange={handleChangeCategori}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="" name="">
                <em>Placeholder</em>
              </MenuItem>
              {Category?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.category}
                  onClick={() => handleChangeCategory(item.id)}
                >
                  {item.category}
                </MenuItem>
              ))}
            </Select>
            <InputLabel
              id="demo-simple-select-label"
              className={cssModules.prev}
            >
              Suplier
            </InputLabel>
            <Select
              displayEmpty
              value={personNameS}
              className={cssModules.form}
              onChange={handleChangeSupiers}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="" name="">
                <em>Placeholder</em>
              </MenuItem>
              {Suplier?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name}
                  onClick={() => handleChangeSupier(item.id)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {/* <div className={cssModules.prevs}> */}
            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<AddBoxIcon />}
              className={cssModules.button}
            >
              Add List
            </Button>
            {/* </div> */}
          </form>
        </Box>

        <Image preview={preview} />
      </div>
    </div>
  );
}
