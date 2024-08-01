import { Route, Routes } from "react-router"
import { NavBarComponent } from "./components"
import { MainPage, ProductPage } from "./pages"
import { CartPage } from "./pages/cart/CartPage"

export const AppRouter = () => {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </>
  )
}