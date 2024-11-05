# Dynamic Land Cover Analysis with Google Earth Engine

This project provides a web-based application for analyzing land cover changes using the Google Earth Engine (GEE) platform. The application allows users to select two specific years and visualize the dominant land cover types in a specified region (Quebec City) over the selected years, leveraging the Dynamic World dataset.

## Features

- **User Interface**: The app features a simple UI where users can select two years from a dropdown menu (2016 to 2024). The application computes the mode of land cover classes for the months of May to September for each selected year.
  
- **Interactive Map**: The map is centered on Quebec City and utilizes satellite imagery as the background, providing a clear view of the land cover data.

- **Dynamic Updates**: Users can update the land cover layers on the map by clicking the "Update Maps" button, allowing for quick comparisons between different years.

- **Legend**: A legend is included to explain the color coding of various land cover types, helping users interpret the data easily.

## Technologies Used

- **Google Earth Engine**: A powerful platform for planetary-scale environmental data analysis.
- **JavaScript**: The scripting language used to create the web application and interact with the GEE API.

## How to Use

1. Open the app in the Google Earth Engine Code Editor.
2. Select the desired years from the dropdown menus.
3. Click the "Update Maps" button to visualize the land cover modes for the selected years.
4. Explore the map and refer to the legend for understanding the land cover classifications.
