import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {ExamInfo} from "../interfaces/ExamInfo";

type PropType = {
    examsList : ExamInfo[]
}

function MyTable(props : PropType){
    const examsList = props.examsList
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>თარიღი</TableCell>
                        <TableCell>დრო</TableCell>
                        <TableCell>საგანი</TableCell>
                        <TableCell>ლექტორი</TableCell>
                        <TableCell>ჯგუფი</TableCell>
                        <TableCell>უნივერსიტეტი</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {examsList.map((exam) => (
                        <TableRow
                            key={JSON.stringify(exam)}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell>{exam!.date}</TableCell>
                            <TableCell>{exam.time}</TableCell>
                            <TableCell>{exam.subject}</TableCell>
                            <TableCell>{exam.lecturers}</TableCell>
                            <TableCell>{exam.groups}</TableCell>
                            <TableCell>{exam.university}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyTable