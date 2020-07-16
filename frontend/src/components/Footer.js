/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-16 17:16:41
 * @modify date 2020-07-16 17:16:41
 * @desc [description]
 */

import React, { Fragment } from "react";

function Footer() {
  return (
    <Fragment>
      <div
        className="footer"
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          backgroundColor: "#343a40",
          color: "white",
          textAlign: "center",
        }}
      >
        <p>Fullstack Thing</p>
      </div>
    </Fragment>
  );
}

export default Footer;
