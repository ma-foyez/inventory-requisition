$(document).ready(function () {
    loadInfoTable('/assets/data/data.json')
})

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

    document.getElementById("companyName").value = getSingleData.company;
    document.getElementById("department").value = getSingleData.department;
    document.getElementById("warehouse").value = getSingleData.warehouse;
    document.getElementById("requisitionType").value = getSingleData.requisitionType;
    document.getElementById("requisitionDate").value = getSingleData.requisitionDate;
    document.getElementById("requestBy").value = getSingleData.requestBy;
}



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

// reset form
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
    document.getElementById("requestQty").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("requiredDate").value = "";
    document.getElementById("description").value = "";
    selectDetailsRow = null;
}


function onFormSubmit() {
    var formData = readFormData();
    if (selectDetailsRow == null) {
        insertNewRecord(formData);
        alert("Details save successfully!")
    }
    resetForm();
}

// insert item details data
function insertNewRecord(data) {
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

//delete single details item
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("item-details-list").deleteRow(row.rowIndex);
        resetForm();
    }
}