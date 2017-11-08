const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

let Term = require('../../../server/models/term.js');

describe("Get all term", function(){
   // Test will pass if we get all terms
  it("should return all terms", function(done){
    var TermMock = sinon.mock(Term);
    var expectedResult = { status: true, term: [] };

    TermMock.expects('find').yields(null, expectedResult);

    Term.find(function (err, result) {
      TermMock.verify();
      TermMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });

  // Test will pass if we fail to get a term
  it("should return error", function(done){
    var TermMock = sinon.mock(Term);
    var expectedResult = { status: false, error: "Something went wrong" };
    TermMock.expects('find').yields(expectedResult, null);
    Term.find(function (err, result) {
      TermMock.verify();
      TermMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
