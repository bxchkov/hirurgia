<?php
define('MODX_API_MODE', true);
require_once dirname(__DIR__, 2) . '/index.php';
/** @var $modx gitModx  */
$modx->setLogTarget('ECHO');
$modx->setLogLevel(MODX_LOG_LEVEL_INFO);
/** @var $modx gitModx */
$input = json_decode(file_get_contents('php://input'),1);
if(strpos($input['ref'],$modx->getOption('github_branch_on_push',[],'master')) !== false){
    `git pull`;
    include MODX_CORE_PATH.'components/gitmodx/cliscripts/loadtemplates.php';
    $modx->cacheManager->refresh();
}