import createTheme from "@mui/material/styles/createTheme";
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
export const theme = createTheme({
    palette: {
        mode: "dark",

        navy: createColor("#003478"),
        gray: {
            ...createColor("#333537"),
            contrastText: "#BFBFCB"
        },

        lightgray: createColor("#BFBFCB")
    },

    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontWeight: 500,
                    fontSize: '1.75vh',
                },
            }
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter',
                }
            }
        }
    }
})