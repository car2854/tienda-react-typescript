import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ImageComponent } from '../../components/image/ImageComponent';
import { useEffect, useState } from 'react';
import money from 'money-math';
import { removeProduct, updateProduct } from '../../store/slices/cart';
import { ErrorComponent } from '../../components';
import './CartPage.css';
import { ProductModel } from '../../models/productModel';

export const CartPage = () => {

  const cart = useSelector((state: RootState) => state.cart.value);
  const [totalPrice, setTotalPrice] = useState("0.00");

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPrice(() => {
      return cart.reduce((sum, cart) => 
        money.add(sum, ( money.mul(cart.quantity.toFixed(2).toString(), cart.product.price.toFixed(2).toString()) )), "0.00"
      )
    });
  }, [cart])
  
  const handleUpdateQuantityProduct = (data: {quantity: number, product: ProductModel}) => {

    if (data.quantity < 1){
      dispatch(removeProduct(data.product))
    }else{
      dispatch(updateProduct(
        {
          quantity: data.quantity,
          product: data.product
        }
      ));
    }

  }

  return (
    <>
      {cart.length === 0 && <ErrorComponent message='There is nothing in the cart!'></ErrorComponent>}
      {cart.length > 0 &&
      
        <div className="cart">


            
              <div className="detail-cart">
                {cart.map((value, index: number) => (
                  <ul key={index}>
                    <li>
                      <button className="remove" onClick={() => {
                        dispatch(removeProduct(value.product))
                      }}>
                        <i className="fa-solid fa-x"></i>
                      </button>
                      <div className="product">
                        <div className="image">
                          <ImageComponent srcImage={value.product.image} altImage={value.product.title}></ImageComponent>
                        </div>
                        <div className="description">
                          <h3>{value.product.title}</h3>
                          <p className="product-description">{value.product.description}</p>
                          <p className="quantity">
                            <strong>Quantity:</strong>
                            <button onClick={ () => {
                              handleUpdateQuantityProduct({
                                product: value.product,
                                quantity: value.quantity - 1
                              })}
                            }><i className="fa-solid fa-chevron-left"></i></button>
                            {value.quantity}
                            <button onClick={() => {
                              handleUpdateQuantityProduct({
                                product: value.product,
                                quantity: value.quantity + 1
                              });
                            }}><i className="fa-solid fa-chevron-right"></i></button>
                          </p>
                          <div className="price">
                            <p><strong>Price per item:</strong> ${value.product.price}</p>
                            <p><strong>Total price:</strong> ${money.mul(value.quantity.toFixed(2).toString(), value.product.price.toFixed(2).toString())}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
              <div className="price-cart">
                <div className="detail-price">
                  <p>Total price:</p>
                  <p className="price-detail">${totalPrice}</p>
                  <p>Taxes:</p>
                  <p className="price-detail">$0</p>
                  <p>Service use:</p>
                  <p className="price-detail">$0</p>
                  <p>Total</p>
                  <p className="price-detail">${totalPrice}</p>
                </div>
                <button>Comprar</button>
                <hr />
              </div>
            



        </div>
      
      }

    </>
  )
}