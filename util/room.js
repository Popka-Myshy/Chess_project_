const redisClient = require('../redisClient');

let numberOfRoomsIndices = {
    'beginner': 0,
    'intermediate': 1,
    'advanced': 2,
    'expert': 3
}

const createRoom = (roomId, user, time, password=null) => {
    let room ={id: roomId, players: [null,null],moves: [], time: time, gameStarted: false};

    room.players[0] = user;

    if(password){
        room.password = password;
    }

    redisClient.set(roomId, JSON.stringify(room));

    redisClient.get('room', (err, reply) => {
        if(err) throw err;

        let rooms;
        let index;
        if (reply){
            rooms = JSON.parse(reply);
            index = rooms.length;
            rooms.push(room);
        }else{
            index = 0;
            rooms = [room];
        }

        redisClient.set('room', JSON.stringify(rooms));

        redisClientlient.get('roomIndices', (err, reply) => {
            if(err) throw err;

            let roomIndices;

            if(reply){
                roomIndices = JSON.parse(reply);
            }else{
                roomIndices = {};
            }

            roomIndices[`${roomId}`] = index;

            redisClient.set('roomIndices', JSON.stringify(roomIndices));
        });
    });

    redisClient.get('total-rooms', (err, reply) => {
        if(err) throw err;

        if(reply){
            let totalRooms = parseInt(reply);

            totalRooms += 1;

            resdisClient.set('totalRooms', totalRooms +'');
        }else{
            resdisClient.set('totalRooms', '1');
        }
    });

    redisClient.get('number-of-rooms', (err, reply) => {
        if(err) throw err;

        let numberOfRooms =[0,0,0,0];

        if(reply){
            numberOfRooms = JSON.parse(reply);
        }
        numberOfRooms[numberOfRoomsIndices[user.user_rank]] += 1;

        redisClient.set('number-of-rooms', JSON.stringify(numberOfRooms));
    });
};

const joinRoom = (roomId, user) => {
    redisClient.get (roomId, (err, reply) => {
        if(err) throw err;

        if(reply){
            let room = JSON.parse(reply);

            room.players[1] = user;

            redisClient.set(roomId, JSON.stringify(room));

            redisClient.get('roomIndices', (err, reply) => {
                if(err) throw err;

                if(reply){
                    let roomIndices = JSON.parse(reply);

                    redisClient.get('rooms', (err, reply) => {
                        if(err) throw err;

                        if(reply){
                            let rooms = JSON.parse(reply);

                            rooms[roomIndices[`${roomId}`]].players[1] = user;
                            redisClient.set('rooms', JSON.stringify(rooms));
                        }
                    });
 
                }
            });
        };
    });
};

const removeRoom = (roomId, user_rank) => {
    redisClient.del(roomId);
    
    redisClient.get('roomIndices', (err, reply) => {
        if(err) throw err;

        if(reply){
            let roomIndices = JSON.parse(reply);

            redisClient.get('rooms', (err, reply) => {
                if(err) throw err;

                if(reply){
                    let rooms = JSON.parse(reply);

                    rooms.splice(roomIndices[roomId], 1);

                    delete roomIndices[roomId];

                    redisClient.set('rooms', JSON.stringify(rooms));
                    redisClient.set('roomIndices', JSON.stringify(roomIndices));
                }
            });
        }

        
    });

    redisClient.get('total-rooms', (err, reply) => {
        if(err) throw err;

        if(reply){
            let totalRooms = parseInt(reply);

            totalRooms -= 1;

            if(totalRooms === 0){
                resdisClient.del('totalRooms');

            }else{
                resdisClient.set('totalRooms', totalRooms +'');

            }

            resdisClient.set('totalRooms', totalRooms +'');
        }else{
            resdisClient.set('totalRooms', '1');
        }
    });

    redisClient.get('number-of-rooms', (err, reply) => {
        if(err) throw err;

        let numberOfRooms =[0,0,0,0];

        if(reply){
            numberOfRooms = JSON.parse(reply);
        
            numberOfRooms[numberOfRoomsIndices[user.user_rank]] += 1;

            redisClient.set('number-of-rooms', JSON.stringify(numberOfRooms));
        }
    });
}


module.exports = {createRoom, joinRoom, removeRoom};