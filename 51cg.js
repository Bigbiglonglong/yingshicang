var rule = {
    title: '51吃瓜',
    host: 'https://51cg1.com',
    url: '/category/fyclass/fypage/',
    searchUrl: '/?s=**',
    searchable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    class_name: '全部最新&学生校园&网红黑料&热点事件&每日大瓜&必看大瓜&吃瓜短剧&影视娱乐&每日大赛&猎奇八卦',
    class_url: 'wpcz&xsxy&whhl&rdsj&mrdg&bkdg&cbdj&ysyl&mrds&lldd',
    推荐: 'article;h2&&Text;.post-card&&style;.post-card-info&&Text;a&&href',
    一级: 'article;h2&&Text;.post-card&&style;.post-card-info&&Text;a&&href',
    二级: '*',
    play_parse: true,
    lazy: `js:
        let playUrl = input;
        if (input.indexOf('.m3u8') === -1) {
            let html = request(input);
            let clean = html.replace(/\\\\u0026/g, '&').replace(/\\\\\\//g, '/').replace(/\\\\/g, '');
            let m = clean.match(/https?:\\/\\/[^"'\\s<>]+\\.m3u8[^"'\\s<>]*/i);
            if (m) playUrl = m[0];
        }
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://51cg1.com/' } };
    `
};
