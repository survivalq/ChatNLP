const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { dockStart } = require('@nlpjs/basic');
const { isMathOperation, performMathOperation, isJavaScriptExecution, executeJavaScript } = require('./helpers/customActions');

const app = express();
const context = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

(async () => {
  const dock = await dockStart({
    settings: {
      nlp: {
        forceNER: true,
        languages: ['en'],
      },
    },
    use: ['Basic', 'LangEn'],
  });

  const manager = dock.get('nlp');

  await manager.load(path.join(__dirname, 'model.nlp'));

  app.post('/ask', async (req, res) => {
    const { text } = req.body;

    if (isMathOperation(text)) {
      const result = performMathOperation(text);
      res.json({ answer: result });
    } else if (isJavaScriptExecution(text)) {
      const result = executeJavaScript(text);
      res.json({ answer: result });
    } else {
      const response = await manager.process('en', text, context);
      res.json(response);
    }
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is running at http://localhost:${PORT}`));
    console.log(chalk.yellow('The trained model has very limited knowledge.'));
  });
})();