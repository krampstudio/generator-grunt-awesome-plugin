/**
 * The Grunt plugin generator
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 * @license MIT
 */

var generators = require('yeoman-generator');

/**
 * Normalize the name from "Grunt Moo" to "grunt-moo"
 */
var normalizeName = function normalizeName(name) {
    return name.replace(/\s/g, '-').toLowerCase();
};

/**
 * @see http://yeoman.io
 */
module.exports = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);
    },

    /**
     * Prompt step, ask the user for details
     * @see https://github.com/SBoudrias/Inquirer.js for the prompt function syntax
     */
    prompting: {

        //all properties usefull to the package.json
        packageProps: function packageProps() {
            var self = this;
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'Your Grunt plugin name',
                default: normalizeName(this.appname),
                validate: function(input) {
                    if (/^grunt-contrib/i.test(input)) {
                        return "Hum, grunt-contrib plugins names are reserved for the Grunt core team, sorry";
                    }
                    if (/^grunt-contrib/i.test(input)) {
                        return "By convention Grunt plugins starts with 'grunt-'";
                    }
                    return true;
                },
                filter: normalizeName
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
            }, {
                type: 'list',
                name: 'gruntVersion',
                message: 'The version of Grunt',
                default: '1.0.0',
                choices: ['1.0.0', '0.4.5']
            }, {
                type: 'input',
                name: 'keywords',
                message: 'Plugin keywords',
                filter: function(input) {
                    var keywords = ['gruntplugin'].concat(input.split(/[\s,]+/g));
                    return JSON.stringify(keywords);
                }
            }, {
                type: 'list',
                name: 'license',
                message: 'License',
                default: 'MIT',
                choices: ['MIT', 'GPL-3.0', 'GPL-2.0', 'AGPL-3.0', 'LGPL-3.0', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'MPL-2.0', 'Unlicense', 'Other']
            }, {
                type: 'input',
                name: 'authorName',
                message: 'Your name',
                default: this.user.git.name(),
            }, {
                type: 'input',
                name: 'authorEmail',
                message: 'Your email',
                default: this.user.git.email(),
            }, {
                type: 'boolean',
                name: 'github',
                message: 'Is your plugin hosted on Github ?',
            }]).then(function(answers) {
                self.props = answers;
                self.props.taskName = self.props.name.replace(/^grunt-/i, '');
            });
        },

        //specific to the repository, need to know if we use github before
        repoProps: function repoProps() {
            var self = this;
            return this.prompt([{
                type: 'input',
                name: 'githubName',
                message: 'Your github pseudo ?',
                when: this.props.github
            }]).then(function(answers) {
                self.props.githubName = answers.githubName
            });
        }
    },

    /**
     * Create the file sytem, by either copying or using templates
     * @see http://www.embeddedjs.com/ for the template syntax
     */
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
        editorconfig: function editorconfig() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
        },
        eslintrc: function eslintrc() {
            this.fs.copy(
                this.templatePath('eslintrc'),
                this.destinationPath('.eslintrc')
            );
        },
        grunttask: function grunttask() {
            this.fs.copyTpl(
                this.templatePath('tasks/_task.js'),
                this.destinationPath('tasks/' + this.props.taskName + '.js'),
                this.props
            );
        },
        gruntfile: function gruntfile() {
            this.fs.copyTpl(
                this.templatePath('_Gruntfile.js'),
                this.destinationPath('Gruntfile.js'),
                this.props
            );
        },
        tests: function tests() {
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
        },
        readme : function readme(){
            this.fs.copyTpl(
                this.templatePath('_README.md'),
                this.destinationPath('README.md'),
                this.props
            );
        }
    },

    /**
     * Install and setup step
     */
    install: function install() {
        this.npmInstall();

        if (this.props.gruntVersion !== '1.0.0') {
            this.log('Do not forget to run : npm install -g grunt-cli');
        }

        this.log('Here we go! Your plugin is ready to use!');
    }
});

