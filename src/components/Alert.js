import React, { useContext } from 'react'
import productContext from '../context/products/ProductContext'

const Alert = () => {

    const context = useContext(productContext)
    const { alert } = context


    return (
        <div style={{ position: 'fixed', top: '55px', width: '100%', zIndex: 1000}}>
            {alert && <div className={`alert text alert-${alert.type} text-center alert-dismissible fade show`} role="alert" style={{color:'black'}}>
                {alert.message}
            </div>}
        </div>
    )
}

export default Alert
