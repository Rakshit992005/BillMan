import React from 'react'
import { useParams } from 'react-router-dom'

const CustomerDetails = () => {
    const { id } = useParams();
    // console.log(id);
  return (
    <div>CustomerDetails {id}</div>
  )
}

export default CustomerDetails