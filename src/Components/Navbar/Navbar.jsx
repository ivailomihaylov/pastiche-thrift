import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/pastiche-logo.png";
import useStyles from "./styles";

function Navbar({ totalItems }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <header class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <img
            src={logo}
            alt="Pastiche Thrift"
            height="30px"
            className="me-1"
          />
          <span class="fs-4">Simple header</span>
        </a>

        <ul class="nav nav-pills">
          <li class="nav-item">
            <a href="#" class="nav-link" aria-current="page">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Features
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Pricing
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              FAQs
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            {location.pathname === "/" && (
              <div className={classes.button}>
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </div>
            )}
          </li>
        </ul>
      </header>
    </header>
  );
}

export default Navbar;
