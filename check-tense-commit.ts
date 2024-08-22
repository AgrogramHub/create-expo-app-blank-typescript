import nlp from 'compromise';
import fs from 'fs';

const commitMessageFile = process.argv[2];
if (!commitMessageFile) {
  console.error('Please provide a commit message file path.');
  process.exit(1);
}

let commitMessage: string;

try {
  commitMessage = fs.readFileSync(commitMessageFile, 'utf8').trim();
} catch (error: any) {
  console.error('Error reading the commit message file:', error.message);
  process.exit(1);
}

// 'feat(commit-template):' gibi başlık ve kapsam kısmını atla
const messageBody = commitMessage.split(':')[1]?.trim() || '';
console.log('Message body:', messageBody); // Debug line

// Mesajı kelimelere ayır
const tokens = messageBody.split(/\s+/);
console.log('Tokens:', tokens); // Debug line

// Fiil olup olmadığını kontrol et
const doc = nlp(messageBody);
const verbs = doc.verbs().out('array');
console.log('Verbs:', verbs); // Debug line

const hasVerb = tokens.some((token) => {
  return verbs.includes(token);
});

if (!hasVerb) {
  console.log('Commit message must contain at least one verb');
  process.exit(1);
}

// Geçmiş zaman kontrolü
const isPastTense = verbs.some((verb: string) => {
  const pastTense = nlp(verb).verbs().toPastTense().out('text');
  return pastTense === verb;
});

if (isPastTense) {
  console.log('Commit message is in past tense. Verb:', verbs.join(', '));
  process.exit(1);
} else {
  console.log('Success: ' + commitMessage);
}
