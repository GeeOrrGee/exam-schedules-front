import React, {useState} from "react";
import {Button, TextField} from "@mui/material";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await fetch("http://localhost:3636/send-email", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });

    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
            />
            <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={formData.message}
                onChange={(e) =>
                    setFormData({...formData, message: e.target.value})
                }
                required
            />
            <Button variant="contained" color="primary" type="submit">
                Send
            </Button>
        </form>
    );
}

export default Contact;
