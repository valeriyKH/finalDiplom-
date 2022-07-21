/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => { 
    const xhr = new XMLHttpRequest;
     let url = options.url;
     let date;
     if (options.method === 'GET') {
         const currentUrl = window.location.href;
         url = new URL(currentUrl.slice(0, -1) + options.url);

         if (options.data) {
             for (let key in options.data) {
                 url.searchParams.set(key, options.data[key]);
             };
         };
     } else {
         date = new FormData;
         if (options.data) {
             for (let key in options.data) {
                 date.append(key, options.data[key]);
             };
         };    
     }; 

     try {
         xhr.open(options.method, url);
         xhr.responseType = 'json';
         xhr.send(date);
     }
     catch (e) {
         callback(e);
     }  
     xhr.addEventListener('load', () => {
         if (xhr.status === 200) {
             options.callback(null, xhr.response);
         } else {
             options.callback(xhr.statustext, null);
         }
    });
};
