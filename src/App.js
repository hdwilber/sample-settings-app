import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AppActions from './redux/app/actions'
import * as AccountActions from './redux/account/actions'
import { Dimmer, Loader, Button, Grid, Header } from 'semantic-ui-react'

import LoginModal from './components/LoginModal'
import Settings from './components/Settings'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openLogin: false,
    }

    this.handleOpenLogin = this.handleOpenLogin.bind(this)
    this.handleCloseLogin = this.handleCloseLogin.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    const { appStart } = this.props
    appStart()
  }

  handleLogin(data) {
    const { login } = this.props
    login(data)
  }

  handleOpenLogin() {
    this.setState({
      openLogin: true,
    })
  }

  handleCloseLogin() {
    this.setState({
      openLogin: false,
    })
  }

  renderLoader() {
    const { app } = this.props
    return (
      <Dimmer
        active={ app && app.loading }
        page
      >
        <Loader>Loading the sample application</Loader>
      </Dimmer>
    )
  }

  renderHome() {
    const { account } = this.props
    return (
      <Grid container>
        <Grid.Column width={16}>
          <Header size="huge">Welcome to the sample application</Header>
          <Button onClick={this.handleOpenLogin}>Login</Button>
          <LoginModal 
            loading = {account && account.loading}
            open={this.state.openLogin} 
            onCancel={this.handleCloseLogin}
            onLogin={this.handleLogin}
          />
        </Grid.Column>
      </Grid>
    )
  }

  renderSettings() {
    return (
      <Grid container>
        <Grid.Column width={16}>
          <Header size="huge">Settings to configure your information</Header>
          <Settings onSave={this.handleSettingsSave}
            onReset={this.handleSettingsReset}
          />
        </Grid.Column>
      </Grid>
    )
  }

  render() {
    const { app, account } = this.props

    if ( account && account.loggedIn ) {
      return this.renderSettings()
    } 

    if (app && !app.loading) {
      return this.renderHome()
    } 
    return this.renderLoader()

  }
}

export default connect( state => ({
  app: state.app,
  account: state.account,
}),
dispatch => ({
  appStart: () => dispatch(AppActions.startApp()),
  login: (data) => dispatch(AccountActions.login(data)),
  logout: () => dispatch(AccountActions.logout()),
})) (App)

