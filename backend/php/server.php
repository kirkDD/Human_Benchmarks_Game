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

  $RETRIVE_STAT_STMT = $DB->prepare("SELECT * FROM game_stats WHERE
    game_name = :game_name ORDER BY server_time DESC LIMIT :num_rows");

  // retrive data for a game
  // gets the 'score' and 'server_time' fields
  function getGameStats($game_name, $num_rows=50) {
    global $RETRIVE_STAT_STMT;
    $RETRIVE_STAT_STMT->reset();
    $RETRIVE_STAT_STMT->bindValue(":game_name", $game_name);
    $RETRIVE_STAT_STMT->bindValue(":num_rows", $num_rows);
    // construct return array
    $result = $RETRIVE_STAT_STMT->execute();
    $rowsArray = [];
    while ($row = $result->fetchArray()) {
        $tmp = [];
        $tmp["score"] = $row["score"];
        $tmp["server_time"] = $row["server_time"];
        array_push($rowsArray, $tmp);
    }
    return $rowsArray;
  }

  // for cors?
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
    if (is_null($_GET["game_name"])) {
      echo "unimplemented :( use get param 'game_name'\n";
    }
    if (!is_null($_GET["limit"]) && is_numeric($_GET["limit"])) {
      echo json_encode(getGameStats($_GET["game_name"], $_GET["limit"]));
    } else {
      echo json_encode(getGameStats($_GET["game_name"]));
    }
  }
?>
