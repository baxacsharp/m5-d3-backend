/*
****************** STUDENTS CRUD ********************
1. CREATE → POST http://localhost:3001/students (+ body)
2. READ → GET http://localhost:3001/students (+ optional query parameters)
3. READ → GET http://localhost:3001/students/:id
4. UPDATE → PUT http://localhost:3001/students/:id (+ body)
5. DELETE → DELETE http://localhost:3001/students/:id
*/
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { validationResult } from "express-validator";
import letCreateError from "http-errors";
import validator from "./validation.js";

const authorsRoutes = express.Router();
const currentFile = fileURLToPath(import.meta.url); // imports the current file location into the url
const currentPath = dirname(currentFile); //imports the current folder into the url
const authorUrlPath = join(currentPath, "author.json"); // concatinatuing the 2 urls
authorsRoutes.post("/", validator, (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(letCreateError(400, { errorList: errors }));
    } else {
      // 1st step  read the body
      const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };
      console.log(newAuthor);
      //2nd step read the old path
      const Authors = JSON.parse(fs.readFileSync(authorUrlPath).toString());
      console.log(Authors);
      //3rd step  push the new adata in the data array
      Authors.push(newAuthor);
      //4th step write the array back to json file
      fs.writeFileSync(authorUrlPath, JSON.stringify(Authors));
      //5th step send back response
      res.status(200).send(newAuthor.id);
    }
  } catch (error) {
    next(error);
  }
});
authorsRoutes.get("/", (req, res, next) => {
  try {
    //1 st step read the authors body
    const AuthorAsBuffer = fs.readFileSync(authorUrlPath);
    const AuthorToString = AuthorAsBuffer.toString();
    //2nd step change it to json file
    const Author = JSON.parse(AuthorToString);
    res.send(Author);
  } catch (error) {
    next(error);
  }
});
authorsRoutes.get("/:title", (req, res, next) => {
  try {
    //1st step read the author's body
    const Authors = JSON.parse(fs.readFileSync(authorUrlPath.toString()));
    if (req.query && req.query.title) {
      //2nd step get the id from array
      const Author = Authors.find((index) => index.title === req.params.title);
      res.send(Author);
    }
    // 3rd step send the reponse
    else {
      next(
        letCreateError(
          404,
          `The ${req.params.title} of the post not found. Please try to use different keys`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
authorsRoutes.put("/:id", (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(letCreateError(400, { errorList: errors }));
    } else {
      // 1st step read the authors's body
      const Authors = JSON.parse(fs.readFileSync(authorUrlPath.toString()));
      //2nd step get the id from the array and filter it
      const AuthorsLeft = Authors.filter((index) => index.id !== req.params.id);

      //3rd step take and update the chosen author
      const chosenAuthor = { ...req.body, id: req.params.id };
      AuthorsLeft.push(chosenAuthor);
      //4th step write the updated Array
      fs.writeFileSync(authorUrlPath, JSON.stringify(AuthorsLeft));
      //5 th step send the response
      res.status(204).send(chosenAuthor);
    }
  } catch (error) {
    next(error);
  }
});
authorsRoutes.delete("/:id", (req, res, next) => {
  try {
    //1st step read the Author's body
    const Authors = JSON.parse(fs.readFileSync(authorUrlPath.toString()));
    //2nd step find the id of the chosen Author
    const AuthorsStayed = Authors.filter((index) => index.id !== req.params.id);
    //3rd step write the array back
    fs.writeFileSync(authorUrlPath, JSON.stringify(AuthorsStayed));
    //5th step send the response back
    res.send();
  } catch (error) {
    next(error);
  }
});
export default authorsRoutes;
