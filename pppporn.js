var rule = {
    title: 'PPP点播',
    host: 'https://ppp.porn',
    url: '/pp1/fypage.html',
    searchUrl: '/search/**-fypage.html',
    searchable: 1,
    quickSearch: 0,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    一级: '.video-list .item;a&&title;img&&data-src;.duration&&Text;a&&href',
    二级: {
        title: 'h1&&Text',
        tabs: '',
        lists: 'body&&a:has(video)'
    },
    play_parse: true,
    lazy: `js:
        let html = request(input);
        let playUrl = jsp.pdfh(html, 'video source&&src') || jsp.pdfh(html, 'video&&src') || '';
        input = { parse: 0, url: playUrl };
    `
};
