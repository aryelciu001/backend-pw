const ex = require("express");
const app = ex();

const xml = require("xml");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

const keys = require("./config/keys");

const PublitioAPI = require("publitio_js_sdk").default;
const publitio = new PublitioAPI(keys.publitio.apiKey, keys.publitio.apiSecret);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/images", (req, res) => {
  const category = req.params.category;
  publitio
    .call("/files/list", "GET", { offset: "0", limit: "1000" })
    .then(response => {
      res.send(response.files);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("*", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
