var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
    constructor: function() {

        generators.Base.apply(this, arguments);
    },
    prompting: function() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your Grunt plugin name',
            default: this.appname
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
            this.props = answers;
        }.bind(this));
    },
    writing: {
        packageJSON: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this.props
            );
        },
        git: function() {
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore'));
        },
        editorConfig: function() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
        }
    }
});
