import { Form } from "react-bootstrap";
import {
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  FormGroup,
} from "reactstrap";

const UserCreateModal = (props) => {
    const { user, setUser } = props
    return (
      <>
       <FormGroup className="mb-3">
          <Form.Label>이름*</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="userName*"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  userName: e.target.value,
                })
              }
              value={user.userName}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>아이디*</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="userId*"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  userId: e.target.value,
                })
              }
              value={user.userId}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>비밀번호*</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="password*"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              value={user.password}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>이메일*</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="email*"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              value={user.email}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>휴대폰번호*</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="mobile*"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  mobile: e.target.value,
                })
              }
              value={user.mobile}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>주소</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="address"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  address: e.target.value,
                })
              }
              value={user.address}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>우편번호</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="postCode"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  postCode: e.target.value,
                })
              }
              value={user.postCode}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>부속코드*</Form.Label>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="deptCode*"
              type="text"
              onChange={(e) =>
                setUser({
                  ...user,
                  deptCode: e.target.value,
                })
              }
              value={user.deptCode}
            />
          </InputGroup>
        </FormGroup>
      </>
    );
}

export default UserCreateModal;