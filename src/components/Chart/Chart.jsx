import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2'; // second version

import styles from './Chart.module.css';

// react hooks are used in this component.
const Chart = ({ data:{ confirmed, deaths, recovered}, country }) => {  // we are getting the data and country as the props.
        const [dailyData, setDailyData] = useState([]); // the initial value is an empty object.

     useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
     }, []);

     console.log(country);
     console.log(confirmed, recovered, deaths);
     console.log('helo my friend');
     const lineChart = (
       dailyData.length ? (
            <Line 
            data={{      // 2 curly bracets are used one to set the object and other to make the code dynamic.
                labels: dailyData.map(function(item){
                   return item.date;
                }),
                datasets: [{
                    data: dailyData.map(function(item){
                        return item.confirmed;
                    }),
                    label: 'Infected',
                    borderColor: '#333fff',
                    fill: true,
                }, {
                    data: dailyData.map(function(item){
                        return item.deaths;
                    }),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }],
            }}
            />): null
     );

     const barChart = (
         confirmed ? (
              <Bar 
              data={{
                labels: ['Infected', 'Recovered', 'Deaths'], 
                datasets: [{
                    label: 'People',
                    backgroundColor:[
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)',
                    ],
                    data:[confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}`},
            }}/>
          ) : null
     )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}

export default Chart;