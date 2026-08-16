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
    class_name: '🔥全部最新&AI成人短剧&AI动漫剧&AI换脸&AI魔改&黄果吃瓜&排行榜',
    class_url: 'ai-duanju&ai-duanju&ai-manju&ai-huanlian&ai-mogai&chigua&ranks/hot',
    推荐: '.hg-drama-card;img&&alt;img&&data-src;span[class*="badge"]&&Text;a&&href',
    一级: '.hg-drama-card;img&&alt;img&&data-src;span[class*="badge"]&&Text;a&&href',
    二级: `js:
        let playPageUrl = input.replace('/detail/', '/video/');
        let html = request(playPageUrl);
        let title = pdfh(html, 'h1&&Text') || pdfh(html, 'title&&Text');
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
            let html = request(playPageUrl);
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
