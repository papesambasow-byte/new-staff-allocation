import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  MdDeleteForever,
  MdOutlineAddBox,
  MdUploadFile,
  MdOutlineCancel,
} from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BsFillBucketFill } from "react-icons/bs";
import { CButton } from "@coreui/react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import "@coreui/coreui/dist/css/coreui.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.flash.min.js";
import * as jzip from "jszip";
import "pdfmake";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

const Stafflist = () => {
  const [staffinformation, setStaffinformation] = useState([]);
  const [staffinformationTotalSumOfVoice, setStaffinformationTotalSumOfVoice] =
    useState([]);
  const [staffinformationTotalSumOfData, setStaffinformationTotalSumOfData] =
    useState([]);
  const [staffinformationTotalSumOfSms, setStaffinformationTotalSumOfSms] =
    useState([]);
  const [response, setResponse] = useState("");

  // Run script to allocate data, voice and sms
  // const runPythonScript = async () => {
  //   const token = localStorage.getItem("token");
  //   const authHeader = `Bearer ${token}`;
  //   try {
  //     const res = await axios.get("http://172.25.160.235:2402/runPython", {
  //       headers: {
  //         Authorization: authHeader,
  //       },
  //     });
  //     setResponse(res.data);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setResponse("Error occurred");
  //   }
  // };

  const [loading, setLoading] = useState(false);

  const runPythonScript = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    // Start loading
    setLoading(true);

    try {
      const res = await axios.get("http://172.25.160.235:2402/runPython", {
        headers: {
          Authorization: authHeader,
        },
      });

      setResponse(res.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred");
    } finally {
      // End loading
      setLoading(false);
    }
  };

  // get total sum of voice

  useEffect(() => {
    getStaffinformationTotalSumOfVoice();
  }, []);

  const getStaffinformationTotalSumOfVoice = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/staffinformationSumOfVoice",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setStaffinformationTotalSumOfVoice(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // get total sum of data
  useEffect(() => {
    getStaffinformationTotalSumOfData();
  }, []);

  const getStaffinformationTotalSumOfData = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/staffinformationSumOfData",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setStaffinformationTotalSumOfData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // get total sum of sms
  useEffect(() => {
    getStaffinformationTotalSumOfSms();
  }, []);

  const getStaffinformationTotalSumOfSms = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/staffinformationSumOfSms",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setStaffinformationTotalSumOfSms(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { user } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    getStaffinformation();
  }, []);

  // Get all staff information
  const getStaffinformation = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/staffEntitlement_tb",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setStaffinformation(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // delete staff information
  // const deletestaffinformation = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     await axios.delete(
  //       `http://172.25.160.235:2402/staffEntitlement_tb/${id}`,
  //       config
  //     );
  //     getStaffinformation();
  //     window.location.reload();
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Request error:", error.response);
  //     } else {
  //       console.error("General error:", error);
  //     }
  //   }
  // };

  const deletestaffinformation = async (idOrIds) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let url = `http://172.25.160.235:2402/staffEntitlement_tb/`;
      let requestBody = {};

      if (Array.isArray(idOrIds)) {
        // Multiple deletions
        requestBody.ids = idOrIds;
      } else if (idOrIds === 'all') {
        // All deletions
        url += 'all';
      } else {
        // Single deletion
        url += idOrIds;
      }

      await axios.delete(url, { data: requestBody, ...config });
      getStaffinformation();
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Request error:", error.response);
      } else {
        console.error("General error:", error);
      }
    }
  };



  //log add staff info api
  const handleAuditAdd = async () => {
    const actor = user.userName;
    const action = "add staff allocation";
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

  // log edit api
  const handleAuditEditStaff = async () => {
    const actor = user.userName;
    const action = "Edit staff added";
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

  const handleAllocateVoicesmsdata = async () => {
    const actor = user.userName;
    const action = "allocation sms voice data script";
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

  const handleBulkupload = async () => {
    const actor = user.userName;
    const action = "bulk upload";
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

  const handleDeleteAllocationStaffInfo = async () => {
    const actor = user.userName;
    const action = "delete allocation staff info";
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



  //data table
  $("#stsTokenDisplay").DataTable().destroy();
  setTimeout(() => {
    $(document).ready(function () {
      $("#stsTokenDisplay").DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        destroy: true,
        processing: true,
        dom: "Bfrtip",
        buttons: [
          {
            extend: "copy",
            className: "btn btn-primary",
          },
          {
            extend: "csv",
            className: "btn btn-success",
          },
          {
            extend: "pdf",
            className: "btn btn-danger",
            orientation: 'landscape',
          },
          {
            extend: "print",
            className: "btn btn-info",
          },
        ],
        initComplete: function () {
          $(".btn-primary");
          $(".btn-success");
          $(".btn-danger");
          $(".btn-info");
        },
      });
    });
  });



  // State to track selected rows for deletion
  // const [selectedRows, setSelectedRows] = useState([]);

  // // Function to handle checkbox change
  // const handleCheckboxChange = (id) => {
  //   // Check if the row is already selected
  //   const isSelected = selectedRows.includes(id);

  //   // If selected, remove from the list; otherwise, add to the list
  //   setSelectedRows(isSelected ? selectedRows.filter(rowId => rowId !== id) : [...selectedRows, id]);
  // };


  // Function to handle deletion
  // const handleDelete = async () => {
  //   try {
  //     if (selectedRows.length === 0) return;

  //     // If deleting all records
  //     if (selectedRows.length === 1 && selectedRows[0] === 'all') {
  //       await deletestaffinformation('all');
  //     } else {
  //       // Perform deletion logic for multiple selected rows
  //       await deletestaffinformation(selectedRows);
  //     }

  //     // Clear the selected rows after deletion
  //     setSelectedRows([]);
  //   } catch (error) {
  //     console.error("Error deleting selected rows:", error);
  //   }
  // };
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      const allIds = staffinformation.map(info => info.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  }, [selectAll, staffinformation]);

  const handleCheckboxChange = (id) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // const handleSelectAllChange = () => {
  //   setSelectAll(!selectAll);
  // };

  // const handleDelete = async () => {
  //   try {
  //     if (selectedRows.length === 0) return;

  //     // Perform deletion logic for multiple selected rows
  //     await deletestaffinformation(selectedRows);

  //     // Clear the selected rows after deletion
  //     setSelectedRows([]);
  //   } catch (error) {
  //     console.error("Error deleting selected rows:", error);
  //   }
  // };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = staffinformation.map(info => info.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  // const handleCheckboxChange = (id) => {
  //   if (selectedRows.includes(id)) {
  //     setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  //   } else {
  //     setSelectedRows([...selectedRows, id]);
  //   }
  // };

  const handleDelete = async () => {
    try {
      if (selectedRows.length === 0) return;

      const confirmed = window.confirm('Are you sure you want to delete the selected employee(s)?');
      if (!confirmed) return;

      // Perform deletion logic for multiple selected rows
      await deletestaffinformation(selectedRows);

      // Clear the selected rows after deletion
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting selected rows:", error);
    }
  };


  return (
    <div style={{ width: "98%", marginRight: "auto", marginLeft: "auto" }}>
      <div
        class="container"
        style={{ marginLeft: "-13PX", marginTop: "30px", marginBottom: "5px" }}
      >
        <div class="row ">
          <div class="col-sm">
            {user && user.role === "admin" && (
              <>
                <Link
                  to="/staffAllocation/add"
                  className="button button2  mb-2 bg-info"
                  style={{
                    background: "black",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "15PX",
                    textDecoration: "none",
                  }}
                  onClick={handleAuditAdd}
                >
                  <span style={{ fontSize: "25px", marginBottom: "5px" }}>
                    <AiOutlineUsergroupAdd />
                  </span>
                  Add Employee
                </Link>

                <Link
                  to="/staffAllocation/add1"
                  className="button  button2 mb-2 bg-info"
                  style={{
                    background: "black",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "15PX",
                    textDecoration: "none",
                    marginLeft: "3px",
                  }}
                  onClick={handleBulkupload}
                >
                  <span style={{ fontSize: "25px", marginBottom: "5px" }}>
                    <MdUploadFile />
                  </span>
                  Upload
                </Link>

                <></>
              </>
            )}
          </div>
          {user && user.role === "admin" && (
            <><div class="col-sm">

              <div
                class="modal fade"
                id="staticBackdrop1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel1"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="staticBackdropLabel1"
                        style={{ fontWeight: "bold" }}
                      >
                        Employee Allocation
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      Are you sure you want to Allocate{" "}
                      <span style={{ color: "red" }}>
                        {staffinformation.length}
                      </span>{" "}
                      staff members with <br />
                      VOICE: NLE{" "}
                      <span style={{ color: "red" }}>
                        {staffinformationTotalSumOfVoice.totalVoiceAllocated}
                      </span>
                      <br /> DATA:{" "}
                      <span style={{ color: "red" }}>
                        {staffinformationTotalSumOfData.totalDataAllocated}
                      </span>
                      GB <br /> SMS:{" "}
                      <span style={{ color: "red" }}>
                        {staffinformationTotalSumOfSms.totalSmsAllocated}
                      </span>{" "}
                      <br /> Once confirmed, the allocation will be
                      irreversible!"
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal"
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "white",
                          marginLeft: "-20px",
                        }}
                      >
                        <span>
                          <MdOutlineCancel />
                        </span>
                        Cancel
                      </button>

                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={runPythonScript}
                        disabled={loading}
                        style={{
                          color: "white",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {loading ? (
                          "Loading..."
                        ) : (
                          <span>
                            <GiConfirmed />
                          </span>
                        )}
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
          )}

        </div>
      </div>

   
        <button
        className="btn bg-danger"
        onClick={handleDelete}
        style={{
          color: "white",
          fontSize: "15px",
          fontWeight: "bold",
          margin: "2px",
          marginBottom: "10px"
        }}
      >
        Delete Selected
      </button>
    

    



      {/* <table
        className="table is-striped is-fullwidth"
        id="stsTokenDisplay"
        style={{
          fontSize: "15px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                style={{ transform: "scale(2)", padding: "10px" }}
              />
            </th>
            <th>No</th>
            <th>NAMES</th>
            <th>DEPARTMENT</th>
            <th>ENTITY</th>
            <th>MSISDN</th>
            <th>LEVEL</th>
            <th>VOICE</th>
            <th>DATA</th>
            <th>SMS</th>
            <th>DATE</th>
            {user && user.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {staffinformation.map((info, index) => (
            <tr key={info.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(info.id)}
                  onChange={() => handleCheckboxChange(info.id)}
                  style={{ transform: "scale(2)", padding: "10px" }}
                />
              </td>
              <td>{index + 1}</td>
              <td>{info.NAMES}</td>
              <td>{info.DEPARTMENT}</td>
              <td>{info.ENTITY}</td>
              <td>{info.MSISDN}</td>
              <td>{info.LEVEL}</td>
              <td>{info.VOICE}</td>
              <td>{info.DATA}</td>
              <td>{info.SMS}</td>
              <td>{info.DATE_ADDED && new Date(info.DATE_ADDED).toISOString().split('T')[0]}</td>
              {user && user.role === "admin" && (
                <td>
                  <CButton className="bg-info">
                    <Link
                      to={`/staffAllocation/edit/${info.id}`}
                      onClick={handleAuditEditStaff}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      <BiEdit style={{ color: "white" }} />
                    </Link>
                  </CButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table> */}
      <table
       className="table is-striped is-fullwidth"
       id="stsTokenDisplay"
       style={{
         fontSize: "15px",
         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
       }}
      >
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              style={{ 
                transform: "scale(2)", 
                padding: "10px",
              }}
            />
          </th>
     
          <th>No</th>
          <th>NAMES</th>
          <th>DEPARTMENT</th>
          <th>ENTITY</th>
          <th>MSISDN</th>
          <th>LEVEL</th>
          <th>VOICE</th>
          <th>DATA</th>
          <th>SMS</th>
          <th>DATE</th>
          {user && user.role === "admin" && (<th>Actions</th>)}
        </tr>
      </thead>
      <tbody>
        {staffinformation.map((info, index) => (
          <tr key={info.id}>
             <td>
             <input
               type="checkbox"
               checked={selectedRows.includes(info.id)}
               onChange={() => handleCheckboxChange(info.id)}
               style={{ transform: "scale(2)", padding: "10px" }}
             />
           </td>
        
           
            <td>{index + 1}</td>
            <td>{info.NAMES}</td>
            <td>{info.DEPARTMENT}</td>
            <td>{info.ENTITY}</td>
            <td>{info.MSISDN}</td>
            <td>{info.LEVEL}</td>
            <td>{info.VOICE}</td>
            <td>{info.DATA}</td>
            <td>{info.SMS}</td>
            <td>{info.DATE_ADDED && new Date(info.DATE_ADDED).toISOString().split('T')[0]}</td>
            {user && user.role === "admin" && (
              <td>
                <CButton className="bg-info">
                  <Link
                    to={`/staffAllocation/edit/${info.id}`}
                    onClick={handleAuditEditStaff}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <BiEdit style={{ color: "white" }} />
                  </Link>
                </CButton>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Stafflist;
