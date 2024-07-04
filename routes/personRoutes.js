const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work  type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedpersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedpersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json("Person not found");
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "data not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal sever error" });
  }
});

module.exports = router;
