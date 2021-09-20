import {useState, createElement} from "react";
import {Principal} from "../../dtos/principal";
import data from "../../util/icons.json";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert, ButtonGroup, Dropdown, DropdownButton, ListGroup } from "react-bootstrap";
import { IconButton, Grid, makeStyles } from "@material-ui/core"
// import "font-awesome/css/font-awesome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons'
// import { FaCog, FaAppleAlt, FaBaby, FaCanadianMapleLeaf } from "react-icons/fa"
import * as FontAwesome from "react-icons/fa";
import * as Ionicons from "react-icons/io5";



interface IIconModal {
    current_user: Principal | undefined;
    show: boolean;
    setShow: (val: boolean) => void;
    userIcon: string | undefined,
    setUserIcon: (icon: string | undefined) => void
}

const Icon = (props: any) => {
    const { project, iconName, size, color } = props;
    // console.log(`${project}[${iconName}]`)
    let icon;
    // Come back to later...having difficulty dynamically reading project
    if (project == 'FontAwesome') {
        //@ts-ignore
        icon = createElement(FontAwesome[iconName]);
    }
    else if (project == 'Ionicons') {
        //@ts-ignore
        icon = createElement(Ionicons[iconName]);
    }
    return <div style={{ fontSize: `${size}em`, color: color }}>{icon}</div>;
}

const useStyles = makeStyles({
    modal: {
        color: "white",
        backgroundColor: "#1B3146"
    },
    modalBody: {
        backgroundColor: "#47608E"
    }
})

function IconModal(props: IIconModal) {

    const classes = useStyles();
    const [icon, setIcon] = useState(undefined as string | undefined)

    const updateIcon = (e: any) => {
        console.log(e.currentTarget);
        console.log(e.currentTarget.id);
        setIcon(e.currentTarget.id)
    }

    const handleClose = () => {
        props.setShow(false);
    }

    const update = () => {      
        handleClose();
        props.setUserIcon(icon);
    }

    return (
      
        <>
        <Modal show={props.show} onHide={handleClose} >
            <Modal.Header closeButton className={classes.modal}>
                <Modal.Title>Choose Your User Icon!</Modal.Title>
            </Modal.Header>
            <Modal.Body className={classes.modalBody}>

            <Grid container spacing={2}>
                {                    
                    data.map(({project, name, color}) => {
                        // {console.log(project, name, color)}
                        return (
                            <Grid item xs={3}>
                            <IconButton aria-label="Example" id={name} onClick={updateIcon}>
                                <Icon project={project} iconName={name} size={2} color={color} onClick={updateIcon} />
                            </IconButton>
                            </Grid>
                        )
                    })
                }
                
            </Grid>
            
            </Modal.Body>
            <Modal.Footer className={classes.modal}>
            <Button variant="secondary" onClick={handleClose}> Cancel</Button>
            
            <Button variant="primary" onClick={update}>Apply</Button>
            </Modal.Footer>
        </Modal>
        </>
  );
}
export default IconModal;