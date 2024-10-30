// Simulación de un diccionario de palabras en español
const dictionary = ['me', 'complace', 'mucho', 'ver', 'lo', 'bien', 'que', 'estoy', 'trabajando', 'y', 'cómo', 'esto', 'aumenta', 'mis', 'poderes', 'de', 'atención', 'esfuerzo', 'continuo'];

function frequencyAnalysis(message) {
    const frequency = {};
    for (const char of message) {
        // Contar la frecuencia de cada letra
        if (/[a-zA-Z]/.test(char)) {
            frequency[char] = (frequency[char] || 0) + 1;
        }
    }
    return frequency;
}

function decryptMessage(encryptedMessage) {
    // Objeto de reemplazo para vocales y caracteres especiales
    const replacements = {
        '?': 'a',
        '[': 'e',
        '\\': 'i',
        '~': 'o',
        '+': 'u',
        '¬': 'ó',
        '()': ' '
    };

    let decryptedMessage = '';
    let i = 0;

    while (i < encryptedMessage.length) {
        // Verificar si hay una secuencia de caracteres a reemplazar
        if (encryptedMessage.substring(i, i + 2) === '()') {
            // Reemplazar por espacio
            decryptedMessage += replacements['()'];
            i += 2; // Saltar los dos caracteres
        } else {
            // Obtener el caracter actual
            let char = encryptedMessage[i];
            // Verificar si el caracter es una vocal a reemplazar
            // Si no, se mantiene el carácter original
            decryptedMessage += replacements[char] || char;
            i++;
        }
    }
    // Eliminar espacaios en blanco al inicio y final del mensaje
    return decryptedMessage.trim(); 
}

function isExactMatch(word, dictWord) {
    // Compara si las letras coinciden, omitiendo caracteres especiales
    if (word.length !== dictWord.length) return false;

    for (let i = 0; i < word.length; i++) {
        const wordChar = word[i];
        const dictChar = dictWord[i];
        if (/[a-zA-Záéíóú]/.test(wordChar) && wordChar !== dictChar) {
            // Si es letra y no coincie
            return false;
        }
    }
    // Si todas las letras coinciden
    return true; 
}

function findMatchingWords(decryptedMessage, dictionary) {
    // Dividir el mensaje en palabras
    const words = decryptedMessage.split(' ');
    const matchedWords = [];

    for (const word of words) {
        // Filtrar palabras del diccionario según la longitud
        const filteredWords = dictionary.filter(dictWord => isExactMatch(word, dictWord));
        // Si hay coincidencias, guardarlas
        if (filteredWords.length > 0) {
            matchedWords.push({ original: word, matches: filteredWords });
        }
    }

    return matchedWords;
}

// Mensaje encriptado
const encryptedMessage = '^[()`~^*/?`[()^+`-~()#[$()/~()%\\[]()}+[()[{=~¿()=$?%?!?]¡~()¿()`¬^~()[{=~()?+^[]=?()^\\{()*~¡[$[{()¡[()?=[]`\\¬]()¿()[{;+[$_~()`~]=\\]+~';

// Desencriptar mensaje
const decryptedMessage = decryptMessage(encryptedMessage);
console.log('Mensaje desencriptado:', decryptedMessage);

// Buscar palabras que coincidan con el mensaje desencriptado
const matchedWords = findMatchingWords(decryptedMessage, dictionary);

// Formatear la salida de palabras coincidentes
console.log('Palabras coincidentes: [');
matchedWords.forEach(entry => {
    console.log(`  { original: '${entry.original}', matches: [ ${entry.matches.join(', ')} ] },`);
});
console.log(']');

// Mostrar la frase desencriptada final
console.log('Frase original:', decryptedMessage);

// Formatear la salida en una sola línea mostrando solo las palabras coincidentes
const output = matchedWords.map(entry => entry.matches.join(', ')).join(', ');
console.log('Palabras coincidentes:', output);
