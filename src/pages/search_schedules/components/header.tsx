import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import ContactButton from "./ContactButton";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

function Header() {
  const { uniForTheme } = useContext(ThemeContext);
  return (
    <div style={{ height: "50px" }}>
      <AppBar>
        <Toolbar>
          <a href={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6" noWrap>
              Exam Schedules
            </Typography>
          </a>
          <div
            style={{
              display: "block",
              marginLeft: "auto",
            }}
          >
            <ContactButton uniForTheme={uniForTheme} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
