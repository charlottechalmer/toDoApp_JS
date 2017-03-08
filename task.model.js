module.exports = (mongoose) =>  {
	var TaskModel = mongoose.model('Task', {
		task : String,
		completed : Boolean
	});
	return TaskModel;
}
