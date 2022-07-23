#! /bin/bash
docker stop da8
docker rm da8
docker run -d --name da8 --net=host \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:postgres@localhost:5432/hasurada8 \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:v2.8.4
