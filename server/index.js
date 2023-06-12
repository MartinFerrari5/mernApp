import express from 'express'
import fileUpload from 'express-fileupload';
const app = express();
import postsRoutes from './routes/posts.routes.js';
const PORT = 3000 || process.env.PORT;
import bodyParser from "body-parser";
import cors from 'cors';
import { connectDb } from './mongoose/connection.js';

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./images"
}))
app.use(
  express.urlencoded({
    extended: true,
  })
);
connectDb()
app.use(postsRoutes)

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
