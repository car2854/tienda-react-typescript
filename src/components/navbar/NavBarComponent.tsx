import { Link, useLocation } from 'react-router-dom';
import './NavBarComponent.css';
import { useGetCategoriesQuery } from '../../store/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';

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

  const cart = useSelector((state: RootState) => state.cart.value);

  const [totalAmountCart, setTotalAmountCart] = useState(0);

  useEffect(() => {
    setTotalAmountCart(cart.reduce((sum, cart) => sum + cart.amount, 0));  
  }, [cart])
  

  const {data: categories = []} = useGetCategoriesQuery();
  const location = useLocation();
  const isActive = (path: string, searchParams: QueryParams = {}) => {
    const queryParams = getQueryParams(location.search);
    return location.pathname === path && Object.entries(searchParams).every(([key, value]) => queryParams[key] === value);
  };

  return (
    <>
      <nav>

        <div className="nav-header">
          <h2>Icono</h2>
          <div className="form-group w-3p">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder='Buscar'/>
          </div>
          <ul>
            <li>
              <Link to={'/cart'}>
                <i className="fa-solid fa-cart-shopping">
                  {totalAmountCart > 0 && <div className="badge"><p>{totalAmountCart}</p></div>}
                </i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-categories">
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
        </div>

      </nav>

      <hr />

      <a href="https://github.com/uzakari/openapi.presentation" target="_blank">
        <div className="github">
          <i className="fa-brands fa-github"></i>
        </div>
      </a>
    </>
  )
}