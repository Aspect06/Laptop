import React from 'react';

import { useEffect, useState } from "react";
import styles from "./Laptop.module.scss";
import { fetchNui } from "../../hooks/fetchNui";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { Slide } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCar, faG } from "@fortawesome/free-solid-svg-icons";
import { useNavigationState } from './atoms/navigation';

import { Boosting } from "./components/Boosting/Boosting";
import { Settings } from "./components/Settings/Settings";
import { Gangs } from "./components/Gangs/Gangs";

import { Notifications } from './components/Notifications/Notifications';
import { isEnvBrowser } from '../../hooks/misc';

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

export const Laptop: React.FC = () => {
    const [Open, setOpen] = useState(false);
    const [navigationState, setNavigationState] = useNavigationState()
    const [laptopData, setLaptopData] = useState({
        Wallpaper: 'https://cdn.discordapp.com/attachments/1144648749122076793/1144667642658050078/image.png',
        DarkMode: false
    })
    const [isInGang, setInGang] = useState(true);

    const fetchData = async () => {
        if (!Open) { return; }
        const result = await fetchNui("aspect_laptop:fetchData");

        if (result) {
            if (result.Wallpaper === null) {
                result.Wallpaper === 'https://cdn.discordapp.com/attachments/1144648749122076793/1144667642658050078/image.png'
            }

            setLaptopData(result);
        }

        InGang();
    }

    const InGang = async () => {
        const gangs = await fetchNui('aspect_laptop:fetchInGang')

        setInGang(gangs)
    }

    useEffect(() => {
        fetchData();

        if (isEnvBrowser) {
            setOpen(true)
            setInGang(true)
        }
    }, [Open])

    useNuiEvent("aspect_laptop:toggleLaptop", () => {
        setOpen(!Open);
    })

    useNuiEvent('aspect_laptop:closeAllApps', () => {
        setNavigationState({
            path: 'Home',
        });
    })

    useNuiEvent("aspect_laptop:gangs:checkInGang", () => {
        InGang();
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                fetchNui("aspect_laptop:closeLaptop");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

    useNuiEvent('aspect_laptop:main:update', () => {
        fetchData();
    })

    return (
        <Slide
            direction="up"
            in={Open}
            unmountOnExit
            mountOnEnter
        >
            <div
                className={styles.main}
            >
                <div
                    className={styles.laptop}
                    style={{
                        backgroundImage: `url(${laptopData.Wallpaper})`,
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div
                        className={styles.navigationBar}
                    >
                        <div
                            className={styles.TaskCont}
                        >

                        </div>
                    </div>

                    <Notifications />
                    <Boosting />
                    <Settings
                        currentWallpaper={laptopData.Wallpaper}
                        darkFont={laptopData.DarkMode}
                    />
                    <Gangs />

                    <div className={styles.appContainers}>
                        {Apps.map((app, index) => {
                            if (!isInGang && app.Name === 'Gangs') {return}

                            return (
                                <div
                                    className="appContainer"
                                    key={index}
                                >
                                    <div
                                        className={styles.appIcon}
                                        style={{
                                            backgroundColor: app.Background,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            fontSize: "2.5vh"
                                        }}
                                        onClick={() => {
                                            setNavigationState({
                                                path: app.Name,
                                            });
                                        }}
                                    >
                                        <FontAwesomeIcon icon={app.Icon}/>
                                    </div>

                                    <div
                                        className={styles.appName}
                                        style={{
                                            color: laptopData.DarkMode ? "black" : "white"
                                        }}
                                    >
                                        {app.Name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Slide>
    )
}