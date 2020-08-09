import React from 'react';
import { HeaderComponent } from './header';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import '../css/add_edit_product.css'
import Axios from 'axios';
import FooterComponent from './footer';

function validateProduct(state) {

    const errors = [];

    if (state.productName === "")
        errors.push("product name required");
    if (state.description === "")
        errors.push("description is required");
    if (state.quantity === "")
        errors.push("quantity is required");
    if (state.category === "")
        errors.push("category is required");
    if (state.price === "")
        errors.push("price is req")
    return errors;
}
const PRODUCT_ERROR = "Please try again later."

class AddEditProductComponent extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.location.state !== null && this.props.location.state !== undefined) {
            var data = this.props.location.state.product || ''
            this.state = {
                id: data.id || '',
                productName: data.name || '',
                description: data.description || '',
                quantity: data.quantity || '',
                category: data.category || '',
                productImage: data.image || '',
                price: data.price || '',
                productError: false,
                isEditing: true
            }
        } else {
            this.state = {
                id: '',
                productName: '',
                description: '',
                quantity: '',
                category: '',
                productImage: '',
                productError: false,
                isEditing: false,
                price: ''
            }
        }

    }
    handleProductNameChange = (event) => {
        this.setState({ productName: event.target.value })
    }

    handleProductDescriptionChange = (event) => {
        this.setState({ description: event.target.value })
    }
    handleProductQuantityChange = (event) => {
        this.setState({ quantity: event.target.value })
    }
    handleProductImageChange = (event) => {
        this.setState({ productImage: event.target.value.substr(12) })
    }
    handleProductCategoryChange = (event) => {
        this.setState({ category: event.target.value })
    }
    handleProductPriceChange = (event) => {
        this.setState({ price: event.target.value })
    }

    submitProduct = (event) => {
        event.preventDefault();
        var validate = validateProduct(this.state)
        event.target.className += " was-validated";

        if (validate.length > 0)
            return
        else {
            var prodObj = {
                "name": this.state.productName,
                "quantity": this.state.quantity,
                "price": this.state.price,
                "description": this.state.description,
                "category": this.state.category,
                "image": this.state.productImage
            }
            if (this.state.isEditing)
                this.editProduct(prodObj)
            else
                this.addProduct(prodObj)
        }
    }

    addProduct = (prodObj) => {
        console.log('add', prodObj)

        Axios.post("http://localhost:3000/product", prodObj)
            .then(response => {
                console.log(response)
                if (response.status === 201)
                    this.props.history.push('/product_list')
                else
                    this.setState({ productError: true })

            })
            .catch(error => {
                console.log(error)
                this.setState({ productError: true })
            })
    }

    editProduct = (prodObj) => {
        console.log('edit', prodObj)
        Axios.put("http://localhost:3000/product/"+this.state.id, prodObj)
        .then(response=>{
            console.log(response)
            if (response.status === 200)
            this.props.history.push('/product_list')
        else
            this.setState({ productError: true })
        })
        .catch(error=>{
            console.log(error)
            this.setState({ productError: true })
        })
    }
    render() {
        return <React.Fragment>
            <HeaderComponent></HeaderComponent>
            <Form className="product-form" onSubmit={this.submitProduct} noValidate>
                <Row>
                    <Col style={{ marginTop: '4%' }}>
                        <h3 className={this.state.isEditing === true ? "hidden" : ""}><u>Add Product</u></h3><br />
                        <h3 className={this.state.isEditing === false ? "hidden" : ""}><u>Edit Product</u></h3><br />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={this.state.productName} onChange={this.handleProductNameChange} required />
                            <div className="invalid-feedback">Please provide a valid product name</div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter product description" required value={this.state.description} onChange={this.handleProductDescriptionChange} />
                            <div className="invalid-feedback">Please provide a valid product description</div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter product price" onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '+') && evt.preventDefault()} required value={this.state.price} onChange={this.handleProductPriceChange} />
                            <div className="invalid-feedback">Please provide a valid product price</div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Enter product quantity" onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '+') && evt.preventDefault()} required value={this.state.quantity} onChange={this.handleProductQuantityChange} />
                            <div className="invalid-feedback">Please provide a valid product quantity</div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control as="select" onChange={this.handleProductCategoryChange} value={this.state.category} required>
                                <option disabled>---select---</option>
                                <option>Mobile</option>
                                <option>Laptop</option>
                                <option>Tshirt</option>
                                <option>Trouser</option>
                            </Form.Control>
                            <div className="invalid-feedback">Please provide a valid product category</div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formProductImage">
                            <Form.Label>Product Image</Form.Label>
                            <Form.File onChange={this.handleProductImageChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Alert variant="danger" className={!this.state.productError ? 'hidden' : ''}>
                            {PRODUCT_ERROR}
                        </Alert>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col >
                        <Button variant="outline-dark" type="submit" size="lg" block className={this.state.isEditing === false ? "hidden" : ""}>Edit Product</Button>
                        <Button variant="outline-dark" type="submit" size="lg" block className={this.state.isEditing === true ? "hidden" : ""}>Add Product</Button>
                    </Col>
                </Row>
            </Form>
            <FooterComponent></FooterComponent>
        </React.Fragment>
    }
}

export default AddEditProductComponent;