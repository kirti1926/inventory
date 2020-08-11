import React from 'react';
import cookie from 'react-cookies'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Chart from 'react-google-charts';
import HeaderComponent from '../header/header';


class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: cookie.load("user_name") || '',
            barChartData: [["category", "quant."]],
            pieChartData: [[["Date", "Mobile", "Trouser", "Tshirt", "Laptop"]]],
            categories: [],
            products: []
        }
    }

    componentDidMount() {
        this.getAllProducts();
        this.getSalesData();
    }

    getAllProducts = () => {
        Axios.get('http://localhost:3000/product')
            .then(response => {
                this.setState({ products: response.data })
                let categoryArr = [];
                response.data.map(data => {
                    categoryArr.push(data.category)
                })
                this.setState({ categories: categoryArr })

                let arr = this.state.categories.filter((value, index, self) => self.indexOf(value) === index)

                arr.map(datamap => {
                    let quantity = []
                    quantity = this.state.products.filter(prod =>
                        prod.category === datamap
                    )
                    let count = 0;
                    quantity.map(data => {
                        count = data.quantity + count;
                    })
                    this.state.barChartData.push([datamap, parseInt(count)]);
                })

            }).catch(err => {
                console.log(err)
            })
    }

    getSalesData = () => {
        Axios.get("http://localhost:3000/sales")
            .then(response => {
                response.data.map(s => this.state.pieChartData.push([s.date, s.Mobile, s.Trouser, s.Tshirt, s.Laptop]));
            })
            .catch(error => {
                console.log('sales error', error)
            })
    }
    render() {
        return <div>
            <HeaderComponent></HeaderComponent>
            <div style={{ marginTop: "5%" }} className="main-content">
                <div>
                    <span className="user-text"><u>Welcome {this.state.userName}</u></span>
                    <Link to="/product" className="product-link"><u> Add Product</u></Link>
                </div>
                <div>
                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col" style={{borderRight : "6px solid gray"}}>
                            <Chart
                                chartType="Bar"
                                loader={<div>Loading Chart</div>}
                                data={this.state.barChartData}
                                width="100%"
                                height="400px"
                                legendToggle
                            />
                            <br></br>
                            <h3><u>Product Sales Chart</u></h3>
                        </div>
                        <div className="col">
                            <Chart
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.barChartData}
                                width="100%"
                                height="400px"
                                legendToggle
                            />
                            <br></br>
                            <h3><u>Product Availability Chart</u></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default DashboardComponent;