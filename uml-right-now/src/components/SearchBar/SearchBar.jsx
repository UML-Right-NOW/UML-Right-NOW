// Next
import { useContext } from "react";

// Components
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// Libraries
import { majors } from "@/Majors";

// Contexts
import { TranscriptContext } from "@/contexts/TranscriptContext";


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            transform: "translate(34px, 20px) scale(1);"
        },
        "&.Mui-focused .MuiInputLabel-outlined": {
            color: "purple"
        }
    },
    inputRoot: {
        color: "purple",
        "&[class*=\"MuiOutlinedInput-root\"] .MuiAutocomplete-input:first-child": {
            paddingLeft: 26
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        }
    }
}));

export default function SearchBar() {
    // Contexts
    const { setMajor } = useContext(TranscriptContext);

    // Helpers
    const handleAutocompleteChanged = (event, value) => {
        // Store the selected major in the global context
        setMajor(value);
    };

    const classes = useStyles();
    return (
        <Autocomplete
            className="rounded-3xl bg-rowdy-blue"
            disablePortal
            id="combo-box-demo"
            classes={classes}
            options={majors}
            sx={{ width: 400, WebkitTextFillColor: "white", }}
            renderInput={(params) => <TextField {...params} label="Degree pathways" className='stroke-white stroke-7' />}
            onChange={handleAutocompleteChanged}
        />
    );
}
