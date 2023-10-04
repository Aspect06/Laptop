import { useState } from 'react';
import { useNavigationState } from "../../../atoms/navigation"
import styles from "./Progression.module.scss";
import { fetchNui } from '../../../../../hooks/fetchNui';

import { Slide, Grid, Card, CardContent, Typography, Paper, Box } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export const Progression: React.FC<{
    activeTab: number,
    gangProgress: any
}> = (props) => {
    const [navigationState, setNavigationState] = useNavigationState();

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
    }));

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#ff003749',
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#ff0039',
        },
    }));

    return (
        <Slide
            in={navigationState.path === 'Gangs' && props.activeTab === 1}
            direction="up"
            timeout={750}
            unmountOnExit
        >
            <div
                className={styles.main}
            >
                <Grid
                    container={true}
                    key={1}
                    spacing={2}
                >
                    <Grid
                        item={true}
                        key={1}
                    >
                        <div
                            className={styles.Card}
                        >
                            <CardContent>
                                <Paper
                                    elevation={3}
                                    style={{
                                        margin: 'auto',
                                        width: "50%",
                                        borderRadius: "50%"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gap: 2,
                                        }}
                                    >
                                        <Item
                                            key={1}
                                            elevation={1}
                                        >
                                            <Typography
                                                component="span"
                                                style={{
                                                    fontFamily: 'Inter',
                                                    fontSize: '4vh',
                                                    alignItems: 'center',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                {props.gangProgress.Sprays.Placed.length}
                                            </Typography>
                                        </Item>
                                    </Box>
                                </Paper>

                                <Typography
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '2vh',
                                        color: '#fff',
                                        fontFamily: 'Inter',
                                        marginTop: '1vh',
                                        userSelect: 'none'
                                    }}
                                >
                                    Sprays
                                </Typography>

                                <Typography
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '2vh',
                                        color: '#fff',
                                        fontFamily: 'Inter',
                                        marginTop: '1vh',
                                        userSelect: 'none'
                                    }}
                                >
                                    Level {props.gangProgress.Sprays.Level}
                                </Typography>

                                <div
                                    style={{
                                        marginTop: '3vh'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 1
                                        }}
                                    >
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={props.gangProgress.Sprays.Placed.length * 10 / props.gangProgress.Sprays.ToPlace * 10}
                                            style={{
                                                userSelect: 'none'
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        style={{
                                            float: 'right',
                                            color: 'white',
                                            marginTop: '0.75vh',
                                            fontSize: '1.75vh',
                                            fontFamily: 'Inter',
                                            userSelect: 'none'
                                        }}
                                    >
                                        {props.gangProgress.Sprays.Placed.length} / {props.gangProgress.Sprays.ToPlace}
                                    </Typography>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>

                    <Grid
                        item={true}
                        key={2}
                    >
                        <div
                            className={styles.Card}
                        >
                            <CardContent>
                                <Paper
                                    elevation={3}
                                    style={{
                                        margin: 'auto',
                                        width: "50%",
                                        borderRadius: "50%"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gap: 2,
                                        }}
                                    >
                                        <Item
                                            key={1}
                                            elevation={1}
                                        >
                                            <Typography
                                                component="span"
                                                style={{
                                                    fontFamily: 'Inter',
                                                    fontSize: '4vh',
                                                    alignItems: 'center',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                {props.gangProgress.Weed.BaggiesSold.length}
                                            </Typography>
                                        </Item>
                                    </Box>
                                </Paper>

                                <Typography
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '2vh',
                                        color: '#fff',
                                        fontFamily: 'Inter',
                                        marginTop: '1vh',
                                        userSelect: 'none'
                                    }}
                                >
                                    Weed
                                </Typography>

                                <Typography
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '2vh',
                                        color: '#fff',
                                        fontFamily: 'Inter',
                                        marginTop: '1vh',
                                        userSelect: 'none'
                                    }}
                                >
                                    Level {props.gangProgress.Weed.Level}
                                </Typography>

                                <div
                                    style={{
                                        marginTop: '3vh'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 1
                                        }}
                                    >
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={props.gangProgress.Weed.BaggiesSold.length * 10 / props.gangProgress.Weed.BaggiesToSell * 10}
                                            style={{
                                                userSelect: 'none'
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        style={{
                                            float: 'right',
                                            color: 'white',
                                            marginTop: '0.75vh',
                                            fontSize: '1.75vh',
                                            fontFamily: 'Inter',
                                            userSelect: 'none'
                                        }}
                                    >
                                        {props.gangProgress.Weed.BaggiesSold.length} / {props.gangProgress.Weed.BaggiesToSell}
                                    </Typography>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>

                    <Grid
                        item={true}
                        key={3}
                    >
                        <div
                            className={styles.Card}
                        >
                            <CardContent>
                                <Paper
                                    elevation={3}
                                    style={{
                                        margin: 'auto',
                                        width: "50%",
                                        borderRadius: "50%"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gap: 2,
                                        }}
                                    >
                                        <Item
                                            key={1}
                                            elevation={1}
                                        >
                                            <Typography
                                                component="span"
                                                style={{
                                                    fontFamily: 'Inter',
                                                    fontSize: '4vh',
                                                    alignItems: 'center',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                {props.gangProgress.Meth.BaggiesSold.length}
                                            </Typography>
                                        </Item>
                                    </Box>
                                </Paper>

                                <Typography
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '2vh',
                                        color: '#fff',
                                        fontFamily: 'Inter',
                                        marginTop: '1vh',
                                        userSelect: 'none'
                                    }}
                                >
                                    Meth
                                </Typography>

                                <Typography
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '2vh',
                                        color: '#fff',
                                        fontFamily: 'Inter',
                                        marginTop: '1vh',
                                        userSelect: 'none'
                                    }}
                                >
                                    Level {props.gangProgress.Meth.Level}
                                </Typography>

                                <div
                                    style={{
                                        marginTop: '3vh'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 1
                                        }}
                                    >
                                        <BorderLinearProgress
                                            variant="determinate"
                                            style={{
                                                userSelect: 'none'
                                            }}
                                            value={props.gangProgress.Meth.BaggiesSold.length * 10 / props.gangProgress.Meth.BaggiesToSell * 10}
                                        />
                                    </Box>

                                    <Typography
                                        style={{
                                            float: 'right',
                                            color: 'white',
                                            marginTop: '0.75vh',
                                            fontSize: '1.75vh',
                                            fontFamily: 'Inter',
                                            userSelect: 'none'
                                        }}
                                    >
                                        {props.gangProgress.Meth.BaggiesSold.length} / {props.gangProgress.Meth.BaggiesToSell}
                                    </Typography>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Slide>
    )
}