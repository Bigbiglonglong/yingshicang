var rule = {
    title: '黄果AI',
    host: 'https://huangguoai.com',
    url: '/fyclass/?page=fypage',
    searchUrl: '/search/?q=**&page=fypage',
    searchable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    class_name: '全部最新&AI成人短剧&AI动漫剧&AI换脸&AI魔改&黄果吃瓜&排行榜',
    class_url: 'latest&ai-duanju&ai-manju&ai-huanlian&ai-mogai&chigua&ranks/hot',
    
    推荐: `js:
        let html = getHtml(HOST);
        let items = [];
        let cards = pdfa2(html, 'div[class*="hg-drama-card"]');
        cards.forEach(c => {
            let title = pdfh2(c, 'img&&alt') || pdfh2(c, 'h3&&Text') || pdfh2(c, '.hg-drama-card__title&&Text');
            let img = pd2(c, 'img&&data-src', HOST) || pd2(c, 'img&&src', HOST);
            let desc = pdfh2(c, 'span[class*="badge"]&&Text') || pdfh2(c, 'span&&Text');
            let href = pd2(c, 'a&&href', HOST);
            if (href && title) {
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
        let pUrl = (MY_CATE === 'latest') ? (HOST + '/?page=' + MY_PAGE) : (HOST + '/' + MY_CATE + '/?page=' + MY_PAGE);
        let html = getHtml(pUrl);
        let items = [];
        let cards = pdfa2(html, 'div[class*="hg-drama-card"]');
        cards.forEach(c => {
            let title = pdfh2(c, 'img&&alt') || pdfh2(c, 'h3&&Text') || pdfh2(c, '.hg-drama-card__title&&Text');
            let img = pd2(c, 'img&&data-src', pUrl) || pd2(c, 'img&&src', pUrl);
            let desc = pdfh2(c, 'span[class*="badge"]&&Text') || pdfh2(c, 'span&&Text');
            let href = pd2(c, 'a&&href', pUrl);
            if (href && title) {
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
        let playPageUrl = input.replace('/detail/', '/video/');
        let html = getHtml(playPageUrl);
        let title = pdfh2(html, 'h1&&Text') || pdfh2(html, 'title&&Text');
        
        let playList = [];
        let m = html.match(/"epPlaySrcs"\\s*:\\s*({.*?})/);
        if (m) {
            let raw = m[1].replace(/\\\\u0026/g, '&');
            let epMatches = raw.match(/"(\\d+)"\\s*:\\s*"([^"]+)"/g) || [];
            epMatches.forEach(ep => {
                let parts = ep.match(/"(\\d+)"\\s*:\\s*"([^"]+)"/);
                if (parts) {
                    let epNum = parts[1];
                    let epUrl = parts[2].replace(/\\\\u0026/g, '&').replace(/\\\\\\//g, '/');
                    playList.push('第' + (parseInt(epNum) < 10 ? '0' + epNum : epNum) + '集$' + epUrl);
                }
            });
        }
        
        if (playList.length === 0) {
            let m3u8 = html.match(/https?:[\\/a-zA-Z0-9_.-]+\\.m3u8[^"'\\s<>]*/);
            if (m3u8) {
                playList.push('立即播放$' + m3u8[0].replace(/\\\\u0026/g, '&').replace(/\\\\\\//g, '/'));
            } else {
                playList.push('立即播放$' + input);
            }
        }
        
        VOD = {
            vod_id: input,
            vod_name: title,
            vod_play_from: '黄果AI专线',
            vod_play_url: playList.join('#')
        };
    `,
    
    play_parse: true,
    lazy: `js:
        let playUrl = input;
        if (input.indexOf('.m3u8') === -1) {
            let playPageUrl = input.replace('/detail/', '/video/');
            let html = getHtml(playPageUrl);
            let m = html.match(/"epPlaySrcs"\\s*:\\s*({.*?})/);
            if (m) {
                let raw = m[1].replace(/\\\\u0026/g, '&');
                let parts = raw.match(/"(\\d+)"\\s*:\\s*"([^"]+)"/);
                if (parts) playUrl = parts[2].replace(/\\\\u0026/g, '&').replace(/\\\\\\//g, '/');
            }
        }
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://huangguoai.com/' } };
    `
};
