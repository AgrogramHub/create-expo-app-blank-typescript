import nlp from 'compromise';

const commitMessage = process.argv[2];

const doc = nlp(commitMessage);
const verbs = doc.verbs().out('array');
console.log(verbs);

let isPastTense = false;

verbs.forEach((verb: string) => {
  const tense = nlp(verb).verbs().conjugate()[0];
  console.log(tense);

  if (
    (tense as { PastTense?: string }).PastTense &&
    (tense as { PastTense?: string }).PastTense === verb
  ) {
    isPastTense = true;
  }
});

if (isPastTense) {
  console.log('Commit message is in past tense');
  process.exit(1);
}
