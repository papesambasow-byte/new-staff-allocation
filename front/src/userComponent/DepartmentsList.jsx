import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CButton } from "@coreui/react";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { FcDepartment } from "react-icons/fc";
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

const DepartmentsList = () => {
  const [department, setDepartment] = useState([]);

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
    getDepartment();
  }, []);

  const getDepartment = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/department",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setDepartment(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
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

  $("#stsTokenDisplay").DataTable().destroy();
  setTimeout(() => {
    $(document).ready(function () {
      $("#stsTokenDisplay").DataTable({
        pagingType: "full_numbers",
        pageLength: 5,
        destroy: true,
        processing: true,
        // dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
    });
  });

  return (
    <div
      style={{
        width: "50%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop:"40px"
      }}
    >
      <table
        className="table is-striped is-fullwidth table-sm"
        id="stsTokenDisplay"
        style={{
          fontSize: "15px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <thead >
          <tr>
            <th>No</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {department.map((department, index) => (
            <tr key={department.id}>
              <td>{index + 1}</td>
              <td>{department.deptName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentsList;
