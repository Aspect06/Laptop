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
                    fontSize: 16,
                    backgroundColor: '#151515',
                    border: '1px solid rgba(255, 255, 255, 0.23)',
                    boxShadow: '0 0 10px #000'
                }
            }
        },
    }
})