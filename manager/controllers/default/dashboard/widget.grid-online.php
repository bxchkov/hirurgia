<?php
/*
 * This file is part of MODX Revolution.
 *
 * Copyright (c) MODX, LLC. All Rights Reserved.
 *
 * For complete copyright and license information, see the COPYRIGHT and LICENSE
 * files found in the top-level directory of this distribution.
 */
/*
 * This file is part of MODX Revolution.
 *
 * Copyright (c) MODX, LLC. All Rights Reserved.
 *
 * For complete copyright and license information, see the COPYRIGHT and LICENSE
 * files found in the top-level directory of this distribution.
 */

class modDashboardWidgetWhoIsOnline extends modDashboardWidgetInterface {

  public function render() {
    $date_timezone = $this->modx->getOption('date_timezone');
    $timezone = !empty($date_timezone) ? $date_timezone : date_default_timezone_get();
    $timeformat = $this->modx->getOption('manager_time_format');
    $datetime = new DateTime($timezone);
    $curtime = $datetime->format($timeformat);
    $this->modx->setPlaceholder('curtime',$curtime);

    $this->controller->addJavascript($this->modx->getOption('manager_url').'assets/modext/widgets/security/modx.grid.user.online.js');
    $this->controller->addHtml('
    <script>
      Ext.applyIf(MODx.lang, '. $this->modx->toJSON($this->modx->lexicon->loadCache('core', 'dashboard')) .');
      Ext.onReady(function() {
        MODx.load({
          xtype: "modx-grid-user-online"
          ,renderTo: "modx-grid-user-online"
        });
      });
    </script>');

    return $this->getFileChunk('dashboard/onlineusers.tpl');
  }
}
return 'modDashboardWidgetWhoIsOnline';
