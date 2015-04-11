<?php

require('../vendor/autoload.php');
require('../view.php');

$app = new \Slim\Slim([
	'templates.path' => __DIR__.'/../views/',
]);

$view = new View;

$app->get('/:page?', function($page = 'index') use($view) {
	echo $view->render($page);
});

$app->run();