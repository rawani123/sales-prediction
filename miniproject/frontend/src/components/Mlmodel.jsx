import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Mlmodel() {
  const [formData, setFormData] = useState({
    Item_Weight: '',
    Item_Fat_Content: '0',
    Item_Visibility: '',
    Item_Type: '4',
    Item_MRP: '',
    Outlet_Establishment_Year: '',
    Outlet_Size: '1',
    Outlet_Location_Type: '0',
    Outlet_Type: '1'
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key]) {
        setError(`Please fill in ${key.replace(/_/g, ' ')}`);
        return;
      }
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.predictions[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-blue-200">
      <Link to="/" className='bg-blue-600 px-6 py-4 mt-10 mb-5 rounded-lg text-white '>Graphs</Link>
      <div className="bg-white p-8 rounded-2xl shadow-2xl shadow-blue-600 w-full max-w-md">
        <h1 className="text-2xl mb-6">Make Prediction</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="mb-4 w-full md:w-1/2 px-2">
            {/* Left Column */}
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Item_Weight">Item Weight:</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                name="Item_Weight"
                value={formData.Item_Weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Item_Visibility">Item Visibility:</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                name="Item_Visibility"
                value={formData.Item_Visibility}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Item_MRP">Item MRP:</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                name="Item_MRP"
                value={formData.Item_MRP}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Item_Fat_Content">Item Fat Content:</label>
              <select
                className="border rounded px-3 py-2 w-full"
                name="Item_Fat_Content"
                value={formData.Item_Fat_Content}
                onChange={handleChange}
                required
              >
                <option value="">Select Fat Content</option>
                <option value="0">Low Fat</option>
                <option value="1">Regular</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Item_Type">Item Type:</label>
              <select
                className="border rounded px-3 py-2 w-full"
                name="Item_Type"
                value={formData.Item_Type}
                onChange={handleChange}
                required
              >
                <option value="">Select Item Type</option>
                <option value="4">Dairy</option>
                <option value="14">Soft Drinks</option>
                <option value="10">Meat</option>
                <option value="6">Fruits and Vegetables</option>
                <option value="9">Household</option>
                <option value="0">Baking Goods</option>
                <option value="13">Snack Foods</option>
                <option value="5">Frozen Foods</option>
                <option value="2">Breakfast</option>
                <option value="8">Health and Hygiene</option>
                <option value="7">Hard Drinks</option>
                <option value="3">Canned</option>
                <option value="1">Breads</option>
                <option value="15">Starchy Foods</option>
                <option value="11">Others</option>
                <option value="12">Seafood</option>
              </select>
            </div>
          </div>
          <div className="mb-4 w-full md:w-1/2 px-2">
            {/* Right Column */}
            
            <div className="mb-4">
      <label className="block mb-2" htmlFor="Outlet_Establishment_Year">Outlet Establishment Year:</label>
      <div className="flex">
        <select
          className="border rounded px-3 py-2 mr-2 w-1/2"
          name="Outlet_Establishment_Year"
          value={formData.Outlet_Establishment_Year}
          onChange={handleChange}
          required
        >
          {!formData.Outlet_Establishment_Year && <option value="">Select Year</option>}
          {Array.from({ length: 26 }, (_, index) => (
            <option key={index} value={1985 + index}>{1985 + index}</option>
          ))}
        </select>
        <input
          className="border rounded px-3 py-2 w-1/2"
          type="text"
          name="Outlet_Establishment_Year"
          value={formData.Outlet_Establishment_Year}
          onChange={handleChange}
          placeholder="Other"
          required={!formData.Outlet_Establishment_Year}
        />
      </div>
    </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Outlet_Size">Outlet Size:</label>
              <select
                className="border rounded px-3 py-2 w-full"
                name="Outlet_Size"
                value={formData.Outlet_Size}
                onChange={handleChange}
                required
              >
                <option value="">Select Outlet Size</option>
                <option value="1">Medium</option>
                <option value="0">High</option>
                <option value="2">Small</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Outlet_Location_Type">Outlet Location Type:</label>
              <select
                className="border rounded px-3 py-2 w-full"
                name="Outlet_Location_Type"
                value={formData.Outlet_Location_Type}
                onChange={handleChange}
                required
              >
                <option value="">Select Location Type</option>
                <option value="0">Tier 1</option>
                <option value="2">Tier 3</option>
                <option value="1">Tier 2</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="Outlet_Type">Outlet Type:</label>
              <select
                className="border rounded px-3 py-2 w-full"
                name="Outlet_Type"
                value={formData.Outlet_Type}
                onChange={handleChange}
                required
              >
                <option value="">Select Outlet Type</option>
                <option value="1">Supermarket Type1</option>
                <option value="2">Supermarket Type2</option>
                <option value="0">Grocery Store</option>
                <option value="3">Supermarket Type3</option>
              </select>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            Predict
          </button>
        </form>
        {prediction !== null && (
          <div className='flex flex-row gap-3 justify-center items-center mt-5'>
            <h2 className="text-xl ">Prediction:</h2>
            <p className='text-xl underline '>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mlmodel;
