import React, {useState} from "react"
import {Link} from "react-router-dom"
import {useCartContext} from "../context/cartContext"
import ModalAdd from "./ModalAddProduct"
import ModalOrders from "./ModalOrders"

import Productos from "./Productos"

const AdminDashboard = ({user}) => {
   const {cart} = useCartContext()
   const [modal, SetModal] = useState(false)
   const [modalOrders, SetModalOrders] = useState(false)

   //console.log(modal)

   //console.log(cart.productos, "Cart")
   const handleClick = () => SetModal(true)
   const handleClickB = () => SetModalOrders(true)

   //http://localhost:9000/admin/uploads/Ivan%20Hernandez.png/
   const showButtons = () => (
      <div className="bg-light my-2">
         <div className="container">
            <div className="row">
               <div className="col-md-4 my-1 py-3">
                  <Link to={"/cart"} className="btn btn-sm btn-outline-info w-100">
                     <i className="bi bi-cart"></i> Carrito{" "}
                     <div className="badge bg-primary">
                        {cart.productos.length > 0 ? cart.productos.length : 0}
                     </div>
                  </Link>
               </div>
               <div className="col-md-4 my-1 py-3">
                  <button
                     onClick={handleClick}
                     className="btn btn-sm btn-outline-info w-100 ">
                     Agregar Producto Nuevo
                  </button>
               </div>
               <div className="col-md-4 my-1 py-3">
                  <button
                     onClick={handleClickB}
                     className="btn btn-sm btn-outline-info w-100 ">
                     Ordenes
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
   return (
      <section className="h-100" style={{backgroundColor: "#eee"}}>
         <div className="container py-5 h-100">
            <div className="bg-dark bg-gradient text-light py-3">
               <div className="row">
                  <div className="col-md-6">
                     <h5>
                        <i className="bi bi-house ms-2"></i> Admin Dashboard
                     </h5>
                     <div className="ms-2">
                        <p>Bienvenido {user.nombre}</p>
                        <img
                           height={120}
                           src={`http://localhost:9000/${user.foto}`}
                           alt=""
                        />
                     </div>
                  </div>
               </div>
            </div>

            {showButtons()}
            {modal === true ? <ModalAdd hide={SetModal} /> : ""}
            {modalOrders === true ? <ModalOrders hide={SetModalOrders} /> : ""}
            <Productos cart={cart} user={user} />
         </div>
      </section>
   )
}

export default AdminDashboard
