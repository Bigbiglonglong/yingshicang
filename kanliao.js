var rule = {
    title: '看料网',
    host: 'https://www.kanliao16.org',
    url: '/category/fyclass/fypage/',
    searchUrl: '/?s=**',
    searchable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    class_name: '热点关注&抖音&快手&斗鱼&虎牙&黑料&短视频&网红&ASMR',
    class_url: 'rdgz&dy&ks&douyu&hy&hj&xsp&wh&asmr',
    推荐: 'article;h2&&Text;.post-card&&style;.post-card-info&&Text;a&&href',
    一级: 'article;h2&&Text;.post-card&&style;.post-card-info&&Text;a&&href',
    二级: '*',
    play_parse: true,
    lazy: `js:
        let html = request(input);
        let m = html.match(/https?:[^\s"'<>]+\.m3u8/);
        let playUrl = '';
        if (m) {
            playUrl = m[0].replace(/\\\\/g, '');
        }
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.kanliao16.org/' } };
    `
};
