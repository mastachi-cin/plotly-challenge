
// Global variable for sample data
var main_data = [];

// Global variable for metadata
var main_metadata = [];

// Importa data from json file
d3.json("data/samples.json").then((importedData) => {

  // Samples required
  var samples = importedData.samples;

  // Metadata required
  var metadata = importedData.metadata;

  // Global data for samples
  main_data = samples;

  // Global data for metadata
  main_metadata = metadata;

  // Slice the first object for init Demographic info
  buildDemoInfo(metadata.slice(0, 1));

  // Slice the first object for init bar chart plotting
  buildBarChart(samples.slice(0, 1));
  
  // Get all ids from samples for bulding dropdown menu
  builDropDownMenu(samples.map(obj => obj.id));
  
  // Slice the first object for init bubble chart
  buildBubbleChart(samples.slice(0, 1));

});

function buildBarChart(sample) {

  // Get the top 10 OTUs IDs and reverse them from higher to lower
  var otu_ids = sample[0].otu_ids.slice(0,10).reverse();

  // Convert the top 10 OTUs IDs into a string 
  var otu_ids_str = otu_ids.map(function(e){return "OTU " + e.toString()});

  // Get the top 10 OTUs sample values and reverse them from higher to lower
  var values = sample[0].sample_values.slice(0,10).reverse();

  // Get the top 10 OTUs labels and reverse them from higher to lower
  var labels = sample[0].otu_labels.slice(0,10).reverse();

    // Create the Trace
  var trace1 = {
    x: values,
    y: otu_ids_str,
    text: labels,
    name: "OTUs",
    type: "bar",
    orientation: "h"
  };

  // Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "Top 10 OTUs"
  };

  // Plot the chart to a div tag with id "bar"
  Plotly.newPlot("bar", data, layout);

}

function builDropDownMenu(ids) {

  // Get reference to the dropdown menu
  var menuID = d3.select("#selDataset");

  // Remove any previous options from the dropdown menu
  menuID.html("");

  // Append id by id to dropdown menu
  ids.forEach(id => {
      var option = d3.select("#selDataset").append("option");
      option.text(id);
  });

}

// On change to the DOM, call optionChanged()
d3.selectAll("#selDataset").on("change", optionChanged);

// Function called by DOM changes
function optionChanged() {

   // Get reference to the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  
  // Assign the value of the dropdown menu option to a variable
  var selId = dropdownMenu.property("value");

  // Filter samples data for selected ID
  var selectedid = main_data.filter(row => row.id === selId);

  // Filter metadata data for selected ID
  var selectedidMD = main_metadata.filter(row => row.id === parseInt(selId));

  // Update panel with new selected data
  buildDemoInfo(selectedidMD);

  // Update bar char with new selected data
  updateBarChart(selectedid);

  // Update buble char with new selected data
  updateBubbleChart(selectedid);
  
}

function updateBarChart(selectedid) {

  // Get the top 10 OTUs IDs and reverse them from higher to lower
  var otu_ids = selectedid[0].otu_ids.slice(0,10).reverse();
  
  // Convert the top 10 OTUs IDs into a string 
  var otu_ids_str = otu_ids.map(function(e){return "OTU " + e.toString()});

  // Get the top 10 OTUs sample values and reverse them from higher to lower
  var values = selectedid[0].sample_values.slice(0,10).reverse();

  // Get the top 10 OTUs labels and reverse them from higher to lower
  var labels = selectedid[0].otu_labels.slice(0,10).reverse();

  // Create the object with the data to be updated
  var newdata = {
    x: [values],
    y: [otu_ids_str],
    text: [labels]
  };

  // Call function to update the chart
  Plotly.restyle("bar", newdata);
}

function buildBubbleChart(sample) {

  // Get OTUs IDs
  var otu_ids = sample[0].otu_ids;

  // Get OTUs sample values
  var values = sample[0].sample_values;

  // Get OTUs labels
  var labels = sample[0].otu_labels;

  // Create trace
  var trace1 = {
    x: otu_ids,
    y: values,
    text: labels,
    mode: 'markers',
    marker: {
      size: values,
      color: otu_ids
    }
  };
  
  // Create the data array for the plot
  var data = [trace1];
  
  // Define the plot layout
  var layout = {
    xaxis: { title: "OTU ID"},
    showlegend: false
  };
  
  // Plot the chart to a div tag with id "bubble"
  Plotly.newPlot('bubble', data, layout);
}

function updateBubbleChart(selectedid) {

  // Get OTUs IDs
  var otu_ids = selectedid[0].otu_ids;

  // Get OTUs sample values
  var values = selectedid[0].sample_values;

  // Get OTUs labels
  var labels = selectedid[0].otu_labels;

  // Create the object with the data to be updated
  var newdata = {
    x: [otu_ids],
    y: [values],
    text: [labels],
    marker: {
      size: values,
      color: otu_ids
    }
  };

  // Call function to update the chart
  Plotly.restyle("bubble", newdata);

}

function buildDemoInfo(metadata) {

    // Get reference to panel-body
    var panelData = d3.select("#sample-metadata");

    // remove any previous info
    panelData.html("");

    // Add key-value pair for metadata to panel
    Object.entries(metadata[0]).forEach(([key, value]) => panelData.append("div").text(`${key}: ${value}`))

}