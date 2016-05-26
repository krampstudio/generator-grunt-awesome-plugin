var describe = require('mocha').describe;
var it       = require('mocha').it;
var expect   = require('chai').expect;
var grunt    = require('grunt');


var destDir = 'test/data/out/';

describe('<%=taskName%>', function(){

    describe('test target', function(){

        it('should have merged the json file', function(){
            var file = destDir + 'dest.json';

            expect(grunt.file.exists(file)).to.be.equal(true);
            expect(grunt.file.read(file).length).to.be.greaterThan(0);
        });
    });
});
