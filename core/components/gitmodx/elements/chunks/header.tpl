<header class="header">
    <div class="logo-anim-background"></div>
    <a class="logo header__logo" href="{$_modx->config.site_url}">
        <img alt="logo" src="/assets/icons/logos/full-logo.regular.svg">
    </a>
    <script>
        if (!sessionStorage.isLoaded) {
            //sessionStorage.isLoaded = JSON.stringify(true);
            document.querySelector('.header').classList.add('animation');
            setTimeout(()=> {
                document.querySelector('.header').classList.remove('animation');
            },2500)
        }
        window.scrollTo(0, 0);
    </script>
{*    <div class="header__language">*}
{*        <div class="language-switcher active">Ru</div>*}
{*        <div class="language-switcher">En</div>*}
{*    </div>*}
    <div class="header__telephone telephone">
        <a class="telephone__number" href="tel:+74953222233">+7 495 322-22-33</a>
{*        <div class="telephone__list">*}
{*            <a class="telephone__number" href="tel:+74953222233">+7 495 322-22-33</a>*}
{*        </div>*}
    </div>
    <div class="header__share">
        <svg class="share-main-svg" xmlns="http://www.w3.org/2000/svg"
             width="23" height="23" viewBox="0 0 23 23">
            <path class="cls-1"
                  d="M1203.33,45.834a3.839,3.839,0,0,0,3.02-1.47l8.62,4.311a3.622,3.622,0,0,0-.14.992,3.842,3.842,0,1,0,.82-2.364l-8.62-4.311a3.623,3.623,0,0,0,.14-0.992,3.857,3.857,0,0,0-.16-1.081l8.63-4.243a3.825,3.825,0,1,0-.81-2.344,3.86,3.86,0,0,0,.13.968l-8.67,4.263A3.833,3.833,0,1,0,1203.33,45.834Zm15.34,1.534a2.3,2.3,0,1,1-2.3,2.3A2.3,2.3,0,0,1,1218.67,47.368Zm0-15.336a2.3,2.3,0,1,1-2.3,2.3A2.3,2.3,0,0,1,1218.67,32.031ZM1203.33,39.7a2.3,2.3,0,1,1-2.3,2.3A2.3,2.3,0,0,1,1203.33,39.7Z"
                  transform="translate(-1199.5 -30.5)"/>
        </svg>
        <div class="share">
            {'pdoResources' | snippet :[
                'parents'=>12,
                'includeTVs'=>'icon',
                'tvPrefix' => '',
                'tpl'=>'@INLINE
                        <a class="icon-link" href="{$content}">
                            <img class="share__svg" src="{$icon}" alt="{$pagetitle}">
                        </a>'
            ]}
{*            <a class="icon-link" href="https://twitter.com/">*}
{*                <svg class="share__svg" xmlns="http://www.w3.org/2000/svg"*}
{*                     width="17" height="16" viewBox="0 0 17 16">*}
{*                    <path d="M17.315,2.892a6.454,6.454,0,0,1-1.854.508A3.237,3.237,0,0,0,16.88,1.615a6.464,6.464,0,0,1-2.05.783,3.231,3.231,0,0,0-5.5,2.944A9.165,9.165,0,0,1,2.676,1.969a3.231,3.231,0,0,0,1,4.31,3.216,3.216,0,0,1-1.462-.4c0,0.014,0,.027,0,0.041A3.23,3.23,0,0,0,4.8,9.081a3.234,3.234,0,0,1-1.458.055A3.231,3.231,0,0,0,6.36,11.378,6.478,6.478,0,0,1,2.351,12.76a6.589,6.589,0,0,1-.77-0.045,9.138,9.138,0,0,0,4.948,1.45,9.122,9.122,0,0,0,9.184-9.184q0-.21-0.009-0.418A6.561,6.561,0,0,0,17.315,2.892Z"/>*}
{*                </svg>*}
{*            </a>*}
        </div>
    </div>
    <div class="header__open-menu" data-right-action="open" data-right-target=".menu">
        <span>Меню</span>
        <div class="menu__link-icon">
            <div class="link-icon__line"></div>
        </div>
    </div>
</header>