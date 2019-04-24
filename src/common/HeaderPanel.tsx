import React from "react";
import { Button, Modal } from "react-bootstrap";

export default ({ className, ...otherProps }: React.ComponentProps<"div">) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleReadClick = () => setShowDialog(true);

  const handleDialogClose = () => setShowDialog(false);

  return (
    <div className={className} style={style.root} {...otherProps}>
      <span style={style.inline}>ReaProject 🎚</span>
      <span style={style.inline}>
        <Button variant="outline-light" size="sm" onClick={handleReadClick}>
          Read the Docs!
        </Button>
      </span>

      <Modal size="lg" show={showDialog} onHide={handleDialogClose}>
        <Modal.Header>
          <Modal.Title>ReaTransform Usage 🤓</Modal.Title>
        </Modal.Header>

        <Modal.Body style={style.body}>
          <p>
            Upload your .rpp files, set one of them as the <b>Source</b>, and select the transform script to run. You
            can modify any of the available transform scripts or create your own from scratch. These global variables
            are available to use in your script:
          </p>
          <ul style={style.list}>
            <li>
              <span style={style.code}>sourceProject</span> - the project selected as <b>Source</b>
            </li>
            <li>
              <span style={style.code}>otherProjects</span> - the rest of the projects not selected as <b>Source</b>
            </li>
            <li>
              <span style={style.code}>allProjects</span> - all of the projects
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const style = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inline: {
    display: "flex",
  },
  body: {
    padding: "20px",
  },
  list: {
    padding: "0px 0px 0px 20px",
  },
  code: {
    fontFamily: "monospace",
  },
};
