const mathQueryPatterns = [
    /^what\s+is\s+[\d+\-*/\s()]+$/,
    /^calculate\s+[\d+\-*/\s()]+$/,
    /^solve\s+[\d+\-*/\s()]+$/,
    /^evaluate\s+[\d+\-*/\s()]+$/,
    /^compute\s+[\d+\-*/\s()]+$/,
    /^find\s+the\s+result\s+of\s+[\d+\-*/\s()]+$/,
    /^what's\s+[\d+\-*/\s()]+$/,
    /^how\s+much\s+is\s+[\d+\-*/\s()]+$/,
    /^[\d+\-*/\s()]+\s*\?$/,
    /^[\d+\-*/\s()]+$/,
];

function isMathOperation(text) {
    return mathQueryPatterns.some(pattern => pattern.test(text));
};

function performMathOperation(operation) {
    try {
        const result = eval(operation.replace(/^.*\s+/, ''));
        const messages = [
            "The answer is:",
            "Here's the result:",
            "I calculated it to be:",
            "It's:",
            "The result is:",
            "It's equal to:",
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        return `${randomMessage} ${result}`;
    } catch (error) {
        return "Sorry, I couldn't perform that math operation.";
    }
};

function isJavaScriptExecution(text) {
    return text.trim().toLowerCase().startsWith('js:');
};

function executeJavaScript(command) {
    try {
        const jsCode = command.substring(3);
        const result = eval(jsCode);
        return `JavaScript output: ${result.toString()}`;
    } catch (error) {
        return "Sorry, I couldn't execute that JavaScript code.";
    }
};

module.exports = { 
    isMathOperation, 
    performMathOperation, 
    isJavaScriptExecution, 
    executeJavaScript 
};  