import faunadb, { query as q } from 'faunadb'

const client = new faunadb.Client({ secret: process.env.FAUNADB_URL })

const getAllFromIndex = async (index) => {
  const { data: documents } = await client.query(
    q.Map(q.Paginate(q.Match(q.Index(index))), (ref) => q.Get(ref))
  )

  return documents.map(({ ref, data }) => ({
    id: ref.id,
    ...data,
  }))
}

const getRunsForUser = async (email) => {
  const { data: documents } = await client.query(
    q.Map(q.Paginate(q.Match(q.Index('runs_for_user'), email)), (ref) =>
      q.Get(ref)
    )
  )

  return documents.map(({ ref, data }) => ({
    id: ref.id,
    ...data,
  }))
}

const allRuns = async (user) => await getRunsForUser(user.email)

const addRun = async (runData, user) => {
  const run = { ...runData, email: user.email }
  const document = await client.query(
    q.Create(q.Collection('run'), { data: run })
  )
  return {
    id: document.ref.id,
    ...document.data,
  }
}

export { allRuns, addRun }
