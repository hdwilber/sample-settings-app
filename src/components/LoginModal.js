import React from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'

const inlineStyle = {
  modal : {
    transition: '1s',
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class LoginModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      save: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e) {
    const { onLogin } = this.props
    e.preventDefault()
    const { save, email, password } = this.state
    onLogin({
      email,
      password,
    }, {
      save, 
    })
  }

  handleCheckboxChange(e, {name, checked}) {
    this.setState({
      [name]: checked,
    })
  }

  render() {
    const { open, onLogin, onCancel, loading } = this.props
    return (
      <Modal 
        style={inlineStyle.modal} 
        open={open} onClose={onCancel}
        size="tiny"
      >
        <Modal.Header>
          Log in to the application
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input 
              value={this.state.email}
              name="email" type="email" label="Email" onChange={this.handleChange}/>
            <Form.Input 
              value={this.state.password}
              name="password" type="password" label="Password" onChange={this.handleChange}/>
            <Form.Checkbox 
              name="save" 
              value={this.state.save}
              onChange={this.handleCheckboxChange}
              label="Keep session"
            />

            <Button.Group>
              <Button loading={loading}>Login</Button>
            </Button.Group>

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default LoginModal

