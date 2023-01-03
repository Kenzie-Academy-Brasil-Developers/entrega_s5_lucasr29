import 'express-async-errors';
import express from "express"
import { handleError } from "./errors/handleError"
import { sessionRoutes } from "./routes/session.routes"
import { userRoutes } from "./routes/users.routes"
import { propertiesRoutes } from './routes/properties.routes';
import { categoriesRoutes } from './routes/categories.routes';
import { schedulesRoutes } from './routes/schedules.routes';



const app = express()

app.use(express.json())

app.use('/users', userRoutes)

app.use('/login', sessionRoutes)

app.use('/properties', propertiesRoutes)

app.use('/categories', categoriesRoutes)

app.use('/schedules', schedulesRoutes)

app.use(handleError)


export default app