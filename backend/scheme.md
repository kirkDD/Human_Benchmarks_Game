## What is the job of backend?

1. collect the score of users anonymously

### php + sqlite3 solution

- sqlite table game_stats has fields
  + game_name
  + score
  + server_time (in seconds)
- requests to php/server.php
- POST requests
  + requests in the form {game_name: -, score: -}
- GET requests
  + game_name: name of game
  + limit: number of rows to get
