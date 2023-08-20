const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart({
    settings: {
      nlp: {
        forceNER: true,
        languages: ['en'],
      }
    },
    use: ['Basic', 'LangEn'],
  });

  const manager = dock.get('nlp');

  const trainingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'train.json'), 'utf8'));
  const regexEntities = JSON.parse(fs.readFileSync(path.join(__dirname, 'regexEntities.json'), 'utf8'));

  // (Optional) Adds regex entities, basically "context" that the NLP can use in chat
  regexEntities.forEach(entityRule => {
    if (Array.isArray(entityRule.regex)) {
      entityRule.regex.forEach(pattern => {
        manager.addNerRegexRule('en', entityRule.entityName, new RegExp(pattern, 'gi'));
      });
    } else {
      manager.addNerRegexRule('en', entityRule.entityName, new RegExp(entityRule.regex, 'gi'));
    }
  });

  // General training data
  trainingData.forEach(item => {
    item.utterances.forEach(utterance => {
      manager.addDocument('en', utterance, item.intent);
    });

    item.answers.forEach(answer => {
      manager.addAnswer('en', item.intent, answer);
    });
  });

  await manager.train();

  const modelPath = path.resolve(__dirname, 'model.nlp');
  await manager.save(modelPath);
  console.log(chalk.blue(`Model trained and saved at ${modelPath}`));
})();