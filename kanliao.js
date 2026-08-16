var rule = {
    title: '看料网',
    host: 'https://www.kanliao16.org',
    url: '/category/fyclass/page/fypage',
    searchUrl: '/?s=**',
    searchable: 1,
    quickSearch: 0,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    class_name: '热门&吃瓜&独家',
    class_url: 'hot&chigua&dujia',
    一级: '.post-list .post-item;h2 a&&Text;img&&src;.post-date&&Text;h2 a&&href',
    二级: {
        title: 'h1&&Text',
        tabs: '',
        lists: 'body&&a:has(video)'
    },
    play_parse: true,
    lazy: `js:
        let html = request(input);
        let playUrl = jsp.pdfh(html, 'video&&src') || html.match(/https?:\\/\\/[^"']+\\.(?:m3u8|mp4)/)?.[0] || '';
        input = { parse: 0, url: playUrl };
    `
};
