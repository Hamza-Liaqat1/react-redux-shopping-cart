import React, { Component } from 'react'
import formatCurrency from '../utils';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            showCheckout: false
        }

    }
    render() {
       const {cartItems} = this.props; 
        return (
            <div>
                {cartItems.length === 0 ? (
                <div className="cart cart-header">Cart is Empty</div>
                )
                :
                (
                <div className="cart cart-header">You have {cartItems.length} in the cart{""}</div>
                )} 

                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>{item.title} </div>
                                <div className="right">
                                    { formatCurrency(item.price)} x {item.count} {" "}
                                    <button className="button" onClick={()=> this.props.removeFromCart(item)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div> 
                {cartItems.length!==0 && (
                <div>    
                <div className="cart">
                    <div className="total">
                        <div>
                            Total: {" "}
                         { formatCurrency(cartItems.reduce((a,c) => a + c.price *c.count, 0 ))}   
                         </div>  
                         <button onClick={()=> this.setState({showCheckout: true})} className="button primary">Proceed  </button>  
                    </div>
                </div> 
                 {/* if showCheckout is true then show this form  */}
                {this.state.showCheckout && (
                    <div className="cart">
                        <form onSubmit={this.createOrder}>
                            <ul className="form-container">
                                <li>
                                    <label>Email</label>
                                    <input type="email"
                                     required 
                                     onChange={this.handleInput}
                                    />
                                </li>
                            </ul>
                        </form>
                    </div>
                )}
            </div>    
                )}
            </div>
        )
    }
}
