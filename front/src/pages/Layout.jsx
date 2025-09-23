import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

class Layout extends Component {
  state = {
    isSidebarOpen: true, // Set to 'true' or 'false' based on your needs
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  render() {
    const { children } = this.props;
    const { isSidebarOpen } = this.state;

    return (
      <React.Fragment>
        <Navbar onSidebarToggle={this.toggleSidebar} />
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          {isSidebarOpen && (
            <div className="column is-2">
              <Sidebar />
            </div>
          )}
          <div className={`column ${isSidebarOpen ? "has-background-white" : ""}`}>
            <main>{children}</main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;

