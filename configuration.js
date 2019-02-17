var configuration = {
        _id: 'replica',
        members: [
                {_id:0, host: 'localhost:27017'},
                {_id:1, host: 'localhost:27018', slaveDelay:20, priority:0},
                {_id:2, host: 'localhost:27019'},
        ]
}