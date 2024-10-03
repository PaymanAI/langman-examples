import { Elysia, t } from 'elysia'
import { v4 as uuidv4 } from 'uuid'
import { graph } from './graph'

export const server = new Elysia()
  .post(
    '/webhook',
    ({ body: { eventType, details } }) => {
      switch (eventType) {
        case 'submission.approved': {
          console.log('Submission approved', details)
        }
      }
    },
    {
      body: t.Object({
        eventType: t.String(),
        details: t.Any(),
      }),
    },
  )
  .post('/start', async () => {
    const thread_id = uuidv4()
    const result = await graph.invoke(
      { messages: [] },
      { configurable: { thread_id } },
    )

    return {
      state: result,
      thread_id,
    }
  })
  .post(
    '/message/:id',
    async ({ body: { message }, params: { id } }) => {
      const config = { configurable: { thread_id: id } }
      await graph.updateState(config, { messages: [message] }) //add `asNode: "wait_for_input"` to update as a graph node

      return {
        state: await graph.getState(config),
        id,
      }
    },
    {
      body: t.Object({
        message: t.String(),
      }),
    },
  )
  .get('/message/:id', async ({ params: { id } }) => {
    const config = { configurable: { thread_id: id } }
    return {
      state: await graph.getState(config),
      id,
    }
  })
