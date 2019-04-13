<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    
    <script src="//code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <script type="text/javascript" src="https://vk.com/js/api/share.js?93" charset="windows-1251"></script>

    <meta property="og:title" content="Я прошел тест и узнал свой архетип! Пройди тест и узнай больше о своих талантах и как применить их в карьере!"/>
    <meta property="og:site_name" content="architype"/>
    <meta property="og:url" content="https://alinaadt.ru/brandtypes"/>
    <meta property="og:description" content="Пройдите тест, чтобы узнать вашу лучшую роль, уникальные сильные стороны и психологические триггеры, чтобы привлекать больше клиентов, идеально подходящих вам."/>
    <meta property="og:image:width" content="1100" />
    <meta property="og:image:height" content="800" />
    <meta property="og:image" content=""/>

    <meta name="twitter:card" content="">
    <meta name="twitter:site" content="https://alinaadt.ru/brandtypes">
    <meta name="twitter:creator" content="">
    <meta name="twitter:title" content="Я прошел тест и узнал свой архетип! Пройди тест и узнай больше о своих талантах и как применить их в карьере!">
    <meta name="twitter:description" content="Пройдите тест, чтобы узнать вашу лучшую роль, уникальные сильные стороны и психологические триггеры, чтобы привлекать больше клиентов, идеально подходящих вам.">
    <meta id="twitter-img" name="twitter:image:src" content="">
    
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>
    <?= $content ?>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
