import {Button} from "@mui/material";
import React, {useState} from "react";
import ContactForm from "./Contact";

function ContactButton() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Contact Us
            </Button>
            <ContactForm open={open} onClose={handleClose}/>
        </>
    );
}

export default ContactButton;
