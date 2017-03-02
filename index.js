/*jshint esversion: 6*/
let toDoArr = [];
let completedArr = [];

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
	let item = $('#searchInput').val();
	let itemVal = item;
		itemVal = itemVal.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g,"");
		itemVal = itemVal.replace(/\s+/g, "-");
	toDoArr.push(itemVal);
	$('#toDoList').append('<tr class="' + itemVal + '"><td class="listText"><label for=' + itemVal + '>' + item + '</label><input type="checkbox" value=' + itemVal + '></td></tr>');
	$('#searchInput').val('');
});

$('#toDoList').on('click', 'input[type=checkbox]', () => {
	let item = $('input:checked').attr('value');
	let itemIdx = toDoArr.indexOf(item);
	let completedItemTemp = toDoArr.splice(itemIdx, 1);
	let completedItem = completedItemTemp[0];
		completedItem = completedItem.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g," ");
	completedArr.push(completedItem);
	$('.' + item).empty();
	$('#completedItems').append('<tr><td class="listText">' + completedItem + '<i class="fa fa-check-square-o" aria-hidden="true"></i></td></tr>');
});
