import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

function Header() {
    return (
        <div style={{height: '50px'}}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Exam Schedules
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header