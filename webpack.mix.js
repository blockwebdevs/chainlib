const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app_mobile.js', 'public/fronts_mobile/js')
    .vue()
    .sass('resources/assets/sass/app.scss', 'public/fronts_mobile/css')
    // .postCss('resources/css/app.css', 'public/css', [
    //  require('postcss-import'),
    //  require('tailwindcss'),
    //  require('autoprefixer'),
    // ]);

mix.js('resources/assets/js/app_admin.js', 'public/admin/js')
    .vue()
    // .sass('resources/assets/sass/app.scss', 'public/fronts_mobile/css')
// .postCss('resources/css/app.css', 'public/css', [
//  require('postcss-import'),
//  require('tailwindcss'),
//  require('autoprefixer'),
// ]);


// mix.js('resources/assets/js/app_mobile.js', 'public/fronts_mobile/js');
//
// // mix.js('resources/assets/js/app_desktop.js', 'public/fronts/js');
//
// mix.js('resources/assets/js/app_admin.js', 'public/admin/js');
//
// mix.sass('resources/assets/sass/app.scss', 'public/fronts_mobile/css');
//
// mix.sass('resources/assets/sass/app_mobile.scss', 'public/fronts_mobile/css');
//
//
// mix.sass('resources/assets/sass/bijoux-mobile.scss', 'public/fronts_mobile/css');
// mix.sass('resources/assets/sass/loungewear-mobile.scss', 'public/fronts_mobile/css');
//
// mix.sass('resources/assets/sass/desktop-homeware.scss', 'public/fronts/css');
// mix.sass('resources/assets/sass/desktop-bijoux.scss', 'public/fronts/css');
//
// mix.config.fileLoaderDirs.fonts = 'public/fronts/fonts';
