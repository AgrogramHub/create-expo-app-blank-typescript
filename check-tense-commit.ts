import nlp from 'compromise';
import fs from 'fs';

const commitMessageFile = process.argv[2];
const commitMessage = fs.readFileSync(commitMessageFile, 'utf8').trim();
console.log(commitMessage);

const doc = nlp(commitMessage);
const verbs = doc.verbs().out('array');
console.log('Detected Verbs: ', verbs);

if (verbs.length === 0) {
  console.log('Commit message must contain at least one verb');
  process.exit(1);
}

const isPastTense = verbs.some((verb: string) => {
  const pastTense = nlp(verb).verbs().toPastTense().out('text');
  return pastTense === verb;
});

if (isPastTense) {
  console.log('Commit message is in past tense');
  process.exit(1);
} else {
  console.log('Commit message is not in past tense');
}
