import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


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
    const classes = useStyles();
    return (
        <Autocomplete
            className="rounded-3xl bg-rowdy-blue"
            disablePortal
            id="combo-box-demo"
            classes={classes}
            options={DegreePaths}
            sx={{ width: 400, WebkitTextFillColor: "white", }}
            renderInput={(params) => <TextField {...params} label="Degree pathways" className='stroke-white stroke-7' />}
        />
    );
}

// classes exemples
const DegreePaths = [
    { label: "Computer science general", year: 2023 },
    { label: "Computer science software", year: 2023 },
    { label: "Biology", year: 2023 },
    { label: "Lawyer", year: 2023 },
    { label: "Math", year: 2023 },
    { label: "MIS", year: 2023 },
    { label: "Software degree", year: 2023 },
    {
        label: "Buisseness",
        year: 2022,
    },
    { label: "Accountant", year: 2023 },
    { label: "English", year: 2023 },
    {
        label: "French",
        year: 2003,
    },
    {
        label: "Geography",
        year: 2023,
    }
];