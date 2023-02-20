import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

function Header() {
    return (
        <div style={{height: '50px'}}>
            <AppBar>
                <Toolbar>
                    <a href={'/'} style={{textDecoration: "none", color: "white"}}>
                        <Typography variant="h6" noWrap>
                            Exam Schedules
                        </Typography>
                    </a>
                    <a href={'/contact'} style={{
                        display: "block",
                        marginLeft: "auto",
                        textDecoration: "none",
                        color: "white"
                    }}>კონტაქტი</a>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header