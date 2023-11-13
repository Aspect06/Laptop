import React from 'react';
import styles from './NotificationHolder.module.scss'
import { Slide, Tooltip, Typography, IconButton } from '@mui/material'

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

export const NotificationHolder: React.FC<{
    containerOpen: boolean;
    cachedNotifications: any;
    setCachedNotifications: any;
}> = (props) => {
    return (
        <Slide
            in={props.containerOpen}
            direction={'left'}
            timeout={500}
        >
            <div
                className={styles.notificationHolderContainer}
            >
                <Typography variant="h1" className={styles.headerTitle} style={{ color: '#fff'}}>Notifications</Typography>

                <Tooltip
                    title={'Clear Notifications'}
                    placement={'bottom'}
                >
                    <IconButton
                        style={{
                            position: "absolute",
                            zIndex: '1',
                            marginLeft: '90%',
                            marginTop: "-2.75vh",
                            height: "3vh",
                            width: "3vh"
                        }}
                        onClick={() => props.setCachedNotifications([])}
                    >
                        <i
                            className={"fa-solid fa-xmark"}
                            style={{ fontSize: "2vh" }}
                        />
                    </IconButton>
                </Tooltip>

                <div
                    className={styles.notificationsContainer}
                >
                    {props.cachedNotifications.map((data, index) => {
                        for (const App of Apps) {
                            if (App.Name === data.App) {
                                return (
                                    <div
                                        className={styles.NotificationContainer}
                                    >
                                        <div
                                            style={{
                                                float: 'right',
                                                marginTop: '3%',
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
                                                    color: '#fff',
                                                    userSelect: 'none'
                                                }}
                                            >
                                                {data.label}
                                            </Typography>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </div>
        </Slide>
    )
} 