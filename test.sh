curl --request POST \
  --url http://localhost:3333/signup \
  --header 'content-type: application/json' \
  --data '{
    "email": "julio@qa.io", "password": "pwd123"
}'