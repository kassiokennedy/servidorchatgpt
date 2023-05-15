const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const textGeneration = async (prompt) => {

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Human: ${prompt}\nAI: `,
            temperature: 0.9,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: ['Human:', 'AI:']
        });
    
        return {
            status: 1,
            response: `${response.data.choices[0].text}`
        };
    } catch (error) {
        return {
            status: 0,
            response: ''
        };
    }
};


const webApp = express();

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
    console.log(`Path ${req.path} with Method ${req.method}`);
    next();
});


webApp.get('/', (req, res) => {
    res.sendStatus(200);
});


webApp.post('/dialogflow', async (req, res) => {
    
    let action = req.body.queryResult.action;
    let queryText = req.body.queryResult.queryText;
    // let parameters = req.body.queryResult.parameters;
    let comida1 = req.body.queryResult.parameters.comida1;
    let comida2 = req.body.queryResult.parameters.comida2;
    let comida3 = req.body.queryResult.parameters.comida3;
    let alimento = req.body.queryResult.parameters.alimento;

    if (action === 'input.unknown') {
        let result = await textGeneration(queryText);

        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }
    // ---------- SUGESTÔES DE RECEITA ----------------------------------------------
    } else if (action == 'sugerirreceita') {
        let result = await textGeneration('dê uma dica de prato para fazer com esses tres ingredientes' + comida1 + ' ' + comida2 + ' ' + comida3 );
        console.log(result.response)

        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }

    }  else if (action == 'sugerirreceita.almoco') {
        let result = await textGeneration('dê uma dica de almoço para fazer com esses tres ingredientes' + comida1 + ' ' + comida2 + ' ' + comida3 );
        console.log("dica de almoço:")
        console.log(result.response)

        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }

    } else if (action == 'sugerirreceita.lanche') {
        let result = await textGeneration('dê uma dica de lanche para fazer com esses tres ingredientes' + comida1 + ' ' + comida2 + ' ' + comida3 );
        console.log("dica de lanche:")
        console.log(result.response)
        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }

    }  else if (action == 'sugerirreceita.sobremesa') {
        let result = await textGeneration('dê uma dica de sobremesa para fazer com esses tres ingredientes' + comida1 + ' ' + comida2 + ' ' + comida3 );
        console.log("Dica de sobremesa:")
        console.log(result.response)
        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }

    } else if (action == 'sugerirreceita.qualquer') {
        let result = await textGeneration('dê uma dica de comida pouco conhecida para que a eu possa experimentar');
        console.log("\nDica de qualquer tipo de comida:")
        console.log(result.response)
        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }
    // ---------- INDICAR A QUALIDADE DO ALIMENTO ----------------------------------------------
    } else if (action == 'saber_se_alimento_ok') {
        let result = await textGeneration('me dê dicas de de como o alimento' + alimento + ' se encontra quando esta em bom estado de consumo');
        console.log("\nDica de qualidade:")
        console.log(result.response)
        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }
    // ---------- SUGESTÔES DE RECEITA ----------------------------------------------
    }  else if (action == 'saber_se_alimento_ok_naosei') {
        let result = await textGeneration('me dê dicas de de como verificar a qualidade do alimento' + alimento + ' spara ajudar a indentificar quando esta em bom estado de consumo ou se nao presta mais');
        console.log("\nDica de qualidade:")
        console.log(result.response)
        if (result.status == 1) {
            res.send(
                {
                    fulfillmentText: result.response
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `Sorry, I'm not able to help with that.`
                }
            );
        }
    // ---------- SUGESTÔES DE RECEITA ----------------------------------------------
    } else {
        res.send(
            {
                fulfillmentText: `No handler for the action ${action}.`
            }
        );    
    }

    /**
     *  else if (action === 'input.ajuda') {
        valor = req.body.queryResult.parameters.ajuda
        res.send(
            {
                fulfillmentText: `Muito obrigado! Para duvidas, sugestoes ou reclamações por favor mande um email para ajuda@email.com.`
            }
        );
        // console.log('ajuda: '+ valor)
        /*
        if (valor == 'sim'){
            res.send(
                {
                    fulfillmentText: `você disse sim!`
                }
            );
        } else if (valor =='nao'){
            res.send(
                {
                    fulfillmentText: `Muito obrigado! Para duvidas, sugestoes ou reclamações por favor mande um email para ajuda@email.com.`
                }
            );
        } else {
            res.send(
                {
                    fulfillmentText: `nao entendi sua resposta`
                }
            );
        }
        
        // res.status(200)
        // console.log("input.ajuda")
    } 
     */
});

/**
 * Rodar na porta 5000
 */ 
webApp.listen(5000)
console.log('Server is up and running at PORT 5000')

/**
 * Rodar em portas aleatórias
const listener = webApp.listen(process.env.PORT, () => {
    console.log('Server is up and running at: ' + listener.address().port)
});
 */

/**
 * Rodar: node index.js 
 * Rodar em modo dev: npm run dev
 */