from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

# Load the trained Random Forest model
model = joblib.load('random_forest_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    data = request.get_json()

    # Extract input variables from the JSON data
    item_weight = data['Item_Weight']
    item_fat_content = data['Item_Fat_Content']
    item_visibility = data['Item_Visibility']
    item_type = data['Item_Type']
    item_mrp = data['Item_MRP']
    outlet_establishment_year = data['Outlet_Establishment_Year']
    outlet_size = data['Outlet_Size']
    outlet_location_type = data['Outlet_Location_Type']
    outlet_type = data['Outlet_Type']

    # Create a DataFrame with the input data
    input_df = pd.DataFrame({
        'Item_Weight': [item_weight],
        'Item_Fat_Content': [item_fat_content],
        'Item_Visibility': [item_visibility],
        'Item_Type': [item_type],
        'Item_MRP': [item_mrp],
        'Outlet_Establishment_Year': [outlet_establishment_year],
        'Outlet_Size': [outlet_size],
        'Outlet_Location_Type': [outlet_location_type],
        'Outlet_Type': [outlet_type]
    })

    # Make predictions using the model
    predictions = model.predict(input_df)
    print(predictions)

    # Return the predictions as JSON
    return jsonify({'predictions': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
