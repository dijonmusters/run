import { addRun } from '../_db'

const createRun = async (_, { input: run }) => await addRun(run)

export { createRun }
