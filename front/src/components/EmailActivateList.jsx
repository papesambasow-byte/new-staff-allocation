import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CButton,
  CPopover,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
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

const EmailActivateList = () => {
  const [inActiveEmail, setInActiveEmail] = useState([]);

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
    getInActiveEmail();
  }, []);

  const getInActiveEmail = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/inActiveEmail",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setInActiveEmail(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const updateInActivEmail = async (id) => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      await axios.patch(
        `http://172.25.160.235:2402/activateEmail/${id}`,
        null,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };


  //edit users audit trail


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

  return (
    <div style={{ width: "80%", marginRight: "auto", marginLeft: "auto", marginTop: "40px" }}>
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
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inActiveEmail.map((inActiveEmail, index) => (
            <tr key={inActiveEmail.id}>
              <td>{index + 1}</td>
              <td>{inActiveEmail.recipientEmail}</td>
              <td>{inActiveEmail.RecieverName}</td>
              <td>
                <CButton
                  className="btn bg-info"
                  style={{ fontWeight: 700 }}
                  onClick={() => updateInActivEmail(inActiveEmail.id)}
                >
                  <BiEdit />
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailActivateList;
