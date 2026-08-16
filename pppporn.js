var rule = {
    title: 'PPP点播',
    host: 'https://ppp.porn',
    url: '/categories/fyclass/fypage/',
    searchUrl: '/search/**-fypage.html',
    searchable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    class_name: '最新更新&流出影片&台湾&韩国&女同&第一人称&香港&海豚短片&91探花&瑜伽裤',
    class_url: 'new&released&taiwan&korea&lesbian&first-person-pov&hongkong&dolfin-shorts&91-tanhua&yoga-pants',
    
    推荐: '.card-video;img&&alt;img&&data-src;.duration&&Text;a&&href',
    
    一级: 'js:
        let pUrl = (MY_CATE === "new") ? (HOST + "/new/" + MY_PAGE + "/") : (HOST + "/categories/" + MY_CATE + "/" + MY_PAGE + "/");
        let html = request(pUrl);
        let items = [];
        let cards = pdfa(html, ".card-video");
        cards.forEach(c => {
            let title = pdfh(c, "img&&alt") || pdfh(c, "a&&title");
            let img = pdfh(c, "img&&data-src") || pdfh(c, "img&&src");
            let desc = pdfh(c, ".duration&&Text");
            let url = pdfh(c, "a&&href");
            if (url && title) {
                items.push({ title: title, img: img, desc: desc, url: url });
            }
        });
        VODS = items;
    ',
    
    二级: 'js:
        let html = request(input);
        let title = pdfh(html, "title&&Text");
        let m = html.match(/var\\s+stream\\s*=\\s*[\'"]([^\'"]+)[\'"]/);
        let streamUrl = m ? m[1] : input;
        VOD = {
            vod_id: input,
            vod_name: title,
            vod_play_from: "PPP超清专线",
            vod_play_url: "立即播放$" + streamUrl
        };
    ',
    
    play_parse: true,
    lazy: `js:
        let playUrl = input;
        if (input.indexOf('.m3u8') === -1) {
            let html = request(input);
            let m = html.match(/var\\s+stream\\s*=\\s*[\'"]([^\'"]+)[\'"]/);
            if (m) playUrl = m[1];
        }
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': 'https://ppp.porn/' } };
    `
};
