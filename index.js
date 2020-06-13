const express = require("express");
const cors = require("cors");
const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter");

const app = express();

// set up port to listen on
const port = process.env.PORT || 3001;

// enable cors
app.use(cors());

// Parse incoming post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup api routes
app.use("/api/projects", projectRouter);
app.use("/api/actions", actionRouter);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
