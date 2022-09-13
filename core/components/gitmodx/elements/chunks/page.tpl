<div class="page">
    <svg class="page__loader" viewBox="0 0 100 100">
        <path d="M 50,50 m 0,-49.9 a 49.9,49.9 0 1 1 0,99.8 a 49.9,49.9 0 1 1 0,-99.8" stroke="transparent"
              stroke-width="0.2" fill-opacity="0"></path>
        <path d="M 50,50 m 0,-49.9 a 49.9,49.9 0 1 1 0,99.8 a 49.9,49.9 0 1 1 0,-99.8"
              stroke="rgba(255, 255, 255, .5)" stroke-width="0.2" fill-opacity="0"
        ></path>
    </svg>
    <div class="page__preview">
        <div class="preview__main">
            {$pagetitle}<br>
            <span>{$description}</span>
        </div>
        <div class="page-player" js-right-action="open" js-right-target=".page-content">
            <div class="page-player__wrapper">
                <img class="page-player__arrow" src="/assets/icons/video-arrow.svg">
                <div class="page-player__inner">

                </div>
            </div>
        </div>
    </div>
    <div class="page__info">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="6" height="20" viewBox="0 0 6 20">
            <path d="M4.382,8.194v10.5h-2.8V8.194h2.8m1.2-1.2h-5.2V18.9a0.989,0.989,0,0,0,.989.989H4.592A0.989,0.989,0,0,0,5.582,18.9V6.994h0ZM3,1.31A1.781,1.781,0,1,1,1.2,3.091,1.793,1.793,0,0,1,3,1.31m0-1.2A2.981,2.981,0,1,0,6,3.091,2.99,2.99,0,0,0,3,.11H3Z"/>
        </svg>
    </div>
</div>