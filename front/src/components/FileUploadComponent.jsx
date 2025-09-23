import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import Form from "react-bootstrap/Form";
import moment from "moment"
import {
  CCard,
  CCol,
  CButton,
  CForm,
  CContainer,
  CRow,
  CFormInput,
} from "@coreui/react";
import {
  cilCheckCircle,
  cilXCircle,
} from '@coreui/icons'
import Button from "react-bootstrap/Button";
import { RiFileUploadFill } from "react-icons/ri";

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const currentDate = moment().format("DD-MM-YYYY");
  const date = new Date();
  const current_time =
    date.getHours() +
    ":" +
    " " +
    date.getMinutes() +
    ":" +
    " " +
    date.getSeconds();
  const today = current_time + "  " + currentDate;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/staffAllocation');
  };

  
  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('uploadfile', file);
  
    const token = localStorage.getItem('token');
    const authHeader = `Bearer ${token}`;
  
    return axios
      .post('http://172.25.160.235:2402/uploadfile', formData, {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };


//  const handleOnSubmit = async (e) => {
//   e.preventDefault();
//   if (file) {
//     const fileReader = new FileReader();
//     fileReader.onload = async function (event) {
//       const csvOutput = event.target.result;
//       var array = csvOutput.toString().split('\r\n');
//       var data = [];

//       for (const r of array) {
//         let row = r.toString().split(',');
//         data.push(row);
//       }

//       var heading = data[0];
//       const expectedColumns = ['NAMES', 'DEPARTMENT', 'ENTITY', 'MSISDN', 'staffAllocationLevelTBId'];

//       if (arraysMatch(heading, expectedColumns)) {
//         var ans_array = [];
//         var msisdnSet = new Set(); // Create a Set to track encountered MSISDN values

//         for (var i = 1; i < data.length; i++) {
//           var row = data[i];
//           var obj = {};
//           for (var j = 0; j < heading.length; j++) {
//             if (!row[j]) {
//               row[j] = '';
//             }
//             obj[heading[j].replaceAll(' ', '_')] = row[j].toString().replaceAll(' ', '_');
//           }

//           // Check for duplicate MSISDN
//           if (msisdnSet.has(obj.MSISDN)) {
//             setMsg('File upload failed: Duplicate MSISDN found.'); // Set error message
//             setShowModal(true); // Show the error modal
//             return; // Abort the upload process
//           }
          
//           msisdnSet.add(obj.MSISDN); // Add the MSISDN to the Set to track it

//           ans_array.push(obj);
//         }
//         const newArray = { ans_array };

//         try {
//           // Upload the file using handleUpload
//           const response = await handleUpload(file);
//           // Handle the response
//           console.log('Upload Response:', response);

//           // Set success message
//           setMsg('File uploaded successfully!');
//           setShowModal(true); // Show the success modal
//         } catch (error) {
//           if (error.response) {
//             setMsg('File upload failed: ' + error.response.data.msg); // Set error message
//             setShowModal(true); // Show the error modal
//           }
//         }
//       } else {
//         setMsg('File upload failed, the column names do not match the expected columns.'); // Set error message
//         setShowModal(true); // Show the error modal
//       }
//     };

//     fileReader.readAsText(file);
//   }
// };

// function arraysMatch(arr1, arr2) {
//   // Check if the arrays have the same length
//   if (arr1.length !== arr2.length) {
//     return false;
//   }

//   // Check if each element in arr1 matches the corresponding element in arr2
//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) {
//       return false;
//     }
//   }

//   return true;
// }

const handleOnSubmit = async (e) => {
  e.preventDefault();
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = async function (event) {
      const csvOutput = event.target.result;
      var array = csvOutput.toString().split('\r\n');
      var data = [];

      for (const r of array) {
        let row = r.toString().split(',');
        data.push(row);
      }

      var heading = data[0];
      const expectedColumns = ['NAMES', 'DEPARTMENT', 'ENTITY', 'MSISDN', 'LEVEL', 'VOICE', 'DATA', 'SMS'];

      if (arraysMatch(heading, expectedColumns)) {
        var ans_array = [];
        var msisdnSet = new Set(); // Create a Set to track encountered MSISDN values

        for (var i = 1; i < data.length; i++) {
          var row = data[i];
          var obj = {};
          for (var j = 0; j < heading.length; j++) {
            if (!row[j]) {
              row[j] = '';
            }
            obj[heading[j].replaceAll(' ', '_')] = row[j].toString().replaceAll(' ', '_');
          }

          // if (!/^\d+$/.test(obj.MSISDN)) {
          //   setMsg('File upload failed: MSISDN must be an integer.'); // Set error message
          //   setShowModal(true); // Show the error modal
          //   return; // Abort the upload process
          // }

          // Check for MSISDN starting with '+232' or '0'
          if (obj.MSISDN.startsWith('+232')|| obj.MSISDN.startsWith('232') || obj.MSISDN.startsWith('0')) {
            setMsg('File upload failed: MSISDN should not start with "+232" or "0".'); // Set error message
            setShowModal(true); // Show the error modal
            return; // Abort the upload process
          }

          // Check for duplicate MSISDN
          // if (msisdnSet.has(obj.MSISDN)) {
          //   setMsg('File upload failed: Duplicate MSISDN found.'); // Set error message
          //   setShowModal(true); // Show the error modal
          //   return; // Abort the upload process
          // }
          
          // msisdnSet.add(obj.MSISDN); // Add the MSISDN to the Set to track it

          ans_array.push(obj);
        }
        const newArray = { ans_array };

        try {
          // Upload the file using handleUpload
          const response = await handleUpload(file);
          // Handle the response
          console.log('Upload Response:', response);

          // Set success message
          setMsg('File uploaded successfully!');
          setShowModal(true); // Show the success modal
        } catch (error) {
          if (error.response) {
            setMsg('File upload failed: ' + error.response.data.msg); // Set error message
            setShowModal(true); // Show the error modal
          }
        }
      } else {
        setMsg('File upload failed, the column names do not match the expected columns.'); // Set error message
        setShowModal(true); // Show the error modal
      }
    };

    fileReader.readAsText(file);
  }
};

function arraysMatch(arr1, arr2) {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if each element in arr1 matches the corresponding element in arr2
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

 
  

  const handleAuditUploaded = async () => {
    const actor = user.userName;
    const action = "uploaded file";
    const performedDate = today;
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    await axios
      .post(
        "http://172.25.160.235:2402/auditTrail",
        {
          actor,
          action,
          performedDate,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <CRow>
    <CCard style={{ padding: "20px", width: "600px", margin: "auto", marginTop:"70px"}}>
      <CCol xs={12}>
        <CContainer sm>
          <div className="container text-left">
            <div className="row">
              <div className="">
                <CForm>
                  {msg && (
                    <div className={`alert ${msg.startsWith("File upload failed") ? "alert-danger" : "alert-success"}`}>
                      {msg}
                    </div>
                  )}
                  <p>{msg}</p>
                  <br />
                  <CFormInput
                    type="file"
                    required
                    label="Select Location file"
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleFileChange}
                  />

                  <hr />
                  <div className="d-grid gap-2">
                    <CButton
                      color="success"
                      id="uploadButton"
                      type="submit"
                      onClick={e => {
                        handleOnSubmit(e);
                      }}
                    >
                     <span><RiFileUploadFill/></span> Upload
                    </CButton>
                  </div>

                </CForm>
              </div>
            </div>
          </div>
        </CContainer>
      </CCol>
    </CCard>
    {/* Modal for displaying messages */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Upload Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {msg.startsWith("File upload failed") ? (
          <div className="text-center">
            <CIcon icon={cilXCircle} style={{ '--ci-primary-color': 'red', width: "100px", margin: "auto" }} customClassName="nav-icon" />
            <div className="alert alert-danger" style={{ marginTop: "40px" }}>{msg}</div>
          </div>
        ) : (
          <div className="text-center">
            <CIcon icon={cilCheckCircle} style={{ '--ci-primary-color': 'green', width: "100px", margin: "auto" }} customClassName="nav-icon" />
            <div className="alert alert-success" style={{ marginTop: "40px" }}>{msg}</div>
          </div>
        )}

      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </CRow>
  );
};

export default FileUploadComponent;
