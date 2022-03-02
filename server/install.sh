#!/usr/bin/bin bash

DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=
DB_NAME=qrator

export DB_URL=postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
echo "export DB_URL=$DB_URL"