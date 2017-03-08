/*jshint esversion: 6*/

$('#searchInput').keypress(function(e) {
	if(e.which == 13) {
		$('#addItemBtn').click();
	}
});

$('#addItemBtn').click(() => {
	if (!$('#searchInput').val() || ($('#searchInput').val() === ' ')) {
		alert('Uh oh! No item given');
		$('#searchInput').val('');
		return;
	}
	sendTask();
	$('#searchInput').val('');
});



//POST: to create a new task in DB
const sendTask = () => {
	$.post('/task/new', {
		task: $('#searchInput').val()
	}, (data) => {
		console.log(data._id);
		$('#toDoList').append(
			'<tr id="' + data._id + '"><td><label for=' + data._id + '>' +data.task + '</label><input type="checkbox" data-id=' + data._id + '></td></tr>'
			)

	});
}

//POST: to complete the task
const completeTask = (id) => {
	// find the checkbox id & pass that value to into the post
	$.post('/task/update', {
		taskId: id
	},
	(data) => {
		$('#completedItems').append('<tr id="' + data._id + '"><td>' + data.task + '<button data-id="'+ data._id + '" class="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"></i></button><i class="fa fa-check-square-o" aria-hidden="true"></i></td></tr>');	
		$('#'+ id).remove();
	});
}

$('#toDoList').on('click', 'input[type=checkbox]', (evt) => {
//need to call completeTask when you check the box
	completeTask($(evt.target).data('id'));
});

//POST: to delete completed tasks
const deleteCompleted = (id) => {
	$.post('/task/delete', { taskId : id  }, (data) => {
		$('#' + id).remove();
	});
}

$('#completedItems').on('click', '.deleteBtn', (evt) => {
	console.log($(evt.target).parent());
	deleteCompleted($(evt.target).parent().data('id'));
});


//GET: to get all the tasks
const getTasks = () => {
	$.get("/tasks", (data) => {
		// clear the div of anything before populating
		//	$('#post_list').html("");
		if (data.length == 0) {
			return;
		}
		data = JSON.parse(JSON.stringify(data));
		for(let i = 0; i < data.length; i++){
			// add these elements to the list while looping through the data from the server
			if(!data[i].completed) {
				$('#toDoList').append(
				'<tr id="' + data[i]._id + '"><td><label for=' + data[i]._id + '>' +data[i].task + '</label><input type="checkbox" data-id=' + data[i]._id + '></td></tr>'
				)
			} else {
				$('#completedItems').append(
				'<tr id="' + data[i]._id + '"><td>' + data[i].task + '<button data-id="'+ data[i]._id + '" class="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"></i></button><i class="fa fa-check-square-o" aria-hidden="true"></i></td></tr>');	
			}
		
		};
	});
}
getTasks();

