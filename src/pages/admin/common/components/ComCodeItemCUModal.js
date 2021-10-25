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

const ComCodeItemCUModal = ( props ) => {
    const { codeItem, setCodeItem } = props
  return (
    <>
      <FormGroup className="mb-3">
        <Form.Label>ItemCode</Form.Label>
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
              setCodeItem({
                ...codeItem,
                itemCode: e.target.value,
              })
            }
            value={codeItem.itemCode}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>ItemName</Form.Label>
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
              setCodeItem({
                ...codeItem,
                itemName: e.target.value,
              })
            }
            value={codeItem.itemName}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3" >
        <Form.Label>사용여부</Form.Label>
        <FormGroup check>
        <Row>
          <Col>
            <Label check>
              <Input type="radio" name="radio1" checked={codeItem.useFlg === true}
                onChange={(e) =>
                  setCodeItem({
                    ...codeItem,
                    useFlg: true,
                  })
                }
              />
              사용
            </Label>
          </Col>
          <Col>
            <Label check>
              <Input type="radio" name="radio2" checked={codeItem.useFlg === false}
               onChange={(e) =>
                setCodeItem({
                  ...codeItem,
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
              setCodeItem({
                ...codeItem,
                description: e.target.value,
              })
            }
            value={codeItem.description}
          />
        </InputGroup>
      </FormGroup>
    </>
  );
};

export default ComCodeItemCUModal;
