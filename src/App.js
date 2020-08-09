import React from 'react';
import RoutesComponent from './routes';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  state = {  }
  render() { 
    return <RoutesComponent {...this.props}></RoutesComponent>
  }
}
 
export default withRouter(App);
