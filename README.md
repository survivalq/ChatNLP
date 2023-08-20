<div align="center">
<a href="https://github.com/survivalq/ChatNLP">
  <img src="https://media.discordapp.net/attachments/1122114471062667326/1142827216263200878/image_1.png?width=120&height=120" alt="Logo" width="96" height="96">
</a>
</div>

---

<div align="center">
    <h1>ChatNLP</h1>
  ChatNLP is a Natural Language Processing (NLP) chatbot that answers prompts from a user.
</div>
<br>
<div align="center">
    <a href="https://github.com/survivalq/ChatNLP" style="display: inline-block; margin: 0 5px;">
      <img alt="License" src="https://img.shields.io/github/license/survivalq/ChatNLP">
</div>

---

![Screenshot](https://media.discordapp.net/attachments/1122114471062667326/1142832171854336020/image.png?width=1118&height=670)

## About The Project

ChatNLP is a Natural Language Processing (NLP) chatbot that answers prompts from a user. It was trained on a customized dataset provided inside the `./src/train.json`. Trained model doesn't have a lot of data, so it is not very accurate. However, it is able to answer some questions. Some of the parts are assisted by `./src/helpers/customActions.js` which detects a action by doing a regex match on the prompt.

## Getting Started

```sh
npm install
```

- Train the model

```sh
npm run train
```

- Start the express server

```sh
npm run start
```

## NLP.js

Learn more about NLP.js [here](https://github.com/axa-group/nlp.js).

## License

Distributed under the MIT License. See [LICENSE](https://github.com/survivalq/ChatNLP/blob/main/LICENSE) for more information.