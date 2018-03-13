import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as AppActions from './redux/app/actions'
import { Grid, Header } from 'semantic-ui-react'

class App extends Component {
  componentDidMount() {
    const { appStart } = this.props
    appStart()
  }

  render() {
    return (
      <Grid container>
        <Grid.Column width={16}>
          <Header size="huge">Hello World</Header>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect( state => ({
  app: state.app,
}),
dispatch => ({
  appStart: () => dispatch(AppActions.startApp()),
}))(App);
