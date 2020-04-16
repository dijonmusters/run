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

const getRunsForUser = async () => {} // TODO: implement this

const allRuns = async (user) => await getRunsForUser('all_runs', user)

const addRun = async (run) => {
  const document = await client.query(
    q.Create(q.Collection('run'), { data: run })
  )
  return {
    id: document.ref.id,
    ...document.data,
  }
}

export { allRuns, addRun }
