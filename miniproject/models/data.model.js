import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  Item_Identifier: String,
  Item_Weight: String,
  Item_Fat_Content: String,
  Item_Visibility: String,
  Item_Type: String,
  Item_MRP: String,
  Outlet_Identifier: String,
  Outlet_Establishment_Year: String,
  Outlet_Size: String,
  Outlet_Location_Type: String,
  Outlet_Type: String,
  Item_Outlet_Sales: String
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
