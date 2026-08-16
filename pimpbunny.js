var rule = {
    title: 'PimpBunny',
    host: 'https://pimpbunny.com',
    url: '/categories/fyclass/?page=fypage',
    searchUrl: '/search/?q=**&page=fypage',
    searchable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    class_name: '全部最新&4K专区&亚洲&Cosplay&巨乳&自慰&口交&肛交&独家&女同&熟女&少女',
    class_url: 'videos&4k&asian&cosplay&big-boobs&masturbation&blowjob&anal&exclusive&lesbian&milf&teen',
    
    推荐: `js:
        let html = request(HOST + '/videos/?page=1');
        let items = [];
        let cards = pdfa(html, 'div[class*="b6m-video"]');
        cards.forEach(c => {
            let title = pdfh(c, 'img&&alt') || pdfh(c, 'a[class*="title"]&&Text');
            let img = pdfh(c, 'img&&data-original') || pdfh(c, 'img&&data-webp') || pdfh(c, 'img&&data-src') || pdfh(c, 'img&&src');
            let desc = pdfh(c, 'div[class*="duration"]&&Text');
            let url = pdfh(c, 'a[href*="/videos/"]&&href');
            if (url && title) {
                items.push({
                    vod_id: url,
                    vod_name: title,
                    vod_pic: img,
                    vod_remarks: desc
                });
            }
        });
        VODS = items;
    `,
    
    一级: `js:
        let pUrl = (MY_CATE === 'videos') ? (HOST + '/videos/?page=' + MY_PAGE) : (HOST + '/categories/' + MY_CATE + '/?page=' + MY_PAGE);
        let html = request(pUrl);
        let items = [];
        let cards = pdfa(html, 'div[class*="b6m-video"]');
        cards.forEach(c => {
            let title = pdfh(c, 'img&&alt') || pdfh(c, 'a[class*="title"]&&Text');
            let img = pdfh(c, 'img&&data-original') || pdfh(c, 'img&&data-webp') || pdfh(c, 'img&&data-src') || pdfh(c, 'img&&src');
            let desc = pdfh(c, 'div[class*="duration"]&&Text');
            let url = pdfh(c, 'a[href*="/videos/"]&&href');
            if (url && title) {
                items.push({
                    vod_id: url,
                    vod_name: title,
                    vod_pic: img,
                    vod_remarks: desc
                });
            }
        });
        VODS = items;
    `,
    
    二级: `js:
        let html = request(input);
        let title = pdfh(html, 'title&&Text');
        let m = html.match(/https?:\\/\\/pimpbunny\\.com\\/get_file\\/[^"'\\s<>]+\\.mp4\\/\\?v-acctoken=[^"'\\s<>]+/i);
        let playUrl = m ? m[0] : input;
        VOD = {
            vod_id: input,
            vod_name: title,
            vod_play_from: 'PimpBunny超清专线',
            vod_play_url: '立即播放$' + playUrl
        };
    `,
    
    play_parse: true,
    lazy: `js:
        let playUrl = input;
        if (input.indexOf('get_file') === -1) {
            let html = request(input);
            let m = html.match(/https?:\\/\\/pimpbunny\\.com\\/get_file\\/[^"'\\s<>]+\\.mp4\\/\\?v-acctoken=[^"'\\s<>]+/i);
            if (m) playUrl = m[0];
        }
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://pimpbunny.com/' } };
    `
};
