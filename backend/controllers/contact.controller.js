import Contact from "../models/contact.model.js";

const createContact = async (req, res) => {
  const { firstName, lastName, email, message, mobile, subject } = req.body;

  try {
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
  } catch (error) {
    console.log("Error contact form", error);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export { createContact };
