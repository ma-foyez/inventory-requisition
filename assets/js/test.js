$(document).ready(function () {
    $('#data-table').DataTable({

        // "ajax": "/assets/js/data.json",
        // columns: [
        //     { "data": "id" },
        //     { "data": "code" },
        //     { "data": "department" },
        //     {"data": `<button class="custom-btn">Edit</button>`}
        //     // `${document.createElement("button")}`
        // ]
       
    });

});

async function loadInfoTable(url, table) {
    const tableHead = document.querySelector("thead");
    const tableBody = document.querySelector("tbody");
    // var table = document.getElementById("data-table");

    var table = document.getElementById("data-table").getElementsByTagName('tbody')[0];


    console.log('table :>> ', table);
    // const tableRows = table.rows;
    // const dataRow = tableRows.shift();

    // console.log('dataRow :>> ', dataRow);
    // console.log('table.rows.length :>> ', table.rows[1]);
    // console.log('table.rows.length :>> ', table.rows[1].children[1].innerText);
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
        cell4.innerHTML = `<button class="custom-btn">Edit</button>`;
        cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>`;



        for (let cellText of Object.keys(element)) {
            let cellElement = document.createElement("td");
            // cellElement.textContent = cellText;

            // rowElement.appcellElementendChild(cellElement)
            // rowElement.appendChild(cellElement)
        }
        // $('#table-body').append(rowElement);

    }

}

loadInfoTable("/assets/js/data.json", document.querySelector("table"));

$(document).ready(function () {

    // var table = document.getElementById("data-table");

    // var rowCount = table.rows.length;

    // var row = table.insertRow(rowCount);

    // console.log('row :>> ', row);
    // for (let i = 0; i < data.length; i++) {
    //     const element = data[i];
    //     row.insertCell(0).innerHTML = element.id;
    //     row.insertCell(1).innerHTML = element.code;
    //     row.insertCell(2).innerHTML = element.department;
    //     row.insertCell(2).innerHTML = "Edit";
    // }
})