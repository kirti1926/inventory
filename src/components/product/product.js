import React from 'react';
import  HeaderComponent  from '../header/header';
import Axios from 'axios';
import ProductDetail from './product_detail';
import { Table, Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            productsError: '',
            prevProductData:[],
            searchValue: ''
        }
    }

    componentWillMount() {
        this.getAllProducts();
    }

    getAllProducts = () => {
        Axios.get('http://localhost:3000/product')
            .then(response => {
                this.setState({ products: response.data })
                this.setState({ prevProductData: response.data })
            }).catch(err => {
                console.log(err)
            })
    }

    editProduct = (productData) => {
        this.props.history.push({ pathname: '/product', state: { product: productData } })
    }

    getSearchedProducts = (event) => {
        if (event.target.value === "") {
            this.setState({ products: this.state.prevProductData })
        } else {
            let searchData = this.state.products.filter(prod => {
                return prod.name.toLowerCase().match(event.target.value.toLowerCase())
            })
            this.setState({ products: searchData })
        }

    }

    deleteproduct = (id) => {
        console.log('delete', id)
        Axios.delete("http://localhost:3000/product/" + id)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    alert('Product Deleted Successfully.')
                    this.getAllProducts()
                }
            })
            .catch(error => {
                console.log('delete prod error', error)
                alert('Please try again later.')
            })
    }

    render() {
        return <React.Fragment>
            <HeaderComponent></HeaderComponent>
            <Container style={{ marginTop: '6%', display: "block" }}>
                <Row >
                    <Col>
                        <h4>Search Product</h4>
                        <Form inline>
                            <Form.Control type="text" placeholder="Search" onChange={this.getSearchedProducts} />
                            <Link to="/product" className="product-link" ><u style={{marginLeft:"20px"}}> Add Product</u></Link>
                        </Form><br></br>
                    </Col>
                
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover variant="dark" className={this.state.products.length === 0 ? "hidden" : ""}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th colSpan="4">Actions</th>
                                </tr>
                            </thead>
                            {
                                this.state.products.map(product => {
                                    return (
                                        <ProductDetail key={product.id} prod={product}
                                            editProdId={this.editProduct}
                                            deleteProdId={this.deleteproduct}></ProductDetail>
                                    )
                                })

                            }
                        </Table>
                    </Col>
                </Row>


                <div className={this.state.products.length > 0 ? "hidden" : ""}>
                    <u style={{ padding: '1px' }}>No products available.Please add some products</u><br></br>
                    <Link to="/product">Add Product</Link>
                </div>
            </Container>
        </React.Fragment>
    }
}

export default Product;