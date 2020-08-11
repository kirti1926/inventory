import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WelcomePage from './components/home/welcomepage';
import LoginComponent from './components/login/login';
import SignupComponent from './components/signup/signup';
import DashboardComponent from './components/home/dashboard';
import HeaderComponent from './components/header/header';
import AddEditProductComponent from './components/add_edit_product/add_edit_product';
import ProductDetail from './components/product/product_detail';
import Product from './components/product/product';

class RoutesComponent extends React.Component {
    state = {  }
    render() { 
        return <Switch>
           <Route exact path="/" component={()=><WelcomePage {...this.props} />} ></Route>
              <Route path="/login" component={()=><LoginComponent {...this.props} />}></Route>
              <Route path="/signup" component={()=><SignupComponent {...this.props} />}></Route>
              <Route path="/home" component={()=><DashboardComponent {...this.props}/>}></Route>
              <Route path="/header" component={()=><HeaderComponent {...this.props}/>}></Route>
              <Route path="/product" component={()=><AddEditProductComponent {...this.props}/>}></Route>
              <Route path="/product_detail" component={()=><ProductDetail {...this.props}/>}></Route>
              <Route path="/product_list" component={()=><Product {...this.props}/>}></Route>
        </Switch>
    }
}
 
export default RoutesComponent;