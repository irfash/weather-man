import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.styles.css";
export const NavBar = () => {
  return (
    <nav className="nav">
      <Link className="barnd-nav link" to={"/"}>
        Weather Man
      </Link>
      <div className="side-nav">
        <div className="side-nav--link">
          <Link className="link" to={"/"}>
            Home
          </Link>
        </div>
        <div className="side-nav--link">
          <Link className="link" to={"/About"}>
            About
          </Link>
        </div>
        <div className="side-nav--link">
          <a
            className="git-link link"
            href="https://github.com/irfash"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};
// style={{ display: "block", margin: "1rem 0" }}
