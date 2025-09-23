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

const StaffAllocationList = () => {
  const [staffinformation, setStaffinformation] = useState([]);
  


 
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
        "http://172.25.160.235:2402/staffinformation",
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
  const deletestaffinformation = async (staffinformationId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://172.25.160.235:2402/staffinformation/${staffinformationId}`,
        config
      );
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
        // dom: "Bfrtip",
        // buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
    });
  });

  return (
    <div style={{ width: "98%", marginRight: "auto", marginLeft: "auto", marginTop:"40px"}}>
    
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
            <th>No</th>
            <th>NAMES</th>
            <th>DEPARTMENT</th>
            <th>MSISDN</th>
            <th>LEVEL</th>
            <th>VOICE</th>
            <th>DATA</th>
            <th>SMS</th>
          </tr>
        </thead>
        <tbody>
          {staffinformation.map((staffinformation, index) => (
            <tr key={staffinformation.id}>
              <td>{index + 1}</td>
              <td>{staffinformation.NAMES}</td>
              <td>{staffinformation.DEPARTMENT}</td>
              <td>{staffinformation.MSISDN}</td>
              <td>
                {staffinformation.staff_allocation_levelTB
                  ? staffinformation.staff_allocation_levelTB.LEVEL
                  : "N/A"}
              </td>
              <td>
                {staffinformation.staff_allocation_levelTB
                  ? staffinformation.staff_allocation_levelTB.VOICE
                  : "N/A"}
              </td>
              <td>
                {staffinformation.staff_allocation_levelTB
                  ? staffinformation.staff_allocation_levelTB.DATA
                  : "N/A"}
              </td>
              <td>
                {staffinformation.staff_allocation_levelTB
                  ? staffinformation.staff_allocation_levelTB.SMS
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffAllocationList;
