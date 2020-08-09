import React from 'react';
import '../css/product_detail.css'

class ProductDetail extends React.Component {
    constructor(props){
        super()
    }

    editProduct =()=>{
        this.props.editProdId(this.props.prod)
    }

    deleteProduct =()=>{
        this.props.deleteProdId(this.props.prod.id)
    }
    render() { 
        return <tbody>
          <tr>
              <td>{this.props.prod.id}</td>
            <td>{this.props.prod.name}</td>
            <td>{this.props.prod.price}</td>
            <td>{this.props.prod.quantity}</td>
            <td>{this.props.prod.category}</td>
            <td><i className="fa fa-pencil-square-o" aria-hidden="true" onClick={this.editProduct}></i></td>
            <td><i className="fa fa-trash-o" aria-hidden="true" onClick={this.deleteProduct}></i></td>
          </tr>
        </tbody>
    }
}
 
export default ProductDetail;