// from data.js
var tableData = data;

// Function to display UFO sightings on page
function tableDisplay(ufoSightings) {
  let tbody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    let row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      let cell = row.append("td");
      cell.html(value);
    });
  });
};

// Clear the table for new data
function deleteTbody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};

// Initial display of all UFO sightings
console.log(tableData);
tableDisplay(tableData);

// 'Filter Table' button
let button = d3.select("#filter-btn");

// Filter the database and display
button.on("click", function(event) {
  d3.event.preventDefault();
  deleteTbody();
  let dateInput = d3.select("#datetime").property("value");
  
  if (dateInput.trim() === "" ) {
    // Display the entire data set if the date search field is empty
    var filteredData = tableData;
  } else {
    // Otherwise, display the filtered dataset based on the date entered
    var filteredData = tableData.filter(ufoSighting => 
      ufoSighting.datetime === dateInput.trim());
  };

  // Display message if no records are found
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Records Found</h4>");
  };

  console.log(filteredData);
  tableDisplay(filteredData);
});