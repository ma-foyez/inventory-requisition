var approvalData = [];

$(document).ready(function () {
    loadInfoTable('/assets/js/data.json');
    approveAllDetails();
})

/**
 * Load all requisition list from json data
 * 
 * @param {string} url ex: JSON data path
 */
async function loadInfoTable(url) {
    var table = document.getElementById("data-table").getElementsByTagName('tbody')[0];
    const response = await fetch(url);
    const { data } = await response.json();

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = element.id;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = element.code;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = element.department;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<button class="custom-btn" onClick="onEdit(this)">Edit</button>`;
    }
}

// Edit List
async function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    const getID = selectedRow.cells[0].innerHTML;
    const response = await fetch("/assets/js/data.json");
    const { data } = await response.json();
    const getSingleData = data.find((item) => item.id === getID);

    document.getElementById("companyName").defaultSelected = getSingleData.companyName;

    setDefaultSelectOptionValue(getSingleData.company, "companyName");
    setDefaultSelectOptionValue(getSingleData.department, "department");
    setDefaultSelectOptionValue(getSingleData.warehouse, "warehouse");
    setDefaultSelectOptionValue(getSingleData.requisitionType, "requisitionType");

    document.getElementById("requisitionDate").value = getSingleData.requisitionDate;
    document.getElementById("requestBy").value = getSingleData.requestBy;
}

/**
 * default selected value set from JSON Data
 * @param {object property} dataValue 
 * @param {string} selectValueId 
 */

async function setDefaultSelectOptionValue(dataValue, selectValueId) {
    const getSelectInput = document.getElementById(selectValueId).options;
    for (let n = 0; n < getSelectInput.length; n++) {
        const element = getSelectInput[n];

        if (element.value === dataValue) {
            element.defaultSelected = dataValue;
        }
    }
}

/**
 * get all input value by their specific input id
 * @returns formData;
 */
function readFormData() {
    var formData = {};
    // get previous requisition list value
    formData["companyName"] = document.getElementById("companyName").value;
    formData["department"] = document.getElementById("department").value;
    formData["warehouse"] = document.getElementById("warehouse").value;
    formData["requisitionType"] = document.getElementById("requisitionType").value;
    formData["requisitionDate"] = document.getElementById("requisitionDate").value;
    formData["requestBy"] = document.getElementById("requestBy").value;

    //get details input values
    formData["itemName"] = document.getElementById("itemName").value;
    formData["stockQty"] = document.getElementById("stockQty").value;
    formData["uom"] = document.getElementById("uom").value;
    formData["requestQty"] = document.getElementById("requestQty").value;
    formData["requestQty"] = document.getElementById("requestQty").value;
    formData["reason"] = document.getElementById("reason").value;
    formData["requiredDate"] = document.getElementById("requiredDate").value;
    formData["description"] = document.getElementById("description").value;
    return formData;
}


var selectDetailsRow = null

/**
 * Reset form after successfully submission
 */
function resetForm() {
    // get previous requisition list value
    document.getElementById("companyName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("warehouse").value = "";
    document.getElementById("requisitionType").value = "";
    document.getElementById("requisitionDate").value = "";
    document.getElementById("requestBy").value = "";

    //get details input values
    document.getElementById("itemName").value = "";
    document.getElementById("stockQty").value = "";
    document.getElementById("uom").value = "";
    document.getElementById("requestQty").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("requiredDate").value = "";
    document.getElementById("description").value = "";
    selectDetailsRow = null;
}

/**
 * On submit form 
 */
function onFormSubmit() {
    var formData = readFormData();
    if (selectDetailsRow == null) {
        if (formData.companyName === "") {
            showToaster("warning", "Company Name can't be blank!");
        } else if (formData.department === "") {
            showToaster("warning", "Department can't be blank!");
        } else if (formData.warehouse === "") {
            showToaster("warning", "Warehouse can't be blank!");
        } else if (formData.requisitionType === "") {
            showToaster("warning", "Requisition types can't be blank!");
        } else if (formData.requisitionDate === "") {
            showToaster("warning", "Requisition date can't be blank!");
        } else if (formData.requestBy === "") {
            showToaster("warning", "Request person can't be blank!");
        } else if (formData.itemName === "") {
            showToaster("warning", "Item name can't be blank!");
        } else if (formData.stockQty === "") {
            showToaster("warning", "Stock can't be blank!");
        } else if (formData.uom === "") {
            showToaster("warning", "UOM can't be blank!");
        } else if (formData.requestQty === "") {
            showToaster("warning", "Request quantity can't be blank!");
        } else if (formData.reason === "") {
            showToaster("warning", "Reason can't be blank!");
        } else if (formData.requiredDate === "") {
            showToaster("warning", "Request date can't be blank!");
        } else {
            insertNewRecord(formData);
            showToaster("success", "Details Data save successfully!")
            resetForm();
        }
    }
}


/**
 * insert single items in details section
 * @param {object} data 
 */

function insertNewRecord(data) {

    if (data) {
        approvalData.push(data);
    }

    var table = document.getElementById("item-details-list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.itemName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.requestQty;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.reason;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.requiredDate;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.description;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = ` <button class="btn btn-sm btn-outline-warning m-1" onClick="onDelete(this)">Delete</button>`;
}

/**
 * delete single rows in details item
 * 
 * @param {object} td 
 * @returns onDelete;
 */
async function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        const removeID = row.rowIndex - 1;
        // approvalData.splice(removeID, 1);
        approvalData = approvalData.filter((item, index) => index !== removeID);

        document.getElementById("item-details-list").deleteRow(row.rowIndex);
        resetForm();
    }
}

/**
 * Approve all details data
 */
async function approveAllDetails() {

    await resetTable("approval-table");

    var table = document.getElementById("approval-table").getElementsByTagName('tbody')[0];

    for (let i = 0; i < approvalData.length; i++) {
        const element = approvalData[i];
        if (approvalData.length > table.rows.length) {
            var newRow = table.insertRow(table.rows.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = Math.floor((Math.random() * 10) + 1);;
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = element.companyName;
            cell3 = newRow.insertCell(2);
            cell3.innerHTML = element.department;
            cell4 = newRow.insertCell(3);
            cell4.innerHTML = element.warehouse;
            cell5 = newRow.insertCell(4);
            cell5.innerHTML = element.requisitionType;
            cell6 = newRow.insertCell(5);
            cell6.innerHTML = element.requisitionDate;
            cell7 = newRow.insertCell(6);
            cell7.innerHTML = element.requestBy;
            cell8 = newRow.insertCell(7);
            cell8.innerHTML = element.itemName;
            cell9 = newRow.insertCell(8);
            cell9.innerHTML = element.stockQty;
            cell10 = newRow.insertCell(9);
            cell10.innerHTML = element.uom;
            cell11 = newRow.insertCell(10);
            cell11.innerHTML = element.requestQty;
            cell12 = newRow.insertCell(11);
            cell12.innerHTML = element.reason;
            cell13 = newRow.insertCell(12);
            cell13.innerHTML = element.requiredDate;
            cell14 = newRow.insertCell(13);
            cell14.innerHTML = element.description;
        }
    }
}


/**
 * Show toaster for waring & successful message display
 * 
 * @param {string} status 
 * @param {string} message 
 * @returns showToaster
 */
function showToaster(status, message) {
    var x = document.getElementById("toaster");
    x.innerHTML = message
    if (status === "warning") {
        x.className = "show warning";
    } else {
        x.className = "show success";
    }
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

/**
 * first time reset table body's index data when this function call
 * @param {string} tableID ex: approval table id
 */
function resetTable(tableID) {
    document.getElementById(tableID).getElementsByTagName('tbody')[0].innerHTML = "";
}