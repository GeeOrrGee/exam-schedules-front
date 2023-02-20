import React, {useState} from "react";
import {Button, TextField, Typography} from "@mui/material";

interface Styles {
    [key: string]: React.CSSProperties;
}

const styles: Styles = {

    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        //border: "1px solid #3f51b5",
        borderRadius: "4px",
        maxWidth: "500px",
    },
    input: {
        margin: "8px",
        width: "100%",
    },
    button: {
        marginTop: "16px",
        alignSelf: "flex-end",
    },
    title: {
        marginBottom: "16px",
    },
};

function Contact() {

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
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div style={styles.root}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <Typography variant="h5" style={styles.title}>
                    Contact Us
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    style={styles.input}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={styles.button}
                >
                    Send
                </Button>
            </form>
        </div>
    );
}

export default Contact;
