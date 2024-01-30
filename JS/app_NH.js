// Fetch the JSON data

// let presResults = d3.json('../ETL/presidential_results.json');

// console.log(presResults)

let dropDownArray = [2000,2004,2008,2012,2016,2020];
let electionResults;

let myMap = L.map("map", {
    center: [38, -119.4179],
    zoom: 6
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
//   let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";

// dropdown initialization
for (let i = 0; i < dropDownArray.length; i++)
      {
        d3.select("#selDataset").append("option").text(dropDownArray[i])
      }

// Initialize the page
d3.json('../data/California_County_Boundaries.geojson').then(function(data) 
{
    // Creating a GeoJSON layer with the retrieved data
    let countiesLayer = L.geoJson(data).addTo(myMap);

    //DROP DOWN CONTROL-----------

    for (let i = 0; i < dropDownArray.length; i++)
      {
        d3.select("#selDataset").append("option").text(dropDownArray[i])
      } 

    //END OF DROP DOWN CONTROL------------

    d3.json('../etl/presidential_results_only.json').then(function(electionData) 
    {

        //

      countiesLayer.eachLayer(function (layer)
      {
        
        var countyName = layer.feature.properties.CountyName;

        var electionResults = electionData.filter(function(item) {
          // Currently filtering to just year 2000-- ideally this will by dynamic based on election drop down
          return (item.county_name.toLowerCase() === countyName.toLowerCase()) && (item.year === 2000);
        })

        // Attach election data to GeoJSON properties
        layer.feature.properties.electionResults = electionResults;

        layer.bindPopup(electionResults[0].county_name)

        // console.log(electionResults)

      })

      countiesLayer.setStyle(function (feature) {
        var electionResults = feature.properties.electionResults[0];
        return {
            fillColor: getColor(electionResults),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: .8
        }
      })

    
    
    var electionResults = electionData.filter(function(item) {
      // Currently filtering to just year 2000-- ideally this will by dynamic based on election drop down
      return (item.year === 2000)});
      
    console.log(electionResults)
    // Initialize Bar Chart
    // use electionData
    let yAxis = electionResults.pcttotal;
    let xAxis = electionResults.county_name;
    let labels = electionResults.candidate;
    
    var data = [{
        type: 'bar',
        x: xAxis,
        y: yAxis,
        text: labels,
        
      }];
    let layout = {
        title: "Top 10 OTUs Present"
    };
      
      Plotly.newPlot('bar', data, layout);


    console.log(electionResults.pcttotal)









    // Initialize Pie Chart











    })
})




// Getting our GeoJSON data
function optionChanged(dropdownValue) {

// need to clear markers everytime we call this function.
myMap.eachLayer(layer => {
  if (layer instanceof L.GeoJSON) {
      myMap.removeLayer(layer);
  }
});

d3.json('../data/California_County_Boundaries.geojson').then(function(data) 
{
    // Creating a GeoJSON layer with the retrieved data
    let countiesLayer = L.geoJson(data).addTo(myMap);

    d3.json('../etl/presidential_results_only.json').then(function(electionData) 
    {

        //THIS IS WHERE THE DROP DOWN GOES...LET'S CREATE AN ARRAY INSTEAD OF A LOOP

      countiesLayer.eachLayer(function (layer)
      {
        
        var countyName = layer.feature.properties.CountyName;

        var electionResults = electionData.filter(function(item) {
          // Currently filtering to just year 2000-- ideally this will by dynamic based on election drop down
          return (item.county_name.toLowerCase() === countyName.toLowerCase()) && (item.year === parseInt(dropdownValue));
        })

        // Attach election data to GeoJSON properties
        layer.feature.properties.electionResults = electionResults;

      })

      countiesLayer.setStyle(function (feature) {
        var electionResults = feature.properties.electionResults[0];
        return {
            fillColor: getColor(electionResults),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: .8
        }
      })


    // Update Bar Chart













    // Update Pie Chart











    })
})
};

function getColor(electionResults)
{

  if (electionResults.party === "DEMOCRAT") {
    return "blue"
  } else if (electionResults.party === "REPUBLICAN") {
    return "red"
  } else {
    return "gray"
  }

}

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

