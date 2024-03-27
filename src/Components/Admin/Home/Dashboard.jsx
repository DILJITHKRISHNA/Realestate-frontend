import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { GetCount } from '../../../Api/AdminApi';

function Dashboard() {
  const chartRef = useRef(null);
  let myChart = useRef(null);
  const [monthlyReservations, setMonthlyReservations] = useState([])
  const [monthlyBookings, setMonthlyBookings] = useState([])

  useEffect(() => {
    const getAllData = async () => {
      const res = await GetCount();
      console.log(res, "ressssss");
      if (res.data.success) {
        const bookingsData = res.data.monthlyBookings.map(item => item.count);
        const reservationsData = res.data.monthlyReservations.map(item => item.count);
        setMonthlyReservations(reservationsData);
        setMonthlyBookings(bookingsData);
      }
    }
    getAllData();
  }, []);
  console.log(monthlyReservations,monthlyBookings,"sdfsdfsdf");
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Bookings',
          data: monthlyBookings, 
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        },
        {
          label: 'Reservations',
          data: monthlyReservations, 
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Destroy existing chart if it exists
    if (myChart.current) {
      myChart.current.destroy();
    }

    // Create new chart
    myChart.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    // Clean up function to destroy chart on component unmount
    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, [monthlyReservations, monthlyBookings]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Dashboard;
