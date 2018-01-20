const gulp = require('gulp');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const ejs = require('gulp-ejs');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const browser = require('browser-sync');
const reload = browser.reload;
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const rename = require('gulp-rename');

const SRC = './src/';
const PUBLIC = './public/';
const SINGLE = './public/single.html';

gulp.task('gulpWebpack', () => {
    gulp.src(SRC + 'js/app.js')
        .pipe(gulpWebpack({
            watch: true,
            output: {
                filename: "app.js",
            },
            plugins: [
                // 圧縮用の記述
                //new webpack.optimize.UglifyJsPlugin(),
                // new webpack.ProvidePlugin({
                //     jQuery: 'jquery',
                //     $: 'jquery',
                //     'window.jQuery': 'jquery',
                //     jInvertScroll: 'jInvertScroll',
                //     inview: 'inview',
                //     skrollr: 'skrollr',
                //     barba: 'barba',
                //     anime: 'anime',
                //     ScrollMagic: 'ScrollMagic',
                //     TweenMax: 'TweenMax',
                //     gsap: 'gsap',
                //     animationgsap: 'animationgsap'
                // })
            ],
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        }))
        .pipe(gulp.dest(PUBLIC + 'assets/js/'))
        .pipe(browser.reload({
            stream: true
        }));
});


gulp.task('font', function() {
    var fontName = 'icon';

    return gulp.src(SRC + 'iconfont/*.svg')
        .pipe(iconfont({
            fontName: fontName
        }))
        .on('codepoints', function(codepoints) {

            //順序制御用の番号を削除
            for (var i = 0; i < codepoints.length; i++) {
                codepoints[i]["name"] = codepoints[i]["name"].split('_')[1];
            }
            var options = {
                className: fontName,
                fontName: fontName,
                fontPath: '../fonts/',
                glyphs: codepoints
            };

            // CSS
            gulp.src(SRC + 'iconfont/template.css')
                .pipe(consolidate('lodash', options))
                .pipe(rename({
                    basename: '_iconfont',
                    extname: '.scss'
                }))
                .pipe(gulp.dest(SRC + 'scss/utility/'));

            // フォント一覧 HTML
            gulp.src(SRC + 'iconfont/template.html')
                .pipe(consolidate('lodash', options))
                .pipe(rename({
                    basename: 'icon-sample'
                }))
                .pipe(gulp.dest(SRC + 'iconfont/'));
        })
        .pipe(gulp.dest(PUBLIC + 'assets/fonts'));
});

gulp.task('sass', () => {
    return sass(SRC + 'scss/**/*.scss', {
            style: 'expanded'
        })
        .on('error', (err) => {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer())
        .pipe(gulp.dest(PUBLIC + 'assets/css'))
        .pipe(browser.reload({
            stream: true
        }));
});

gulp.task('ejs', () => {
    gulp.src([
            SRC + 'ejs/**/*.ejs',
            '!' + SRC + 'ejs/**/_*.ejs' //除外ファイル
        ])
        .pipe(plumber())
        //gulp-ejs 2.0.0よりextの記載が必要（記載しないと元々の拡張子でコンパイルされる）
        .pipe(ejs('', {
            'ext': '.html'
        }))
        .pipe(gulp.dest(PUBLIC))
        .pipe(browser.reload({
            stream: true
        }));
});

gulp.task('server', () => {
    browser.init(null, {
        server: {
            baseDir: PUBLIC,
            routes: {
                '/sigle': SINGLE
             }
        },
        notify: false,
        open: 'external',
        port: 8080,
        ghostMode: false
    });
});

gulp.task('default', ['ejs', 'server', 'sass', 'font', 'gulpWebpack'], () => {
    gulp.watch([SRC + 'js/**/*.js'], ['gulpWebpack']);
    gulp.watch([SRC + 'ejs/**/*.ejs'], ['ejs']);
    gulp.watch([SRC + 'scss/**/*.scss'], ['sass']);
    gulp.watch([SRC + 'iconfont/*'], ["font"]);
});
