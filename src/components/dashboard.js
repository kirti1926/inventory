import React from 'react';
import { HeaderComponent } from './header';
import cookie from 'react-cookies'
import '../css/dashboard.css'
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import FooterComponent from './footer';

const doughnutChartData = {
    labels: [
        'Mobile',
        'Laptop',
        'Tshirt',
        'Trouser',
        'Bag'
    ],
    datasets: [{
        data: [30, 50, 100, 90, 10],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#66ffff',
            '#73e600'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#66ffff',
            '#73e600'
        ]
    }]
};

const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales Report',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};
class DashboardComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userName: cookie.load("user_name") || ''
        }
    }

    render() {
        return <div>
            <HeaderComponent></HeaderComponent>
            <div className="header">
                <span className="user-text"><u>Welcome {this.state.userName}</u></span>
                <Link to="/product" className="product-link"><u> Add Product</u></Link>
            </div><br></br><br></br>
            <div className="content">
                <Row >
                    <Col style={{ borderRight: "6px solid #6c757d" }}>
                        <Bar
                            data={barChartData}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </Col>
                    <Col>
                        <Doughnut data={doughnutChartData} />
                        <h3 style={{ marginTop: "3%" }}>Product Chart</h3>
                        <h5>Based on Category</h5>
                    </Col>
                </Row>
            </div>
            <FooterComponent></FooterComponent>
        </div>;
    }
}

export default DashboardComponent;