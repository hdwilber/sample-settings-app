import React from 'react'
import { Message, TransitionablePortal, Checkbox, Modal, Input, Label, Form, Button } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'

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

  handleSubmit(values) {
    const { onLogin } = this.props
    const { save, email, password } = values
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

  validate(values) {
    console.log('Validate')
    console.log(values)
    const errors = {}

    if (!values.email) {
      errors.email = "Required"
    }
    if (!values.password) {
      errors.password = "Required"
    } else if(values.password.length <= 3){
      errors.password = "Length must be at least 4 characters"
    }
    return errors

  }

  render() {
    const { open, onLogin, onCancel, loading, error } = this.props
    return (
      <TransitionablePortal
        open={open} 
      >
        <Modal open={true}
          size="tiny"
          style={inlineStyle.modal} 
          onClose={onCancel}
        >
        <Modal.Content>
          <FinalForm
            onSubmit={this.handleSubmit}
            validate={this.validate}
            render={({ submitError, handleSubmit, reset, submitting, pristine, values, invalid}) => (
              <Form error onSubmit={handleSubmit}>
                <Field
                  name="email" 
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Email</label>
                      <Input {...input} type="email" placeholder="Enter your email"
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Field
                  name="password" 
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Password</label>
                      <Input {...input} type="password" placeholder="Your password"
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Field
                  name="save" 
                  type="checkbox"
                >
                  {({input, meta}) => <Form.Field>
                      <Input type="checkbox" {...input}
                        label="Keep session open"
                        labelPosition="right"
                        size="tiny"
                        fluid
                      />
                    </Form.Field>
                  }
                </Field>

                {(error && error.FORM) && (
                  <Message
                    error
                    header='Bad Request'
                    content={error.FORM}
                  />
                )}

                <Button type="submit" disabled={pristine || submitting || invalid} loading={loading}>Login</Button>
              </Form>
            )}
          />
        </Modal.Content>
      </Modal>
      </TransitionablePortal>
    )
  }
}

export default LoginModal

