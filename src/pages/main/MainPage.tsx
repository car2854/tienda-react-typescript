import './MainPage.css'
import { Link, useLocation } from 'react-router-dom';

import { useGetProductsQuery } from "../../store/api";
import { useEffect, useState } from 'react';
import { ProductModel } from '../../models/productModel';
import { LoadingComponent } from '../../components';
import { ImageComponent } from '../../components/image/ImageComponent';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const MainPage = () => {

  const query = useQuery();
  const [category, setCategory] = useState('');

  const {data: products = [], isFetching} = useGetProductsQuery({category}, {});

  useEffect(() => {
    setCategory(query.get('category') ?? '');
  }, [query])
  

  return (
    <div className="main">
      { isFetching && <div className="loading"><LoadingComponent /></div> }
      { !isFetching && 
        <section className="products">
          {products && products.map((product: ProductModel) => (
            <Link key={product.id} to={`/product/${product.id}`} className="no-underline">

              <div className="product">

                <div className="image">
                  <ImageComponent 
                    srcImage={product.image} 
                    altImage={product.description}
                  ></ImageComponent>
                  {/* <img src={product.image} alt={product.description} /> */}
                </div>

                <p className="name">{product.title}</p>
                <p className="price">${product.price}</p>
              </div>
            </Link>
          ))}
          
        </section>
      }

    </div>


  )
}