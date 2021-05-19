import { body } from "express-validator";
const validator = [
  body("category").exists().withMessage("Category should be filled"),
  body("title").exists().withMessage("Title field should be filled"),
  body("cover").exists().withMessage("Cover image should be uploaded"),
  body("author").exists().withMessage("Author should be taken into account"),
];
export default validator;
