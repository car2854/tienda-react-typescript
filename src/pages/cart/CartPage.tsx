import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import './CartPage.css';
import { ImageComponent } from '../../components/image/ImageComponent';
import { useEffect, useState } from 'react';
import money from 'money-math';
import { removeProduct, updateProduct } from '../../store/slices/cart';

export const CartPage = () => {

  const cart = useSelector((state: RootState) => state.cart.value);
  const [totalPrice, setTotalPrice] = useState("0.00");

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPrice(() => {
      return cart.reduce((sum, cart) => 
        money.add(sum, ( money.mul(cart.amount.toFixed(2).toString(), cart.product.price.toFixed(2).toString()) )), "0.00"
      )
    });
  }, [cart])
  

  return (
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
                  <p className="amount">
                    <strong>Cantidad:</strong>
                    <button onClick={ () => {
                        dispatch(updateProduct(
                          {
                            amount: value.amount - 1,
                            product: value.product
                          }
                        ))
                      }
                    }><i className="fa-solid fa-chevron-left"></i></button>
                    {value.amount}
                    <button onClick={() => {
                      dispatch(updateProduct(
                        {
                          amount: value.amount + 1,
                          product: value.product
                        }
                      ))
                    }}><i className="fa-solid fa-chevron-right"></i></button>
                  </p>
                  <div className="price">
                    <p><strong>Precio individual:</strong> ${value.product.price}</p>
                    {/* <p><strong>Precio total:</strong> ${value.amount * value.product.price}</p> */}
                    <p><strong>Precio total:</strong> ${money.mul(value.amount.toFixed(2).toString(), value.product.price.toFixed(2).toString())}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
      <div className="price-cart">
        <div className="detail-price">
          <p>Precio total:</p>
          <p className="price-detail">${totalPrice}</p>
          <p>Impuestos:</p>
          <p className="price-detail">$0</p>
          <p>Uso del servicio:</p>
          <p className="price-detail">$0</p>
          <p>Total</p>
          <p className="price-detail">${totalPrice}</p>
        </div>
        <button>Comprar</button>
        <hr />
      </div>

    </div>
  )
}