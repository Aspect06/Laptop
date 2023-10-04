import React from 'react';
import { useNavigationState } from "../../../atoms/navigation"
import {
    Fade,
    MenuItem,
    Menu,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    DialogActions,
    FormControlLabel,
    Checkbox,
    FormControl,
    Box,
    CircularProgress,
    InputLabel,
    Select
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';

import { fetchNui } from '../../../../../hooks/fetchNui';

export const Management: React.FC<{
    permissions: boolean,
    ranks: any,
    gangName: string,
    tab: number
}> = (props) => {
    const [navigationState, setNavigationState] = useNavigationState();
    const [modalLoading, setModalLoading] = React.useState(false);
    
    const [createRankOpen, setCreateRankOpen] = React.useState(false);
    const [createRankName, setCreateRankName] = React.useState('');
    const [managePermissions, setManagePermissions] = React.useState(false);

    const [editRankOpen, setEditRank] = React.useState(false);
    const [selectedRank, setSelectedRank] = React.useState({
        label: '',
        checked: false
    });

    const [manageRanksOpen, setManageRanksOpen] = React.useState(false);
    const [selectedManageRank, setSelectedManageRank] = React.useState('');

    const [dropDownOpen, setDropdownOpen] = React.useState(null);
    const open = Boolean(dropDownOpen);

    return (
        <Fade
            in={navigationState.path === 'Gangs' && props.tab == 2}
            timeout={750}
        >
            <div
                style={{
                    position: 'relative',
                    marginTop: '0.25%',
                    float: 'right'
                }}
            >
                {props.permissions &&
                    <>
                        <Tooltip
                            title="Manage Gang"
                            placement="bottom"
                        >
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={(e) => {
                                    setDropdownOpen(e.currentTarget)
                                }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={dropDownOpen}
                            open={open}
                            onClose={() => {
                                setDropdownOpen(null);
                            }}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    setDropdownOpen(null);

                                    setEditRank(true);
                                }}
                            >
                                Edit Ranks
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setDropdownOpen(null);

                                    setManageRanksOpen(true);
                                }}
                            >
                                Manage Ranks
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setDropdownOpen(null);

                                    setCreateRankOpen(true);
                                }}
                            >
                                Create Rank
                            </MenuItem>
                        </Menu>
                    </>
                }

                <Dialog
                    open={createRankOpen}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            m: 1,
                            minWidth: 250
                        }}
                    >
                        {!modalLoading &&
                            <DialogTitle
                                id="responsive-dialog-title"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                Create Rank
                            </DialogTitle>
                        }

                        {!modalLoading &&
                            <>
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        m: 1,
                                        minWidth: 250
                                    }}
                                >
                                    <FormControl
                                        variant="filled"
                                        sx={{
                                            m: 1,
                                            minWidth: 120
                                        }}
                                    >
                                        <TextField
                                            id="filled-basic"
                                            label="Rank Name"
                                            variant="filled"
                                            value={createRankName}
                                            onChange={(e) => {
                                                setCreateRankName(e.target.value)
                                            }}
                                        />
                                    </FormControl>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={managePermissions}
                                                onChange={() => {
                                                    setManagePermissions(!managePermissions)
                                                }}
                                            />
                                        }
                                        label="Manage Gang Permissions"
                                    />
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
                                        setCreateRankName('')
                                        setCreateRankOpen(false);
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
                                            await fetchNui('aspect_laptop:gangs:createRank', {
                                                GangName: props.gangName,
                                                Name: createRankName,
                                                Checked: managePermissions
                                            })
                                            
                                            setCreateRankOpen(false);
                                            setModalLoading(false)
                                            setCreateRankName('')
                                        }, 1000)
                                    }}
                                >
                                    Create
                                </Button>
                            </DialogActions>
                        }
                    </FormControl>
                </Dialog>

                <Dialog
                    open={editRankOpen}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            m: 1,
                            minWidth: 250
                        }}
                    >
                        {!modalLoading &&
                            <DialogTitle
                                id="responsive-dialog-title"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                Edit Rank
                            </DialogTitle>
                        }

                        {!modalLoading &&
                            <>
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        m: 1,
                                        minWidth: 250
                                    }}
                                >
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
                                            value={selectedRank.label}
                                        >
                                            {props.ranks.map((Aspect) => (
                                                <MenuItem
                                                    key={Aspect}
                                                    value={Aspect.label}
                                                    disabled={Aspect.disabled}
                                                    onClick={() => {
                                                        setSelectedRank({
                                                            label: Aspect.label,
                                                            checked: Aspect.managePermissions
                                                        })
                                                    }}
                                                >
                                                    {Aspect.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRank.checked}
                                                onChange={() => {
                                                    setSelectedRank({
                                                        label: selectedRank.label,
                                                        checked: !selectedRank.checked
                                                    })
                                                }}
                                            />
                                        }
                                        label="Manage Gang Permissions"
                                    />
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
                                        setCreateRankName('')
                                        setEditRank(false);
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
                                            await fetchNui('aspect_laptop:gangs:updateRank', {
                                                GangName: props.gangName,
                                                Rank: selectedRank.label,
                                                Checked: selectedRank.checked
                                            });
                                            
                                            setEditRank(false);
                                            setModalLoading(false)
                                            setCreateRankName('')
                                        }, 1000)
                                    }}
                                >
                                    Update
                                </Button>
                            </DialogActions>
                        }
                    </FormControl>
                </Dialog>

                <Dialog
                    open={manageRanksOpen}
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            m: 1,
                            minWidth: 250
                        }}
                    >
                        {!modalLoading &&
                            <DialogTitle
                                id="responsive-dialog-title"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                Manage Rank
                            </DialogTitle>
                        }

                        {!modalLoading &&
                            <>
                                <FormControl
                                    variant="standard"
                                    sx={{
                                        m: 1,
                                        minWidth: 250
                                    }}
                                >
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
                                            value={selectedManageRank}
                                        >
                                            {props.ranks.map((Aspect) => (
                                                <MenuItem
                                                    key={Aspect}
                                                    value={Aspect.label}
                                                    disabled={Aspect.disabled}
                                                    onClick={() => {
                                                        setSelectedManageRank(Aspect.label)
                                                    }}
                                                >
                                                    {Aspect.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                        setManageRanksOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    
                                    onClick={async () => {
                                        setModalLoading(true);

                                        setTimeout(async() => {
                                            await fetchNui('aspect_laptop:gangs:deleteRank', {
                                                GangName: props.gangName,
                                                Rank: selectedManageRank
                                            });
                                            
                                            setSelectedManageRank('');
                                            setManageRanksOpen(false);
                                            setModalLoading(false);
                                        }, 1000)
                                    }}
                                >
                                    Delete
                                </Button>
                            </DialogActions>
                        }
                    </FormControl>
                </Dialog>
            </div>
        </Fade>
    )
}