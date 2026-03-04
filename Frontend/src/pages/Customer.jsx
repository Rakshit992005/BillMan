import React from 'react'
import CreateCustomer from '../components/customers/CreateCustomer'
import CustomerList from '../components/customers/CustomerList'

const Customer = () => {
  return (
    <div className='flex flex-col gap-4'>
      <CreateCustomer />
      <CustomerList />
    </div>
  )
}

export default Customer
