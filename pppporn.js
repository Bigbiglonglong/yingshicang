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
    class_name: '流出影片&台湾&韩国&女同&第一人称&香港&海豚短片&91探花&瑜伽裤',
    class_url: 'released&taiwan&korea&lesbian&first-person-pov&hongkong&dolfin-shorts&91-tanhua&yoga-pants',
    推荐: '.card-video;img&&alt;img&&data-src;.duration&&Text;a&&href',
    一级: '.card-video;img&&alt;img&&data-src;.duration&&Text;a&&href',
    二级: '*',
    play_parse: true,
    lazy: `js:
        let html = request(input);
        let m = html.match(/var\\s+stream\\s*=\\s*['"]([^'"]+)['"]/);
        let playUrl = m ? m[1] : '';
        input = { parse: 0, url: playUrl, header: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://ppp.porn/' } };
    `
};
