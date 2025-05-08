import Contact from "../models/contact.model.js";

const createContact = async (req, res) => {
  const { firstName, lastName, email, message, mobile, subject } = req.body;

  if (!firstName || !lastName || !email || !message || !subject) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const contact = await Contact.create({
    firstName,
    lastName,
    email,
    message,
    mobile,
    subject,
  });

  return res.status(201).json({
    message: "Contact created successfully",
    contact,
  });
};

export { createContact };
