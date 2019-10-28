#!/bin/bash


TIME=$(date +%s)
VERSION="1.0"

docker-compose build --build-arg buildTimestamp=$TIME --build-arg buildVersion=$VERSION cats-api
docker-compose up -d