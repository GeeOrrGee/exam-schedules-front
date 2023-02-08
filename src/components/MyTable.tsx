import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {ExamInfo} from "../interfaces/ExamInfo";

type PropType = {
    examsList: ExamInfo[]
    showOnlyFuture: boolean
}

function isFromFuture(date: string): boolean {
    const currentDate: Date = new Date(Date.now())
    const [examDay, examMonth] = date.split("/").map(item => parseInt(item))
    const currentMonth = currentDate.getMonth() + 1
    // Discard last year's exams
    if (examMonth >= 10 && currentMonth < 8) {
        return false
    }
    // Accept next year's exams
    if (examMonth < 4 && currentMonth >= 10) {
        return true
    }
    // Discard current year's past exams
    if (examMonth < currentMonth) {
        return false
    }
    // Final check
    return !(examMonth === currentMonth && examDay < currentDate.getDate());

}

function MyTable(props: PropType) {
    const examsList = props.examsList
    const showOnlyFuture = props.showOnlyFuture
    return (
        <TableContainer component={Paper} sx={{width: '90%', ml: '5%', mb: '1%'}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>თარიღი</TableCell>
                        <TableCell>დაწყების დრო</TableCell>
                        <TableCell>დამთავრების დრო</TableCell>
                        <TableCell>საგანი</TableCell>
                        <TableCell>ლექტორი</TableCell>
                        <TableCell>ჯგუფი</TableCell>
                        <TableCell>უნივერსიტეტი</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        examsList
                            .filter(val => !showOnlyFuture || isFromFuture(val.date))
                            .map((exam) => (
                                <TableRow
                                    key={JSON.stringify(exam)}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell>{exam!.date}</TableCell>
                                    <TableCell>{exam.time.substring(0, 5)}</TableCell>
                                    <TableCell>{exam.time.substring(6)}</TableCell>
                                    <TableCell>{exam.subject}</TableCell>
                                    <TableCell>{exam.lecturers.join(", ")}</TableCell>
                                    <TableCell>{exam.groups.join(", ")}</TableCell>
                                    <TableCell>{exam.university}</TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyTable