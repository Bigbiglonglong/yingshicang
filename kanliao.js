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
    class_name: '全部最新&热点关注&抖音&快手&斗鱼&虎牙&黑料&短视频&网红&ASMR',
    class_url: 'all&rdgz&dy&ks&douyu&hy&hj&xsp&wh&asmr',
    
    推荐: `js:
        let html = getHtml(HOST);
        let items = [];
        let articles = pdfa2(html, 'article');
        articles.forEach(art => {
            let title = pdfh2(art, 'h2&&Text');
            let href = pd2(art, 'a&&href', HOST);
            let raw = (typeof art === 'string') ? art : art.toString();
            if (raw.indexOf('热搜HOT') === -1 && raw.indexOf('wraps') === -1 && href && title) {
                let img = pd2(art, '.post-card&&style', HOST) || pd2(art, 'img&&src', HOST);
                let desc = pdfh2(art, '.post-card-info&&Text');
                items.push({
                    vod_id: href,
                    vod_name: title,
                    vod_pic: img,
                    vod_remarks: desc
                });
            }
        });
        VODS = items;
    `,
    
    一级: `js:
        let pUrl = (MY_CATE === 'all') ? (HOST + '/page/' + MY_PAGE + '/') : (HOST + '/category/' + MY_CATE + '/' + MY_PAGE + '/');
        let html = getHtml(pUrl);
        let items = [];
        let articles = pdfa2(html, 'article');
        articles.forEach(art => {
            let title = pdfh2(art, 'h2&&Text');
            let href = pd2(art, 'a&&href', pUrl);
            let raw = (typeof art === 'string') ? art : art.toString();
            if (raw.indexOf('热搜HOT') === -1 && raw.indexOf('wraps') === -1 && href && title) {
                let img = pd2(art, '.post-card&&style', pUrl) || pd2(art, 'img&&src', pUrl);
                let desc = pdfh2(art, '.post-card-info&&Text');
                items.push({
                    vod_id: href,
                    vod_name: title,
                    vod_pic: img,
                    vod_remarks: desc
                });
            }
        });
        VODS = items;
    `,
    
    二级: `js:
        let html = getHtml(input);
        let title = pdfh2(html, 'h1&&Text') || pdfh2(html, 'title&&Text');
        let m3u8s = html.match(/https?:[\\/a-zA-Z0-9_.-]+\\.m3u8/g) || [];
        let uniqueUrls = [];
        m3u8s.forEach(u => {
            let clean = u.replace(/\\\\\\//g, '/').replace(/\\\\/g, '');
            if (uniqueUrls.indexOf(clean) === -1) {
                uniqueUrls.push(clean);
            }
        });
        let playList = [];
        if (uniqueUrls.length === 0) {
            playList.push('立即播放$' + input);
        } else {
            uniqueUrls.forEach((u, i) => {
                let epName = uniqueUrls.length > 1 ? ('第' + (i + 1 < 10 ? '0' + (i + 1) : (i + 1)) + '段') : '立即播放';
                playList.push(epName + '$' + u);
            });
        }
        VOD = {
            vod_id: input,
            vod_name: title,
            vod_play_from: '看料播放专线',
            vod_play_url: playList.join('#')
        };
    `,
    
    play_parse: true,
    lazy: `js:
        let playUrl = input;
        if (input.indexOf('.m3u8') === -1) {
            let html = getHtml(input);
            let m = html.match(/https?:[\\/a-zA-Z0-9_.-]+\\.m3u8/);
            if (m) playUrl = m[0].replace(/\\\\\\//g, '/').replace(/\\\\/g, '');
        }
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://www.kanliao16.org/' } };
    `
};
