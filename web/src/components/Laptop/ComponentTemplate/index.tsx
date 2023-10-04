// import { useEffect, useState } from "react";
// import styles from "./Boosting.module.scss";
// import { useNavigationState } from "../../atoms/navigation";
// import { fetchNui } from "../../../../hooks/fetchNui";
// import { Zoom, Typography, IconButton } from "@mui/material";
// import Draggable from "react-draggable";

// export const Boosting: React.FC = () => {
//     const [navigationState, setNavigationState] = useNavigationState();

//     const fetchData = async () => {
        
//     }

//     return (
//         <Zoom in={navigationState.path === "Boosting"} timeout={300} mountOnEnter unmountOnExit>
//             <div className={styles.main}>
//                 <Draggable handle="section">
//                     <div className={styles.boostingContainer}>
//                         <section className={styles.header}>
//                             <Typography
//                                 style={{
//                                     color: "white",
//                                     fontSize: "1.5vh"
//                                 }}
//                             >
//                                 Boosting
//                             </Typography>

//                             <IconButton
//                                 className={styles.button}
//                                 style={{
//                                     fontSize: "2vh",
//                                     marginLeft: "93%",
//                                     height: "3vh",
//                                     width: "3vh"
//                                 }}
//                                 onClick={() => {
//                                     setNavigationState({
//                                         path: 'Home',
//                                     });
//                                 }}
//                             >
//                                 <i
//                                     className={
//                                         "fa-solid fa-xmark"
//                                     }
//                                 />
//                             </IconButton>
//                         </section>

//                         <div className={styles.realContainer}>
                            
//                         </div>
//                     </div>
//                 </Draggable>
//             </div>
//         </Zoom>
//     )
// }