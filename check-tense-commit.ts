import nlp from 'compromise';
import * as fs from 'fs';

const commitMsgFile = process.argv[2];

// Commit mesajını oku
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();

// NLP ile mesajı analiz et
const doc = nlp(commitMsg);
const verbs = doc.verbs().out('array');

// Eğer herhangi bir fiil geçmiş zamanda ise hata döndür
let isPastTense = false;
verbs.forEach((verb: { conjugation: string }) => {
  if (verb.conjugation === 'PastTense') {
    isPastTense = true;
  }
});

if (isPastTense) {
  console.error('Commit messages should be in present tense.');
  process.exit(1);
}
