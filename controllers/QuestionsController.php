<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;

class QuestionsController extends Controller
{

    public function behaviors()
    {
        Yii::$app->response->format = Response::FORMAT_JSON; 
        return [];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionIndex($question_id)
    {
        return ["data" => $this->renderPartial('question-'.$question_id)];
    }

}
