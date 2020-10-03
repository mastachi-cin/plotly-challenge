d3.json("data/samples.json").then((importedData) => {

  // Only samples required
  var samples = importedData.samples;

  // Slice the first object for plotting
  sample = samples.slice(0, 1);

  console.log(sample);

  buildBarChart(sample[0]);
    
});

function buildBarChart(sample) {

  var ids = sample.otu_ids.slice(0,10).reverse();
  console.log(ids);

  var ids_str = ids.map(function(e){return "OTU " + e.toString()});
  console.log(ids_str)

  var values = sample.sample_values.slice(0,10).reverse();
  console.log(values);

  var labels = sample.otu_labels.slice(0,10).reverse();

    // Create the Trace, only the top 10 OTUs
  var trace1 = {
    x: values,
    y: ids_str,
    text: labels,
    name: "OTUs",
    type: "bar",
    orientation: "h"
  };

  console.log(trace1)

  // Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "Top 10 OTUs"
  };

  // Plot the chart to a div tag with id "bar"
  Plotly.newPlot("bar", data, layout);

}

  