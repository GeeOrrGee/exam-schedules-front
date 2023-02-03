import {
    Box,
    Button, Checkbox, CircularProgress, FormControlLabel,
    TextField
} from "@mui/material"
import React, {useEffect, useRef, useState} from 'react'
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
    const ref = useRef(null);
    const [examsList, setExamsList] = useState<ExamInfo[]>([])
    const [onlyFutureExams, setOnlyFutureExams] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [lastChange, setLastChange] = useState<number>(0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch();
            setIsLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [lastChange]);

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlyFutureExams(event.currentTarget.checked);
    }

    const handleInputChange = () => {
        setIsLoading(true)
        setLastChange(Date.now())
    }

    const handleSearch = () => {
        if (ref.current == null) return
        const data = new FormData(ref.current);

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
            <Box ref={ref} component="form" onChange={handleInputChange} noValidate sx={{mt: 1}}>
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
                <FormControlLabel control={<Checkbox checked={onlyFutureExams} onChange={handleSwitch}/>}
                                  label={"მაჩვენე მხოლოდ მომავალი"}/>
            </Box>
            {!isLoading ? <MyTable examsList={examsList} showOnlyFuture={onlyFutureExams}/> :
                <CircularProgress/>}
        </div>
    )
}

export default Search;