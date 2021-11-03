function addNewCategory(){
    let name = $('#name').val();
    let newCategory = { name: name};
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Typed': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCategory),
        url: "/categories",
        success: successHandler1
    });
    event.preventDefault();
}

function successHandler1() {
    $.ajax({
        type: "GET",
        url: `/categories`,
        success: function (data) {
            let content = '<tr>' +
                '<td>Name</td>' +
                '<td>Edit</td>' +
                '<td>Delete</td>' +
                '<td>View</td>' +
                '</tr>';
            for (let i = 0; i< data.content.length; i++) {
                content += getCategory(data.content[i]);
            }
            document.getElementById('categoryList').innerHTML = content;
        }
    })
}

function getCategory(category) {
    return `<tr><td>${category.id}</td><td>${category.name}</td>` +
            `<td><button onclick="editCategory(${category.id})">Edit</button></td>
             <td><button onclick="deleteCategory(${category.id})">Delete</button></td>
             <td><button onclick="inforCategory(${category.id})">View</button></td>
            </tr>`
}

function editCategory(id) {
    let name = $('#name1').val();
    let newCategory = {name: name};
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newCategory),
        url: "/categories/" + id,
        success: successHandler1
    });
}

function deleteCategory(id){
    $.ajax({
        url: "/categories/" + id,
        type: "DELETE",
        success: successHandler1
    });
}

function inforCategory(id) {
    $.ajax({
        url: "/categories/" +id,
        type: "GET",
        success: function (data) {
            alert("category: " + "id = " + data.id + "name = " + data.name);
        }
    })
}

function showCategory() {
    $.ajax({
        type: "GET",
        url: `/categories`,
        success: function (data) {
            let  content = '';
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            $("#category").html(content);
        }
    })
}