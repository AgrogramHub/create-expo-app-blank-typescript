import nlp from 'compromise';
import fs from 'fs';

const commitMessageFile = process.argv[2];
const commitMessage = fs.readFileSync(commitMessageFile, 'utf8').trim();
console.log(commitMessage);

const doc = nlp(commitMessage);
const tokens = doc.terms().out('array'); // Mesajı tokenlara ayırıyoruz
console.log('Detected Tokens: ', tokens);

if (tokens.length === 0) {
  console.log('Commit message must contain at least one token');
  process.exit(1);
}

const isPastTense = tokens.some((token: string) => {
  const tokenDoc = nlp(token);
  const tokenVerbs = tokenDoc.verbs().out('array');
  if (tokenVerbs.length > 0) {
    const pastTense = tokenDoc.verbs().toPastTense().out('text');
    console.log(`Token: ${token}, Past Tense: ${pastTense}`);
    return pastTense === token;
  }
  return false;
});

if (isPastTense) {
  console.log('Commit message is in past tense');
  process.exit(1);
}

const isVerb = tokens.some((token: string) => {
  const tokenDoc = nlp(token);
  return tokenDoc.verbs().out('array').length > 0;
});

if (!isVerb) {
  console.log('Commit message must contain at least one verb');
  process.exit(1);
} else {
  console.log('Commit message is in present tense and contains at least one verb');
}
