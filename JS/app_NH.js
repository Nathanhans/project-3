// Fetch the JSON data

// let presResults = d3.json('../ETL/presidential_results.json');

// console.log(presResults)


let myMap = L.map("map", {
    center: [36.7783, -119.4179],
    // center:[40.7128, -74.0059],
    zoom: 7
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
//   let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";
  
  // Getting our GeoJSON data
//   d3.json('../ETL/presidential_results.json').then(function(data) {
  d3.json('../data/California_County_Boundaries.geojson').then(function(data) {
    // Creating a GeoJSON layer with the retrieved data

    console.log(data)

    L.geoJson(data).addTo(myMap);
  });
// {
  

//   for (let i = 0; i < data.samples.length; i++)
//   {
//     d3.select("#selDataset").append("option").text(data.samples[i].id) //the drop down is referencing this text
    
//     let sample = {
//         id: data.samples[i].id,
//         sample_values: data.samples[i].sample_values,
//         odu_ids: data.samples[i].otu_ids.map(i => 'OTU ' + i),
//         odu_num: data.samples[i].otu_ids,
//         odu_labels: data.samples[i].otu_labels
//                 }
//     samples.push(sample)

//   } //end of samples loop

//   //metadata loop
//   for (let i = 0; i < data.metadata.length; i++)
//   {
    
//     let meta = {
//       id: data.metadata[i].id,
//       ethnicity: data.metadata[i].ethnicity,
//       gender: data.metadata[i].gender,
//       age: data.metadata[i].age,
//       location: data.metadata[i].location,
//       bbtype: data.metadata[i].bbtype,
//       wfreq: data.metadata[i].wfreq
//     }
//     metadata.push(meta)
//   } //end of metadata loop
// } //end of function
// ;

// //call getData function on change to dropdown
    
// function optionChanged(value) 
// {

//   for (let i = 0; i <samples.length; i++) //loop for plotly data
//   {
//      if (samples[i].id == value)
//      {
//        let vals = samples[i].sample_values.slice(0,10);
//        let tot_vals = samples[i].sample_values;
//        let odus = samples[i].odu_ids.slice(0,10);
//        let tot_odus = samples[i].odu_num;
//        console.log(samples[i]);

// //CHART 1, HORIZONTAL BAR
//       let trace1 = {x: vals, y: odus, type: 'bar', orientation: 'h',hoverinfo: odus };
//       let data = [trace1];
//       let layout = { };
//       Plotly.newPlot("bar", data, layout);    

// //CHART 2, BUBBLE

//       let trace2 = {x: tot_odus,y: tot_vals, mode: 'markers', marker: { size: tot_vals,color: tot_odus, hoverinfo: odus} };
//       let data2 = [trace2];

//       Plotly.newPlot('bubble', data2);

//      }
//    }//end of loop
  
  
//    for (let i = 0; i <metadata.length; i++) //loop for demographic info
//    {
//     if (metadata[i].id == value)
//      {
//       // d3.select('#sample-metadata').remove("option");
//       d3.select("#sample-metadata").raise("option").text("ID: " + metadata[i].id); //id
//       d3.select("#sample-metadata").append("option").text("Ethnicity: " + metadata[i].ethnicity); //ethnicity
//       d3.select("#sample-metadata").append("option").text("Gender: " + metadata[i].gender); //gender
//       d3.select("#sample-metadata").append("option").text("Age: " + metadata[i].age); //age
//       d3.select("#sample-metadata").append("option").text("Location: " + metadata[i].location); //location
//       d3.select("#sample-metadata").append("option").text("BBType: " + metadata[i].bbtype); //bbtype
//       d3.select("#sample-metadata").append("option").text("WFreq: " + metadata[i].wfreq); //wfreq
//      }
//   }
// }
// ;

