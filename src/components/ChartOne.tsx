import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../../config'


interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {

  const [options, setOptios] = useState<ApexOptions>({
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: ['1', '2', '3', '4', '5', '6', '7'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '20px',
        },
        text: '$ARS',
      },
      min: 0,
      max: 100,
    },
  });

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Ventas',
        data: [23, 11, 22, 27, 13, 22, 37],
      }
    ],
  });

  const getData = async (event: any) => {
    try {     
      if (event.target.name === 'day') {
        const { data } = await axios(`${REACT_APP_SERVER_URL}/orders/data/${event.target.name}`)
        setState({
          series: [
            {
              name: 'Ventas',
              data: data.hours,
            }
          ],
        })
        await setOptios({
          ...options,
          yaxis: {
            ...options.yaxis,
            max: data.sum * 1.1
          },
          xaxis: {
            ...options.xaxis,
            categories: ['00:00 - 04:00', '04:00 - 08:00', '08:00 - 12:00', '12:00 - 16:00', '16:00 - 20:00', '20:00 - 00:00']
          },
        })
      }
      if (event.target.name === 'week') {
        const { data } = await axios(`${REACT_APP_SERVER_URL}/orders/data/${event.target.name}`)
        setState({
          series: [
            {
              name: 'Ventas',
              data: data.weekOrders,
            }
          ],
        })
        await setOptios({
          ...options,
          yaxis: {
            ...options.yaxis,
            max: data.sum * 1.1
          },
          xaxis: {
            ...options.xaxis,
            categories: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
          },
        })
      }
      if (event.target.name === 'month') {
        const { data } = await axios(`${REACT_APP_SERVER_URL}/orders/data/${event.target.name}`)
        setState({
          series: [
            {
              name: 'Ventas',
              data: data.weeks,
            }
          ],
        })
        await setOptios({
          ...options,
          yaxis: {
            ...options.yaxis,
            max: data.sum * 1.1
          },
          xaxis: {
            ...options.xaxis,
            categories: ['Primera semana', 'Segunda semana', 'Tercera semana', 'Cuarta semana']
          },
        })
      }
    } catch (error) {

    }
  }

  useEffect(()=> {
    getData({target:{name:'day'}})
  },[])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Ventas</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button onClick={getData} name='day' className="rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Hoy
            </button>
            <button onClick={getData} name='week' className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Semana
            </button>
            <button onClick={getData} name='month' className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Mes
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
