import React from "react";
import { useNavigationState } from "../../../atoms/navigation";
import { fetchNui } from "../../../../../hooks/fetchNui";

import { Slide, Button, Typography, TablePagination } from "@mui/material"
import styles from './Gang.module.scss' 

export const Main: React.FC<{
    Gang: any
}> = (props) => {
    const [navigationState, setNavigationState] = useNavigationState()
    
    return (
        <Slide
            in={navigationState.path === "Gangs"}
            direction={'up'}
            timeout={750}
        >
            <div
                className={styles.main}
            >
                <Typography
                    style={{
                        userSelect: 'none',
                        fontSize: "2vh",
                        color: "white",
                        textAlign: "center",
                        fontFamily: "Inter",
                    }}
                >
                    Gang Name
                </Typography>

                <Typography
                    style={{
                        userSelect: 'none',
                        fontSize: '3vh',
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Inter'
                    }}
                >
                    {props.Gang.GangName}
                </Typography>

                <div
                    style={{
                        zIndex: '1',
                        position: 'absolute',
                        marginLeft: "15%",
                        marginTop: "6%",
                        transform: "translate(50px, 0px)"
                    }}
                >
                    <Typography
                        className={styles.BoxTextHeader}
                    >
                        Max Members
                    </Typography>

                    <Typography
                        className={styles.BoxText}
                    >
                        15
                    </Typography>
                </div>

                <div
                    style={{
                        float: 'right',
                        marginRight: "17.5%",
                        marginTop: "6%",
                        transform: "translate(50px, 0px)"
                    }}
                >
                    <Typography
                        className={styles.BoxTextHeader}
                    >
                        Reputation
                    </Typography>

                    <Typography
                        className={styles.BoxText}
                    >
                        {props.Gang.Progression.Sprays.Placed.length + props.Gang.Progression.Weed.BaggiesSold.length + props.Gang.Progression.Meth.BaggiesSold.length / 10}%
                    </Typography>
                </div>

                <div
                    style={{
                        marginTop: "1%",
                        position: "absolute",
                        marginLeft: "37%",
                        transform: "translate(50px, 0px)"
                    }}
                >
                    <Typography
                        style={{
                            userSelect: 'none',
                            fontSize: "2.5vh",
                            color: "white",
                            textAlign: "center",
                            marginTop: "25%",
                            fontFamily: "Inter",
                        }}
                    >
                        Toggle Discovered Graffiti
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"

                        style={{
                            marginTop: "1%",
                            position: "absolute",
                            marginLeft: "23.5%",
                            transform: "translate(30px, 0px)"
                        }}

                        onClick={async () => {
                            await fetchNui('aspect_laptop:gangs:toggleDiscoveredGraffiti')
                        }}
                    >
                        Toggle
                    </Button>
                </div>
            </div>
        </Slide>
    )
}