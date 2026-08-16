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
    class_name: '全部视频&4K专区&亚洲&Cosplay&巨乳&自慰&口交&肛交&独家&女同&熟女&少女',
    class_url: 'videos&4k&asian&cosplay&big-boobs&masturbation&blowjob&anal&exclusive&lesbian&milf&teen',
    
    推荐: 'div[class*="b6m-video"];a&&title;img&&data-src;div[class*="duration"]&&Text;a&&href',
    一级: 'div[class*="b6m-video"];a&&title;img&&data-src;div[class*="duration"]&&Text;a&&href',
    二级: '*',
    play_parse: true,
    lazy: `js:
        let html = request(input);
        let m = html.match(/https?:\\/\\/pimpbunny\\.com\\/get_file\\/[^"']+\\.mp4\\/\\?v-acctoken=[^"']+/i);
        let playUrl = m ? m[0] : input;
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://pimpbunny.com/' } };
    `
};
