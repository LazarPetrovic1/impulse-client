import { AuthRoute } from "../../components/auth";
import { ChatContainer } from "../../components/features/chat";

export const withChatLayout = (Page: any) => {
  return function WrappedPage(props: any) {
    return (
      <AuthRoute>
        <ChatContainer>
          <Page {...props} />
        </ChatContainer>
      </AuthRoute>
    );
  };
};