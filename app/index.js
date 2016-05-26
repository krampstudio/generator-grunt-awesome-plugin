var generators = require('yeoman-generator');

var normalizeName = function normalizeName(name){
    return name.replace(/\s/g, '-').toLowerCase();
};

module.exports = generators.Base.extend({
    constructor: function() {

        generators.Base.apply(this, arguments);
    },
    prompting: function prompting() {
        var self = this;
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your Grunt plugin name',
            default: normalizeName(this.appname),
            validate : function(input){
                if(/^grunt-contrib/i.test(input)){
                    return "Hum, grunt-contrib plugins names are reserved for the Grunt core team, sorry";
                }
                if(/^grunt-contrib/i.test(input)){
                    return "By convention Grunt plugins starts with 'grunt-'";
                }
                return true;
            },
            filter : normalizeName
        }, {
            type: 'input',
            name: 'description',
            message: 'The plugin description',
            default: 'The best Grunt plugin'
        }, {
            type: 'input',
            name: 'version',
            message: 'The plugin version',
            default: '0.1.0'
        }]).then(function(answers) {
            self.props = answers;
            self.props.taskName = self.props.name.replace(/^grunt-/i, '');
        });
    },
    writing: {
        packageJSON: function packageJSON() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this.props
            );
        },
        git: function git() {
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
        },
        editorConfig: function editorConfig() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
        },
        gruntfile : function gruntfile(){
            this.fs.copyTpl(
                this.templatePath('_Gruntfile.js'),
                this.destinationPath('Gruntfile.js'),
                this.props
            );
        },
        tests : function tests(){
            this.fs.copy(
                this.templatePath('test/data/sample-a.json'),
                this.destinationPath('test/data/sample-a.json')
            );
            this.fs.copy(
                this.templatePath('test/data/sample-b.json'),
                this.destinationPath('test/data/sample-b.json')
            );
            this.fs.copyTpl(
                this.templatePath('test/_spec.js'),
                this.destinationPath('test/' + this.props.taskName + '_spec.js'),
                this.props
            );
        }
    },

    install : function install (){
        this.npmInstall();
    }
});
