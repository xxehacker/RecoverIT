import express from "express";
import { createContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/").post(createContact);

export default router;
