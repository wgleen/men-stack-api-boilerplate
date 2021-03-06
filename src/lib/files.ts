import multer from 'multer'
import neatCsv from 'neat-csv'

const storage = multer.memoryStorage()

export const uploadMiddleware = multer({ storage })

export const readCSV = (data: Buffer): Promise<neatCsv.Row[]> => neatCsv(data)
