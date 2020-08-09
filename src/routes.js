import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WelcomePage from './components/welcomepage';
import LoginComponent from './components/login';
import SignupComponent from './components/signup';
import DashboardComponent from './components/dashboard';
import AddEditProductComponent from './components/add_edit_product';
import FooterComponent from './components/footer';
import { HeaderComponent } from './components/header';
import ProductDetail from './components/product_detail';
import Product from './components/product';

class RoutesComponent extends React.Component {
    state = {  }
    render() { 
        return <Switch>
           <Route exact path="/" component={()=><WelcomePage {...this.props} />} ></Route>
              <Route path="/login" component={()=><LoginComponent {...this.props} />}></Route>
              <Route path="/signup" component={()=><SignupComponent {...this.props} />}></Route>
              <Route path="/home" component={()=><DashboardComponent {...this.props}/>}></Route>
              <Route path="/footer" component={()=><FooterComponent {...this.props}/>}></Route>
              <Route path="/header" component={()=><HeaderComponent {...this.props}/>}></Route>
              <Route path="/product" component={()=><AddEditProductComponent {...this.props}/>}></Route>
              <Route path="/product_detail" component={()=><ProductDetail {...this.props}/>}></Route>
              <Route path="/product_list" component={()=><Product {...this.props}/>}></Route>
        </Switch>
    }
}
 
export default RoutesComponent;