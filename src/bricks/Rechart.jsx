import { VisualBrick, registerBrick } from 'olympe';
import { ReactBrick,useProperty } from '@olympeio/core';
import React from 'react';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default class Rechart extends ReactBrick {

    static getReactComponent($ ) {
        return () => {

            const chartData = useProperty($);

            const labels = ["January", "February", "March", "April", "May", "June"];
            const data = {
              labels: labels,
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgb(255, 99, 132)",
                  data: [0, 10, 5, 2, 20, 30, 45],
                },
              ],
            };
            console.log("get tab data", chartData)
            return (<div>

              <Bar data={data} />
            </div>);
        };
    }
}

registerBrick('01879a1750b40c187876', Rechart);
