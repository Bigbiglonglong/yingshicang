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
        let html = request(HOST);
        let items = [];
        let articles = pdfa(html, 'article');
        articles.forEach(art => {
            if (art.indexOf('热搜HOT') === -1 && art.indexOf('wraps') === -1) {
                let title = pdfh(art, 'h2&&Text');
                let imgMatch = art.match(/background(?:-image)?:\s*url\(['"]?(.*?)['"]?\)/i);
                let img = imgMatch ? imgMatch[1] : (pdfh(art, 'img&&src') || '');
                let desc = pdfh(art, '.post-card-info&&Text');
                let url = pdfh(art, 'a&&href');
                if (url && title) {
                    items.push({
                        vod_id: url,
                        vod_name: title,
                        vod_pic: img,
                        vod_remarks: desc
                    });
                }
            }
        });
        VODS = items;
    `,
    
    一级: `js:
        let pUrl = (MY_CATE === 'all') ? (HOST + '/page/' + MY_PAGE + '/') : (HOST + '/category/' + MY_CATE + '/' + MY_PAGE + '/');
        let html = request(pUrl);
        let items = [];
        let articles = pdfa(html, 'article');
        articles.forEach(art => {
            if (art.indexOf('热搜HOT') === -1 && art.indexOf('wraps') === -1) {
                let title = pdfh(art, 'h2&&Text');
                let imgMatch = art.match(/background(?:-image)?:\s*url\(['"]?(.*?)['"]?\)/i);
                let img = imgMatch ? imgMatch[1] : (pdfh(art, 'img&&src') || '');
                let desc = pdfh(art, '.post-card-info&&Text');
                let url = pdfh(art, 'a&&href');
                if (url && title) {
                    items.push({
                        vod_id: url,
                        vod_name: title,
                        vod_pic: img,
                        vod_remarks: desc
                    });
                }
            }
        });
        VODS = items;
    `,
    
    二级: `js:
        let html = request(input);
        let title = pdfh(html, 'h1&&Text') || pdfh(html, 'title&&Text');
        let m3u8s = html.match(/https?:[\\/a-zA-Z0-9_.-]+\.m3u8/g) || [];
        let uniqueUrls = [];
        m3u8s.forEach(u => {
            let clean = u.replace(/\\\//g, '/').replace(/\\/g, '');
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
            let html = request(input);
            let m = html.match(/https?:[\\/a-zA-Z0-9_.-]+\.m3u8/);
            if (m) playUrl = m[0].replace(/\\\//g, '/').replace(/\\/g, '');
        }
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://www.kanliao16.org/' } };
    `
};
