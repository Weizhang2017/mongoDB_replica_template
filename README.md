###### Set up MongoDB Replication 

1. Create database directory for each member in a replica set e.g.
  * /mongodb/replica/db1/
  * /mongodb/replica/db2/
  * /mongodb/replica/db3/
 
 > Minimum number of members in a replica set is 3.

 2. Start databases

   * mongod --dbpath /mongodb/Replica/db1/ --replSet replica --port 27017 --fork --logpath /mongodb/Replica/db1/mongod.log
   * mongod --dbpath /mongodb/Replica/db2/ --replSet replica --port 27018 --fork --logpath /mongodb/Replica/db2/mongod.log
   * mongod --dbpath /mongodb/Replica/db3/ --replSet replica --port 27019 --fork --logpath /mongodb/Replica/db3/mongod.log

> Each database should be with a different port. Make sure mongod has permission to access the database directory.

3. Create a configuration file e.g.

```
var configuration = {
        _id: 'replica',
        members: [
                {_id:0, host: 'localhost:27017'},
                {_id:1, host: 'localhost:27018', slaveDelay:20, priority:0},
                {_id:2, host: 'localhost:27019'},
        ]
}
```
> `slaveDelay` is the time the secondary database operation will delay behind the primary database. Priority parameter determines the member’s priority in elections. 0 means the member will not be elected as primary database

4. Copy and paste the configuration into mongo shell and initiate the configuration

```
rs.initiate(configuration)
```

5. Connect to the replica set with Mongoengine
```python
from mongoengine import connect
connect('test', replicaset='replica')
```

> mongoengine will automatically handle failover