import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function Dropdown({ loading, itemloading, state, handleChange, sortByName, sortById, assetsByCollections }) {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            backgroundColor:"white",
            minWidth: 120,
            marginTop: "1%",
            position: "absolute",
            left: "50%",
            border:"1px solid white",
            borderRadius:"2%",
            marginLeft: "6%",
            textAlign:"center",
            [theme.breakpoints.down('sm')]: {
                marginLeft: -21,
            },
        },
    }));


    const classes = useStyles();
    if (loading || itemloading || assetsByCollections.length === 0) {
        return null
    } else {
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    MenuProps={{ disableScrollLock: true }}
                    value={state}
                    onChange={handleChange}
                >
                    <MenuItem onClick={sortByName} value="name">Sort By Name</MenuItem>
                    <MenuItem onClick={sortById} value="Id">Sort By ID</MenuItem>
                </Select>
            </FormControl>
        )
    }
}
export default Dropdown;
