# rails-react-chat
Project to learn React and test the integration with rails Channels.

# Stack to implement websockets communication
* ruby, rails (ActionCable)
* react (react-actioncable-provider)
* pg (persistence)

# How to run
## dependencies
* docker
* docker-compose
* free ports (3000, 5000)

## start
```shell
docker-compose run api rails db:create #create pg database
docker-compose run api rails db:migrate #migrate pg database
docker-compose up #start pg, front & api 
```
