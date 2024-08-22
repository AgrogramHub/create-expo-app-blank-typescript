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

const doc = nlp(commitMessage.split(':')[1].trim());
const verbs = doc.verbs().terms().out('array');

if (verbs.length === 0) {
  console.log('Commit message must contain at least one verb');
  process.exit(1);
}

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
