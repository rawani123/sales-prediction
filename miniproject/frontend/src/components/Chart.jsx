import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const Chart = ({ scatterData = [] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="MRP" unit="" />
                <YAxis type="number" dataKey="y" name="Sales" unit="" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Items" data={scatterData} fill="#8884d8" />
                {/* X-axis title */}
                <Label
                    value="MRP"
                    offset={0}
                    position="bottom"
                    style={{ textAnchor: 'middle' }}
                />
                {/* Y-axis title */}
                <Label
                    value="Sales"
                    offset={0}
                    position="left"
                    angle={-90}
                    style={{ textAnchor: 'middle' }}
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

const ChatInterface = () => {
    const [scatterData, setScatterData] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(result => {
                if (result.success !== true) {
                    console.error('API request unsuccessful:', result);
                    return;
                }
                
                const data = result.data;
                if (!Array.isArray(data)) {
                    console.error('Fetched data is not an array:', data);
                    return;
                }
                
                const formattedData = data.map(item => ({
                    x: parseFloat(item.Item_MRP),
                    y: parseFloat(item.Item_Outlet_Sales),
                    name: item.Item_Identifier
                }));
                setScatterData(formattedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex gap-4'>
            <button className='bg-blue-600 px-6 py-4 mt-10 mb-5 rounded-lg ' onClick={fetchData}>Fetch Data</button>
            <Link to="/prediction"className='bg-blue-600 px-6 py-4 mt-10 mb-5 rounded-lg ' >Prediction</Link>
            </div>
            <p className='font-bold text-3xl'>Item_MRP vs Item_Outlet_Sales</p>
            <Chart scatterData={scatterData} />
        </div>
    );
}

export default ChatInterface;
