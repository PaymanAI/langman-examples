import type { BaseMessage } from '@langchain/core/messages'
import { Annotation } from '@langchain/langgraph'

const CloneGraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
})

export default CloneGraphState
