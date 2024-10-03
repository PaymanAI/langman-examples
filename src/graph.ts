import { StateGraph } from '@langchain/langgraph'
import CloneGraphState from './state'

export const graph = new StateGraph(CloneGraphState).compile()
