import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AppActions from './redux/app/actions'
import * as AccountActions from './redux/account/actions'
import { Transition, Dimmer, Loader, Button, Grid, Header } from 'semantic-ui-react'

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
    this.handleSettingsSave = this.handleSettingsSave.bind(this)
    this.handleSettingsClear = this.handleSettingsClear.bind(this)
  }

  componentDidMount() {
    const { appStart } = this.props
    appStart()
  }

  handleLogin(data, options) {
    const { login } = this.props
    login(data, options)
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

  handleSettingsSave(data) {
    console.log(data)
    const { saveSettings } = this.props
    saveSettings(data)
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps
    if ( account && account.email ) {
      this.setState({
        openLogin: false
      })
    }
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

  handleSettingsClear() {
    const { clearSettings } = this.props
    clearSettings()
  }

  renderHome() {
    const { app, account } = this.props
    return (
      <Transition visible={app && !app.loading && account && !account.loggedIn}>
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">Welcome to the sample application</Header>
            <Button onClick={this.handleOpenLogin}>Login</Button>
          </Grid.Column>
        </Grid>
      </Transition>
    )
  }

  renderSettings() {
    const { account } = this.props
    return (
      <Transition visible={ account && account.loggedIn }>
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">Settings to configure your information ({account && account.email}) </Header>
            <Settings onSave={this.handleSettingsSave}
              onClear={this.handleSettingsClear}
              loading={account && account.loading}
              data={account && account.settings}
            />
          </Grid.Column>
        </Grid>
      </Transition>
    )
  }

  render() {
    const { app, account } = this.props
    return (
      <div>
        {this.renderLoader()}
        {this.renderSettings()}
        {this.renderHome()}
        <LoginModal 
          loading = {account && account.loading}
          open={this.state.openLogin} 
          onCancel={this.handleCloseLogin}
          onLogin={this.handleLogin}
          error={account && account.error}
        />
      </div>
    )
    

  }
}

export default connect( state => ({
  app: state.app,
  account: state.account,
}),
dispatch => ({
  appStart: () => dispatch(AppActions.startApp()),
  login: (data, opts) => dispatch(AccountActions.login(data, opts)),
  logout: () => dispatch(AccountActions.logout()),
  saveSettings : (data, options) => dispatch(AccountActions.saveSettings(data, options)),
  clearSettings: () => dispatch(AccountActions.clearSettings()),
})) (App)

