// generated on 2016-09-14 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const concat = require('gulp-concat');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src('app/assets/styles/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
           // includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/assets/styles'))
        .pipe(reload({
            stream: true
        }));
});

// Vendor Styles => vendor.css
gulp.task('sass-vendor', function() {
    gulp.src([
            // 'bower_components/Swiper/dist/css/swiper.css'
        ])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
           // includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/assets/styles'))
        .pipe(gulp.dest('dist/assets/styles'))
        .pipe(reload({ stream: true }));
});

// Custom Styles => main.css
gulp.task('sass', () => {
    gulp.src([
            'app/assets/styles/*.scss'
        ])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
           // includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/assets/styles'))
        .pipe(gulp.dest('dist/assets/styles'))
        .pipe(reload({ stream: true }));
});

// Pug => HTML
gulp.task('views', () => {
    return gulp.src('app/**/*.pug')
        .pipe($.pug({
            pretty: true
        }))
        .pipe(gulp.dest('.tmp'))
        .pipe(reload({
            stream: true
        }));
});

// Pug => HTML => dist
gulp.task('html', ['views', 'styles'], () => {
    return gulp.src(['.tmp/*.html'])
        .pipe($.useref({
            searchPath: ['.tmp', 'app', '.']
        }))
        .pipe(gulp.dest('dist'));
});

// Custom Script => main.js
gulp.task('main-js', function() {
    return gulp
        .src([
            'app/assets/scripts/main.js',
            'app/assets/scripts/fire.js'
        ])
        .pipe(concat('main.js'))
        // .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/scripts'))
        .pipe(reload({ stream: true }));
});

// Vendor Scripts => vendor.js
gulp.task('vendor-js', () => {
    return gulp
        .src([
            'bower_components/jQuery/dist/jquery.min.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            'bower_components/stickyjs/stickyjs.js',
            'bower_components/slick-carousel/slick/slick.min.js',
            'bower_components/jQuery.mmenu/dist/js/jquery.mmenu.all.min.js',
            
            'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js',
            'bower_components/jquery-mixitup/dist/mixitup.min.js',
            'bower_components/jquery-validation/dist/jquery.validate.min.js',
            'bower_components/jquery-validation/dist/additional-methods.min.js',
        ])
        .pipe(concat('vendor.js'))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/scripts'))
        .pipe(reload({ stream: true }));
});

function lint(files, options) {
    return gulp.src(files)
        .pipe(reload({ stream: true, once: true }))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/assets/scripts/**/*.js', {
            fix: true
        })
        .pipe(gulp.dest('app/assets/scripts'));
});
gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js', {
            fix: true,
            env: {
                mocha: true
            }
        })
        .pipe(gulp.dest('test/spec/**/*.js'));
});



gulp.task('images', () => {
    return gulp.src('app/assets/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{ cleanupIDs: false }]
        })))
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
            .concat('app/assets/fonts/**/*'))
        .pipe(gulp.dest('.tmp/assets/fonts'))
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*.*',
        '!app/*.pug'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['views','sass', 'main-js', 'fonts'], () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        // 'app/*.pug',
        'app/**/*.pug',
        'app/assets/images/**/*',
        '.tmp/assets/fonts/**/*'
    ]).on('change', reload);

    // gulp.watch('app/*.pug', ['views']);
    gulp.watch('app/**/*.pug', ['views']);
    gulp.watch('app/assets/styles/**/*.scss', ['sass']);
    gulp.watch('app/assets/assets/scripts/**/*.js', ['main-js']);
    gulp.watch('app/assets/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['main-js'], () => {
    browserSync({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/assets/scripts': '.tmp/assets/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('app/assets/scripts/**/*.js', ['main-js']);
    gulp.watch('test/spec/**/*.js').on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/assets/styles/*.scss')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/assets/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            exclude: ['bootstrap-sass'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'sass', 'sass-vendor', 'main-js', 'vendor-js','images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});
