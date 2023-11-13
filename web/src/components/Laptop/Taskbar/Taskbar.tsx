import React from 'react'
import { Typography } from '@mui/material'
import styles from './Taskbar.module.scss'
import { useNavigationState } from '../atoms/navigation';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCar, faG } from "@fortawesome/free-solid-svg-icons";

export const Taskbar: React.FC<{
    Apps: any,
    setNotificationContainer: any,
    notificationHolderState: any,
    MinimizedApps: any
}> = (props) => {
    const [navigationState, setNavigationState] = useNavigationState()
    const [date, setDate] = React.useState('0/0.0')
    const [clockShit, setClock] = React.useState('5:09 PM')

    React.useEffect(() => {!(function(): any {
            const date = new Date();
            const getDate = String(date.getDate());
            const getMonth = String(date.getMonth() + 1);
            const getYear = String(date.getFullYear());
            setDate(`${getMonth}/${getDate}/${getYear}`);
        })()
    }, [])

    function FormatTime(standIn) {
        if (standIn < 10) {
            standIn = '0' + standIn
        }
        return standIn;
    }

    function Clock() {
        const time = new Date()
        var hours = time.getHours()
        const AmPm = hours >= 12 ? 'PM' : 'AM';
        const minutes = time.getMinutes()

        hours = hours % 12;
        hours = hours ? hours : 12;

        setClock(FormatTime(hours + ":" + FormatTime(minutes)) + " " + AmPm)
    }

    function dateFunc() {
        const time = new Date()
        const day = time.getDate()
        const month = time.getMonth() + 1
        const year = time.getFullYear()
        setDate(day + "/" + month + "/" + year)
    }

    setInterval(dateFunc, 1000)
    setInterval(Clock, 1000);

    const shouldShow = (App: any) => {
        if (props.MinimizedApps[App]) return true;
        if (navigationState.path === App) return true;
    }

    return (
        <div
            className={styles.taskbar}
        >
            <div
                className={styles.mainIcons}
            >
                <div
                    className={styles.taskbarItem}
                >
                    <img 
                        src={'https://cdn.discordapp.com/attachments/1161956662974877719/1172941979408158810/system-windows-icon-png-4.png?ex=65622658&is=654fb158&hm=aad95a9ef041d482c6686014c6571c88240e3fceed8154413e30dce4755fac56&'}
                        alt='file-icon'
                        className={styles.icon}
                    />
                </div>
                <div
                    className={styles.taskbarItem}
                >
                    <img 
                        src={'https://cdn.discordapp.com/attachments/1161956662974877719/1172942755916419183/puuU9wPaTjj449R4A4HvAQVPvASRJkiTpo3eErGkYBFzd4QAAAABJRU5ErkJggg.png?ex=65622711&is=654fb211&hm=4f5cd3f324e3de075f5c3f11e1fc4c7cba457eebc42a24d078d5cda9c5072dff&'}
                        alt='file-icon'
                        className={styles.icon}
                    />
                </div>
                <div
                    className={styles.taskbarItem}
                >
                    <img 
                        src={'https://cdn.discordapp.com/attachments/1161956662974877719/1172942822287085651/r1dAoB0tgyAFX8Q3m9BsEhBCMABMDqMDxXOKZo8IieV5AcCIBXPHZ7KPkn9EAP4HZgtghxyitkEAAAAASUVORK5CYII.png?ex=65622721&is=654fb221&hm=a2eddd25ff92c4724cc87a04f1ddf24003474d06807591d6a9a942990634dc22&'}
                        alt='file-icon'
                        className={styles.icon}
                    />
                </div>

                {props.Apps.map((item: any, index: number) => {
                    return (shouldShow(item.Name) &&
                        <div
                            className={styles.taskbarItem}
                            onClick={() => {
                                setNavigationState({
                                    path: item.Name,
                                });
                            }}
                            style={{
                                backgroundColor: navigationState.path === item.Name ? '#ffffff14' : ''
                            }}
                        >
                            <div
                                className={styles.appIcon}
                                style={{
                                    backgroundColor: item.Background,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    fontSize: "2.5vh"
                                }}
                            >
                                <FontAwesomeIcon icon={item.Icon}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div
                className={styles.smallIcon}
            >
                <i
                    className='fas fa-cog fa-w-16 fa-fw fa-1x'
                    style={{
                        color: '#fff'
                    }}
                />
            </div>

            <div className={styles.smallIcon}>
                <i
                    style={{
                        color: '#fff'
                    }}
                    className='fas fa-wifi fa-w-16 fa-fw fa-1x'
                />
            </div>

            <div
                className={styles.systemTime}
            >
                <Typography
                    style={{
                        fontSize: '1em'
                    }}
                >
                    {clockShit}
                </Typography>
                <Typography
                    style={{
                        fontSize: '1em'
                    }}
                >
                    {date}
                </Typography>
            </div>

            <div
                className={styles.taskbarItem}
                onClick={() => {
                    props.setNotificationContainer(!props.notificationHolderState)
                }}
            >
                <img
                    className={styles.icon}
                    src={'https://i.imgur.com/wADOR0k.png'}
                />
            </div>
        </div>
    )
}