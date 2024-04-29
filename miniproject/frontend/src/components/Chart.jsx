import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis as BarXAxis,
  YAxis as BarYAxis,
  CartesianGrid as BarCartesianGrid,
  Tooltip as BarTooltip,
} from "recharts";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip as PieTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ScatterPlot = ({ scatterData = [] }) => {
  return (
    <ScatterChart
      width={1000}
      height={400}
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
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter name="Items" data={scatterData} fill="#8884d8" />
      {/* X-axis title */}
      <Label
        value="MRP"
        offset={0}
        position="bottom"
        style={{ textAnchor: "middle" }}
      />
      {/* Y-axis title */}
      <Label
        value="Sales"
        offset={0}
        position="left"
        angle={-90}
        style={{ textAnchor: "middle" }}
      />
    </ScatterChart>
  );
};

const BarChartComponent = ({ barData = [] }) => {
  // Filter barData to show only "Medium", "High", and "Small" categories
  const filteredBarData = barData.filter(
    (item) => item.Outlet_Size === "Medium" || item.Outlet_Size === "High" || item.Outlet_Size === "Small"
  );

  return (
    <BarChart
      width={1000}
      height={400}
      data={filteredBarData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <BarCartesianGrid strokeDasharray="3 3" />
      <BarXAxis dataKey="Outlet_Size" />
      <BarYAxis />
      <BarTooltip />
      <Bar dataKey="Item_Outlet_Sales" fill="#8884d8" />
    </BarChart>
  );
};

const PieChartComponent = ({ pieData = [] }) => {
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FFA07A",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#19e6af",
    "#d719e6",
  ];

  return (
    <ResponsiveContainer width={400} height={600}>
      <PieChart>
        <Pie
          dataKey="value"
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={160}
          fill="#8884d8"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <PieTooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const ItemFatContentBarChart = ({ fatContentBarData = [] }) => {
  return (
    <BarChart
      width={1000}
      height={400}
      data={fatContentBarData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <BarCartesianGrid strokeDasharray="3 3" />
      <BarXAxis dataKey="Item_Fat_Content" />
      <BarYAxis />
      <BarTooltip />
      <Bar dataKey="Item_Outlet_Sales" fill="#8884d8" />
    </BarChart>
  );
};

const ChatInterface = () => {
  const [scatterData, setScatterData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [fatContentBarData, setFatContentBarData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const excludedColumns = ['Item_Identifier', 'Outlet_Identifier', '__v',"_id"];

  const fetchData = () => {
    fetch("http://localhost:3000/api/items")
      .then((response) => response.json())
      .then((result) => {
        if (result.success !== true || !Array.isArray(result.data)) {
          console.error(
            "API request unsuccessful or data format incorrect:",
            result
          );
          return;
        }

        const formattedScatterData = result.data.map((item) => ({
          x: parseFloat(item.Item_MRP),
          y: parseFloat(item.Item_Outlet_Sales),
          name: item.Item_Identifier,
        }));
        setScatterData(formattedScatterData);

        const outletSalesBySize = {};
        result.data.forEach((item) => {
          const outletSize = item.Outlet_Size;
          const outletSales = parseFloat(item.Item_Outlet_Sales);
          if (!outletSalesBySize[outletSize]) {
            outletSalesBySize[outletSize] = outletSales;
          } else {
            outletSalesBySize[outletSize] += outletSales;
          }
        });

        const formattedBarData = Object.keys(outletSalesBySize).map(
          (outletSize) => ({
            Outlet_Size: outletSize,
            Item_Outlet_Sales: outletSalesBySize[outletSize],
          })
        );
        setBarData(formattedBarData);

        const itemTypeData = {};
        result.data.forEach((item) => {
          const itemType = item.Item_Type;
          if (!itemTypeData[itemType]) {
            itemTypeData[itemType] = 1;
          } else {
            itemTypeData[itemType] += 1;
          }
        });

        const formattedPieData = Object.keys(itemTypeData).map((itemType) => ({
          name: itemType,
          value: itemTypeData[itemType],
        }));
        setPieData(formattedPieData);

        const fatContentSales = {};
        result.data.forEach((item) => {
          const fatContent = item.Item_Fat_Content;
          const outletSales = parseFloat(item.Item_Outlet_Sales);
          if (fatContent === "Low Fat" || fatContent === "Regular") {
            if (!fatContentSales[fatContent]) {
              fatContentSales[fatContent] = outletSales;
            } else {
              fatContentSales[fatContent] += outletSales;
            }
          }
        });

        const formattedFatContentBarData = Object.keys(fatContentSales).map(
          (fatContent) => ({
            Item_Fat_Content: fatContent,
            Item_Outlet_Sales: fatContentSales[fatContent],
          })
        );
        setFatContentBarData(formattedFatContentBarData);

        // Set the table data
        setTableData(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        to="/prediction"
        className="bg-blue-600 px-6 py-4 mt-10 mb-5 rounded-lg text-white "
      >
        Prediction
      </Link>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-3xl">Item_MRP vs Item_Outlet_Sales</p>
        <ScatterPlot scatterData={scatterData} />
        <div className="w-screen h-1 bg-blue-400 my-4"></div>{" "}
        {/* Horizontal line */}
        <p className="font-bold text-3xl">Outlet_size vs Item_Outlet_Sales</p>
        <BarChartComponent barData={barData} />
        <div className="w-screen h-1 bg-blue-400 my-4"></div>{" "}
        {/* Horizontal line */}
        <p className="font-bold text-3xl">Item_Type</p>
        <PieChartComponent pieData={pieData} />
        <div className="w-screen h-1 bg-blue-400 my-4"></div>{" "}
        {/* Horizontal line */}
        <p className="font-bold text-3xl">
          Item_Fat_Content vs Item_Outlet_Sales
        </p>
        <ItemFatContentBarChart fatContentBarData={fatContentBarData} />
      </div>
      <div className="w-screen h-1 bg-blue-400 my-4"></div>{" "}
      <div className='mt-10'>
    <table className='border-collapse border border-gray-400'>
        <thead>
            <tr>
                {tableData.length > 0 && Object.keys(tableData[0]).filter(key => !excludedColumns.includes(key)).map((key, index) => (
                    <th key={index} className='border border-gray-400 px-4 py-2'>{key}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {tableData.length > 0 && tableData.slice(0, 10).map((item, index) => (
                <tr key={index}>
                    {Object.entries(item).filter(([key, _]) => !excludedColumns.includes(key)).map(([key, value], i) => (
                        <td key={i} className='border border-gray-400 px-4 py-2'>{value}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
</div>
    </div>
  );
};

export default ChatInterface;
