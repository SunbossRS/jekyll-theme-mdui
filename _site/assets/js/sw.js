var CACHE = 'cache-and-update';

var urlsToCache = [
  
    
      '/403.html',
    
  
    
       
    
  
    
      '/editor/',
    
  
    
      '/friends/',
    
  
    
      '/assets/css/global.css',
    
  
    
      '/',
    
  
    
      '/search',
    
  
    
      '/search.json',
    
  
    
      '/assets/js/sw.js',
    
  
    
      '/tags/',
    
  
    
      '/tags.json',
    
  
    
      '/page2/',
    
  
    
      '/feed.xml',
    
  

  
    '/living/2018/02/13/goodbey-yy-fuck-yy.html',
  
    '/living/2017/07/25/no-img-test.html',
  
    '/living/2017/05/30/Jekyll-Theme-MDUI-Editor.html',
  
    '/living/2017/05/29/jekyll-theme-mdui.html',
  
    '/living/2017/05/27/liquid-template-language.html',
  
    '/technology/2017/05/27/how-to-install-jekyll.html',
  
    '/technology/2017/05/27/how-to-install-rvm.html',
  
    '/living/2016/10/27/use-adb-and-fastboot-to-save-my-nexus5x.html',
  
    '/technology/2016/04/14/ubuntu-installs-apache-masql-php-and-phpmyadmin.html',
  

  
    '/LICENSE',
  
    '/assets/css/customCss.css',
  
    '/assets/images/jekylltheme.jpg',
  
    '/assets/images/touch/apple-touch-icon.png',
  
    '/assets/images/touch/chrome-touch-icon-192x192.png',
  
    '/assets/images/touch/icon-128x128.png',
  
    '/assets/images/touch/ms-touch-icon-144x144-precomposed.png',
  
    '/assets/js/History.js',
  
    '/assets/js/customJS.js',
  
    '/assets/js/jekyllsimsearch.js',
  
];

self.addEventListener('install', function(evt) {
  evt.waitUntil(caches.open(CACHE).then(function(cache) {
    cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', function(evt) {
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

function fromCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request).then(function(response) {
      if (response != undefined) {
        return response;
      } else {
        return fetchFromInternet(request);
      }
    });
  }).catch(function() {
    return caches.match('/offline.html');
  });
}

function update(request) {
  return caches.open(CACHE).then(function(cache) {
    return fetchFromInternet(request);
  });
}

function fetchFromInternet(request) {
  var fetchRequset = request.clone();
  return fetch(fetchRequset).then(function(response) {
    if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
    }
    var responseToCache = response.clone();
    caches.open(CACHE).then(function(cache) {
      cache.put(request, responseToCache);
    });
    return response;
  });
}
