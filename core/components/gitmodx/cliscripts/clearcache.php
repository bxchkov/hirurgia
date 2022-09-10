<?php

define('MODX_API_MODE', true);
require_once dirname(__FILE__, 5) . '/index.php';
/** @var $modx gitModx */
$modx->cacheManager->refresh();