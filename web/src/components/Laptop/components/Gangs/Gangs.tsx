import { useEffect, useState } from "react";
import styles from "./Gangs.module.scss";
import { useNavigationState } from "../../atoms/navigation";
import { fetchNui } from "../../../../hooks/fetchNui";
import { useNuiEvent } from "../../../../hooks/useNuiEvent";

import {
    Zoom,
    Typography,
    IconButton,
    Box,
    Tab,
    Tabs,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    DialogActions,
    Select,
    MenuItem,
    CircularProgress,
    InputLabel,
    FormControl
} from "@mui/material";
import Draggable from "react-draggable";

import { Member } from "./Member/Member"
import { Main } from "./Gang/Gang";
import { Progression } from "./Progression/Progression";
import { Management } from "./Management/Management"
import { Logs } from "./Logs/Logs"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function Item(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Gangs: React.FC = () => {
    const [navigationState, setNavigationState] = useNavigationState();
    const [activeTab, setActiveTab] = useState();
    const [permissions, setManagePermissions] = useState(false);

    const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

    const [stateId, setStateId] = useState('');
    const [rank, setRank] = useState('Member');

    const [modalLoading, setModalLoading] = useState(false);

    const [Gang, setGang] = useState({
        GangName: 'Aspects Gang',
        
        Members: [
            {
                StateId: 1,
                Name: 'Aspect',
                Rank: 'Leader'
            },
            {
                StateId: 2,
                Name: 'Aspect',
                Rank: 'Leader'
            },
            {
                StateId: 3,
                Name: 'Aspect',
                Rank: 'Member'
            },
            {
                StateId: 4,
                Name: 'Aspect',
                Rank: 'Member'
            },
        ],

        Progression: {
            Logs: {
                Actions: [
                    {
                        name: 'James Williams',
                        action: 'Kicked Navid from Aspect Ganga.',
                        timestamp: '21:06'
                    },

                    {
                        name: 'James Williams',
                        action: 'Kicked Navid from Aspect Ganga.',
                        timestamp: '21:06'
                    },

                    {
                        name: 'James Williams',
                        action: 'Kicked Navid from Aspect Ganga.',
                        timestamp: '21:06'
                    },

                    {
                        name: 'James Williams',
                        action: 'Kicked Navid from Aspect Ganga.',
                        timestamp: '21:06'
                    },

                    {
                        name: 'James Williams',
                        action: 'Kicked Navid from Aspect Ganga.',
                        timestamp: '21:06'
                    },

                    {
                        name: 'James Williams',
                        action: 'Kicked Navid from Aspect Ganga.',
                        timestamp: '21:06'
                    }
                ],

                WeedProfit: 1000,
                MethProfit: 1000,

                Weed: [
                    {
                        drug: "Weed",
                        name: "James Williams",
                        date: "Wed Aug 30 01:23:48 2023",
                        amount: 1,
                        price: 100
                    },
                ],

                Meth: [
                    {
                        drug: "Meth",
                        name: "James Williams",
                        date: "Wed Aug 30 01:23:48 2023",
                        amount: 1,
                        price: 200
                    },
                ]
            },

            Sprays: {
                Placed: [
                    {
                        Id: 1,
                        Coords: {
                            y: -2715.779052734375,
                            z: 14.280086517333984,
                            x: -840.399658203125
                        }
                    }
                ],
                ToPlace: 20,
                Level: 1
            },
            
            Weed: {
                BaggiesSold: [
                    {
                        drug: "Weed",
                        name: "James Williams",
                        date: "Wed Aug 30 01:23:48 2023",
                        amount: 1,
                        price: 100000
                    },
                ],
                BaggiesToSell: 50,
                Level: 2
            },

            Meth: {
                BaggiesSold: [
                    {
                        drug: "Meth",
                        name: "James Williams",
                        date: "Wed Aug 30 01:23:48 2023",
                        amount: 1,
                        price: 100000
                    },
                ],
                BaggiesToSell: 100,
                Level: 3
            }
        },

        Ranks: [
            {
                managePermissions: true,
                label: 'Leader',
                disabled: true
            },
            {
                managePermissions: false,
                label: 'Aspect',
                disabled: false
            },
            {
                managePermissions: true,
                label: 'Navid',
                disabled: false
            },
            {
                managePermissions: false,
                label: 'Member',
                disabled: true
            }
        ]
    })

    const InitializeGang = async () => {
        const GangData = await fetchNui('aspect_laptop:gangs:fetchGang')

        if (GangData) {
            setGang(GangData)
        }
    }

    const fetchData = async () => {
        const Character = await fetchNui('aspect_laptop:gangs:fetchCharacterData')

        if (Character) {
            const roleData = await fetchNui('aspect_laptop:gangs:getRoleData', {
                Role: Character.Rank,
                GangName: Gang.GangName
            })

            setManagePermissions(roleData)
        }
    }

    useEffect(() => {
        if (navigationState.path === 'Gangs') {
            fetchData();
            InitializeGang();
        }
    }, [navigationState.path == 'Gangs'])

    useNuiEvent('aspect_laptop:gangs:fetchGang', () => {
        InitializeGang();
    })

    return (
        <Zoom
            in={navigationState.path === "Gangs"}
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
                        className={styles.gangsContainer}
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
                                Gangs
                            </Typography>

                            <IconButton
                                className={styles.button}
                                style={{
                                    marginLeft: "94.5%",
                                    height: "3vh",
                                    width: "3vh"
                                }}

                                onClick={() => {
                                    setActiveTab(undefined);
                                    setNavigationState({
                                        path: 'Home',
                                    });
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

                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <Tabs
                                value={activeTab}
                                onChange={(e, value) => {
                                    setActiveTab(value)
                                }}
                                aria-label="basic tabs example"
                            >
                                <Tab
                                    label="Gang"
                                    {...Item(0)}
                                />
                                <Tab
                                    label="Progress"
                                    {...Item(1)}
                                />
                                <Tab
                                    label="Member Management"
                                    {...Item(2)}
                                />
                                {permissions &&
                                    <Tab
                                        label="Logs"
                                        {...Item(3)}
                                    />
                                }
                            </Tabs>

                            <Management
                                permissions={permissions}
                                ranks={Gang.Ranks}
                                gangName={Gang.GangName}
                                tab={activeTab}
                            />
                        </Box>
                        
                        <CustomTabPanel
                            value={activeTab}
                            index={0}
                        >
                            <Main
                                Gang={Gang}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel
                            value={activeTab}
                            index={1}
                        >
                            <Progression
                                activeTab={activeTab}
                                gangProgress={Gang.Progression}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel
                            value={activeTab}
                            index={2}
                        >
                            <Typography
                                style={{
                                    userSelect: 'none',
                                    fontSize: "2vh",
                                    color: "white",
                                    textAlign: "center"
                                }}
                            >
                                Members ({Gang.Members.length})
                            </Typography>
                            {permissions &&
                                <Button
                                    variant="contained"
                                    color="success"
                                    style={{
                                        marginTop: "1%",
                                        position: "absolute",
                                        marginLeft: "40.5%",
                                        transform: "translate(50px, 0px)",
                                        fontFamily: "Inter"
                                    }}
                                    onClick={() => {
                                        if (Gang.Members.length < 15) {
                                            setAddMemberDialogOpen(true);
                                        }
                                    }}
                                >
                                    Add Member
                                </Button>
                            }

                            {!permissions &&
                                <Button
                                    variant="contained"
                                    color="error"
                                    style={{
                                        marginTop: "1%",
                                        position: "absolute",
                                        marginLeft: "40.5%",
                                        transform: "translate(50px, 0px)",
                                        fontFamily: "Inter"
                                    }}
                                    onClick={async() => {
                                        await fetchNui('aspect_laptop:gangs:leaveGang', {
                                            Gang: Gang.GangName
                                        })

                                        setNavigationState({
                                            path: 'Home',
                                        });
                                    }}
                                >
                                    Leave Gang
                                </Button>
                            }
                        </CustomTabPanel>
                        <CustomTabPanel
                            value={activeTab}
                            index={3}
                        >
                            <Logs
                                permissions={permissions}
                                tab={activeTab}
                                logs={Gang.Progression.Logs}
                            />
                        </CustomTabPanel>
                        <Member
                            activeTab={activeTab}
                            Members={Gang.Members}
                            permissions={permissions}
                            gangName={Gang.GangName}
                            ranks={Gang.Ranks}
                        />
                    </div>
                </Draggable>

                <Dialog
                    open={addMemberDialogOpen}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            m: 1,
                            minWidth: 250
                        }}
                    >
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
                            <>
                                <DialogTitle
                                    id="responsive-dialog-title"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    Add Member
                                </DialogTitle>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                    <TextField
                                        margin="dense"
                                        id="number"
                                        label="State ID"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        placeholder="1"
                                        value={stateId}
                                        onChange={(e) => {
                                            setStateId(e.target.value)
                                        }}
                                    />
                                </FormControl>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-filled-label">Rank</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={rank}
                                        onChange={(e) => {
                                            setRank(e.target.value)
                                        }}
                                    >
                                        {Gang.Ranks.map((Aspect) => (
                                            <MenuItem
                                                value={Aspect.label}>
                                                {Aspect.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </>
                        }
                        
                        {!modalLoading &&
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="error"
                                    
                                    onClick={() => {
                                        setAddMemberDialogOpen(false);
                                        setStateId('');
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
                                            setModalLoading(false);
                                            setAddMemberDialogOpen(false);

                                            await fetchNui('aspect_laptop:gangs:addMember', {
                                                GangName: Gang.GangName,
                                                Rank: rank,
                                                stateId: stateId
                                            })

                                            setStateId('');
                                        }, 1000)
                                    }}
                                >
                                    Add
                                </Button>
                            </DialogActions>
                        }
                    </FormControl>
                </Dialog>
            </div>
        </Zoom>
    )
}