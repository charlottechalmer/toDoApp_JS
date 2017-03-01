/*jshint esversion: 6*/
let toDoArr = [];


$('#addItemBtn').click(() => {
	let item = $('#searchInput').val();
	toDoArr.push(item);
	$('#toDoList').append('<tr><td class="listText"><label for=' + item + '>' + item + '</label><input type="checkbox" value=' + item + '></td></tr>');
	$('#searchInput').val('');
});



