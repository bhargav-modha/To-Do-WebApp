var arrayList = [];
var id = 0;
task_array = new Array();

function addTask() {
    id = id + 1;
    if (id == 1) {
        $('#task-list').empty();
    }
    if ($("#TaskName").val() != "") {
        var collapse_id = "collapse" + id;

        var a = {
            id: collapse_id,
            title: $("#TaskName").val(),
            category: $("#Topic").val(),
            due_date: $("#DueDate").val(),
            priority: $("#Priority").val(),
            desc: $("#DescriptionBox").val()
        };

        task_array.push(a);

        var block2 = `<li>
                    <div class="card text-left" data-toggle="collapse"
                                href="#` + collapse_id + `">
                        <div class="card-body m-2">
                            <input type="checkbox" class="checkbox">
                            <h3 class="card-title d-inline" class="title">` + $("#TaskName").val() + `</h3>
                            <div class="panel-group">
                                <div id="` + collapse_id + `" class="panel-collapse collapse">
                                    <div class="panel-body lead">
                                        <span class="badge-lg badge-pill badge-primary">Category :- ` + $("#Topic").children("option:selected").val() + `</span>
                                        <div class="date"> Date :- ` + $("#DueDate").val() + `</div>
                                        <div class="priority">Priority :- ` + $("#Priority").children("option:selected").val() + `</div>
                                        <div class="desc">Description :- ` + $.trim($("#DescriptionBox").val()) + `</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`;


        $('#task-list').append(block2);
    } else {

        alert("Please add proper value");
    }
}

function Clear() {
    $('#task-list').empty();
}

$(document).on('click', '#reset', function (event) {
    $('#task-list').empty();
    event.preventDefault();
    task_array = [];
    $.ajax({
        type: 'POST',
        url: "delete.php",
        success: function (result) {
            console.log('the data was deleted sent to the server');
        }
    });
});

function add_item() {

    let item = document.getElementById("itemname");
    let list_item = document.getElementById("list_item");

    if (item.value != "") {
        var listItem = document.createElement("li");
        let button = document.createElement("BUTTON");
        var deleteButton = document.createElement("span");

        button.innerText = item.value;
        button.setAttribute("class", "btn btn-primary btn-lg btn-block");
        button.setAttribute("type", "button");
        button.classList.add("task-label");

        deleteButton.innerHTML = '<i class="fa fa - close ">';
        deleteButton.classList.add("deleteButton")

        listItem.appendChild(button);
        button.appendChild(deleteButton);

        list_item.appendChild(listItem);

        $('#Topic').empty();

        arrayList.push(item.value);
        item.value = "";

        for (var i = 0; i < arrayList.length; i++) {
            $('#Topic').append(`<option value="${arrayList[i]}"> ${arrayList[i]} </option>`);
        }

        deleteButton.onclick = function () {
            var listItem = this.parentNode;
            var ul = listItem.parentNode;
            ul.removeChild(listItem);

            var removeItem = item.value;

            arrayList.splice($.inArray(removeItem, arrayList), 1);

            $('#Topic').children("option").remove();

            for (var i = 0; i < arrayList.length; i++) {
                $('#Topic').append(`<option value="${arrayList[i]}"> ${arrayList[i]} </option>`);
            }
        }
    } else {

        alert("plz add a value to item");
    }

}

$(document).on('click', '#save', function (event) {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: "write.php",
        data: {
            data: task_array
        },
        success: function (result) {
            console.log('the data was successfully sent to the server');
        }
    });
});

$(document).on('click', '#read', function (event) {
    event.preventDefault();
    $.getJSON('test.json', function (data) {
        addTaskJSON(data);
    });


});

function addTaskJSON(data) {
    $('#task-list').empty();
    data.forEach(function (arrayItem) {
        var id = arrayItem.id;
        var title = arrayItem.title;
        var category = arrayItem.category;
        var due_date = arrayItem.due_date;
        var priority = arrayItem.priority;
        var desc = arrayItem.desc;

        var block2 = `<li>
                    <div class="card text-left" data-toggle="collapse"
                                href="#` + id + `">
                        <div class="card-body m-2">
                            <input type="checkbox" class="checkbox">
                            <h3 class="card-title d-inline" class="title">` + title + `</h3>
                            <div class="panel-group">
                                <div id="` + id + `" class="panel-collapse collapse">
                                    <div class="panel-body lead">
                                        <span class="badge-lg badge-pill badge-primary">Category :- ` + category + `</span>
                                        <div class="date"> Date :- ` + due_date + `</div>
                                        <div class="priority">Priority :- ` + priority + `</div>
                                        <div class="desc">Description :- ` + desc + `</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`;


        $('#task-list').append(block2);
    });

}