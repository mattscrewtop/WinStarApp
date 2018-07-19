module.exports = 
{
    navigateFallback: '/index.html',
    stripPrefix: 'HTML',
    root: 'HTML/',
    staticFileGlobs: 
    [
        'HTML/index.html',
        'HTML/**.js',
        'HTML/**.css'
    ],
    verbose: true,
    importScripts:
    [
        "sw-toolbox.js",
        "runtime-caching.js"
    ]
};