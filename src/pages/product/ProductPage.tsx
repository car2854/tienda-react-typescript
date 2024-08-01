import { useParams } from "react-router"
import "./ProductPage.css";
import { useGetProductQuery } from "../../store/api";
import { LoadingComponent } from "../../components";
import { useEffect, useState } from "react";
import { ImageComponent } from "../../components/image/ImageComponent";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/slices/cart";

export const ProductPage = () => {

  const { id } = useParams();

  const [starts, setStarts] = useState<number[]>([]); // 0 none | 1 half | 2 full
  const [amount, setAmount] = useState("1");

  const {data: product, isFetching} = useGetProductQuery({productId: id}, {});

  const dispatch = useDispatch();

  useEffect(() => {
    if (product){
      const startsList = [];
      let rate = product.rating.rate * 10;
      for (let i = 0; i < 5; i++) {
        if (rate >= 10){
          startsList.push(2)
        }else if (rate > 0){
          startsList.push(1)
        }else{
          startsList.push(0)
        }
        rate = rate - 10;
      }
      setStarts(startsList);
    }
  }, [product]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    
    const value = parseInt(amount);
    if (isNaN(value)){
      return;
    }

    dispatch(addCart(
      {
        amount: value,
        product: product
      }
    ));
  }
  
  return (

    <>

      {isFetching && <div className="loading"><LoadingComponent /></div>}
      {!isFetching && 
        <div className="product">
          <div className="product-images">
            <div className="selected-image">
              
              <ImageComponent 
                altImage={product.description}
                srcImage={product.image}
              ></ImageComponent>
              
            </div>
            {/* <div className="list-images">
              <div className="image">
                <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9f2434d540c34ca882440599e39aac53_9366/LUFT_PACE_SHOES_Turquoise_IQ9069_01_standard.jpg" alt="" />
              </div>
              <div className="image">
                <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9f2434d540c34ca882440599e39aac53_9366/LUFT_PACE_SHOES_Turquoise_IQ9069_01_standard.jpg" alt="" />
              </div>
            </div> */}
          </div>
          <div className="product-description">
            <h2>{product.title}</h2>
            <h3>Category: {product.category}</h3>
            <div className="ratings">
              {starts.map((start:number, index: number) => {
                if (start === 2) return <i key={index} className="fa-solid fa-star"></i>;
                if (start === 1) return <i key={index} className="fa-regular fa-star-half-stroke"></i>;
                return <i key={index} className="fa-regular fa-star"></i>;
              })}
              <p>{product.rating.rate}</p>
            </div>
            <p className="description">{product.description}</p>
            <p className="price">${product.price}</p>
            <div className="add-product">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="number" 
                    placeholder="Cantidad"
                    value={amount}
                    name="amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button type="submit">Agregar</button>
              </form>
            </div>
          </div>
        </div>
      }


    </>
  )
}