import { useState } from "react";
import styles from "./Notification.module.scss";
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { fetchNui } from "../../../../hooks/fetchNui";
import Grid from '@mui/material/Grid';
import { Slide, Fade, Button, Typography } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCar, faG } from "@fortawesome/free-solid-svg-icons";

const Apps = [
    {
        Name: 'Boosting',
        Icon: faCar,
        Background: '#1d2029'
    },
    {
        Name: 'Settings',
        Icon: faGear,
        Background: "#4B5D67",
    },
    {
        Name: 'Gangs',
        Icon: faG,
        Background: '#1d2029'
    },
]

export const Notifications: React.FC = () => {
    const [Notifications, setNotifications] = useState([]);

    const addNotification = (Label: string, App: string) => {
        const newNotification = {
            label: Label,
            App: App,
            isRemoving: false
        };
        setNotifications(prevNotifications => [...prevNotifications, newNotification]);
    
        setTimeout(() => {
            setNotifications(prevNotifications =>
                prevNotifications.map((notification, index) =>
                    index === prevNotifications.length - 1 ? { ...notification, isRemoving: true } : notification
                )
            );
    
            setTimeout(() => {
                setNotifications(prevNotifications => prevNotifications.slice(1));
            }, 300);
        }, 2500);
    };

    useNuiEvent('aspect_laptop:createNotification', (data) => {
        addNotification(data.Label, data.App)
    })

    return (
        <Fade
            timeout={500}
            in={true}
        >
            <div
                className={styles.Main}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="baseline"
                    justifyContent="flex-start"
                    style={{
                        position: 'absolute',
                        bottom: '5%',
                    }}
                >
                    {Notifications.map((data, index) => {
                        for (const App of Apps) {
                            if (App.Name === data.App) {
                                return (
                                    <Grid
                                        item
                                        key={index}
                                    >
                                        <Slide
                                            direction={'left'}
                                            timeout={500}
                                            in={!data.isRemoving}
                                        >
                                            <div
                                                className={styles.NotificationContainer}
                                            >
                                                <div
                                                    style={{
                                                        float: 'right',
                                                        marginTop: '3%'
                                                    }}
                                                >
                                                    <div
                                                        className={styles.Icon}
                                                        style={{
                                                            backgroundColor: App.Background,
                                                            backgroundSize: "contain",
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundPosition: "center",
                                                            fontSize: "2.5vh"
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={App.Icon}/>
                                                    </div>
                                                </div>

                                                <div
                                                    className={styles.NotificationHeader}
                                                >
                                                    <Typography
                                                        style={{
                                                            marginTop: '1%',
                                                            fontWeight: 600,
                                                            fontSize: "2.25vh",
                                                            marginLeft: '1vh',
                                                            fontFamily: 'Inter',
                                                            marginBottom: '1rem',
                                                            color: '#fff',
                                                            userSelect: 'none'
                                                        }}
                                                    >
                                                        {App.Name}
                                                    </Typography>
                                                </div>

                                                <div
                                                    className={styles.NotificationContent}
                                                >
                                                    <Typography
                                                        style={{
                                                            float: 'left',
                                                            fontSize: "1.5vh",
                                                            marginLeft: '1vh',
                                                            fontFamily: 'Inter',
                                                            marginTop: '-6%',
                                                            color: '#fff',
                                                            userSelect: 'none'
                                                        }}
                                                    >
                                                        {data.label}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Slide>
                                    </Grid>
                                )
                            }
                        }
                    })}
                </Grid>
            </div>
        </Fade>
    )
}