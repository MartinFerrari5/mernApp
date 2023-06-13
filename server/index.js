import express from 'express'
import fileUpload from 'express-fileupload';
import postsRoutes from './routes/posts.routes.js';
const PORT = 3000 || process.env.PORT;
import bodyParser from "body-parser";
import cors from 'cors';
import { connectDb } from './mongoose/connection.js';
import {dirname, join} from "path"
import {fileURLToPath} from "url"

const app = express();
 app.use(cors({
  origin:["http://localhost:5173"]
 }));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./images"
}))
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(
  express.urlencoded({
    extended: true,
  })
);
connectDb()
app.use(postsRoutes)

// CODIGO COMPILADOR QUE SIRVE EL BACKEND
app.use(express.static(join(__dirname, "../client/dist")))
app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
