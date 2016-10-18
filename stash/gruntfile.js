(function () {

    var path = require('path'),
        grunt = require('grunt');

    var pwd = process.cwd(),
        rootPath = path.dirname(pwd);

    var rootPath = ".";

    console.log(pwd);

    grunt.initConfig({
        fontsDir: rootPath + '/src/less/fonts',
        fontsDestDir: rootPath + '/dest/fonts',
        jsDestDir: rootPath + '/dest/js',
        lessDir: rootPath + '/src/less',
        cssDir: rootPath + '/dest/css',
        imgDir:rootPath+'/src/images',
        imgDestDir:rootPath+'/dest/images',
        clean: {
            base: {
                src: [
                    rootPath + '/dest',
                    rootPath + '/src/css'
                ]
            }
        },
        less: {
            base: {
                src: '<%=lessDir%>/style.less',
                dest: '<%=cssDir%>/style.css'
            }
        },
        copy: {
            img: {
                files: [
                    {
                        expand: true,
                        force: true,
                        cwd: '<%=imgDir%>/',
                        src: ['**'],
                        dest: '<%=imgDestDir%>/'
                    }
                ]
            }
        }
    });

    //load necessary modules:
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //register task for project:
    grunt.registerTask('default', [
        'clean',
        'less',
        'copy'
    ]);
}());