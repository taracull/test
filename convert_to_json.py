import pandas as pd
import json

# Set the path to your CSV file
csv_file_path = 'database.csv'

# Read the CSV file using pandas
data_frame = pd.read_csv(csv_file_path)

# Remove the first column (Unnamed: 0)
data_frame = data_frame.iloc[:, 1:]

# Rename the columns
data_frame.columns = ['Car Model', 'Accessory', 'Description of Benefits and Features',
                      'Description of Design', 'Description of Safety Elements',
                      'Description of Warranty', 'Description of Possible Objections']

# Remove trailing spaces from "Car Model" and "Accessory" values
data_frame['Car Model'] = data_frame['Car Model'].str.strip()
data_frame['Accessory'] = data_frame['Accessory'].str.strip()

# Convert the data frame to a JSON object
json_data = data_frame.to_json(orient='records')

# Set the path and filename for the output JSON file
output_json_file = 'database.json'

# Save the JSON data to the output file
with open(output_json_file, 'w') as file:
    file.write(json_data)
