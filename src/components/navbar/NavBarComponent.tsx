import { Link, useLocation } from 'react-router-dom';
import './NavBarComponent.css';
import { useGetCategoriesQuery } from '../../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { LoadingComponent } from '../loading/LoadingComponent';
import { useEffect, useRef, useState } from 'react';
import { showAlertThunk } from '../../store/slices/alert';

interface QueryParams {
  [key: string]: string | undefined;
}

function getQueryParams(queryString: string): QueryParams {
  const params = new URLSearchParams(queryString);
  const result: QueryParams = {};
  for (const [key, value] of params.entries()) {
    result[key] = decodeURIComponent(value);
  }
  return result;
}

export const NavBarComponent = () => {

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cart.value);
  const inputRef = useRef<HTMLInputElement>(null);

  const [totalQuantityCart, setTotalQuantityCart] = useState(0);

  useEffect(() => {
    setTotalQuantityCart(cart.reduce((sum, cart) => sum + cart.quantity, 0));  
  }, [cart])
  

  const {data: categories = [], isLoading, isError} = useGetCategoriesQuery();
  const location = useLocation();
  const isActive = (path: string, searchParams: QueryParams = {}) => {
    const queryParams = getQueryParams(location.search);
    return location.pathname === path && Object.entries(searchParams).every(([key, value]) => queryParams[key] === value);
  };

  const [product, setProduct] = useState("");

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setProduct(event.currentTarget.value);
    console.log(product);
    dispatch(
      showAlertThunk(`La API de Fakestoreapi no tiene un buscador por query. valor: ${event.currentTarget.value}`, 3000)
    );
  }
  
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <>
      <nav>
        <div className="nav-header">
          <div className="logo">
            <img src="/react.svg" alt="" />
          </div>
          <div className="w-3p">
            <div className="form-group">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search" 
                onInput={handleInput}
                onFocus={handleFocus}
              />
            </div>
            
          </div>
          <ul>
            <li>
              <Link to={'/cart'}>
                <i className="fa-solid fa-cart-shopping">
                  {totalQuantityCart > 0 && <div className="badge"><p>{totalQuantityCart}</p></div>}
                </i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-categories">
          {isLoading && <div className="loading"><LoadingComponent></LoadingComponent></div>}
          
          {(!isLoading && !isError) && 
            <ul>
              <Link key={-1} to={`/main?category=all`} className={isActive('/main', { category: 'all' }) ? 'no-underline active' : 'no-underline'}><li>all</li></Link>
              {categories.map((category: string, index:number) => (
                <Link 
                  key={index} 
                  to={`/main?category=${category}`} 
                  className={isActive('/main', { category: category }) ? 'no-underline active' : 'no-underline'}
                ><li>{category}</li></Link>
              ))}
            </ul>
          }
        </div>

      </nav>
        
      <hr />

      <a href="https://github.com/car2854/tienda-react-typescript.git" target="_blank">
        <div className="github">
          <i className="fa-brands fa-github"></i>
        </div>
      </a>
    </>
  )
}