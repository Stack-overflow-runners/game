/// <reference lib="WebWorker" />

const CACHE_NAME = 'site-cache-v1';

const URLS = ['/*'];

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then(response => {
      // Если ответ найден, выдаём его
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();
      // В противном случае делаем запрос на сервер
      return (
        fetch(fetchRequest)
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный.
          .then(resp => {
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
            if (
              !resp ||
              resp.status !== 200 ||
              resp.type !== 'basic'
            ) {
              return resp;
            }

            const responseToCache = resp.clone();
            // Получаем доступ к кешу по CACHE_NAME
            caches.open(CACHE_NAME).then(cache => {
              // Записываем в кеш ответ, используя в качестве ключа запрос
              cache.put(event.request, responseToCache);
            });
            // Отдаём в основной поток ответ
            return resp;
          })
      );
    })
  );
});

this.addEventListener('activate', () => {
  console.log('activate');
});

export {}
