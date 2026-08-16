var rule = {
    title: 'PPP点播',
    host: 'https://ppp.porn',
    url: '/categories/fyclass/fypage.html',
    searchUrl: '/search/**-fypage.html',
    searchable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    class_name: '全部影片&流出&台湾&韩国&女同&第一人称&香港&短片&探花&瑜伽裤&最新更新',
    class_url: 'pp1&released&taiwan&korea&lesbian&first-person-pov&hongkong&dolfin-shorts&91-tanhua&yoga-pants&new',
    推荐: '.card-video;img&&alt;img&&data-src;.duration&&Text;a&&href',
    一级: '.card-video;img&&alt;img&&data-src;.duration&&Text;a&&href',
    二级: {
        title: 'h1&&Text',
        tabs: '',
        lists: 'body&&a:has(#player)'
    },
    play_parse: true,
    lazy: `js:
        let html = request(input);
        let m = html.match(/var\\s+stream\\s*=\\s*['"]([^'"]+)['"]/);
        let playUrl = m ? m[1] : '';
        input = { parse: 0, url: playUrl };
    `
};
