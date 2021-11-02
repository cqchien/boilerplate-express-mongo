alias = blink

default: up

bootstrap:
	make up
	make install
	echo "Happy coding!!, :tada:"

up: 
	docker-compose up -d --remove-orphans

down:
	docker-compose down

ps: 
	docker-compose ps

delete:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)
	docker rmi $$(docker images -a -q)

install:
	yarn install

stop-containers:
	docker-compose stop $$(docker ps -a -q)