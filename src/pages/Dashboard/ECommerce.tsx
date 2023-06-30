import CardFour from '../../components/CardFour';
import CardOne from '../../components/CardOne';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';
import ChartOne from '../../components/ChartOne';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../../../config'
import { useEffect, useState } from 'react'

const ECommerce = () => {

  const [stats, setStats] = useState({
    products:0,
    sales: 0,
    users: 0
  })

  const [ready,setReady] = useState(false)

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await axios(`${REACT_APP_SERVER_URL}/stats`)
        setStats(data)
      } catch (error) {
        console.log(error)
      }
    }
    getStats()
    setReady(true)
  }, [])

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne revenue={stats.sales * 0.05}/>
        <CardTwo totalAmount={stats.sales}/>
        <CardThree products={stats.products}/>
        <CardFour users={stats.users} userType='Usuarios'/>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
