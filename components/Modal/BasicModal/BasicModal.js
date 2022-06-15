import { Modal, Icon } from "semantic-ui-react";

export default function BasicModal(props) {
  const { showModal, setShowModal, title, children, ...rest } = props;
  //...rest props no controlados

  const handleOnClose = () => setShowModal(false);

  return (
    <Modal
      className="basic-modal"
      open={showModal}
      onClose={handleOnClose}
      {...rest}
    >
      <Modal.Header>
        <span>{title}</span>
        <Icon name="close" onClick={handleOnClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
