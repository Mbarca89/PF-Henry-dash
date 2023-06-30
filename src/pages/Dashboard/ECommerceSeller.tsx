import CardFour from '../../components/CardFour';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';
import TableSix from '../../components/TableSix';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../../../config'

import { useSelector, useDispatch } from "react-redux"
import { RootState, useAppSelector } from '../../store';
import { changeIncrementAmount, decrement, increment } from '../../store/reducers/counterReducer';
import { useEffect, useState } from 'react'

const ECommerceSeller = () => {

  const currentUser = useAppSelector((state: RootState) => state.user.userData)

  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    users: 0
  })

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await axios(`${REACT_APP_SERVER_URL}/stats/${currentUser.id}`)
        setStats({
          products: data.products,
          sales: data.totalSales,
          users: data.users
        })
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
    setReady(true)
  }, [])

  // use store from Redux Toolkit
  const count = useSelector((state: RootState) => state.counter.value)
  const incrementAmount = useSelector((state: RootState) => state.counter.incrementAmount);
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeIncrementAmount(Number(e.target.value)));
  }

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo totalAmount={stats.sales} />
        <CardThree products={stats.products} />
        <CardFour users={stats.users} userType='Clientes' />
      </div>
      <div className="mt-4 flex flex-col gap-10 relative">
        <TableSix />
      </div>
    </DefaultLayout>
  );
};

export default ECommerceSeller;
