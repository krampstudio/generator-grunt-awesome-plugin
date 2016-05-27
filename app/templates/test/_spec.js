var describe = require('mocha').describe;
var it       = require('mocha').it;
var expect   = require('chai').expect;
var grunt    = require('grunt');


var dataDir = 'test/data/';
var destFile    = dataDir + 'out/dest.json';
var sampleA = dataDir + 'sample-a.json';
var sampleB = dataDir + 'sample-b.json';

describe('<%=taskName%>', function(){

    describe('test target', function(){

        it('should have created the dest file', function(){
            expect(grunt.file.exists(destFile)).to.be.equal(true);
            expect(grunt.file.read(destFile).length).to.be.above(0);
        });

        it('should have merged the options', function(){

            var content = grunt.file.readJSON(destFile);

            expect(content).to.be.an('object');
            expect(content).to.include.keys('foo');
            expect(content.foo).to.be.equal(true);
        });

        it('should have merged the sample-a file', function(){
            var aContent;
            var content = grunt.file.readJSON(destFile);

            expect(grunt.file.exists(sampleA).to.be.equal(true);
            expect(grunt.file.read(sampleA).length).to.be.above(0);

            aContent = grunt.file.readJSON(sampleA);

            expect(aContent).to.be.an('object');
            expect(aContent).to.include.keys('boo');
            expect(aContent.boo).to.be.equal('moo');
            expect(aContent).to.include.keys('bar');
            expect(aContent.bar).to.be.equal([1, 2, 3]);

            expect(content).to.include.keys('boo');
            expect(content.boo).to.be.equal(aContent.boo);

            expect(content).to.include.keys('bar');
            expect(content.bar).to.be.equal(aContent.bar);
        });

        it('should have merged the sample-b file', function(){
            var bContent;
            var content = grunt.file.readJSON(destFile);

            expect(grunt.file.exists(sampleA).to.be.equal(true);
            expect(grunt.file.read(sampleA).length).to.be.above(0);

            bContent = grunt.file.readJSON(sampleA);

            expect(bContent).to.be.an('object');
            expect(bContent).to.include.keys('noz');
            expect(bContent.noz).to.be.an('object');

            expect(content).to.include.keys('noz');

            expect(content.noz).to.be.deep.equal(bContent.noz);
        });
    });
});
