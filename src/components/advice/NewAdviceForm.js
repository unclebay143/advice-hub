import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./new-advice-form.css";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NewAdviceForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} id="new-advice-form-container">
            <h2 id="transition-modal-title">Create an Advice Card</h2>
            <p id="transition-modal-description">
              Share a short experience or tips with others.
            </p>

            <form className="new-advice-form">
              <div className="input-wrapper">
                <label>Select Category</label>
                <select>
                  <option>Html and Css</option>
                  <option>UI-UX</option>
                  <option>Web development</option>
                </select>
              </div>
              <div className="input-wrapper">
                <label>Short Advice</label>
                <input placeholder="Advice title" type="text" />
              </div>
              <div className="input-wrapper">
                <label>Comment</label>
                <textarea
                  type="text"
                  placeholder="Give more comment on the advice (Optional)"
                />
              </div>
              <div className="input-wrapper btn-wrapper">
                <Button variant="contained" color="secondary">
                  Git push
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
