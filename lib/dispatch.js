use flexx
db.users.findOneAndUpdate({},{ $set: {user: "tom"} })
