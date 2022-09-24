<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hirurg</title>
    <base href="{$_modx->config.site_url}">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
<script>
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${ vh }px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${ vh }px`);
    });
</script>
<div class="body">
    {set $config = [
    'parents' => 2,
    'limit' => 0,
    'depth' => 0,
    'includeTVs' => 'icon,video,poster',
    'tvPrefix' => '',
    'sortby'=>['menuindex'=>'ASC']
    ]}
    <div class="body-left">
        {include 'header'}
        <aside class="aside">
            <div class="aside__inner">
                {set $config['tpl'] = 'aside.item'}
                {'!pdoResources' | snippet : $config}
            </div>
        </aside>
        <main class="main">
            {set $config['tpl'] = 'page'}
            {'!pdoResources' | snippet : $config}
        </main>
        {include 'footer'}
    </div>
    <div class="body-right">
        {include 'menu'}
        {set $config['tpl'] = 'page.content'}
        {set $config['includeContent'] = true}
        {'!pdoResources' | snippet : $config}
    </div>
</div>
<script src="/assets/js/menu.js"></script>
<script src="/assets/js/pages.js"></script>
<script src="/assets/js/player.js"></script>
<script src="/assets/js/scroll.js"></script>
<script src="/assets/js/telephone.js"></script>
</body>
</html>