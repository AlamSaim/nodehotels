const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const new_menu = new MenuItem(data);
    const response = await new_menu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal sever error");
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
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
    const menuId = req.params.id;
    const updatedMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json("Person not found");
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal sever error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);
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
