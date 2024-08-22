import nlp from 'compromise';
import fs from 'fs';

const commitMessageFile = process.argv[2];
if (!commitMessageFile) {
  console.error('Please provide a commit message file path.');
  process.exit(1);
}

let commitMessage: string; // Read the commit message from the file

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

const presentTenseMessage = nlp(commitMessage).verbs().toPresentTense().out('text');

const isPastTense = nlp(presentTenseMessage)
  .verbs()
  .some((verb) => {
    const pastTense = nlp(verb.toString()).verbs().toPastTense().out('text');
    return pastTense === verb;
  });

if (isPastTense) {
  console.log('Commit message is still in past tense');
  process.exit(1);
} else {
  // Save the corrected message back to the file
  fs.writeFileSync(commitMessageFile, presentTenseMessage);
  console.log('Success: ' + presentTenseMessage);
}
