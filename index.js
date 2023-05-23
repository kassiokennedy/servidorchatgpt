const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kassiointernet@gmail.com',
    pass: ''
  }
});

//-----------------------------------------------------
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// https://platform.openai.com/docs/models/gpt-3-5 - modelos de gpt
const textGeneration = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Human: ${prompt}\nAI: `,
      temperature: 0.9,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ["Human:", "AI:"],
    });

    return {
      status: 1,
      response: `${response.data.choices[0].text}`,
    };
  } catch (error) {
    return {
      status: 0,
      response: "",
    };
  }
};
//--------------------------------------------------------------------
const webApp = express();

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});

webApp.get("/", (req, res) => {
  res.sendStatus(200);
});

webApp.post("/dialogflow", async (req, res) => {
  let action = req.body.queryResult.action;
  let queryText = req.body.queryResult.queryText;

  let comida1 = req.body.queryResult.parameters.comida1;
  let comida2 = req.body.queryResult.parameters.comida2;
  let comida3 = req.body.queryResult.parameters.comida3;
  let tipo = req.body.queryResult.parameters.tipo;
  let duvida = req.body.queryResult.parameters.duvida;
  let alimento = req.body.queryResult.parameters.alimento;

  //--------------------------------------------------------------------
  if (action === "input.unknown") {
    let result = await textGeneration(queryText);
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    } 
    // ---------- INDICAR A QUALIDADE DO ALIMENTO ----------------------------------------------
      }else if (action == "estado_alimento_resposta") {
    let result = await textGeneration(
      "como identificar o bom estado do alimento informado" + alimento
    );

    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------     
      }else if (action == "saber_se_alimento_ok") {
    let result = await textGeneration(
      "me dê dicas de de como o alimento" +
        alimento +
        " se encontra quando esta em bom estado de consumo"
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\nDica de qualidade:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "saber_se_alimento_ok_naosei") {
    let result = await textGeneration(
      "me dê dicas de de como verificar a qualidade do alimento" + alimento
    );
    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\nDica de qualidade tipo nao sei:",result.response);
    // ------------------------------------------------------------------    
  } else if (action == "saber_se_alimento_ok_ruim") {
    let result = await textGeneration(
      "me dê dicas de de como verificar a qualidade do alimento" + alimento
    );
    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\nDica de qualidade tipo nao sei:",result.response);
    // ------------------------------------------------------------------    
  } else if (action == "acucar") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "carnes") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "cereais") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "frutas") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "hortalicas") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "leguminosas") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "leite") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
     //--------------------------------------------------------------------
      } else if (action == "nao_sei") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "oleo") {
    let result = await textGeneration(
      "responda a duvida do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\n\nResposta: " + result.response);
    //--------------------------------------------------------------------
  } else if (action == "ovo") {
    let result = await textGeneration(
      "responda a " + duvida + " do usuarios sobre alimento" + alimento
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Agradeço sua sugestão!:)`,
      });
    }
    console.log("\n\nResposta: " + result.response);    
    // ---------- SUGESTÔES DE RECEITA ----------------------------------------------
  } else if (action == "sugerirreceita") {
    let result = await textGeneration(
      "dê uma dica de prato para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log(result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.almoco") {
    let result = await textGeneration(
      "dê uma dica de desse " +
        tipo +
        "almoço para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );

    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de almoço:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.lanche") {
    let result = await textGeneration(
      "dê uma dica de lanche para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de lanche:",result.response)
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.sobremesa") {
    let result = await textGeneration(
      "dê uma dica de sobremesa para fazer com esse tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("Dica de sobremesa:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.qualquer") {
    let result = await textGeneration(
      "dê uma dica de comida pouco conhecida para que a eu possa experimentar"
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\nDica de qualquer tipo de comida:",result.response);
    ///--------------VEGANOS--------------------------------
  } else if (action == "sugerirreceita.almoco.vegano") {
    let result = await textGeneration(
      "dê uma dica de almoço vegano para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de almoço:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.lanche.vegano") {
    let result = await textGeneration(
      "dê uma dica de lanche vegano para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de lanche:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.sobremesa.vegano") {
    let result = await textGeneration(
      "dê uma dica de sobremesa vegana para fazer com esses dois ingredientes" +
        comida1 +
        " " +
        comida2 
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("Dica de sobremesa:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.qualquer.vegano") {
    let result = await textGeneration(
      "dê uma dica de comida vegana pouco conhecida para que eu possa experimentar, com esses três ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\nDica de qualquer tipo de comida:",result.response);
    
      ///--------------VEGETARIANOS--------------------------------
  } else if (action == "sugerirreceita.almoco.vegetariano") {
    let result = await textGeneration(
      "dê uma dica de almoço vegetariano para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de almoço:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.lanche.vegetariano") {
    let result = await textGeneration(
      "dê uma dica de lanche vegetariano para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de lanche:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.qualquer.vegetariano") {
    let result = await textGeneration(
    "dê uma dica de comida vegetariana pouco conhecida para eu experimentar, com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\nDica de qualquer tipo de comida:",result.response);
      ///--------------SEM RESTRIÇÃO--------------------------------
  } else if (action == "sugerirreceita.almoco.semrestricao") {
    let result = await textGeneration(
      "dê uma dica de almoço sem restrição alimentar para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de almoço:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.lanche.semrestricao") {
    let result = await textGeneration(
      "dê uma dica de lanche sem restrição alimentar para fazer com esses tres ingredientes" +
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );    
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("dica de lanche:",result.response);
        //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.sobremesa.semrestricao") {
    let result = await textGeneration(
      "dê uma dica de sobremesa sem restrição alimentar para fazer com esses dois ingredientes" +
        comida1 +
        " " +
        comida2
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("Dica de sobremesa:",result.response);
    //--------------------------------------------------------------------
  } else if (action == "sugerirreceita.qualquer.semrestricao") {
    let result = await textGeneration(
      "dê uma dica de comida sem restrição alimentar pouco conhecida para que a eu possa experimentar, com esses tres ingredientes" + 
        comida1 +
        " " +
        comida2 +
        " " +
        comida3
    );
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response,
      });
    } else {
      res.send({
        fulfillmentText: `Sorry, I'm not able to help with that.`,
      });
    }
    console.log("\nDica de qualquer tipo de comida:",result.response);

  
    //-------------------------------  AJUDA  -------------------------------------
  } else if (action === "input.ajuda") {
    let ajuda = req.body.queryResult.parameters.ajuda;
    const texto = JSON.stringify(ajuda)
    const mailOptions = {
      from: 'kassiointernet@gmail.com',
      to: 'kassiointernet@gmail.com',
      subject: 'Tom',
      text: texto
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
     console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        // do something useful
      }
    });
    res.send({
      fulfillmentText: `Muito obrigado pela sua sugestão! Agora você gostaria de voltar ao menu ou encerrar a conversa?`,
    });
    //--------------------------------------------------------------------
  } else {
    res.send({
      fulfillmentText: `No handler for the action ${action}.`,
    });
  }
});

webApp.listen(5000);
console.log("Server is up and running at PORT 5000");


// console.log('ajuda: '+ valor)

// if (valor == 'sim'){
//     res.send(
//         {
//             fulfillmentText: `você disse sim!`
//         }
//     );
// } else if (valor =='nao'){
//     res.send(
//         {
//             fulfillmentText: `Muito obrigado! Para duvidas, sugestoes ou reclamações por favor mande um email para ajuda@email.com.`
//         }
//     );
// } else {
//     res.send(
//         {
//             fulfillmentText: `nao entendi sua resposta`
//         }
//     );
// }
// https://chatgptkassio.glitch.me/dialogflow
