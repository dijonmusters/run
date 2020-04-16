import { addRun } from '../_db'

const createRun = async (_, { input: run }, user) => await addRun(run, user)

export { createRun }
