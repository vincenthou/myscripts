// Mod.js
// More info at https://github.com/modjs/mod/

module.exports = {
    tasks: {
        replace: {
            html: {
                src: "./index.html",
                search: /\/app\//g,
                replace: ''
            },
            config: {
                src: "./js/config.js",
                search: /\/app\/partials\//g,
                replace: '/app/dist/partials/'
            },
            htaccess: {
                src: "../js/.htaccess",
                search: /app\/index.html/g,
                replace: 'app/dist/index.html'
            },
            distcss: {
                src: "./dist/index.html",
                search: /href=css/g,
                replace: 'href=/app/dist/css'
            },
            distjs: {
                src: "./dist/index.html",
                search: /src=js/g,
                replace: 'src=/app/dist/js'
            },
            distlogo: {
                src: "./dist/index.html",
                search: /img\/logo.png/g,
                replace: '/app/img/logo.png'
            },
            recoverjs: {
                src: "./index.html",
                search: /"js\//g,
                replace: '"/app/js/'
            },
            recovercss: {
                src: "./index.html",
                search: /"css\//g,
                replace: '"/app/css/'
            },
            recoverlogo: {
                src: "./index.html",
                search: /"img\/logo.png"/g,
                replace: '"/app/img/logo.png"'
            },
            recoverconfig: {
                src: "./js/config.js",
                search: /\/app\/dist\/partials\//g,
                replace: '/app/partials/'
            },
            recoverhtaccess: {
                src: "../js/.htaccess",
                search: /app\/dist\/index.html/g,
                replace: 'app/index.html'
            },
        },
        build: {
            src: "./index.html"
        },
        //clean this every time the partials folder structure changed
        //run 'node gen_partials_config.js' to update the 'replace' comment
        min: {
            //replace
        },
    },
    targets: {
        prepare: 'replace:html replace:htaccess',
        dist: "build replace:distcss replace:distjs replace:distlogo",
        clean: "replace:recoverjs replace:recovercss replace:recoverlogo replace:recoverconfig",
        default: "prepare dist clean"
    }
};