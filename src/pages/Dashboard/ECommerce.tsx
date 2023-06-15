import CardFour from '../../components/CardFour';
import CardOne from '../../components/CardOne';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';
import ChartOne from '../../components/ChartOne';
import ChartThree from '../../components/ChartThree';
import ChartTwo from '../../components/ChartTwo';
import ChatCard from '../../components/ChatCard';
import MapOne from '../../components/MapOne';
import TableOne from '../../components/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';

import { useSelector, useDispatch } from "react-redux"
import { RootState } from '../../store';
import { changeIncrementAmount, decrement, increment } from '../../store/reducers/counterReducer';

const ECommerce = () => {

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
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
      {count} -- 
      <button onClick={()=> dispatch(increment())}>Increment</button> -- 
      <button onClick={()=> dispatch(decrement())}>Decrement</button> --
      <input type="text" onChange={handleChange}/>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
