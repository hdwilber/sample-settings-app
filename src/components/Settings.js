import React from 'react'
import { Button, Form, Item } from 'semantic-ui-react'

import noimage from '../images/noimage.png'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
    reader.readAsDataURL(file);
  })
}

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

    this.handleChange = this.handleChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleFileChange(e, { name, value}) {
    getBase64(e.target.files[0]) 
    .then(data => {
      this.setState({
        imageProfile: data
      })
    })
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }
  
  render() {
    const { loading, email } = this.props
    const { imageProfile, name, lastname, address1, address2, altEmail, phoneNumber, github, linkedIn } = this.state
    return (
      <Item.Group>
      <Item>
        <Item.Image size="large">
          <img src={imageProfile || noimage}/>
          <Form.Input type="file" onChange={this.handleFileChange} name="profile" />
        </Item.Image>
        <Item.Content>
          <Item.Header>
            {email}
          </Item.Header>
          <Item.Description as={Form}>
              <Form.Input type="text" name="name" value={name} label="Name" 
                onChange={this.handleChange}
              />
              <Form.Input type="text" name="lastname" value={lastname} label="Lastname" 
                onChange={this.handleChange}
              />
              <Form.Input type="text" name="address1" value={address1} label="Main Address" 
                onChange={this.handleChange}
              />
              <Form.Input type="text" name="address2" value={address2} label="Secondary Address" 
                onChange={this.handleChange}
              />
              <Form.Input type="number" name="phoneNumber" value={phoneNumber} label="PhoneNumber" 
                onChange={this.handleChange}
              />

              <Form.Group>
                <Button>
                  Save
                </Button>
                <Button>
                  Delete
                </Button>
              </Form.Group>
          </Item.Description>
        </Item.Content>
      </Item>
      </Item.Group>
    )
  }
}

export default Settings

