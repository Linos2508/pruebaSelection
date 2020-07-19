<?php
 class Main {
    protected $con;
    public function __construct() {
        $this->con = new PDO("mysql:host=sql3.freemysqlhosting.net;dbname=sql3355862","sql3355862","BL9jrwbgwJ");
    }

    public function getSingleFromTable($rows = " * ",$table_name,$string_query = '') {
        $query = "SELECT $rows FROM $table_name WHERE 1 $string_query";
        $select = $this->con->prepare($query);
        $select->execute();
        if($select->rowCount() > 0) {
            return $select->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function getMultipleFromTable($rows = " * ",$table_name,$string_query = '') {
        $query = "SELECT $rows FROM $table_name WHERE 1 $string_query";
        $select = $this->con->prepare($query);
        $select->execute();
        if($select->rowCount() > 0) {
            return $select->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return [];
        } 
    }

    public function insertTable($table_name,$fields) {
        $query = "INSERT INTO $table_name SET ";
        foreach ($fields as $key => $value) {
            if(!is_null($value)) {
                $query.= $key." = :".$key.",";
                $bind[$key] = $value;
            }
        }
        $query = substr($query,0,strlen($query)-1);
        try {
            $insert = $this->con->prepare($query);
            foreach($bind as $key => $b){
                $insert->bindParam($key,$bind[$key]);
            }
            $insert->execute();
            if($insert->rowCount() > 0) {
                return $this->con->lastInsertId();
            } else {
                return false;
            }
        }catch(PDOException $e) {
            var_dump($e);
        }
        return false;
    }

    public function updateTable($table_name,$fields,$where) {
        $query = "UPDATE $table_name SET ";
        foreach ($fields as $key => $value) {
            $query.= $key." = :".$key.",";
            $bind[$key] = $value;
        }
        $query = substr($query,0,strlen($query)-1)." WHERE ";
        foreach ($where as $key => $value) {
            $query.= $key." = :".$key." AND ";
            $bind[$key] = $value;
        }
        $query = substr($query,0,strlen($query)-5);
            //echo $query;die();
        try {
            $insert = $this->con->prepare($query);
            foreach($bind as $key => $b) {
                $insert->bindParam($key,$bind[$key]);
            }
            $insert->execute();
            if($insert->rowCount() > 0) {
                return true;
            } else {
                return true;
            }
        } catch(PDOException $e) {}
        return false;
    }

}
?>