import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const colorTheme = createTheme({
    palette: {
        primary : {
            main : '#808080'
        },
        secondary : {
            main : '#7C96A8'
        },
        error : {
            main : red.A400
        }
    }
})