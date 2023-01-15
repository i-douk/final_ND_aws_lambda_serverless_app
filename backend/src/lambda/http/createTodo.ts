import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Extract the new TODO item from the request body
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // Extract the user id from the JWT token
    const userId = getUserId(event);
    // Create a new TODO item
    const item = await createTodo(newTodo, userId);
    // Return the newly created TODO item
    return {
      statusCode: 201,
      body: JSON.stringify({ item })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
