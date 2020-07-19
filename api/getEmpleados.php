<?php
	set_time_limit(120);
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
	$empleados = $Main->getMultipleFromTable("idEmpleado AS id,nombre,email,DATE_FORMAT(fechaDeNacimiento, '%Y-%m-%d' ) AS fecha,calle,colonia,estado","empleados", "");
	$aux = $Main->getMultipleFromTable("*","skills","");
	for($i=0; $i< count($empleados);$i++){
		$skills = '';
		for($j=0;$j<count($aux);$j++){
			if($aux[$j]["idEmpleado"] == $empleados[$i]["id"]){
				$skills = $skills . $aux[$j]['skill'].",";
			}
		}
		
		$empleados[$i]['skills'] = substr($skills,0,-1);
	}
	if(!empty($empleados)){
		$response['data'] = $empleados;
		$response['result'] = 1;
	}
	else{
		$response['error'] = "Sin empleados :(";
	}
	print_r(json_encode($response));
?>