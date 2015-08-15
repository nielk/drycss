var expect = require("chai").expect;
var noDuplicate = require("../lib/no-duplicate.js");
 
describe("NoDuplicate", function(){
  it("should success with stylesheet that contains no duplicated rules", function(){
    var css = "body { background-color: pink } p { color: black }";
    var results = noDuplicate(css);

    expect(results).to.equal(true);
  });

  it("should fail with stylesheet that contains duplicated rules", function(){
    var css = "body { background-color: pink } p { color: black } h1 { background-color: pink } a { color: black }";
    var results = noDuplicate(css);
    
    expect(results).to.equal(undefined);
  });

  it("should fail with stylesheet that contains mediaqueries with duplicated rules", function(){
    var css = "@media (min-width: 768px) { body { background-color: pink } p { color: black } h1 { background-color: pink } a { color: black }}";
    var results = noDuplicate(css);
    
    expect(results).to.equal(undefined);
  });

  it("should success with stylesheet that contains mediaqueries no duplicated rules", function(){
    var css = "@media (min-width: 768px) { body { background-color: pink } p { color: black }}";
    var results = noDuplicate(css);
    
    expect(results).to.equal(true);
  });

  it("should fail with stylesheet that contains mediaqueries and duplicated rules", function(){
    var css = "h1 { background-color: pink } a { color: black } h2 { background-color: pink } b { color: black } @media (min-width: 768px) { body { background-color: pink } p { color: black } }";
    var results = noDuplicate(css);
    
    expect(results).to.equal(undefined);
  });

  it("should success with stylesheet that contains mediaqueries but no duplicated rules within", function(){
    var css = "@media (min-width: 768px) { h1 { background-color: pink } a { color: black } } h1 { background-color: pink } a { color: black }";
    var results = noDuplicate(css);
    
    expect(results).to.equal(true);
  });
});