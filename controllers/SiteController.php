<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;

class SiteController extends Controller
{

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionSave()
    {
        $base_str = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAvCAYAAAD9/drQAAAABHNCSVQICAgIfAhkiAAAAthJREFUWIW12EFPE0EUB/D/mzbFrUTSLYkHT0obaS8euJkQAiGQwMHQhgRM/AYcjOHgkZsHYjzgxe8ABdSgidEDGhUSuZnFUPDgQRPSWUrApUj3eaGGrrvbbnc6t32b2V9md/bNmwHa1JI9+Rk9nXsGgAAg0i4EAgsE6ovrmeuWNFZJNaL3TMySEPMXYzbzU6WQGwLg6Ix5QChDUrk5NwTAcLlY2FIyIj2dnydgti7I/BtEQ6WdpQ0AiLYLsW0eNfcKG7VQqBElUrkFQTTjQCq2zcPm3vKHi+GWR6Snck/IBTljHis7EKDF/+gcuV9nAKdV5rHy7vI7tz6BZ52eys25IbDtO14IEPAbJVL5h4LwqC7IXIEtxkt7i2/9+jYN6an8AyI8rkdg2VUaNb8vvm/Uvymolrsc4WNmHpbFwudmntEQckOYcVjl6lB5d+VLMwjQYDJ4IOUqeDAI4gvpPROzHshQuVjYCoIAHq/OLwu3ggAuI/JCcJ6FW0EAx4j8kFoWDg25Io5UH6ZF/RBnqg/TyON1wa7a/c5UH6YJEnTJ7QYz/VCFAEDEksa6lug9JqKRizdI0GRHV2bp5MAoK4EAwDK3PzoxAq6oxP4tfH5YrDu7UikZphLIDxPMU7HubCEM9t9S7oaBqDMs5loztAPzLE78sGhX+sXpwbeSEsgXE2Iq2pV+HgRrWG65TxCKB8Waquv8ME3PrlnS2G/0jEDllsfSbgLol8Wlr8qgMFjgktgyjc14IlsCYawWI4IGYDqmZ95UpPFTCeSHEWi6I3nz9Ync/qUE8sE6iMVdNyzUrtwyjU0tkTmqm40eWOjtv2Uan7RkxibQoB+m5JzBksa6lsx2EnDbC1O6/XfbajLj0KbqgNKTkxNpvNL07DUi9NViROggkFB+RGNJ42Vcz9wA0S0AYGBN7sh7bTkLsqSxqumZXhCkjEXGsb/2px3OeZuM4OrI5drVXx/zmpys3ecYAAAAAElFTkSuQmCC';
        $name = '/saves/architype-'.time().".png";

        if ($_POST["base64data"]) {
            $data=$_POST["base64data"];
        } else {
            $data = $base_str;
        }
        $source = fopen($data, 'r'); 
        $destination = fopen(__DIR__.'/../public_html'.$name, 'w'); 
        $str = stream_copy_to_stream($source, $destination); 
        fclose($source); 
        fclose($destination);
        return $name;
    }

    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

}
