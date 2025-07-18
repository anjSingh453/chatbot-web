import "dotenv/config";

const getOpenAIResponse = async(message) =>{
    const options ={
    method: "POST",
    headers:{
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      // model : "moonshotai/kimi-k2:free",
      model : "openai/gpt-3.5-turbo",
      messages:[{
        role: "user",
        content : message
      }]
    })
  }
    try{
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions" , options);
      const data = await response.json();
      // console.log(data.choices[0].message.content);
       return data.choices[0].message.content;
    }
    catch(err){
      console.log(err.message );
    }
  
}

export default getOpenAIResponse;