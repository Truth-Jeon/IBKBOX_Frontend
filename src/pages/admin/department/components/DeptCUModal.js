import { Form } from "react-bootstrap";
import {
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  FormGroup,
  Col,
  Row,
  Label
} from "reactstrap";

const DeptCUModal = ( props ) => {
    const { deptCode, setDeptCode } = props
  return (
    <>
     <FormGroup className="mb-3">
        <Form.Label>부서코드</Form.Label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="부서코드"
            type="text"
            onChange={(e) =>
              setDeptCode({
                ...deptCode,
                deptCode: e.target.value,
              })
            }
            value={deptCode.deptCode}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>부서명</Form.Label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="부서명"
            type="text"
            onChange={(e) =>
              setDeptCode({
                ...deptCode,
                deptName: e.target.value,
              })
            }
            value={deptCode.deptName}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>부서레벨</Form.Label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="부서레벨"
            type="number"
            onChange={(e) =>
              setDeptCode({
                ...deptCode,
                deptLevel: e.target.value,
              })
            }
            value={deptCode.deptLevel}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>상위부서코드</Form.Label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="상위부서코드"
            type="text"
            onChange={(e) =>
              setDeptCode({
                ...deptCode,
                parentDeptCode: e.target.value,
              })
            }
            value={deptCode.parentDeptCode}
          />
        </InputGroup>
      </FormGroup>
    </>
  );
};

export default DeptCUModal;
