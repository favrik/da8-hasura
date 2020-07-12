#! /bin/bash
docker run -d --net=host \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:postgres@localhost:5432/hasurada8 \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:latest
