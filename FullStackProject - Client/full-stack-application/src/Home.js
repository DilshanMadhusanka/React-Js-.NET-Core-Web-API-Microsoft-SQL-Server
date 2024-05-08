import React, { Component } from "react";
import companyImage from "./Images/2.png"; // Importing company image

export class Home extends Component {
  render() {
    return (
      <div>
        <div className="mt-5">
          <img
            src={companyImage}
            alt="Company"
            style={{ width: "full", height: "350px" }}
          />
          <p>
            {" "}
            We are dedicated to revolutionizing the way businesses manage their
            workforce. With our innovative tools and technologies, we help
            organizations streamline their HR processes, boost productivity, and
            enhance employee engagement. At Employee Management Solutions, we
            understand the challenges faced by businesses in managing their
            employees effectively. Our mission is to provide comprehensive
            solutions that empower businesses to build a dynamic and engaged
            workforce.
          </p>
        </div>
      </div>
    );
  }
}


