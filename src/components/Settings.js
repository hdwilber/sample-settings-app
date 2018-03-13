import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageProfile: null,
      name: '',
      lastname: '',
      address1: '',
      address2: '',
      altEmail: '',
      phoneNumber: '',
      github: '',
      linkedIn: '',
    }
  }

  render() {
    const { loading } = this.props
    const { name, lastname, address1, address2, altEmail, phoneNumber, github, linkedIn } = this.state
    return (
      <Form>
        <Form.Input type="text" name="name" value={name} label="Name" />
        <Form.Input type="text" name="lastname" value={lastname} label="Lastname" />
        <Form.Input type="text" name="address1" value={address1} label="Main Address" />
        <Form.Input type="text" name="address2" value={address2} label="Secondary Address" />
        <Form.Input type="number" name="phoneNumber" value={phoneNumber} label="PhoneNumber" />

        <Form.Group>
          <Button>
            Save
          </Button>
          <Button>
            Delete
          </Button>
        </Form.Group>
      </Form>
    )
  }
}

export default Settings

