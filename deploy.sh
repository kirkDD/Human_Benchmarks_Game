# run this after clone to deploy to UW server

PREF=">>"

echo "$PREF creating db"
cd "./backend/database"
./initDB.sh
if [ $? -eq 0 ]
then 
	echo "$PREF db create failed"
else
	echo "$PREF db created"
fi
cd "../../"
echo "$PREF done, exiting"
