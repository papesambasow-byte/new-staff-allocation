const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer')
const path = require('path')
const Staff = require("./model/StaffAllocationModel.js")
 
 
//use express static folder
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
//! Routes start
 
//route for Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 


// Route for uploading and inserting CSV data
const StaffAllocationBulkUpload = app.post('/uploadfile', upload.single('uploadfile'), async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    try {
      await UploadCsvDataToMySQL(filePath);
      res.json({
        msg: 'File uploaded successfully!',
        file: req.file,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

async function UploadCsvDataToMySQL(filePath) {
    const stream = fs.createReadStream(filePath);
    const csvData = [];
    const csvStream = csv
      .parse()
      .on('data', function (data) {
        csvData.push(data);
      })
      .on('end', async function () {
        csvData.shift();
  
        try {
          await Staff.bulkCreate(
            csvData.map((entry) => ({
                NAMES: entry[0],
                DEPARTMENT: entry[1],
                ENTITY: entry[2],
                MSISDN: entry[3],
                LEVEL: entry[4],
                VOICE: entry[5],
                DATA: entry[6],
                SMS: entry[7],
            })),
            {
              timestamps: false,
            }
          );
          console.log('Data inserted successfully');
        } catch (error) {
          console.error(error);
        }
  
        fs.unlinkSync(filePath);
      });
  
    stream.pipe(csvStream);
  }
  

module.exports = StaffAllocationBulkUpload



