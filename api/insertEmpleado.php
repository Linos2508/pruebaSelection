<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, HEAD");
	header("Allow: GET, POST, OPTIONS, PUT, DELETE");
	header('content-type: application/json; charset=utf-8');
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == "OPTIONS") {
		die();
	}
	require_once($_SERVER['DOCUMENT_ROOT']."/api/class/main.class.php");
	$Main = new Main();
	$response = [
		"data" => "",
		"error" => "",
		"result" => 0
	];
	$_POST = $_POST == [] ? json_decode(file_get_contents('php://input'),true) : $_POST;
	if(isset($_POST['nombre'],$_POST['email'],$_POST['fecha'],$_POST['calle'],$_POST['colonia'],$_POST['estado'],$_POST['skills'])){
		$data = [
			"nombre" =>$_POST['nombre'],
			"email" => $_POST['email'],
			"fechaDeNacimiento" => $_POST['fecha'],
			"calle" => $_POST['calle'],
			"colonia" => $_POST['colonia'],
			"estado" => $_POST['estado']
		];
		$response1 = $Main->insertTable("empleados",$data);
		if (!is_null($response1)){
			$insertedSkills = [];
			for($i=0; $i < count($_POST['skills']); $i++){
				$skill = [
					"idEmpleado" => $response1,
					"skill" => $_POST['skills'][$i]
				];
				array_push($insertedSkills, $Main->insertTable("skills",$skill));
			}
			if(count($insertedSkills) == count($_POST['skills'])){
				$response['result'] = 1;
				$response['data'] = $insertedSkills;
			}
			else if ( count($insertedSkills) != 0 ){
				$response['result'] = 1;
				$response['data'] = $insertedSkills;
				$response['error'] = "Algunos skills no fueron insertados";
			}
			else{
				$response['error'] = "Skills no fueron insertados";
			}
		}
		else{
			$response['error'] = "sql insert error";
		}
	}
	else{
		$response['error'] = "Parametros insuficientes";
	}
	print_r(json_encode($response));
?>