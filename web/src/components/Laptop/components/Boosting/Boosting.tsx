import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./Boosting.module.scss";
import { useNavigationState } from "../../atoms/navigation";
import { fetchNui } from "../../../../hooks/fetchNui";
import { Zoom, Typography, IconButton, Button, CircularProgress, LinearProgress } from "@mui/material";
import { Contract } from './Contract/Contract'

export const Boosting: React.FC<{
    MinimizedApps: any
}> = (props) => {
    const [navigationState, setNavigationState] = useNavigationState();
    const [queueText, setQueueText] = useState('Join Queue');
    const [joiningQueue, setJoiningQueue] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Contracts')
    const [boostingData, setBoostingData] = useState({
        Level: 'D',
        ProgLevel: 'C',
        Progress: 22
    });

    const fetchData = async () => {
        const result = await fetchNui('aspect_laptop:boostingData')

        if (result) {
            setBoostingData(result)
        }

        const inQueue = await fetchNui('aspect_laptop:boosting:isInQueue')

        if (!inQueue) {
            setQueueText('Join Queue')
        } else {
            setQueueText('Leave Queue')
        }
    }

    useEffect(() => {
        if (navigationState.path === 'Boosting') {
            fetchData();
        }
    }, [navigationState.path === 'Boosting'])

    return (
        <Zoom
            in={navigationState.path === "Boosting"}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.main}>
                <Draggable
                    handle="section"
                >
                    <div
                        className={styles.boostingContainer}
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
                                Boosting
                            </Typography>

                            <IconButton
                                style={{
                                    marginLeft: "91%",
                                    height: "3vh",
                                    width: "3vh"
                                }}

                                onClick={() => {
                                    props.MinimizedApps['Boosting'] = true
                                    setNavigationState({
                                        path: 'Home',
                                    });
                                }}
                            >
                                <i
                                    style={{
                                        fontSize: "2vh"
                                    }}
                                    className={"fa-solid fa-minus"}
                                />
                            </IconButton>

                            <IconButton
                                style={{
                                    height: "3vh",
                                    width: "3vh"
                                }}

                                onClick={() => {
                                    props.MinimizedApps['Boosting'] = false
                                    setNavigationState({
                                        path: 'Home',
                                    });
                                }}
                            >
                                <i
                                    className={"fa-solid fa-xmark"}
                                    style={{
                                        fontSize: "2vh"
                                    }}
                                />
                            </IconButton>
                        </section>

                        <div
                            className={styles.Actions}
                            style={{
                                width: "100%",
                                marginTop: "3vh",
                                height: "4vh"
                            }}
                        >
                            <Button
                                style={{
                                    fontFamily: "Inter",
                                    float: "right",
                                    marginRight: "2vh",
                                    height: "4vh",
                                    width: "15vh",
                                    fontSize: "1.5vh",
                                    borderRadius: "0.25vh",
                                }}
                                disabled={joiningQueue}
                                variant="contained"
                                onClick={() => {
                                    setJoiningQueue(true)

                                    setTimeout(() => {
                                        setJoiningQueue(false)
                                        
                                        if (queueText === 'Join Queue') {
                                            fetchNui('aspect_laptop:boosting:queueToggle', {
                                                Toggle: true
                                            })

                                            setQueueText('Leave Queue')
                                        } else {
                                            fetchNui('aspect_laptop:boosting:queueToggle', {
                                                Toggle: false
                                            })

                                            setQueueText('Join Queue')
                                        }
                                    }, 1000)
                                }}
                            >
                                {joiningQueue &&
                                    <CircularProgress
                                        size={20}
                                        style={{
                                            height: "2vh",
                                            width: "2vh",
                                            marginRight: "1vh",
                                            color: '#fff',
                                        }}
                                    />
                                }
                                {queueText}
                            </Button>

                            <Button
                                variant={selectedTab === 'Contracts' ? 'contained' : 'text'}
                                style={{
                                    float: 'left',
                                    fontFamily: "Inter",
                                    marginLeft: "2vh",
                                    height: "4vh",
                                    width: "12.5vh",
                                    fontSize: "1.5vh",
                                    color: 'white',
                                    borderRadius: "0.25vh",
                                    backgroundColor: selectedTab === 'Contracts' ? '#181820' : 'transparent'
                                }}
                                onClick={() => setSelectedTab('Contracts')}
                            >
                                Contracts
                            </Button>

                            <Button
                                variant={selectedTab === 'Auctions' ? 'contained' : 'text'}
                                style={{
                                    float: 'left',
                                    fontFamily: "Inter",
                                    marginLeft: "1vh",
                                    height: "4vh",
                                    width: "12.5vh",
                                    fontSize: "1.5vh",
                                    color: 'white',
                                    borderRadius: "0.25vh",
                                    backgroundColor: selectedTab === 'Auctions' ? '#181820' : 'transparent'
                                }}
                                onClick={() => setSelectedTab('Auctions')}
                            >
                                Auctions
                            </Button>
                        </div>

                        {selectedTab === 'Contracts' &&
                            <>
                                <div
                                    style={{
                                        marginTop: "2vh"
                                    }}
                                >
                                    <Typography
                                        style={{
                                            float: "left",
                                            marginLeft: "2vh",
                                            marginTop: "-1vh",
                                            color: "#fff",
                                            fontSize: "1.75vh",
                                            userSelect: 'none'
                                        }}
                                    >
                                        {boostingData.Level}
                                    </Typography>

                                    <div
                                        className={styles.Progress}
                                        style={{
                                            height: "0.5vh",
                                            width: "92.5%",
                                            marginLeft: "5vh",
                                            borderRadius: "1vh",
                                            color: "white",
                                            fontSize: "2vh"
                                        }}
                                    >

                                        <LinearProgress
                                            style={{
                                                borderRadius: 5,
                                                height: "0.5vh",
                                                width: "100%"
                                            }}
                                            variant="determinate"
                                            value={boostingData.Progress}
                                        />
                                    </div>

                                    <Typography
                                        style={{
                                            float: "right",
                                            marginRight: "2%",
                                            marginTop: "-1%",
                                            color: "#fff",
                                            fontSize: "1.75vh",
                                            userSelect: 'none'
                                        }}
                                    >
                                        {boostingData.ProgLevel}
                                    </Typography>
                                </div>

                                <Contract />
                            </>
                        }
                    </div>
                </Draggable>
            </div>
        </Zoom>
    )
}