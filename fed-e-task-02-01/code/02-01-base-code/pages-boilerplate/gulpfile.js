// 实现这个项目的构建任务

// console.log('gulp file');
const { src, dest, series, parallel, watch } = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const del = require('del');
const browserSync = require('browser-sync');

const plugins = loadPlugins();
const bs = browserSync.create();

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

// 清空目录
const clean = () => {
  return del(['temp', 'dist']);
};

// 编译 scss 
const styles = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }));
};

// 编译 js
const scripts = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }));
};

// 编译 html 
const pages = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }));
};

// 压缩 images
const images = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
};

// 压缩 fonts
const fonts = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
};
// 处理 其他
const extra = () => {
  return src('public/**', { base: './' })
    .pipe(dest('dist'));
};

// 开发服务器
// 监听文件变化并自动编译；监听编译文件变化并自动刷新浏览器
const serve = () => {
  // 监听 css\js\html变化 并编译
  watch('src/assets/styles/*.scss', styles);
  watch('src/assets/scripts/*.js', scripts);
  watch('src/*.html', pages);

  // 监听 images fonts public 并刷新浏览器
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**',
  ], bs.reload);
  
  bs.init({
    notify: false,
    port: 2414,
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  });
};

// 项目发布前 引用处理 并压缩文件
const useref = () => {
  return src('temp/**', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    })))
    .pipe(dest('dist'));
};

const compile = parallel(styles, scripts, pages);
const start = series(compile, serve);
const build = series(
  clean,
  parallel(
    series(compile, useref),
    images,
    fonts,
    extra,
  )
);

module.exports = {
  start,
  build,
  clean,
};