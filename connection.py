from mongoengine import *

connect('test', replicaset='replica')

class Test_col(Document):
	name = StringField()