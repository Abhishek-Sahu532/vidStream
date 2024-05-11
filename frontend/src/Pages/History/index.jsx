import React, { useEffect } from 'react'
import { HistoryCard } from '../../Components/HistoryCard'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchHistory } from '../../actions/UserAction'

export const History = () => {
const dispatch = useDispatch()
  const {loading, data, error } = useSelector((state => state.history))
  // const {isAuthenticated } = useSelector((state => state.user))

useEffect(()=>{
// if(isAuthenticated){
//   Navigate('/signin')
// }
if(error){
  toast.error(error)
  
}
dispatch(fetchHistory())


},[])

  return (
    <div className='p-10 '>
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </div>
  )
}

