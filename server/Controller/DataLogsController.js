const Data = require("../model/DataLogsModel.js")
const { Op } =require ("sequelize");

const getFormattedDate = (isoDateString) => {
    const date = new Date(isoDateString); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Format the date as "YYYY-MM-DD HH:MM:SS"
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  

// GET all Data Logs
 const getAllDataLogs = async(req, res) =>{
  try{
     const response = await Data.findAll({
      attributes:['id', 'MSISDN', "NORMAL_DATA_in_GB", "FLOAT_DATA_in_GB", "SMS", "DATE_AWARDED" ],
      order: [["DATE_AWARDED", "DESC"]],
     })
     res.status(200).json(response)
  }catch(error){
      res.status(500).json({msg:error.message})
  }
}


// search individual data
const dataLogsSearch = async(req,res) =>{
  const {startDate, endDate}=req.body
  try{
      let response;
          response = await Data.findAll({
          where:{
            DATE_AWARDED: {
                  [Op.between]: [startDate, endDate]
               }
          },
          order:[
             [ 'DATE_AWARDED', 'DESC']
          ]
          
        
          })
      res.status(200).json(response)
  }catch(error){
      res.status(500).json({msg:error.message})
  }
  
}

const getAllTotalDataLogs = async (req, res) => {
  try {
    const response = await Data.findAll({
      attributes: ['id', 'NORMAL_DATA_in_GB', 'FLOAT_DATA_in_GB'],
      order: [['DATE_AWARDED', 'DESC']],
    });

    let totalSum = 0; // Initialize the total sum

    response.forEach((item) => {
      // Add the relevant data fields to the total sum
      if (item.NORMAL_DATA_in_GB) {
        totalSum += parseFloat(item.NORMAL_DATA_in_GB);
      }

      if (item.NORMAL_DATA_in_GB) {
        totalSum += parseFloat(item.NORMAL_DATA_in_GB);
      }
    });

    res.status(200).json({ totalSum });
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ msg: error.message });
  }
};

const getAllTotalSmsLogs = async (req, res) => {
  try {
    const response = await Data.findAll({
      attributes: ['id', 'SMS'], // Include only the 'SMS' attribute
      order: [['DATE_AWARDED', 'DESC']], // Optionally, you can specify a different order
    });

    let totalSum = 0; // Initialize the total sum

    response.forEach((item) => {
      // Add the 'SMS' value to the total sum
      if (item.SMS) {
        totalSum += parseFloat(item.SMS);
      }
    });

    res.status(200).json({ totalSum });
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ msg: error.message });
  }
};

// const getMonthlyDataSums = async (req, res) => {
//   try {
//     const { sortBy = 'year' } = req.query;
//     const { year, month } = req.params;

//     console.log(`Requested Year: ${year}, Month: ${month}`);

//     const response = await Data.findAll({
//       attributes: ['id', 'MSISDN', 'NORMAL_DATA_in_GB', 'FLOAT_DATA_in_GB', 'SMS', 'DATE_AWARDED'],
//     });

//     // Define the mapping between numeric values and category labels
//     const categoryMapping = {
//       15.0: 'eXL',
//       30.0: 'Officer',
//       35.0: 'seniorOfficer',
//       45.0: 'AssistantManager',
//       50.0: 'Manager',
//       60.0: 'SeniorManager',
//       70.0: 'DeputyDirector',
//       100.0: 'Director'
//     };

//     const monthlyCategoryCounts = {};

//     response.forEach((item) => {
//       if (item.DATE_AWARDED) {
//         const formattedDate = new Date(item.DATE_AWARDED);
//         if (!isNaN(formattedDate)) {
//           const itemYear = formattedDate.getFullYear();
//           const itemMonth = formattedDate.getMonth() + 1;

//           // Check if the item's year and month match the requested year and month
//           if (itemYear.toString() === year && itemMonth.toString().padStart(2, '0') === month) {
//             const categoryValue = parseFloat(item.NORMAL_DATA_in_GB);
//             const category = categoryMapping[categoryValue];

//             if (category) {
//               if (!monthlyCategoryCounts[category]) {
//                 monthlyCategoryCounts[category] = 0;
//               }
//               monthlyCategoryCounts[category] += 1;
//             } else {
//               console.error(`No category mapping found for value: ${categoryValue}`);
//             }
//           }
//         } else {
//           console.error(`Invalid DATE_AWARDED: ${item.DATE_AWARDED}`);
//         }
//       }
//     });

//     const sortedData = Object.keys(monthlyCategoryCounts).map((key) => ({
//       label: key,
//       value: monthlyCategoryCounts[key],
//     }));

//     res.status(200).json({
//       sortedData,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ msg: error.message });
//   }
// };


const getMonthlyDataSums = async (req, res) => {
  try {
    const { sortBy = 'year' } = req.query;
    const { year, month } = req.params;

    console.log(`Requested Year: ${year}, Month: ${month}`);

    const response = await Data.findAll({
      attributes: ['id', 'MSISDN', 'NORMAL_DATA_in_GB', 'FLOAT_DATA_in_GB', 'SMS', 'DATE_AWARDED'],
    });

    // Define the mapping between numeric values and category labels
    const categoryMapping = {
      15.0: 'eXL',
      30.0: 'Officer',
      35.0: 'seniorOfficer',
      45.0: 'AssistantManager',
      50.0: 'Manager',
      60.0: 'SeniorManager',
      70.0: 'DeputyDirector',
      100.0: 'Director'
    };

    const monthlyCategoryCounts = {};
    const monthlyCategorySums = {};

    response.forEach((item) => {
      if (item.DATE_AWARDED) {
        const formattedDate = new Date(item.DATE_AWARDED);
        if (!isNaN(formattedDate)) {
          const itemYear = formattedDate.getFullYear();
          const itemMonth = formattedDate.getMonth() + 1;

          // Check if the item's year and month match the requested year and month
          if (itemYear.toString() === year && itemMonth.toString().padStart(2, '0') === month) {
            const categoryValue = parseFloat(item.NORMAL_DATA_in_GB);
            const category = categoryMapping[categoryValue];

            if (category) {
              if (!monthlyCategoryCounts[category]) {
                monthlyCategoryCounts[category] = 0;
              }
              if (!monthlyCategorySums[category]) {
                monthlyCategorySums[category] = 0;
              }

              monthlyCategoryCounts[category] += 1;
              monthlyCategorySums[category] += categoryValue;
            } else {
              console.error(`No category mapping found for value: ${categoryValue}`);
            }
          }
        } else {
          console.error(`Invalid DATE_AWARDED: ${item.DATE_AWARDED}`);
        }
      }
    });

    const sortedData = Object.keys(monthlyCategoryCounts).map((key) => ({
      label: key,
      count: monthlyCategoryCounts[key],
      sum: monthlyCategorySums[key],
    }));

    res.status(200).json({
      sortedData,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: error.message });
  }
};

const getMonthlyDataSum = async (req, res) => {
  const { year } = req.params; 
  try {
    const response = await Data.findAll({
      attributes: ['id', 'MSISDN', "NORMAL_DATA_in_GB", "FLOAT_DATA_in_GB", "SMS", "DATE_AWARDED"],
    });

    const yearlyMonthlySums = {};

    response.forEach((item) => {
      if (item.DATE_AWARDED) {
        const formattedDate = getFormattedDate(item.DATE_AWARDED);

        if (!isNaN(new Date(formattedDate))) {
          const date = new Date(formattedDate);
          const itemYear = date.getFullYear(); 
          const monthName = date.toLocaleString('en-US', { month: 'long' });

          if (itemYear.toString() === year) { 
            if (!yearlyMonthlySums[itemYear]) {
              yearlyMonthlySums[itemYear] = {
                January: 0,
                February: 0,
                March: 0,
                April: 0,
                May: 0,
                June: 0,
                July: 0,
                August: 0,
                September: 0,
                October: 0,
                November: 0,
                December: 0,
              };
            }

            if (item.NORMAL_DATA_in_GB) {
              yearlyMonthlySums[itemYear][monthName] += parseFloat(item.NORMAL_DATA_in_GB);
            }
          }
        } else {
          console.error(`Invalid DATE_AWARDED: ${item.DATE_AWARDED}`);
        }
      }
    });

    console.log('Yearly Monthly Sums:', yearlyMonthlySums);

    res.status(200).json({ yearlyMonthlySums });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
    getAllDataLogs,
    dataLogsSearch,
    getMonthlyDataSum,
    getAllTotalDataLogs,
    getAllTotalSmsLogs,
    getMonthlyDataSums
}




