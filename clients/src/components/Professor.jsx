import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BorderAll } from '@material-ui/icons';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Custimized_table({rows}) {
  const classes = useStyles();

  return (
    <TableContainer className='table_pro' component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className='tab-head'>
          <TableRow>
            <StyledTableCell className='abcd' align="left">STUDENT NAME</StyledTableCell>
            <StyledTableCell align="left">GENDER</StyledTableCell>
            <StyledTableCell align="left">EMAIL</StyledTableCell>
            <StyledTableCell align="left">PHONE NO.</StyledTableCell>
            <StyledTableCell align="left">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* {`/update/${value._id}`} */}
        <TableBody>
          {rows.map((value) => (
            <StyledTableRow key={value._id}>
              {/* <StyledTableCell component="th" scope="value">{rows=+1}</StyledTableCell> */}
              <StyledTableCell align="left">{value.name}</StyledTableCell>
              <StyledTableCell align="left">{value.gender}</StyledTableCell>
              <StyledTableCell align="left">{value.email}</StyledTableCell>
              <StyledTableCell align="left">{value.phone}</StyledTableCell>
              <StyledTableCell align="left" style={{ color: 'red'}}><Link to={`/update/${value._id}`}><RemoveRedEyeIcon/></Link></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Professor = () => {
  const [inputField, setInputField] = useState('');

  useEffect(() => {
    getAllinputField();
  }, []);

  const getAllinputField = () => {
    axios.get('api/student_list', inputField)
     .then((res) => setInputField(res.data))
      // .then((res) => console.log(res.data))
      .catch((err) => { console.log('error aa gya') });
  }

  return (
    <div className='pro-div'>
      < Container>
      <h1 align='center' className='header'>PROFESSOR POTAL</h1>
      <br/>
      {inputField && <Custimized_table rows={inputField}/> }
      </Container>
    </div>
  )
}

export default Professor;