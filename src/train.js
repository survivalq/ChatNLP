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

  // Add training data with multiple random responses. Also add patterns for entities (context variables)
  trainingData.forEach(item => {
    item.utterances.forEach(utterance => {
      manager.addDocument('en', utterance, item.intent);
    });

    item.answers.forEach(answer => {
      manager.addAnswer('en', item.intent, answer);
    });

    if (item.patterns) {
      item.patterns.forEach(pattern => {
        manager.addNerAfterLastCondition('en', pattern.entity, pattern.conditions);
      });
    }
  });

  await manager.train();

  const modelPath = path.resolve(__dirname, 'model.nlp');
  await manager.save(modelPath);
  console.log(chalk.blue(`Model trained and saved at ${modelPath}`));
})();