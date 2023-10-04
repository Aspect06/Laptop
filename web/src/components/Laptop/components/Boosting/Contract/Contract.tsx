import { useEffect, useRef, useState } from "react";
import { useNavigationState } from "../../../atoms/navigation";
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { fetchNui } from "../../../../../hooks/fetchNui";
import styles from "./Contract.module.scss";
import {
    Slide,
    Typography,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    FormControl,
    Box,
    CircularProgress
} from "@mui/material";

export const Contract: React.FC = () => {
    const [startDialog, setStartDialogOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [transferDialog, setTransferDialogOpen] = useState(false);
    const [declineDialog, setDeclineDialogOpen] = useState(false);
    
    const [stateId, setStateId] = useState('');

    const [transfer, setTransferDialog] = useState({
        contractId: 0
    })

    const [dialogDecline, setDialogDecline] = useState({
        title: '',
        contractId: 0
    });

    const [dialog, setDialogData] = useState({
        title: '',
        description: '',
        contractId: 0,
    });

    const [navigationState, setNavigationState] = useNavigationState();
    const [Contracts, setContracts] = useState([
        {
            Id: 1,
            Class: 'D',
            Model: 'Blista',
            Plate: 'NE14ABJ',
            Cost: 50,
            InProgress: true,
        },
        {
            Id: 2, 
            Class: 'C',
            Model: 'Blista',
            Plate: 'NE14ABJ',
            Cost: 50,
            InProgress: false,
        }
    ])

    const fetchData = async () => {
        const result = await fetchNui('aspect_laptop:fetchContracts')

        if (result) {
            setContracts(result)
        }
    }

    useNuiEvent('aspect_laptop:boosting:updateContracts', (data) => {
        if (data) {
            setContracts(data)
        }
    })

    useEffect(() => {
        if (navigationState.path === 'Boosting') {
            fetchData();
        }
    }, [navigationState.path === 'Boosting'])

    return (
        <Slide
            direction="up"
            in={navigationState.path === "Boosting"}
            timeout={750}
            mountOnEnter
            unmountOnExit
        >
            <div
                className={styles.main}
            >
                {Contracts.length === 0 &&
                    <Typography
                        style={{
                            fontSize: "1.5vh",
                            color: "white",
                            marginLeft: "47%"
                        }}
                    >
                        Inbox empty... :(
                    </Typography>
                }

                {Contracts.length > 0 &&
                    <>
                        <Grid
                            container={true}
                            spacing={1}
                        >
                            {Contracts.map((data, index) => {
                                return (
                                    <Grid
                                        item={true}
                                        key={index}
                                    >
                                        <div
                                            className={styles.Card}
                                            key={index}
                                        >
                                            <div
                                                className={styles.Style}
                                            >
                                                <Typography
                                                    className={styles.ClassNumber}
                                                >
                                                    {data.Class}
                                                </Typography>

                                                <Typography
                                                    className={styles.Vehicle}
                                                >
                                                    {data.Model}
                                                </Typography>

                                                <Typography
                                                    className={styles.Crypto}
                                                >
                                                    {data.Cost / 2} Crypto

                                                </Typography>

                                                <Typography
                                                    className={styles.Plate}
                                                >
                                                    {data.Plate}
                                                </Typography>
                                                
                                                {data.InProgress &&
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            className={styles.ActionButton}
                                                            style={{
                                                                fontSize: "1.75vh",
                                                                marginTop: "7.5vh"
                                                            }}
                                                            disabled
                                                        >
                                                            Contract In Progress
                                                        </Button>

                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            className={styles.CancelButton}
                                                            style={{
                                                                fontSize: "1.75vh",
                                                            }}

                                                            onClick={() => {
                                                                console.log(data.Id + ' make this a dialog')
                                                                fetchNui('aspect_laptop:boosting:cancelContract', {
                                                                    Id: data.Id
                                                                })
                                                            }}
                                                        >
                                                            Cancel Contract
                                                        </Button>
                                                    </>
                                                }

                                                {!data.InProgress &&
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            className={styles.ActionButton}
                                                            style={{
                                                                fontSize: "1.75vh",
                                                            }}
                                                            onClick={() => {
                                                                setDialogData({
                                                                    title: 'Contract: ' + data.Class + ' | Vehicle: ' + data.Model,
                                                                    description: 'Vin scratch vehicle for ' + data.Cost + ' Crypto or do a regular drop!',
                                                                    contractId: data.Id
                                                                })
                                                                setStartDialogOpen(true);
                                                            }}
                                                        >
                                                            Start Contract
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            className={styles.ActionButton}
                                                            style={{
                                                                fontSize: "1.5vh",
                                                            }}
                                                            onClick={() => {
                                                                setTransferDialog({
                                                                    contractId: data.Id
                                                                })

                                                                setTransferDialogOpen(true)
                                                            }}
                                                        >
                                                            Transfer Contract
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            className={styles.ActionButton}
                                                            style={{
                                                                fontSize: "1.5vh",
                                                            }}
                                                            onClick={() => {
                                                                setDialogDecline({
                                                                    title: 'Decline contract ' + data.Class + ' class vehicle ' + data.Model + ' Contract Id ' + data.Id,
                                                                    contractId: data.Id
                                                                })
                                                                setDeclineDialogOpen(true);
                                                            }}
                                                        >
                                                            Decline Contract
                                                        </Button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>
                }

                <Dialog
                    open={startDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle
                        id="responsive-dialog-title"
                    >
                        {dialog.title}

                        <IconButton
                            className={styles.button}
                            style={{
                                marginLeft: "95%",
                                height: "3vh",
                                width: "3vh"
                            }}

                            onClick={() => {
                                setStartDialogOpen(false);
                                setDialogData({
                                    title: '',
                                    description: '',
                                    contractId: 0
                                })
                            }}
                        >
                            <i
                                style={{
                                    fontSize: "2vh"
                                }}
                                className={
                                    "fa-solid fa-xmark"
                                }
                            ></i>
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>{dialog.description}</DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{
                                marginRight: "27.5vh",
                                height: "5vh"
                            }}

                            onClick={() => {
                                setStartDialogOpen(false);
                                fetchNui('aspect_laptop:boosting:startBoost', {
                                    Type: 'Regular',
                                    contractId: dialog.contractId 
                                })

                                setDialogData({
                                    title: '',
                                    description: '',
                                    contractId: 0
                                })
                            }}
                        >
                            Regular Drop
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            style={{
                                height: "5vh"
                            }}

                            onClick={() => {
                                setStartDialogOpen(false);
                                fetchNui('aspect_laptop:boosting:startBoost', {
                                    Type: 'Vin Scratch',
                                    contractId: dialog.contractId 
                                })

                                setDialogData({
                                    title: '',
                                    description: '',
                                    contractId: 0
                                })

                            }}
                        >
                            Vin Scratch
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={transferDialog}
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
                            >
                                Transfer Contract
                            </DialogTitle>
                            
                            <TextField
                                margin="dense"
                                id="number"
                                label="State ID"
                                type="number"
                                fullWidth
                                variant="standard"
                                placeholder="1"
                                value={stateId}
                                sx={{
                                    fontWeight: 500,
                                    width: "87.5%",
                                    left: "7.5%",
                                    marginBottom: "10%"
                                }}
                                onChange={(e) => {
                                    setStateId(e.target.value)
                                }}
                            />

                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="error"
                                    
                                    onClick={() => {
                                        setTransferDialogOpen(false);
                                        setTransferDialog({
                                            contractId: 0
                                        })
                                        setStateId('');
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
                                            setModalLoading(false);
                                            setTransferDialogOpen(false);
                                            
                                            await fetchNui('aspect_laptop:boosting:transferContract', {
                                                contractId: transfer.contractId,
                                                targetStateId: stateId
                                            })

                                            fetchData();

                                            setTransferDialog({
                                                contractId: 0
                                            })
                                            setStateId('');
                                        }, 1000)
                                    }}
                                >
                                    Transfer
                                </Button>
                            </DialogActions>
                        </>
                    }
                </Dialog>

                <Dialog
                    open={declineDialog}
                    aria-labelledby="responsive-dialog-title"
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
                            >
                                Decline Contract
                            </DialogTitle>

                            <DialogContent>
                                <DialogContentText>
                                    {dialogDecline.title}
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="primary"

                                    onClick={() => {
                                        setDeclineDialogOpen(false);
                                        setDialogDecline({
                                            title: '',
                                            contractId: 0
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
                                            setModalLoading(false);
                                            setDeclineDialogOpen(false);

                                            await fetchNui('aspect_laptop:boosting:declineContract', {
                                                Id: dialogDecline.contractId
                                            })

                                            setDialogDecline({
                                                title: '',
                                                contractId: 0
                                            })

                                            fetchData();
                                        }, 1000)
                                    }}
                                >
                                    Decline
                                </Button>
                            </DialogActions>
                        </>
                    }
                </Dialog>
            </div>
        </Slide>
    )
}