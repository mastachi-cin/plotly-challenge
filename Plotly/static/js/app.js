
var main_data = [];

d3.json("data/samples.json").then((importedData) => {

  // Only samples required
  var samples = importedData.samples;

  main_data = samples;

  // Slice the first object for init plotting
  buildBarChart(samples.slice(0, 1));
  
  // Get all ids from samples
  builDropDownMenu(samples.map(obj => obj.id));
    
});

function buildBarChart(sample) {

  var otu_ids = sample[0].otu_ids.slice(0,10).reverse();
  //console.log(otu_ids);

  var otu_ids_str = otu_ids.map(function(e){return "OTU " + e.toString()});
  //console.log(otu_ids_str)

  var values = sample[0].sample_values.slice(0,10).reverse();
  //console.log(values);

  var labels = sample[0].otu_labels.slice(0,10).reverse();

    // Create the Trace, only the top 10 OTUs
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

  // Get reference to the Country menu
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
  var dropdownMenu = d3.select("#selDataset");
  
  // Assign the value of the dropdown menu option to a variable
  var selId = dropdownMenu.property("value");

  // Initialize an empty array for the country's data
  var selectedid = main_data.filter(row => row.id === selId);

  console.log(selectedid);

  var otu_ids = selectedid[0].otu_ids.slice(0,10).reverse();
  
  var otu_ids_str = otu_ids.map(function(e){return "OTU " + e.toString()});

  var values = selectedid[0].sample_values.slice(0,10).reverse();

  var labels = selectedid[0].otu_labels.slice(0,10).reverse();

  var newdata = {
    x: [values],
    y: [otu_ids_str],
    text: [labels]
  };

  // Call function to update the chart
  Plotly.restyle("bar", newdata);
}



  