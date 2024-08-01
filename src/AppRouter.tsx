import { Route, Routes } from "react-router"
import { NavBarComponent } from "./components"
import { MainPage, ProductPage } from "./pages"
import { CartPage } from "./pages/cart/CartPage"
import { useSelector } from "react-redux"
import { RootState } from "./store"

export const AppRouter = () => {

  const alert = useSelector((state: RootState) => state.alert);

  return (
    <>
      <NavBarComponent />

      {alert.show && <div className="alert">{alert.message}</div>}
      <Routes>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </>
  )
}