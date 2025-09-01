
interface ChatMainTypes {
 authToken:string
}

const ChatMain = ({
    authToken
}:ChatMainTypes) => {

    console.log("authToken from chatMain: ",authToken);
  return (
    <div>ChatMain</div>
  )
}

export default ChatMain