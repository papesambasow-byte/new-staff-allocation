const express = require("express");
const dbConnection = require("../DatabaseConfig/Database.js");

const router = express.Router();

//create
router.post("/datadetails", (req, res) => {
  try {
    const { MSISDN, LEVEL, VOICE,DATA,SMS } = req.body;
    // if (typeof MSISDN === "number" || MSISDN.toString().startsWith("0", "232")) {
    //   res.status(400).json({ error: "Invalid MSISDN field" });
    //   return;
    // }

    const MSISDNNumber = parseInt(MSISDN, 11); 
    if (isNaN(MSISDNNumber) || MSISDNNumber.toString().startsWith("0")) {
      res.status(400).json({ error: "Invalid MSISDN field" });
      return;
    }

    const query =
      "INSERT INTO staffEntitlement_tb (MSISDN, LEVEL, VOICE,DATA,SMS) VALUES (?, ?, ?, ?, ?)";
    const values = [MSISDN, LEVEL, VOICE, DATA, SMS];

    dbConnection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating data details:", err);
        res.status(500).json({ error: "Error creating data details" });
        return;
      }

      res.status(201).json({ message: "Data details created successfully" });
    });
  } catch (err) {
    console.error("Error creating data details:", err);
    res.status(500).json({ error: "Error creating data details" });
  }
});

// API endpoint to get all data details
router.get("/datadetails", (req, res) => {
  try {
    // Perform the query to fetch all data details
    const query = "SELECT * FROM staffEntitlement_tb";

    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error retrieving data details:", err);
        res.status(500).json({ error: "Error retrieving data details" });
        return;
      }

      res.status(200).json(results);
    });
  } catch (err) {
    console.error("Error retrieving data details:", err);
    res.status(500).json({ error: "Error retrieving data details" });
  }
});

// API endpoint to get data details by ID
router.get("/datadetails/:id", (req, res) => {
  try {
    const { id } = req.params;

    // Perform the query to fetch data details by ID
    const query = "SELECT * FROM staffEntitlement_tb WHERE id = ?";

    dbConnection.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error retrieving data details:", err);
        res.status(500).json({ error: "Error retrieving data details" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Data details not found" });
        return;
      }

      res.status(200).json(results[0]);
    });
  } catch (err) {
    console.error("Error retrieving data details:", err);
    res.status(500).json({ error: "Error retrieving data details" });
  }
});

// API endpoint to delete data details by ID
router.patch("/datadetails/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { MSISDN, LEVEL, VOICE,DATA,SMS } = req.body;

    // Validate MSISDN field
    if (typeof MSISDN === "number" || MSISDN.toString().startsWith("0")) {
      res.status(400).json({ error: "Invalid MSISDN field" });
      return;
    }

    // Perform the query to update data details
    const query = "UPDATE staffEntitlement_tb SET MSISDN = ?, LEVEL = ?, VOICE = ?, DATA= ?, SMS=? WHERE id = ?";
    const values = [MSISDN, LEVEL, VOICE,DATA,SMS, id];

    dbConnection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating data details:", err);
        res.status(500).json({ error: "Error updating data details" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Data details not found" });
        return;
      }

      res.status(200).json({ message: "Data details updated successfully" });
    });
  } catch (err) {
    console.error("Error updating data details:", err);
    res.status(500).json({ error: "Error updating data details" });
  }
});


// API endpoint to get all log voice data details
router.get("/logsvoice", (req, res) => {
  try {
    // Perform the query to fetch all data details
    const query = "SELECT * FROM staff_entitlement_logs_voice";

    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error retrieving data details:", err);
        res.status(500).json({ error: "Error retrieving data details" });
        return;
      }

      res.status(200).json(results);
    });
  } catch (err) {
    console.error("Error retrieving data details:", err);
    res.status(500).json({ error: "Error retrieving data details" });
  }
});


// API endpoint to get all log data details
router.get("/logsdata", (req, res) => {
  try {
    // Perform the query to fetch all data details
    const query = "SELECT * FROM staff_entitlement_logs_data";

    dbConnection.query(query, (err, results) => {
      if (err) {
        console.error("Error retrieving data details:", err);
        res.status(500).json({ error: "Error retrieving data details" });
        return;
      }

      res.status(200).json(results);
    });
  } catch (err) {
    console.error("Error retrieving data details:", err);
    res.status(500).json({ error: "Error retrieving data details" });
  }
});


router.post("/searchVoiceByFilter", (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const query = `SELECT * FROM staff_entitlement_logs_voice WHERE DATE_AWARDED >= '${startDate}${":00.000Z"}' AND DATE_AWARDED <= '${endDate}${":59.999Z"}'`;
  dbConnection.query(query, (error, results) => {
      if (error) {
          console.log(error);
          res.status(500).json({ error: "An error occurred while querying the database." });
      } else {
          console.log(results);
          res.status(200).json(results);
      }
  });
});


router.post("/searchDataByFilter", (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const query = `SELECT * FROM staff_entitlement_logs_data WHERE DATE_AWARDED >= '${startDate}${":00.000Z"}' AND DATE_AWARDED <= '${endDate}${":59.999Z"}'`;
  dbConnection.query(query, (error, results) => {
      if (error) {
          console.log(error);
          res.status(500).json({ error: "An error occurred while querying the database." });
      } else {
          console.log(results);
          res.status(200).json(results);
      }
  });
});




module.exports = router;
