import {
    PaletteColorOptions,
  } from "@mui/material";
  
  declare module "@mui/material/styles" {
    interface PaletteOptions {
      navy: PaletteColorOptions;
      gray: PaletteColorOptions;
      lightgray: PaletteColorOptions;
    }
  }