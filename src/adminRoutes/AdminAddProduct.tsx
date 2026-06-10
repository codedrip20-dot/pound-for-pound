
import { Outlet } from 'react-router-dom'

const AdminAddProduct = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">
            Add New Product
        </h1>
        <p className="text-gray-400 mb-4">
            Use the form below to add a new product to the store.   
        </p>
     
     
        <Outlet />
    </div>
  )
}

export default AdminAddProduct