import { CorsOptions, CorsOptionsDelegate } from 'cors'

const whitelist = ['https://simsalabim.space', 'http://localhost', 'http://192.168.0', 'http://10.0.2.2:3001']
export const corsOptions: CorsOptions | CorsOptionsDelegate = {
    credentials: true,
    origin: (origin: string, callback) =>
    {
        if (whitelist.find(url => origin.startsWith(url)))
        {
            callback(null, true)
        }
        else
        {
            callback(new Error(`${origin} is not allowed by CORS`))
        }
    },
}

