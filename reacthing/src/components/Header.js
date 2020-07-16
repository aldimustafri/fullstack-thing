/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-16 17:13:07
 * @modify date 2020-07-16 17:13:07
 * @desc [description]
 */

import React, { Fragment } from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";

function Header() {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" style={{marginBottom: '20px'}}>
        <NavbarBrand>Fullstack Thing</NavbarBrand>
      </Navbar>
    </Fragment>
  );
}
export default Header;
