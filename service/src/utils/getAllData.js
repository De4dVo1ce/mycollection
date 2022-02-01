const getAllData = (datastore, callback) =>
  datastore.find({}, {}, (err, docs) => {
    if (err) {
      console.error(err)
      return
    }
    callback(docs)
  })

exports.getAllData = getAllData
