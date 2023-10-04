import { useEffect, useState } from "react";
import styles from "./Settings.module.scss";
import { useNavigationState } from "../../atoms/navigation";
import { fetchNui } from "../../../../hooks/fetchNui";
import { Zoom, Typography, IconButton, FormControlLabel, Grid, Switch, Dialog, TextField, DialogActions, DialogTitle, FormControl, Box, CircularProgress, Button } from "@mui/material";
import Draggable from "react-draggable";


export const Settings: React.FC<{
    currentWallpaper: string,
    darkFont: boolean
}> = (props) => {
    const [navigationState, setNavigationState] = useNavigationState();

    const [modalLoading, setModalLoading] = useState(false);
    const [wallpaperDialog, setWallpaperDialog] = useState(false)

    const [backgroundURL, setBackgroundURL] = useState('');

    const Presets = [
        'https://cdn.discordapp.com/attachments/1144648749122076793/1144667642658050078/image.png',
        'https://cdn.discordapp.com/attachments/1144648749122076793/1144667775487459408/image.png',
        'https://cdn.discordapp.com/attachments/1144648749122076793/1144667846253752371/image.png'
    ]

    return (
        <Zoom
            in={navigationState.path === "Settings"}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div
                className={styles.main}
            >
                <Draggable
                    handle="section"
                >
                    <div
                        className={styles.settingsContainer}
                    >
                        <section
                            className={styles.header}
                        >
                            <Typography
                                style={{
                                    color: "white",
                                    fontSize: "1.5vh"
                                }}
                            >
                                Settings
                            </Typography>

                            <IconButton
                                className={styles.button}
                                onClick={() => {
                                    setNavigationState({
                                        path: 'Home',
                                    });
                                }}

                                style={{
                                    marginLeft: "93%",
                                    height: "3vh",
                                    width: "3vh"
                                }}
                            >
                                <i
                                    style={{
                                        fontSize: "2vh"
                                    }}
                                    className={
                                        "fa-solid fa-xmark"
                                    }
                                />
                            </IconButton>
                        </section>

                        <div
                            className={styles.backgroundContainer}
                        >
                            <div
                                style={{
                                    marginTop: '1%',
                                    marginLeft: '2%'
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            defaultChecked={props.darkFont}
                                            onChange={async() => {
                                                await fetchNui('aspect_laptop:settings:updateDarkMode', {
                                                    DarkMode: !props.darkFont
                                                })
                                            }}
                                        />
                                    }

                                    label="Dark Font"

                                    style={{
                                        color: props.darkFont ? 'black' : 'white',
                                        userSelect: 'none',
                                    }}
                                />
                            </div>

                            <Grid
                                container={true}
                                spacing={1}

                                style={{
                                    height: '84%',
                                }}
                            >
                                <Grid
                                    item={true}
                                    key={1}
                                    className={styles.Item}
                                    onClick={() => {
                                        setWallpaperDialog(true)
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'grey',
                                            width: '99%',
                                            height: '97.5%',
                                        }}
                                    />
                                </Grid>

                                {Presets.map((data, index) => {
                                    if (props.currentWallpaper === data) {
                                        return (
                                            <Grid
                                                item={true}
                                                key={index}
                                                className={styles.Item}
                                                style={{
                                                    border: '0.35vh solid #fff',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${data})`,
                                                        backgroundRepeat: 'no-repeat',
                                                        width: '99.25%',
                                                        height: '98.75%',
                                                        opacity: '0.25'
                                                    }}
                                                />
                                            </Grid>
                                        )
                                    } else {
                                        return (
                                            <Grid
                                                item={true}
                                                key={index}
                                                className={styles.Item}
                                                onClick={async() => {
                                                    await fetchNui('aspect_laptop:settings:setWallpaper', {
                                                        Wallpaper: data
                                                    })
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${data})`,
                                                        backgroundRepeat: 'no-repeat',
                                                        width: '99.25%',
                                                        height: '98.75%',
                                                    }}
                                                />
                                            </Grid>
                                        )
                                    }
                                })}
                            </Grid>
                        </div>
                    </div>
                </Draggable>

                <Dialog
                    open={wallpaperDialog}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            m: 1,
                            minWidth: 250
                        }}
                    >
                        {!modalLoading &&
                            <DialogTitle
                                id="responsive-dialog-title"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                Set Background
                            </DialogTitle>
                        }

                        {!modalLoading &&
                            <FormControl
                                variant="standard"
                                sx={{
                                    m: 1,
                                    minWidth: 250
                                }}
                            >
                                <FormControl
                                    variant="filled"
                                    sx={{
                                        m: 1,
                                        minWidth: 120
                                    }}
                                >
                                    <TextField
                                        id="filled-basic"
                                        label="Background URL"
                                        variant="filled"
                                        value={backgroundURL}
                                        onChange={(e) => {
                                            setBackgroundURL(e.target.value)
                                        }}
                                    />
                                </FormControl>
                            </FormControl>
                        }

                        {modalLoading &&
                            <FormControl
                                variant="standard"
                                style={{
                                    alignItems: 'center'
                                }}
                                sx={{
                                    m: 1,
                                    minWidth: 250
                                }}
                            >
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                            </FormControl>
                        }
                        
                        {!modalLoading &&
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="error"
                                    
                                    onClick={() => {
                                        setBackgroundURL('')
                                        setWallpaperDialog(false);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    color="success"
                                    
                                    onClick={async () => {
                                        setModalLoading(true);

                                        setTimeout(async() => {
                                            await fetchNui('aspect_laptop:settings:setWallpaper', {
                                                Wallpaper: backgroundURL
                                            })

                                            setWallpaperDialog(false);
                                            setModalLoading(false)
                                            setBackgroundURL('')
                                        }, 1000)
                                    }}
                                >
                                    Set
                                </Button>
                            </DialogActions>
                        }
                    </FormControl>
                </Dialog>
            </div>
        </Zoom>
    )
}