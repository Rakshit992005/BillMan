import React from 'react'
import CreateCustomer from '../components/customers/CreateCustomer'
import CustomerList from '../components/customers/CustomerList'

const Customer = () => {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleCustomerCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col gap-4'>
      <CreateCustomer onCustomerCreated={handleCustomerCreated} />
      <CustomerList refreshTrigger={refreshTrigger} />
    </div>
  )
}

export default Customer
