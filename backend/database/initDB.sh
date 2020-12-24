
# script to make db using sqlite3

INIT_FILE=create_tables.sql
DB_NAME=game_stats.db


echo "igniting: reading from $INIT_FILE"
# create
sqlite3 -line $DB_NAME ".read $INIT_FILE"

echo "done"
