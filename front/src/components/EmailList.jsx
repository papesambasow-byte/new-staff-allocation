import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CButton } from "@coreui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import { GiConfirmed } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
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

const EmailList = () => {
  const [emailNotification, setEmailNotification] = useState([]);

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

  useEffect(() => {
    getEmailNotification();
  }, []);

  const getEmailNotification = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/emailNotification",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setEmailNotification(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteEmail = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://172.25.160.235:2402/emailNotification/${id}`,
        config
      );
      getEmailNotification();
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Request error:", error.response);
      } else {
        console.error("General error:", error);
      }
    }
  };

  //edit users audit trail
  const handleAuditTrail = async () => {
    const actor = user.userName;
    const action = "edit the email info";
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

  // add user audit trail
  const handleAuditAdd = async () => {
    const actor = user.userName;
    const action = "add the email route";
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

  // delete user audit trail
  const handleAuditDelete = async () => {
    const actor = user.userName;
    const action = "delete email info";
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

  const [visible, setVisible] = useState(false);

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
            // orientation: 'landscape',
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

  // checkbox
  // State to track selected rows for deletion
  const [selectedRows, setSelectedRows] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    // Check if the row is already selected
    const isSelected = selectedRows.includes(id);

    // If selected, remove from the list; otherwise, add to the list
    setSelectedRows(isSelected ? selectedRows.filter(rowId => rowId !== id) : [...selectedRows, id]);
  };


  // Function to handle deletion
  const handleDelete = async () => {
    try {
      // Perform deletion logic for selected rows (use selectedRows array)
      for (const id of selectedRows) {
        await deleteEmail(id);
      }

      // Clear the selected rows after deletion
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting selected rows:", error);
    }
  };


  return (
    <div
      style={{
        width: "80%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "40px",
      }}
    >
      {user && user.role === "admin" && (
        <Link
          to="/listEmail/add"
          className="button  mb-2 bg-info"
          style={{
            background: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: "15PX",
            textDecoration: "none",
          }}
          onClick={handleAuditAdd}
        >
          <span style={{ marginBottom: "3PX" }}>
            <AiOutlineMail />
          </span>{" "}
          {""} Add Email
        </Link>
      )}

      <button
        className="btn bg-danger"
        onClick={handleDelete}
        style={{
          color: "white",
          fontSize: "15px",
          fontWeight: "bold",
          margin: "2px",
        }}
      >
        Delete Selected
      </button>
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
            <th>Check</th>
            <th>No</th>
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emailNotification.map((emailNotification, index) => (
            <tr key={emailNotification.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(emailNotification.id)}
                  onChange={() => handleCheckboxChange(emailNotification.id)}
                  style={{ transform: "scale(2)", padding: "10px" }}
                />
              </td>
              <td>{index + 1}</td>
              <td>{emailNotification.recipientEmail}</td>
              <td>{emailNotification.RecieverName}</td>
              <td>
                <CButton className="btn bg-info" style={{ fontWeight: 700 }}>
                  <Link
                    to={`/listEmail/edit/${emailNotification.id}`}
                    onClick={handleAuditTrail}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <BiEdit />
                  </Link>
                </CButton>


                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => deleteEmail(emailNotification.id)}
                >
                  <span style={{ color: "white" }}>
                    <MdDeleteForever />
                  </span>
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailList;
