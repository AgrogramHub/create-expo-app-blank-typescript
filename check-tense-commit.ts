import nlp from 'compromise';
import fs from 'fs';

const commitMessageFile = process.argv[2];
const commitMessage = fs.readFileSync(commitMessageFile, 'utf8').trim();
console.log(commitMessage);

const doc = nlp(commitMessage);
const verbs = doc.verbs().out('array');
console.log(verbs);

let isPastTense = false;

verbs.forEach((verb: string) => {
  const pastTense = nlp(verb).verbs().toPastTense().out('text');
  console.log('Past Tense: ', pastTense);

  if (pastTense !== verb) {
    isPastTense = true;
  }
});

if (isPastTense) {
  console.log('Commit message is in past tense');
  process.exit(1);
}
