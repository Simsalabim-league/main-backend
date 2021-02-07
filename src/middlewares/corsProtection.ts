import { CorsOptions, CorsOptionsDelegate } from 'cors'

const whitelist = ['https://simsalabim.space']
export const corsOptions: CorsOptions | CorsOptionsDelegate = {
    credentials: true,
    origin: (origin: string, callback) =>
    {
        if (whitelist.find(url => origin && origin.startsWith(url)))
        {
            callback(null, true)
        }
        else
        {
            callback(new Error(`${origin} is not allowed by CORS`))
        }
    },
}

