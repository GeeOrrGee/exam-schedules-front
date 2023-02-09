import {
    Box,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material"
import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {ExamInfo} from '../interfaces/ExamInfo'
import MyTable from './MyTable'


const startingUrl = "http://localhost:3636/filters/"

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
    const [uniForTheme, setUniForTheme] = useState<"primary" | "secondary" | "info">("primary")
    const [currUni, setCurrUni] = useState<string>("Freeuni")

    let controller: any;
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch();
        }, 1000);
        return () => {
            if (controller) {
                controller.abort();
            }
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
        const url = getUrlForFetch(subject!, lecturer!, (currUni)!)
        controller = new AbortController()

        axios.get(url, {signal: controller.signal})
            .then(response => {
                setExamsList(response.data.examsList)
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }
    const switchUni = (event: SelectChangeEvent) => {
        setCurrUni(event.target.value)
        switch (event.target.value) {
            case "Freeuni":
                setUniForTheme("primary")
                break
            case "Agruni":
                setUniForTheme("secondary")
                break
            case "Culinary":
                setUniForTheme("info")
                break
        }
        handleInputChange()
    }

    return (
        <Grid alignItems="center" justifyContent="center">
            <Box ref={ref} component="form" onChange={handleInputChange} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    label="Subject"
                    name="subject"
                    variant="standard"
                    color={uniForTheme}
                />
                <TextField
                    margin="normal"
                    label="Lecturer"
                    name="lecturer"
                    variant="standard"
                    sx={{
                        ml: 2,
                        mr: 2
                    }}
                    color={uniForTheme}
                />
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-label" color={uniForTheme}>Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={currUni}
                        onChange={switchUni}
                    >
                        <MenuItem value={"Freeuni"}>Freeuni</MenuItem>
                        <MenuItem value={"Agruni"}>Agruni</MenuItem>
                        <MenuItem value={"Culinary"}>Culinary</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <FormControlLabel
                control={<Checkbox color={uniForTheme} checked={onlyFutureExams} onChange={handleSwitch}/>}
                label={"მაჩვენე მხოლოდ მომავალი"}/>
            <Box>
                {!isLoading ? <MyTable examsList={examsList} showOnlyFuture={onlyFutureExams}/> :
                    <CircularProgress color={uniForTheme}/>
                }
            </Box>
        </Grid>
    )
}

export default Search;