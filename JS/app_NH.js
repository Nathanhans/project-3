//set initial drop down array values and initialize charts and map


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


// Legend
d3.select("#legend").append("h4").text("Republican: Red").style("color","red");
d3.select("#legend").append("h4").text("Democrat: Blue").style("color","blue");


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

        // Attaching election data to popup
        layer.bindPopup(`<h3><strong> County: </strong> ${electionResults[0].county_name}</h3>
                         <strong> Winning Party: </strong> ${electionResults[0].party}<br />
                         <strong> Winning Candidate: </strong> ${electionResults[0].candidate}<br />
                         <strong> Candidate's Votes: </strong> ${electionResults[0].candidatevotes.toLocaleString()}<br />
                         <strong> % of Total Votes: </strong> ${parseFloat(electionResults[0].pcttotal).toFixed(1)}%<br />`)

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

    let xVals = [];
    let yVals = [];
    let candidate = [];
    let colors = [];
    let party = [];
    let party_votes = 
      {'Democrat': 0,
       'Republican': 0,
       'Other': 0
     }
    
     for (let i = 0; i <electionResults.length; i++) {
      
        
      xVals.push(electionResults[i].county_name);
      yVals.push(electionResults[i].pcttotal);
      candidate.push(electionResults[i].candidate);
      party.push(electionResults[i].party);
      if (electionResults[i].party == 'REPUBLICAN')
        {party_votes.Republican = party_votes.Republican + 1;
        colors.push('rgb(215, 11, 11)');
        }
      else if (electionResults[i].party == 'DEMOCRAT')
        {party_votes.Democrat = party_votes.Democrat + 1;
         colors.push('rgb(0, 48, 240)');
        }
      else 
        { party_votes.Other = party_votes.Other + 1}
                                                    }
//CHART 1, HORIZONTAL BAR
let trace1 = {x: yVals, y: xVals, orientation:'h', type: 'bar', marker: {color: colors}};
let data = [trace1];
let layout = {
              title: {text: 'Winning Percentage of Votes by County', font: {size: 22}}, showlegend: false, 
              // xaxis: {title: {text: ''}},  
              yaxis: {title: {text: ''}, automargin: true}, font: {size:10} 
             };

Plotly.newPlot("bar", data, layout); 

//CHART 2, PIE CHART

var data2 = [{values: Object.values(party_votes), labels: Object.keys(party_votes), type: 'pie', marker: {colors: ['rgb(0, 48, 240)', 'rgb(215, 11, 11)']}}];
var layout2 = {title: 'Percentage of Counties Won by Party', font: {size: 15}, showlegend: false};
Plotly.newPlot('bubble', data2,layout2);

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
        
      countiesLayer.eachLayer(function (layer)
      {
        
        var countyName = layer.feature.properties.CountyName;

        var electionResults = electionData.filter(function(item) {
          // Currently filtering to just year 2000-- ideally this will by dynamic based on election drop down
          return (item.county_name.toLowerCase() === countyName.toLowerCase()) && (item.year === parseInt(dropdownValue));
        })

        // Attach election data to GeoJSON properties
        layer.feature.properties.electionResults = electionResults;

        // Attaching election data to popup
        layer.bindPopup(`<h3><strong> County: </strong> ${electionResults[0].county_name}</h3>
                         <strong> Winning Party: </strong> ${electionResults[0].party}<br />
                         <strong> Winning Candidate: </strong> ${electionResults[0].candidate}<br />
                         <strong> Candidate's Votes: </strong> ${electionResults[0].candidatevotes.toLocaleString()}<br />
                         <strong> % of Total Votes: </strong> ${parseFloat(electionResults[0].pcttotal).toFixed(1)}%<br />`)

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

    // Loop for update on drop down

    var electionResults = electionData.filter(function(item) {
      // Currently filtering to just year 2000-- ideally this will by dynamic based on election drop down
      return (item.year === parseInt(dropdownValue))});
      
    let xVals = [];
    let yVals = [];
    let candidate = [];
    let party = [];
    let colors = []
    let party_votes = 
      {'Democrat': 0,
       'Republican': 0,
       'Other': 0
     }
    
    for (let i = 0; i <electionResults.length; i++) {
      
        
      xVals.push(electionResults[i].county_name);
      yVals.push(electionResults[i].pcttotal);
      candidate.push(electionResults[i].candidate);
      party.push(electionResults[i].party);
      if (electionResults[i].party == 'REPUBLICAN')
        {party_votes.Republican = party_votes.Republican + 1;
        colors.push('rgb(215, 11, 11)');
        }
      else if (electionResults[i].party == 'DEMOCRAT')
        {party_votes.Democrat = party_votes.Democrat + 1;
         colors.push('rgb(0, 48, 240)');
        }
      else 
        { party_votes.Other = party_votes.Other + 1}

          
    }
      // UPDATE BAR CHART
      

      let trace1 = {x: yVals, y: xVals, orientation:'h', type: 'bar', marker: {color: colors}};
      let data = [trace1];
      let layout = {
        title: {text: 'Winning Percentage of Votes by County', font: {size: 22}}, showlegend: false, 
        // xaxis: {title: {text: ''}},  
        yaxis: {title: {text: ''}, automargin: true}, font: {size:10} 
       };
      
      Plotly.newPlot("bar", data, layout); 
      
 
      // Update Pie Chart

      var data2 = [{values: Object.values(party_votes), labels: Object.keys(party_votes), type: 'pie', marker: {colors: ['rgb(0, 48, 240)', 'rgb(215, 11, 11)']}}];
      var layout2 = {title: 'Percentage of Counties Won by Party', font: {size: 15}, showlegend: false};
      Plotly.newPlot('bubble', data2,layout2);


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
