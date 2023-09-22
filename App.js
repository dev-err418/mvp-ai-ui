import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

const App = () => {

  const [chatHistory, setChatHistory] = useState([])
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false) 
  const [response, setResponse] = useState("")
  const [input, setInput] = useState("")

  const url = "http://172.20.10.3:5000/chat"

  const template = `
    You are are respectful and polite environnemental assistant.
    You are having a conversation with a human owning a compagny.
    You are going to ask the human questions respectfully to determinate his factor of EMISSION based on his sources of emission.
    ASK ONLY REVELVANT QUESTIONS
    Previous conversation:
    {chat_history}

    New human question: {question}
    Response:
  `

  const emission = `
    I have a retail industry.
    My sources of emission are the following : 
    My fugitive emission are 750 tones per year, 
    mobile combustion: 485  tones per year 
    and stationary emission: 520 tones per year.
    My budget is $400 000 and my timeline is 5 years.
    Help me determinate my sources of emission.
  `

  useEffect(() => {
    setRunning(true)
    setChatHistory([{"Human": emission}])
    const getPreprompt = () => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "template": template,
          "query": emission,
          "history": ""
        })
      })
        .then((data) => data.json())
        .then((data) => {
          setResponse(data)
          console.log("I got it !", data)
          setChatHistory((old) => [...old, {"Assistant": data["output"]}])
          setRunning(false)
        })
        .catch((err) => {
          console.log("Error:", err)          
        })
    }
    getPreprompt();

  }, [])

  const sendQuestion = (q) => {
    // fetch 
    var result = "";
    const h = chatHistory.reverse()

    console.log(chatHistory)

    setRunning(true)
    setResponse("")

    for (let i = 0; i < h.length; i++) {
      if (Object.keys(h[i])[0] == "Assistant") {
        result += "Bot: " + h[i]["Assistant"]      
      } else {
        result += "Human: " + h[i]["Human"]
      }
    }

    fetch(url, {
        method: "POST",
        timeout: 360000,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "template": template,
          "query": input,
          "history": result
        })
      })
      .then((data) => data.json())
      .then((data) => {
        setResponse(data)
        console.log("I got it !", data)
        setChatHistory((old) => [...old, {"Assistant": data["output"]}])
        setRunning(false)
      })

    // set the chat history
    setChatHistory((old) => [...old, {"Human": input}])
  }

  return (
    <View style={{ minHeight: "100vh", width: "100vw", justifyContent: "center", alignItems: "center" }}>
      {
        running ? (
          <ActivityIndicator color={"black"} />
        ) : (
          <View style={{ width: "50vw" }}>
            <Text style={{ fontWeight: "700" }}>Réponse IA :</Text>
            <Text style={{ maxWidth: "50vw" }}>{response["output"]}</Text>            
            <Text style={{ fontWeight: "700", marginTop: 20 }}>Votre réponse :</Text>
            <TextInput value={input} onChangeText={(e) => setInput(e)} multiline style={{
              height: 200,
              borderWidth: 1,
              borderColor: "black",
              padding: 10
            }} />
            <TouchableOpacity onPress={() => sendQuestion()} style={{ alignSelf: "center", marginTop: 20, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: "black" }}>
              <Text style={{ fontWeight: "700" }}>Send</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}

export default App;