import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

interface ContactFormProps {
    open: boolean;
    onClose: () => void;
}

function Contact({open, onClose}: ContactFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3636/send-email", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status == 200) {
            alert("Your message was sent successfully!");
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } else {
            alert(
                "Sorry, there was an error sending your message. Please try again."
            );
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="contact-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle id="contact-dialog-title">Contact Us</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        required
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        margin="dense"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Send
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default Contact;
