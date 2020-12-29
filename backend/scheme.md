## What is the job of backend?

1. collect the score of users anonymously

### php + sqlite3 solution

- php server receiving POST requests
  + requests in the form {game_name: -, score: -}
- sqlite table game_stats has fields
  + game_name
  + score
  + server_time (in seconds)
