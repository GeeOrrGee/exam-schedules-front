import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import React from "react";

function Header() {
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Exam Schedules
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar>
            </Toolbar>
        </div>
    )
}

export default Header