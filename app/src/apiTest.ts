export const apiUrl = `http://${location.hostname}:4000`

export const fetchOptionsTempl = (): RequestInit => {
  return {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }
}

const runRegister = async (): Promise<any> => {
  const body = {
    user_name: 'demo',
    password: 'demo',
  }

  const options = fetchOptionsTempl()
  options.method = 'POST'
  options.body = JSON.stringify(body)

  const url = `${apiUrl}/auth/register`
  return await fetch(url, options as RequestInit).then((res) => res.json())
}

const runLogin = async (): Promise<any> => {
  const body = {
    user_name: 'demo',
    password: 'demo',
  }

  const options = fetchOptionsTempl()
  options.method = 'POST'
  options.body = JSON.stringify(body)

  const url = `${apiUrl}/auth/login`
  return await fetch(url, options as RequestInit).then((res) => res.json())
}

const runGetAllCollections = async (access_token: string): Promise<any> => {
  const options = fetchOptionsTempl()
  options.method = 'GET'
  options.headers = {
    access_token: access_token,
  }

  const url = `${apiUrl}/collections/all`
  return await fetch(url, options as RequestInit).then((res) => res.json())
}

const runCreateNewCollection = async (
  access_token: string,
  user_id: string
) => {
  const body = {
    user_id: user_id,
    collection: {
      name: 'demo collection',
      description: 'this is a demo collection',
    },
    collection_settings: {
      columns: [
        {
          id: 'title',
          index: 0,
          name: 'Title',
          sortable: true,
          searchable: true,
          type: 'string',
        },
        {
          id: 'uuid',
          index: 1,
          name: 'ID',
          sortable: true,
          searchable: true,
          type: 'string',
        },
      ],
    },
  }

  const options = fetchOptionsTempl()
  options.method = 'POST'
  options.headers = { access_token: access_token }
  options.body = JSON.stringify(body)

  console.log('OPTIONS', options)

  const url = `${apiUrl}/collections/new`
  return await fetch(url, options as RequestInit).then((res) => res.json())
}

export const runApiTest = async () => {
  await runLogin().then((obj1) => {
    runGetAllCollections(obj1.access_token)
      .then((obj2) => {
        console.log(obj2.docs)
      })
      .then(() => {
        console.log(obj1)
        runCreateNewCollection(obj1.access_token, obj1.doc._id).then(() => {
          runGetAllCollections(obj1.access_token).then((obj2) => {
            console.log(obj2.docs)
          })
        })
      })
  })
}
