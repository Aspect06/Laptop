import { useState } from 'react';
import { useNavigationState } from "../../../atoms/navigation"
import {
    Slide,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    CircularProgress,
    Box,
    Select,
    MenuItem,
    InputLabel,
    TextField
} from "@mui/material";
import styles from "./Member.module.scss";
import { fetchNui } from '../../../../../hooks/fetchNui';

export const Member: React.FC<{
    activeTab: number,
    Members: any,
    permissions: boolean,
    gangName: string,
    ranks: any,
}> = (props) => {
    const [navigationState, setNavigationState] = useNavigationState();
    const [modalLoading, setModalLoading] = useState(false);

    const [kickModal, setKickModalOpen] = useState(false);
    
    const [updateRankModal, setRankModal] = useState(false);
    const [selectedRank, setSelectedRank] = useState('');

    const [selectedMember, setSelectedMember] = useState({
        Name: '',
        StateId: 0
    });

    return (
        <Slide
            in={navigationState.path === 'Gangs' && props.activeTab === 2}
            direction="up"
            timeout={750}
            unmountOnExit
        >
            <div
                className={styles.main}
            >
                <Grid
                    container={true}
                    spacing={1}
                >
                    {props.Members.map((data, index) => {
                        return (
                            <Grid
                                item={true}
                                key={index}
                            >
                                <div
                                    className={styles.Card}
                                    key={index}
                                >
                                    <Card
                                        style={{
                                            minWidth: 430,
                                            maxWidth: 430
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                style={{
                                                    userSelect: 'none',
                                                    fontSize: 15,
                                                    fontWeight: 100
                                                }}
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                {data.Rank}
                                            </Typography>
                                            
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                style={{
                                                    userSelect: 'none',
                                                }}
                                            >
                                                {data.Name}
                                            </Typography>
                                        </CardContent>
                                        {props.permissions && 
                                            <CardActions>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={async () => {
                                                        setSelectedMember({
                                                            Name: data.Name,
                                                            StateId: data.StateId
                                                        });
                                                        setKickModalOpen(true);
                                                    }}
                                                >
                                                    Kick Member
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={async () => {
                                                        setSelectedMember({
                                                            Name: data.Name,
                                                            StateId: data.StateId
                                                        });
                                                        setSelectedRank(data.Rank);
                                                        setRankModal(true);
                                                    }}
                                                >
                                                    Set Rank
                                                </Button>
                                            </CardActions>
                                        }
                                    </Card>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>

                <Dialog
                    open={kickModal}
                    aria-labelledby="responsive-dialog-title"
                >
                    {!modalLoading &&
                        <> 
                            <DialogTitle
                                id="responsive-dialog-title"
                            >
                                Kick Member
                            </DialogTitle>

                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to kick {selectedMember.Name} from gang {props.gangName}
                                </DialogContentText>
                            </DialogContent>
                        </>
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
                                color="primary"

                                onClick={() => {
                                    setKickModalOpen(false);
                                    setSelectedMember({
                                        Name: '',
                                        StateId: 0
                                    })
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                
                                onClick={async() => {
                                    setModalLoading(true);
                                    
                                    setTimeout(async() => {
                                        await fetchNui('aspect_laptop:gangs:kickMember', {
                                            GangName: props.gangName,
                                            stateId: selectedMember.StateId
                                        })

                                        setModalLoading(false);
                                        setKickModalOpen(false);
                                        setSelectedMember({
                                            Name: '',
                                            StateId: 0
                                        })
                                    }, 1000)
                                }}
                            >
                                Kick
                            </Button>
                        </DialogActions>
                    }
                </Dialog>

                <Dialog
                    open={updateRankModal}
                    aria-labelledby="responsive-dialog-title"
                >
                    {!modalLoading &&
                        <DialogTitle
                            id="responsive-dialog-title"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            Setting rank
                        </DialogTitle>
                    }

                    {!modalLoading &&
                        <>
                            <FormControl
                                variant="filled"
                                sx={{
                                    m: 1,
                                    minWidth: 120
                                }}
                            >
                                <TextField
                                    id="filled-basic"
                                    label="Name"
                                    variant="filled"
                                    value={selectedMember.Name}
                                    disabled
                                />
                            </FormControl>

                            <FormControl
                                variant="filled"
                                sx={{
                                    m: 1,
                                    minWidth: 120
                                }}
                            >
                                <InputLabel id="demo-simple-select-filled-label">Rank</InputLabel>

                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={selectedRank}
                                >
                                    {props.ranks.map((Aspect) => (
                                        <MenuItem
                                            key={Aspect}
                                            value={Aspect.label}
                                            onClick={() => {
                                                setSelectedRank(Aspect.label)
                                            }}
                                        >
                                            {Aspect.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
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
                                    setRankModal(false);
                                    setSelectedMember({
                                        Name: '',
                                        StateId: 0
                                    })
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                color="success"
                                
                                onClick={async() => {
                                    setModalLoading(true);
                                    
                                    setTimeout(async() => {
                                        await fetchNui('aspect_laptop:gangs:setRank', {
                                            StateId: selectedMember.StateId,
                                            Rank: selectedRank,
                                            GangName: props.gangName
                                        })

                                        setModalLoading(false);
                                        setRankModal(false);
                                        setSelectedMember({
                                            Name: '',
                                            StateId: 0
                                        })
                                    }, 1000)
                                }}
                            >
                                Set Rank
                            </Button>
                        </DialogActions>
                    }
                </Dialog>
            </div>
        </Slide>
    )
}