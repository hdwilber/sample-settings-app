import React from 'react'
import { Input, Button, Form, Item } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const checkUrl = url => new Promise( resolve => {
  fetch(url).then (response => {
    if (response.ok) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
})

function checkValidImage(data) {
  const infos = data.split(',')
  return /jpe?g|png/.test(infos[0])
}
function isNumber(data) {
  return !isNaN(parseInt(data)) 
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.checkGithub = this.checkGithub.bind(this)
  }


  handleFileChange(e, { name, value}) {
    getBase64(e.target.files[0]) 
    .then(data => {

      if (checkValidImage(data)){
        this.setState({
          imageProfile: data
        })
      }
    })
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }


  async checkGithub(value) {
    if (value) {
      await sleep(1000)
        const result = await checkUrl(`https://api.github.com/users/${value}`)
      return !result && 'Invalid Name'

    }
  }

  handleSubmit(values) {
    // To submit
  }

  validate(values) {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    }
    if(!values.lastname) {
      errors.lastname = 'Required'
    }
    if(!values.address1) {
      errors.address1 = 'Required'
    }
    if(!values.phoneNumber) {
      errors.phoneNumber = 'Required'
    } else if (!isNumber(values.phoneNumber)) {
      errors.phoneNumber = 'Should be only numbers.'
    } else if (values.phoneNumber && values.phoneNumber.length <= 6){
      errors.phoneNumber = 'Phone numbers are greater than 6 digits.'
    }

    return errors
  }
  
  render() {
    const { loading, email } = this.props
    const { imageProfile, name, lastname, address1, address2, altEmail, phoneNumber, github, linkedIn } = this.state
    return (
      <Item.Group>
      <Item>
        <Item.Image size="large">
          <img src={imageProfile || noimage}/>
          <Form.Input type="file" onChange={this.handleFileChange} name="profile"/>
        </Item.Image>
        <Item.Content>
          <Item.Header>
            {email}
          </Item.Header>

          <Item.Description as={FinalForm} 
            onSubmit={this.handleSubmit}
            validate={this.validate}
            render={({ submitError, handleSubmit, reset, submitting, pristine, values, invalid}) => (
              <Form error>
                <Field
                  name="name" 
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Name</label>
                      <Input {...input} placeholder="Enter your name"
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Field
                  name="lastname" 
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Lastname</label>
                      <Input {...input} placeholder="Enter your lastname"
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Field
                  name="address1" 
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Main Address</label>
                      <Input {...input} placeholder="Enter your main address"
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Field
                  name="address2" 
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Secondary Address</label>
                      <Input {...input} placeholder="Enter your secondary address"
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Field
                  name="phoneNumber" 
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Phone Number</label>
                      <Input {...input} placeholder="Enter your phone number"
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Field
                  name="github" 
                  validate={this.checkGithub}
                >
                  {({input, meta}) => (
                    <Form.Field>
                      <label>Github Account</label>
                      <Input {...input} placeholder="Enter you github account name"
                        icon='github' iconPosition='left'
                        error={(meta.error || meta.submitError)}
                      />
                      {(meta.error || meta.submitError) &&
                        meta.touched && <span>{meta.error || meta.submitError}</span>}
                    </Form.Field>
                  )}
                </Field>

                <Form.Group>
                  <Button primary disabled={pristine || submitting || invalid}>
                    Save
                  </Button>
                  <Button onClick={reset}>
                    Reset
                  </Button>
                </Form.Group>
              </Form>
            )}
          >
          </Item.Description>
        </Item.Content>
      </Item>
      </Item.Group>
    )
  }
}

export default Settings

