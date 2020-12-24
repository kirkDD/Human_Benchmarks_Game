<?php
  // php server to talk to sqlite3 db
  $DB = new SQLite3("../database/game_stats.db");

  $INSERT_STAT_STMT = $DB->prepare("INSERT INTO
    game_stats VALUES(:game_name, :score, :server_time)");

  // add a row
  function insertStat($game_name, $score) {
    global $INSERT_STAT_STMT;
    $INSERT_STAT_STMT->reset();
    $INSERT_STAT_STMT->bindValue(":game_name", $game_name);
    $INSERT_STAT_STMT->bindValue(":score", $score);
    $INSERT_STAT_STMT->bindValue(":server_time", mktime());
    $INSERT_STAT_STMT->execute();
  }

  // for cors
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: X-Requested-With");
  // handle data coming in
  if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    if (is_null($data) || !array_key_exists("game_name", $data)
      || !array_key_exists("score", $data)) {
      echo "rejected, use format {game_name, score}";
    } else {
      insertStat($data["game_name"], $data["score"]);
    }
  } else {
    echo "unimplemented :(";
  }
?>
