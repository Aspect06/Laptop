import { ButtonGroupPropsColorOverrides } from "@mui/material";

declare module "@mui/material/ButtonGroup" {
    interface ButtonGroupPropsColorOverrides {
        gray: true;
        lightgray: true;
    }
}