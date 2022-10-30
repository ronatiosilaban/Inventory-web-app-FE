import React from "react";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";
import { PATH_FILE } from "../../IP/ip";
import cssModules from "../../styles/detail.module.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DetailList = ({ refresh }) => {
  const [barang, setBarang] = useState();
  const [idCategory, setIdCategory] = useState();
  const [idSuplier, setIdSuplier] = useState();
  const [supliers, setSupliers] = useState();
  const [Category, setCategory] = useState();

  const { id } = useParams();
  console.log("state", refresh);
  let { data: list, refetch } = useQuery("listsCache", async () => {
    const response = await API.get(`/getList/` + id);
    setBarang(response.data.data);
    setIdCategory(response.data?.data?.newdata?.idCategory);
    setIdSuplier(response.data?.data?.newdata?.idSuplier);
    return response.data.data.productData;

    // navigate('/product')
  });

  const getCategory = async () => {
    try {
      const response = await API.get("/getCategory/" + idCategory);
      setCategory(response?.data?.data?.user[0]?.category);
    } catch (error) {
      return console.log(error);
    }
  };

  const getSupliers = async () => {
    try {
      const response = await API.get("/getSuplier/" + idSuplier);
      setSupliers(response.data.data.user[0]?.name);
    } catch (error) {
      return console.log(error);
    }
  };
  const qty = barang?.QtyData[0]?.qty;
  useEffect(() => {
    getSupliers();
    getCategory();
  }, [barang]);

  useEffect(() => {
    refetch();
  }, [refresh]);

  return (
    <div>
      <div className={cssModules.display}>
        <Card
          sx={{ maxWidth: "80vw", minWidth: "70vw" }}
          className={cssModules.display}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            style={{ maxHeight: "70vh", maxWidth: "50vw" }}
            image={PATH_FILE + barang?.newdata?.image}
          />
          <div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div className={cssModules.title}>
                  <h1>Detail</h1>
                </div>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={cssModules.content}
              >
                <div className={cssModules.body}>
                  <div>
                    <span>Product Name : </span>
                    <span>{barang?.newdata?.name}</span>
                  </div>
                  <div>
                    <span>Product Qty : </span>
                    <span>{qty}</span>
                  </div>
                  <div>
                    <span>Product Description : </span>
                    <span>{barang?.newdata?.desc}</span>
                  </div>
                  <div>
                    <span>Product Suplier : </span>
                    <span>{supliers}</span>
                  </div>
                  <div>
                    <span>Product Category : </span>
                    <span>{Category}</span>
                  </div>
                </div>
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </div>
        </Card>
      </div>
      {/* <div className={cssModules.display}>
        <div>
          {barang?.newdata?.image ? (
            <img
              src={PATH_FILE + barang?.newdata?.image}
              className={cssModules.image}
            />
          ) : (
            <img
              style={{ width: "400px" }}
              src="https://tse4.explicit.bing.net/th?id=OIP._-sxTQ4ikrXv-tVQtf8uawAAAA&pid=Api&P=0"
              alt=""
            />
          )}
        </div>
        <div>
          <div>
            <span>Product Name :</span>
            <span>{barang?.newdata?.name}</span>
          </div>
          <div>
            <span>Product Qty :</span>
            <span>{qty}</span>
          </div>
          <div>
            <span>Product Description :</span>
            <span>{barang?.newdata?.desc}</span>
          </div>
          <div>
            <span>Product Suplier :</span>
            <span>{Category}</span>
          </div>
          <div>
            <span>Product Category :</span>
            <span>{supliers}</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DetailList;
