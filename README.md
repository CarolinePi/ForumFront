docker build -t forum_front . <p/>
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true -p 3000:3000 --net=bridge --name ForumFront forum_front

npm install <p/>
npm start
