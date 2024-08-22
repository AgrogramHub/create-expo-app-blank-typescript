const fs = require('fs');
const nlp = require('compromise');
const commitMsgFile = process.argv[2];

// Commit mesajını oku
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();
console.log(commitMsg);

// NLP ile mesajı analiz et
const doc = nlp(commitMsg);
const verbs = doc.verbs().data();
console.log(verbs);

// Eğer herhangi bir fiil geçmiş zamanda ise hata döndür
let isPastTense = false;
for (const verb of verbs) {
  if (verb.PastTense) {
    isPastTense = true;
    break;
  }
}

if (isPastTense) {
  console.error('Commit messages should be in present tense.');
  process.exit(1);
}
