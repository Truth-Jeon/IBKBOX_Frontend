import { Modal, Button } from "reactstrap";

const Index = (props) => {
  const { isOpen, toggle, headerTitle, onClickClose, onClickSave, saveBtnInable, closeBtnInable, saveBtnTitle, size } = props;

  // size는 문자열로 'sm' 'lg' 'xl' 이런식으로 부트스트랩의 사이즈 구간으로 값을 넣으면 됩니다. 
  return (
    <Modal className="modal-dialog-centered" isOpen={isOpen} toggle={toggle} size={size}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {headerTitle}
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={onClickClose}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">{props.children}</div>
      <div className="modal-footer">
        {saveBtnInable ? <Button color="primary" type="button" onClick={onClickSave}>
          {saveBtnTitle ? saveBtnTitle : "저장"}
        </Button> : null}
        {closeBtnInable ? <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={onClickClose}
        >
          닫기
        </Button> : null}
      </div>
    </Modal>
  );
};

export default Index;
