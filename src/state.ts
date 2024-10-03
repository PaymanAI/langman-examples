import { Annotation } from "@langchain/langgraph";
import type { BaseMessage } from "@langchain/core/messages";

const CloneGraphState = Annotation.Root({
	messages: Annotation<BaseMessage[]>({
		reducer: (x, y) => x.concat(y),
	}),
});

export default CloneGraphState;
