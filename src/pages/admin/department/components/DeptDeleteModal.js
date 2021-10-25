import { Form } from "react-bootstrap";
import { FormGroup } from "reactstrap";

const DeptDeleteModal = (props) => {
  return (
    <FormGroup className="mb-3">
      <Form.Label>정말 삭제 하시겠습니까?</Form.Label>
    </FormGroup>
  );
};

export default DeptDeleteModal;
