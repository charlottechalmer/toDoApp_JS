/*jshint esversion:6*/
var chai = require('chai');
var assert = chai.assert;
var should = chai.should();

//shouldnt write tests that generate data and then tests
	//actually guarenteeing that the code runs correctly and that you've run every path
	//make a test that checks invalid paths as well**** --> all if then statements
		//shouldn't only test the 'golden path'
		//--> coverage


//set up testing on the server

describe('tests', () => {
	it('should return true', () => {
		assert.isTrue(true);
	});
}); //checking that the testing environment works -- if this fails, not testing correctly



//write tests for any end point
describe('task', () => {
	it('should ')
});