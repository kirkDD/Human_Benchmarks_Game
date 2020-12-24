
-- database: store game stats

create TABLE game_stats (
  game_name TEXT,   -- the name of game
  score TEXT,       -- score
  server_time INT   -- time of server by php "mktime"
);
