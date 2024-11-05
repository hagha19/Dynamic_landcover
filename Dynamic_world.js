// Set the map background to satellite imagery
Map.setOptions('SATELLITE'); // Set to satellite view

// Center the map on Quebec City
Map.setCenter(-71.2082, 46.8139, 10); // Longitude, Latitude, Zoom level

// Dropdown for years (from 2016 to 2024)
var yearOptions = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

var yearSelect1 = ui.Select({
  items: yearOptions,
  value: '2017',
  placeholder: 'Select first year',
  style: {margin: '5px'}
});

var yearSelect2 = ui.Select({
  items: yearOptions,
  value: '2024',
  placeholder: 'Select second year',
  style: {margin: '5px'}
});

// Initialize an array to hold the layers
var landcoverLayers = [];

// Function to update the map layers
function updateMaps() {
  // Remove previous land cover layers
  landcoverLayers.forEach(function(layer) {
    Map.remove(layer);
  });
  // Clear the array after removing layers
  landcoverLayers = [];

  // Get selected years from dropdowns
  var year1 = yearSelect1.getValue();
  var year2 = yearSelect2.getValue();

  // Define geometry (for simplicity, this is just a point around Quebec City)


  // Fetch and compute the mode for the first selected year (May to August)
  var landcoverLayer1 = ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
    .select('label')
    .filterDate(year1 + '-05-01', year1 + '-09-01') // Filter for May to September
    .mode(); // Compute mode

  // Fetch and compute the mode for the second selected year (May to August)
  var landcoverLayer2 = ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
    .select('label')
    .filterDate(year2 + '-05-01', year2 + '-09-01') // Filter for May to September
    .mode(); // Compute mode

  // Define the color palette
  var palette = [
    '#419bdf', // Class 0: Water
    '#397d49', // Class 1: Trees
    '#88b053', // Class 2: Grass
    '#7a87c6', // Class 3: Flooded Vegetation
    '#e49635', // Class 4: Crops
    '#dfc35a', // Class 5: Shrub and Scrub
    '#c4281b', // Class 6: Built
    '#a59b8f', // Class 7: Bare
    '#b39fe1'  // Class 8: Snow and Ice
  ];

  // Add the land cover layers to the map with fixed opacity
  var layer1 = Map.addLayer(landcoverLayer1, {min: 0, max: 8, palette: palette, opacity: 1}, 'Land Cover ' + year1);
  var layer2 = Map.addLayer(landcoverLayer2, {min: 0, max: 8, palette: palette, opacity: 1}, 'Land Cover ' + year2);
  landcoverLayers.push(layer1);
  landcoverLayers.push(layer2);
}

// Button to update the maps
var updateButton = ui.Button({
  label: 'Update Maps',
  onClick: updateMaps,
  style: {margin: '5px'}
});

// Panel to hold UI elements
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Select Years for Land Cover Analysis'),
    ui.Label('First Year:'),
    yearSelect1,
    ui.Label('Second Year:'),
    yearSelect2,
    updateButton
  ],
  layout: ui.Panel.Layout.Flow('vertical'),
  style: {position: 'top-left', width: '300px', padding: '10px'}
});

// Create a legend panel
var legendPanel = ui.Panel({
  widgets: [
    ui.Label('Legend', {fontWeight: 'bold', fontSize: '20px'}),
    ui.Panel({
      widgets: [
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#419bdf', padding: '5px', width: '20px'}), ui.Label('Water')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#397d49', padding: '5px', width: '20px'}), ui.Label('Trees')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#88b053', padding: '5px', width: '20px'}), ui.Label('Grass')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#7a87c6', padding: '5px', width: '20px'}), ui.Label('Flooded Vegetation')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#e49635', padding: '5px', width: '20px'}), ui.Label('Crops')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#dfc35a', padding: '5px', width: '20px'}), ui.Label('Shrub and Scrub')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#c4281b', padding: '5px', width: '20px'}), ui.Label('Built')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#a59b8f', padding: '5px', width: '20px'}), ui.Label('Bare')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        }),
        ui.Panel({
          widgets: [ui.Label('', {backgroundColor: '#b39fe1', padding: '5px', width: '20px'}), ui.Label('Snow and Ice')],
          layout: ui.Panel.Layout.Flow('horizontal'),
          style: {margin: '5px'}
        })
      ],
      layout: ui.Panel.Layout.Flow('vertical')
    })
  ],
  layout: ui.Panel.Layout.Flow('vertical'),
  style: {position: 'top-left', padding: '10px', backgroundColor: 'white'}
});

// Add the control panel and legend to the map
Map.add(controlPanel);
Map.add(legendPanel);

// Initialize the maps with default dates
updateMaps();