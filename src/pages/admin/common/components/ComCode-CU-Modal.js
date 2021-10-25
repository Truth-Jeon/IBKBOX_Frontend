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

const ComCodeUpdateModal = ( props ) => {
    const { code, setCode } = props
  return (
    <>
      <FormGroup className="mb-3">
        <Form.Label>comCode</Form.Label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="comCode"
            type="text"
            onChange={(e) =>
              setCode({
                ...code,
                comCode: e.target.value,
              })
            }
            value={code.comCode}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>comCodeName</Form.Label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="comCodeName"
            type="text"
            onChange={(e) =>
              setCode({
                ...code,
                comCodeName: e.target.value,
              })
            }
            value={code.comCodeName}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3" >
        <Form.Label>사용여부</Form.Label>
        <FormGroup check>
        <Row>
          <Col>
            <Label check>
              <Input type="radio" name="radio1" checked={code.useFlg === true}
                onChange={(e) =>
                  setCode({
                    ...code,
                    useFlg: true,
                  })
                }
              />
              사용
            </Label>
          </Col>
          <Col>
            <Label check>
              <Input type="radio" name="radio2" checked={code.useFlg === false}
               onChange={(e) =>
                setCode({
                  ...code,
                  useFlg: false,
                })
              }
              />
              비사용
            </Label>
          </Col>
        </Row>
        </FormGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>description</Form.Label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="description"
            type="textarea"
            rows={4}
            onChange={(e) =>
              setCode({
                ...code,
                description: e.target.value,
              })
            }
            value={code.description}
          />
        </InputGroup>
      </FormGroup>
    </>
  );
};

export default ComCodeUpdateModal;
