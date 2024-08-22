import nlp from 'compromise';

const commitMessage = process.argv[2];

const doc = nlp(commitMessage);
const verbs = doc.verbs().out('array');
console.log(verbs);

let isPastTense = false;

verbs.forEach((verb: { terms: () => any[] }) => {
  console.log(verb.terms());

  if (verb.terms().length > 0) {
    const verbTerm = verb.terms()[0];
    if (verbTerm.tags.includes('PastTense')) {
      isPastTense = true;
    }
  }
});

if (isPastTense) {
  console.log('Commit message is in past tense');
  process.exit(1);
}
