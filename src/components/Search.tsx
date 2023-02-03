import {
    Box,
    Button, Checkbox, FormControlLabel,
    TextField
} from "@mui/material"
import React, {useState} from 'react'
import axios from 'axios'
import {ExamInfo} from '../interfaces/ExamInfo'
import MyTable from './MyTable'

const startingUrl = "http://localhost:5000/filters/"

function getUrlForFetch(subject: FormDataEntryValue, lecturer: FormDataEntryValue, uni: FormDataEntryValue): string {
    let isThisFirst: boolean = true
    let url = startingUrl
    if (subject !== "") {
        if (isThisFirst) {
            isThisFirst = false
            url += "?"
        }
        url += `&subject="${subject}"`
    }
    if (lecturer !== "") {
        if (isThisFirst) {
            isThisFirst = false
            url += "?"
        }
        url += `&lecturer="${lecturer}"`
    }
    if (uni !== "") {
        if (isThisFirst) {
            url += "?"
        }
        url += `&university="${uni}"`
    }
    return url
}



function Search() {
    const [examsList, setExamsList] = useState<ExamInfo[]>([])
    const [onlyFutureExams, setOnlyFutureExams] = useState<boolean>(true)

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlyFutureExams(event.currentTarget.checked);
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const subject = data.get('subject')
        const lecturer = data.get('lecturer')
        const uni = data.get('university')

        const url = getUrlForFetch(subject!, lecturer!, uni!)

        axios.get(url)
            .then(response => {
                setExamsList(response.data.examsList)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Box component="form" onSubmit={handleSearch} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    label="Subject"
                    name="subject"
                    variant="standard"
                />
                <TextField
                    margin="normal"
                    label="Lecturer"
                    name="lecturer"
                    variant="standard"
                />
                <TextField
                    margin="normal"
                    label="University"
                    name="university"
                    variant="standard"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Search
                </Button>
                <FormControlLabel control={<Checkbox checked={onlyFutureExams} onChange={handleSwitch}/>} label={"მაჩვენე მხოლოდ მომავალი"}/>
            </Box>
            <MyTable examsList={examsList} showOnlyFuture={onlyFutureExams}/>
        </div>
    )
}

export default Search;