import { ButtonPropsColorOverrides } from "@mui/material";

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        gray: true;
        lightgray: true;
    }
}