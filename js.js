// Read the JSON data from the database.json file
function loadData() {
    fetch("database.json")
      .then((response) => response.json())
      .then((data) => {
        // Store the data in a global variable for later use
        window.data = data;
  
        // Populate options for carModel dropdown
        const carModelDropdown = document.getElementById("carModel");
        const carModels = [...new Set(data.map((item) => item["Car Model"]))];
        carModels.forEach((carModel) => {
          const option = document.createElement("option");
          option.text = carModel;
          carModelDropdown.add(option);
        });
  
        // Populate options for accessory dropdown based on selected carModel
        const accessoryDropdown = document.getElementById("accessory");
        carModelDropdown.addEventListener("change", () => {
          const selectedCarModel = carModelDropdown.value;
          const accessories = [
            ...new Set(
              data
                .filter((item) => item["Car Model"] === selectedCarModel)
                .map((item) => item["Accessory"])
            ),
          ];
          accessoryDropdown.innerHTML = "";
          const defaultOption = document.createElement("option");
          defaultOption.text = "All";
          accessoryDropdown.add(defaultOption);
          accessories.forEach((accessory) => {
            const option = document.createElement("option");
            option.text = accessory;
            accessoryDropdown.add(option);
          });
        });
  
        // Load table data based on selected carModel and accessory
        loadTableData();
      })
      .catch((error) => console.error("Error loading data:", error));
  }
  
  // Load table data based on selected carModel and accessory
  function loadTableData() {
    const carModelDropdown = document.getElementById("carModel");
    const selectedCarModel = carModelDropdown.value;
    const accessoryDropdown = document.getElementById("accessory");
    const selectedAccessory = accessoryDropdown.value;
  
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
  
    const filteredData = data.filter(
      (item) =>
        (selectedCarModel === "All" || item["Car Model"] === selectedCarModel) &&
        (selectedAccessory === "All" || item["Accessory"] === selectedAccessory)
    );
  
    filteredData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item["Car Model"]}</td>
        <td>${item["Accessory"]}</td>
        <td>${item["Description of Benefits and Features"]}</td>
        <td>${item["Description of Design"]}</td>
        <td>${item["Description of Safety Elements"]}</td>
        <td>${item["Description of Warranty"]}</td>
        <td>${item["Description of Possible Objections"]}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Call the loadData function to populate the dropdowns and load initial table data
  loadData();
  