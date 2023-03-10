require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const axios = require("axios").default;
const crypto = require('crypto');
const Serialize = require('php-serialize');
const bodyParser = require("body-parser");
const cron = require('node-cron');
const push = require('web-push');
const rateLimit = require('express-rate-limit');
const requestIp = require('request-ip');
const fetch = require('node-fetch');
var timeout = require('connect-timeout');

//words and definition to serve to client for game. Index 1-6. Each index representing a language pack. no. 6 is the "King" pack. 
// they contain the words of the previous language pack in them.
let wordsAndDefinitions1 = {
  words: [],
  definitions: []
};

let wordsAndDefinitions2 = {
  words: [],
  definitions: []
};

let wordsAndDefinitions3 = {
  words: [],
  definitions: []
};

let wordsAndDefinitions4 = {
  words: [],
  definitions: []
};

let wordsAndDefinitions5 = {
  words: [],
  definitions: []
};

let wordsAndDefinitions6 = {
  words: [],
  definitions: []
};

let wordsAndDefinitions7 = {
  words: [],
  definitions: []
};

let wordsAndDefinitions8 = {
  words: [],
  definitions: []
};

// UPDATE this when more words get added
// used datamuse API to get the english and spanish dictionary definitions. Japanese ones were custom made by fiverr.com seller.
const wordData = {
  '1': {
    word: 'Conundrum',
    dicDef: 'a difficult problem',
    hintDef: 'That was a <span style="text-decoration: line-through; font-weight: bold;">puzzle,</span> even to experts.',
    language: 'en'
  },
  '2': {
    word: 'Sardonic',
    dicDef: 'disdainfully or ironically humorous; scornful and mocking',
    hintDef: 'He put on a <span style="text-decoration: line-through; font-weight: bold;">scornful</span> smile.',
    language: 'en'
  },
  '3': {
    word: 'Quintessential',
    dicDef: 'representing the perfect example of a class or quality',
    hintDef: 'He is the <span style="text-decoration: line-through; font-weight: bold;">typical</span> tough teacher ',
    language: 'en'
  },
  '4': {
    word: 'Clandestine',
    dicDef: 'conducted with or marked by hidden aims or methods',
    hintDef: 'I will never attend <span style="text-decoration: line-through; font-weight: bold;">secret</span> meetings.',
    language: 'en'
  },
  '5': {
    word: 'Revel',
    dicDef: 'unrestrained merrymaking',
    hintDef: 'You can <span style="text-decoration: line-through; font-weight: bold;">enjoy</span> your stay here.',
    language: 'en'
  },
  '6': {
    word: 'Insidious',
    dicDef: 'intended to entrap',
    hintDef: 'Snakes are always <span style="text-decoration: line-through; font-weight: bold;">subtle</span> creatures. ',
    language: 'en'
  },
  '7': {
    word: 'Cacophony',
    dicDef: 'loud confusing disagreeable sounds',
    hintDef: 'There was a <span style="text-decoration: line-through; font-weight: bold;">discord</span> of deafening sounds in the music theatre.',
    language: 'en'
  },
  '8': {
    word: 'Lurid',
    dicDef: 'glaringly vivid and graphic; marked by sensationalism',
    hintDef: 'The incident was <span style="text-decoration: line-through; font-weight: bold;">highly shocking.</span>',
    language: 'en'
  },
  '9': {
    word: 'Idiosyncratic',
    dicDef: 'peculiar to the individual',
    hintDef: 'He follows a very <span style="text-decoration: line-through; font-weight: bold;">specific</span> schedule.',
    language: 'en'
  },
  '10': {
    word: 'Divergent',
    dicDef: 'diverging from another or from a standard',
    hintDef: 'Our opinions on abortion <span style="text-decoration: line-through; font-weight: bold;">differed.</span> ',
    language: 'en'
  },
  '11': {
    word: 'Bourgeois',
    dicDef: 'belonging to the middle class',
    hintDef: 'Everyone who lives in this estate is <span style="text-decoration: line-through; font-weight: bold;">middle class</span>',
    language: 'en'
  },
  '12': {
    word: 'Avant-grade',
    dicDef: 'any creative group active in the innovation and application of new concepts and techniques in a given field (especially in the arts)',
    hintDef: 'You are so <span style="text-decoration: line-through; font-weight: bold;">daring.</span>',
    language: 'en'
  },
  '13': {
    word: 'Magnanimous',
    dicDef: 'noble and generous in spirit',
    hintDef: 'Many rich people are <span style="text-decoration: line-through; font-weight: bold;">generous.</span>',
    language: 'en'
  },
  '14': {
    word: 'Dilettante',
    dicDef: 'an amateur who engages in an activity without serious intentions and who pretends to have knowledge',
    hintDef: 'She is an <span style="text-decoration: line-through; font-weight: bold;">amateur</span> artist.',
    language: 'en'
  },
  '15': {
    word: 'Capricious',
    dicDef: 'changeable',
    hintDef: 'The refusal was <span style="text-decoration: line-through; font-weight: bold;">impulsive</span>',
    language: 'en'
  },
  '16': {
    word: 'Bravado',
    dicDef: 'a swaggering show of courage',
    hintDef: 'The teacher tells stories with a <span style="text-decoration: line-through; font-weight: bold;">sense of boldness</span>',
    language: 'en'
  },
  '17': {
    word: 'Acquiesce',
    dicDef: 'to agree or express agreement',
    hintDef: 'She will <span style="text-decoration: line-through; font-weight: bold;">passively accept</span> their demands.',
    language: 'en'
  },
  '18': {
    word: 'Harbinger',
    dicDef: 'an indication of the approach of something or someone',
    hintDef: 'The sirens were a <span style="text-decoration: line-through; font-weight: bold;">precursor</span> of their arrival.',
    language: 'en'
  },
  '19': {
    word: 'Accolade',
    dicDef: 'a tangible symbol signifying approval or distinction',
    hintDef: 'His approval was the highest <span style="text-decoration: line-through; font-weight: bold;">recognition</span> he could receive.',
    language: 'en'
  },
  '20': {
    word: 'Baroque',
    dicDef: 'having elaborate symmetrical ornamentation',
    hintDef: 'The drawing is <span style="text-decoration: line-through; font-weight: bold;">fancy.</span>',
    language: 'en'
  },
  '21': {
    word: 'Cognition',
    dicDef: 'the psychological result of perception and learning and reasoning',
    hintDef: 'His <span style="text-decoration: line-through; font-weight: bold;">comprehension ability</span> is quite low',
    language: 'en'
  },
  '22': {
    word: 'Deference',
    dicDef: 'a courteous expression (by word or deed) of esteem or regard',
    hintDef: 'The fallen soldier was given the utmost <span style="text-decoration: line-through; font-weight: bold;">respect.</span>',
    language: 'en'
  },
  '23': {
    word: 'Circumspect',
    dicDef: 'heedful of potential consequences',
    hintDef: 'That investor was <span style="text-decoration: line-through; font-weight: bold;">cautious</span> in his speech',
    language: 'en'
  },
  '24': {
    word: 'Gregarious',
    dicDef: 'seeking and enjoying the company of others',
    hintDef: 'He???s a <span style="text-decoration: line-through; font-weight: bold;">company-loving</span> person',
    language: 'en'
  },
  '25': {
    word: 'Facetious',
    dicDef: 'cleverly amusing in tone',
    hintDef: 'The speaker kept making <span style="text-decoration: line-through; font-weight: bold;">inappropriately teasing</span> comments',
    language: 'en'
  },
  '26': {
    word: 'Motif',
    dicDef: 'a design that consists of recurring shapes or colors',
    hintDef: 'His jumper has a unique <span style="text-decoration: line-through; font-weight: bold;">decoration.</span>',
    language: 'en'
  },
  '27': {
    word: 'Connotation',
    dicDef: 'an idea that is implied or suggested',
    hintDef: 'His words have a negative <span style="text-decoration: line-through; font-weight: bold;">meaning.</span>',
    language: 'en'
  },
  '28': {
    word: 'Contrived',
    dicDef: 'showing effects of planning or manipulation',
    hintDef: 'The politician <span style="text-decoration: line-through; font-weight: bold;">stage-managed</span> the attack. ',
    language: 'en'
  },
  '29': {
    word: 'Machiavellian',
    dicDef: 'of or relating to machiavelli or the principles of conduct he recommended',
    hintDef: 'All the robbers use <span style="text-decoration: line-through; font-weight: bold;">scheming</span> tactics.',
    language: 'en'
  },
  '30': {
    word: 'Ambiguity',
    dicDef: 'unclearness by virtue of having more than one meaning',
    hintDef: 'His directive had a <span style="text-decoration: line-through; font-weight: bold;">vague understanding.</span>',
    language: 'en'
  },
  '31': {
    word: 'Diction',
    dicDef: 'the manner in which something is expressed in words',
    hintDef: `Ann's <span style="text-decoration: line-through; font-weight: bold;">wording</span> in the preface is superb.`,
    language: 'en'
  },
  '32': {
    word: 'Camaraderie',
    dicDef: 'the quality of affording easy familiarity and sociability',
    hintDef: 'There is great <span style="text-decoration: line-through; font-weight: bold;">closeness</span> among the teammates',
    language: 'en'
  },
  '33': {
    word: 'Bona fide',
    dicDef: 'undertaken in good faith',
    hintDef: 'He is a <span style="text-decoration: line-through; font-weight: bold;">genuine</span> expert in plant health',
    language: 'en'
  },
  '34': {
    word: 'Anachronism',
    dicDef: 'an artifact that belongs to another time',
    hintDef: '<span style="text-decoration: line-through; font-weight: bold;">Mistiming</span> is rampant in the movie. ',
    language: 'en'
  },
  '35': {
    word: 'Cumulative ',
    dicDef: 'increasing by successive addition',
    hintDef: 'The <span style="text-decoration: line-through; font-weight: bold;">aggregate</span> amount was enough. ',
    language: 'en'
  },
  '36': {
    word: 'Brusque',
    dicDef: 'marked by rude or peremptory shortness',
    hintDef: 'The teacher was <span style="text-decoration: line-through; font-weight: bold;">unfriendly and impatient</span>',
    language: 'en'
  },
  '37': {
    word: 'Acrimony',
    dicDef: 'a sharp and bitter manner',
    hintDef: 'The decision was reached without <span style="text-decoration: line-through; font-weight: bold;">ill feeling.</span>',
    language: 'en'
  },
  '38': {
    word: 'Antithesis',
    dicDef: 'the juxtaposition of contrasting words or ideas to give a feeling of balance',
    hintDef: 'The judge listened to <span style="text-decoration: line-through; font-weight: bold;">the other side of the coin.</span>',
    language: 'en'
  },
  '39': {
    word: 'Carte blanche',
    dicDef: 'complete freedom or authority to act',
    hintDef: 'Our director has the <span style="text-decoration: line-through; font-weight: bold;">authority</span> to sack.',
    language: 'en'
  },
  '40': {
    word: 'Dichotomy',
    dicDef: 'being twofold; a classification into two opposed parts or subclasses',
    hintDef: 'There is often a <span style="text-decoration: line-through; font-weight: bold;">glaring contradiction</span> between what politicians say and what they do',
    language: 'en'
  },
  '41': {
    word: 'Caustic',
    dicDef: 'of a substance, especially a strong acid; capable of destroying or eating away by chemical action',
    hintDef: 'His comments were <span style="text-decoration: line-through; font-weight: bold;">sarcastic in a bitter way.</span>',
    language: 'en'
  },
  '42': {
    word: 'Antonym',
    dicDef: 'two words that express opposing concepts',
    hintDef: 'Bad is the <span style="text-decoration: line-through; font-weight: bold;">opposite word</span> of good. ',
    language: 'en'
  },
  '43': {
    word: 'Disheveled',
    dicDef: 'in disarray; extremely disorderly',
    hintDef: `The boy's room is <span style="text-decoration: line-through; font-weight: bold;">untidy.</span>`,
    language: 'en'
  },
  '44': {
    word: 'Malapropism',
    dicDef: 'the unintentional misuse of a word by confusion with one that sounds similar',
    hintDef: 'He mistook the word for another which was a <span style="text-decoration: line-through; font-weight: bold;">misspelling</span> in his poetry.',
    language: 'en'
  },
  '45': {
    word: 'Angst',
    dicDef: 'an acute but unspecific feeling of anxiety; usually reserved for philosophical anxiety about the world or about personal freedom',
    hintDef: 'His low grades in school are the cause of his <span style="text-decoration: line-through; font-weight: bold;">persistent worry.</span>',
    language: 'en'
  },
  '46': {
    word: 'Bonhomie',
    dicDef: 'a disposition to be friendly and approachable (easy to talk to)',
    hintDef: 'Her <span style="text-decoration: line-through; font-weight: bold;">cheerfulness</span> is charming.',
    language: 'en'
  },
  '47': {
    word: 'Colloquial',
    dicDef: 'characteristic of informal spoken language or conversation',
    hintDef: 'He is used to <span style="text-decoration: line-through; font-weight: bold;">informal</span> words.',
    language: 'en'
  },
  '48': {
    word: 'Charisma',
    dicDef: 'a personal attractiveness that enables you to influence others',
    hintDef: 'The candidate was lacking in <span style="text-decoration: line-through; font-weight: bold;">force of personality.</span>',
    language: 'en'
  },
  '49': {
    word: 'Boondoggle',
    dicDef: 'work of little or no value done merely to look busy',
    hintDef: 'That movie was a <span style="text-decoration: line-through; font-weight: bold;">time pass.</span>',
    language: 'en'
  },
  '50': {
    word: 'Ogle',
    dicDef: 'look at with amorous intentions',
    hintDef: 'His <span style="text-decoration: line-through; font-weight: bold;">lustful stare</span> at her is worrying.',
    language: 'en'
  },
  '51': {
    word: 'Brainstorming',
    dicDef: 'a group problem-solving technique in which members sit around a let fly with ideas and possible solutions to the problem',
    hintDef: '<span style="text-decoration: line-through; font-weight: bold;">Divergent thinking</span> can yield unique ideas.',
    language: 'en'
  },
  '52': {
    word: 'Brogue',
    dicDef: 'a thick and heavy shoe',
    hintDef: 'The company provided <span style="text-decoration: line-through; font-weight: bold;">work shoes.</span>',
    language: 'en'
  },
  '53': {
    word: 'Fiasco',
    dicDef: 'a sudden and violent collapse',
    hintDef: 'His gardening project turned into a <span style="text-decoration: line-through; font-weight: bold;">complete failure.</span>',
    language: 'en'
  },
  '54': {
    word: 'Finagle',
    dicDef: 'achieve something by means of trickery or devious methods',
    hintDef: 'Many people contact her to <span style="text-decoration: line-through; font-weight: bold;">obtain</span> their certificates dishonestly.',
    language: 'en'
  },
  '55': {
    word: 'Nemesis',
    dicDef: '(greek mythology) the goddess of divine retribution and vengeance',
    hintDef: 'Paul is her <span style="text-decoration: line-through; font-weight: bold;">great rival.</span>',
    language: 'en'
  },
  '56': {
    word: 'Formative',
    dicDef: 'beginning to develop',
    hintDef: 'The company is at its <span style="text-decoration: line-through; font-weight: bold;">growing</span> stage.',
    language: 'en'
  },
  '57': {
    word: 'Maudlin',
    dicDef: 'effusively or insincerely emotional',
    hintDef: 'The story was <span style="text-decoration: line-through; font-weight: bold;">very emotional.</span>',
    language: 'en'
  },
  '58': {
    word: 'Assonance',
    dicDef: 'the repetition of similar vowels in the stressed syllables of successive words',
    hintDef: 'Most poets have <span style="text-decoration: line-through; font-weight: bold;">duplication of similar vowel sounds</span> in phrases.',
    language: 'en'
  },
  '59': {
    word: 'Ubiquitous',
    dicDef: 'being present everywhere at once',
    hintDef: 'She???s the most <span style="text-decoration: line-through; font-weight: bold;">ever-present</span> media personality around here.',
    language: 'en'
  },
  '60': {
    word: 'Mantra',
    dicDef: "(sanskrit) literally a `sacred utterance' in vedism; one of a collection of orally transmitted poetic hymns",
    hintDef: 'Every institution has a <span style="text-decoration: line-through; font-weight: bold;">set of repeated words of meditation.</span>',
    language: 'en'
  },
  '61': {
    word: 'Obtuse',
    dicDef: 'indirect or circuitous',
    hintDef: 'Their explanation was <span style="text-decoration: line-through; font-weight: bold;">difficult to understand.</span>',
    language: 'en'
  },
  '62': {
    word: 'Innate',
    dicDef: 'not established by conditioning or learning',
    hintDef: 'He has <span style="text-decoration: line-through; font-weight: bold;">inborn</span> leadership skills.',
    language: 'en'
  },
  '63': {
    word: 'Litany',
    dicDef: 'a prayer consisting of a series of invocations by the priest with responses from the congregation',
    hintDef: 'The priest leads in a <span style="text-decoration: line-through; font-weight: bold;">prayer that is said repeatedly.</span>',
    language: 'en'
  },
  '64': {
    word: 'Anomaly',
    dicDef: '(astronomy) position of a planet as defined by its angular distance from its perihelion (as observed from the sun)',
    hintDef: `She got a <span style="text-decoration: line-through; font-weight: bold;">deviation</span> in the boy's character.`,
    language: 'en'
  },
  '65': {
    word: 'Bilateral',
    dicDef: 'involving both sides equally',
    hintDef: 'The two presidents had an <span style="text-decoration: line-through; font-weight: bold;">interactive</span> discussion.',
    language: 'en'
  },
  '66': {
    word: 'Nirvana',
    dicDef: '(hinduism and buddhism) the beatitude that transcends the cycle of reincarnation; characterized by the extinction of desire and suffering and individual consciousness',
    hintDef: 'The presentation was a total <span style="text-decoration: line-through; font-weight: bold;">enlightenment.</span>',
    language: 'en'
  },
  '67': {
    word: 'Collaborate',
    dicDef: 'work together on a common enterprise of project',
    hintDef: 'We can <span style="text-decoration: line-through; font-weight: bold;">work jointly</span> on that project.',
    language: 'en'
  },
  '68': {
    word: 'Benchmarking',
    dicDef: 'A performance measurement according to a benchmark.',
    hintDef: 'We visited their business to <span style="text-decoration: line-through; font-weight: bold;">make a comparison.</span>',
    language: 'en'
  },
  '69': {
    word: 'Teetotaler',
    dicDef: 'a total abstainer',
    hintDef: 'He is an <span style="text-decoration: line-through; font-weight: bold;">abstainer of alcoholic beverages.</span>',
    language: 'en'
  },
  '70': {
    word: 'Criterion ',
    dicDef: 'the ideal in terms of which something can be judged',
    hintDef: 'What was the <span style="text-decoration: line-through; font-weight: bold;">basis</span> of her promotion?',
    language: 'en'
  },
  '71': {
    word: 'Faux pas',
    dicDef: 'a socially awkward or tactless act',
    hintDef: 'Beating her was a <span style="text-decoration: line-through; font-weight: bold;">socially awkward act</span> ever seen. ',
    language: 'en'
  },
  '72': {
    word: 'Cloying',
    dicDef: 'overly sweet',
    hintDef: 'The porridge was <span style="text-decoration: line-through; font-weight: bold;">overly sweet.</span>',
    language: 'en'
  },
  '73': {
    word: 'Zealous',
    dicDef: 'marked by active interest and enthusiasm',
    hintDef: 'He presented his case in a <span style="text-decoration: line-through; font-weight: bold;">very passionate</span> manner',
    language: 'en'
  },
  '74': {
    word: 'Existential',
    dicDef: 'relating to or dealing with existence (especially with human existence)',
    hintDef: 'Their thoughts were <span style="text-decoration: line-through; font-weight: bold;">empirical.</span>',
    language: 'en'
  },
  '75': {
    word: 'Andragogy',
    dicDef: 'The methods or techniques used to teach adults; adult education.',
    hintDef: 'He completed his <span style="text-decoration: line-through; font-weight: bold;">adult education</span> recently.',
    language: 'en'
  },
  '76': {
    word: 'Infamy',
    dicDef: 'evil fame or public reputation',
    hintDef: 'defamation is a <span style="text-decoration: line-through; font-weight: bold;">shame.</span>',
    language: 'en'
  },
  '77': {
    word: 'Monologue',
    dicDef: 'a (usually long) dramatic speech by a single actor',
    hintDef: 'The man had a <span style="text-decoration: line-through; font-weight: bold;">talk to himself</span> on the road.',
    language: 'en'
  },
  '78': {
    word: 'Picayune',
    dicDef: '(informal terms) small and of little importance',
    hintDef: 'That is a <span style="text-decoration: line-through; font-weight: bold;">petty</span> issue. ',
    language: 'en'
  },
  '79': {
    word: 'Verbose',
    dicDef: 'using or containing too many words',
    hintDef: 'His essay was <span style="text-decoration: line-through; font-weight: bold;">quite wordy.</span>',
    language: 'en'
  },
  '80': {
    word: 'Juxtaposition',
    dicDef: 'the act of positioning close together (or side by side)',
    hintDef: 'The author uses <span style="text-decoration: line-through; font-weight: bold;">comparison and contrast</span> severally in his work. ',
    language: 'en'
  },
  '81': {
    word: 'Junket',
    dicDef: 'A type of cream cheese, originally made in a rush basket; later, a food made of sweetened curds or rennet.',
    hintDef: 'The <span style="text-decoration: line-through; font-weight: bold;">milk dessert</span> was refreshing.',
    language: 'en'
  },
  '82': {
    word: 'Myriad',
    dicDef: 'a large indefinite number',
    hintDef: '<span style="text-decoration: line-through; font-weight: bold;">Numberless</span> cars are parked outside the house.',
    language: 'en'
  },
  '83': {
    word: 'Hyperbole',
    dicDef: 'extravagant exaggeration',
    hintDef: 'Close examination indicated the budget was an <span style="text-decoration: line-through; font-weight: bold;">exaggeration.</span>',
    language: 'en'
  },
  '84': {
    word: 'Oblivion',
    dicDef: 'the state of being disregarded or forgotten',
    hintDef: 'The construction is in <span style="text-decoration: line-through; font-weight: bold;">limbo.</span>',
    language: 'en'
  },
  '85': {
    word: 'Paradox',
    dicDef: '(logic) a self-contradiction',
    hintDef: 'In a strange <span style="text-decoration: line-through; font-weight: bold;">contradiction,</span> the medicine made him sick before it made him better.',
    language: 'en'
  },
  '86': {
    word: 'Exponential',
    dicDef: 'of or involving exponents',
    hintDef: 'He showed how the virus had an <span style="text-decoration: line-through; font-weight: bold;">extremely rapid</span> growth.',
    language: 'en'
  },
  '87': {
    word: 'Posthumously',
    dicDef: 'after death',
    hintDef: 'He received the award <span style="text-decoration: line-through; font-weight: bold;">even after his death.</span> ',
    language: 'en'
  },
  '88': {
    word: 'Didactic',
    dicDef: 'instructive (especially excessively)',
    hintDef: 'The novel was <span style="text-decoration: line-through; font-weight: bold;">intended to teach</span> about self-reliance. ',
    language: 'en'
  },
  '89': {
    word: 'Peevish',
    dicDef: 'easily irritated or annoyed',
    hintDef: 'He is a <span style="text-decoration: line-through; font-weight: bold;">wrong-tempered</span> person.',
    language: 'en'
  },
  '90': {
    word: 'Phonemes',
    dicDef: '(linguistics) one of a small set of speech sounds that are distinguished by the speakers of a particular language',
    hintDef: 'P, U & T are <span style="text-decoration: line-through; font-weight: bold;">the smallest sound units</span> of the word, put',
    language: 'en'
  },
  '91': {
    word: 'Meticulous',
    dicDef: 'marked by precise accordance with details',
    hintDef: 'The meeting was <span style="text-decoration: line-through; font-weight: bold;">detailed.</span>',
    language: 'en'
  },
  '92': {
    word: 'Dissertation',
    dicDef: 'a treatise advancing a new point of view resulting from research; usually a requirement for an advanced academic degree',
    hintDef: 'His doctoral <span style="text-decoration: line-through; font-weight: bold;">thesis</span> was accepted. ',
    language: 'en'
  },
  '93': {
    word: 'Malaise',
    dicDef: 'physical discomfort (as mild sickness or depression)',
    hintDef: 'A sick person tends to have a <span style="text-decoration: line-through; font-weight: bold;">feeling of unhappiness.</span>',
    language: 'en'
  },
  '94': {
    word: 'Fait accompli',
    dicDef: 'an irreversible accomplishment',
    hintDef: 'People applauded her because of her <span style="text-decoration: line-through; font-weight: bold;">accomplishment.</span>',
    language: 'en'
  },
  '95': {
    word: 'Misnomer',
    dicDef: 'an incorrect or unsuitable name',
    hintDef: 'He gave her an <span style="text-decoration: line-through; font-weight: bold;">incorrect name.</span>',
    language: 'en'
  },
  '96': {
    word: 'Supercilious',
    dicDef: 'expressive of contempt',
    hintDef: 'He has an <span style="text-decoration: line-through; font-weight: bold;">arrogant</span> attitude',
    language: 'en'
  },
  '97': {
    word: 'Ostentatious',
    dicDef: 'intended to attract notice and impress others',
    hintDef: 'That was a <span style="text-decoration: line-through; font-weight: bold;">very showy</span> display',
    language: 'en'
  },
  '98': {
    word: 'Mnemonic',
    dicDef: 'of or relating to or involved the practice of aiding the memory',
    hintDef: 'Every student had the <span style="text-decoration: line-through; font-weight: bold;">formula to remember</span> all the rainbow colors. ',
    language: 'en'
  },
  '99': {
    word: 'Jargon',
    dicDef: 'specialized technical terminology characteristic of a particular subject',
    hintDef: 'They used <span style="text-decoration: line-through; font-weight: bold;">unfamiliar terminology</span> during the presentation.',
    language: 'en'
  },
  '100': {
    word: 'Waft',
    dicDef: 'blow gently',
    hintDef: 'The scent of the roses <span style="text-decoration: line-through; font-weight: bold;">passed gently</span> through the window.',
    language: 'en'
  },
  '101': {
    word: 'Oxymoron',
    dicDef: "conjoining contradictory terms (as in `deafening silence')",
    hintDef: '"Awfully good" is a <span style="text-decoration: line-through; font-weight: bold;">combination of words that contradict each other.</span>',
    language: 'en'
  },
  '102': {
    word: 'Esoteric',
    dicDef: 'confined to and understandable by only an enlightened inner circle',
    hintDef: 'Her move was <span style="text-decoration: line-through; font-weight: bold;">obscure.</span>',
    language: 'en'
  },
  '103': {
    word: 'Egregious',
    dicDef: 'conspicuously and outrageously bad or reprehensible',
    hintDef: 'The bandits staged an <span style="text-decoration: line-through; font-weight: bold;">outstandingly bad</span> robbery. ',
    language: 'en'
  },
  '104': {
    word: 'Red Herring',
    dicDef: 'any diversion intended to distract attention from the main issue',
    hintDef: 'His argument is a <span style="text-decoration: line-through; font-weight: bold;">deception.</span>',
    language: 'en'
  },
  '105': {
    word: 'Ersatz',
    dicDef: 'artificial and inferior',
    hintDef: 'His drug was a <span style="text-decoration: line-through; font-weight: bold;">counterfeit.</span>',
    language: 'en'
  },
  '106': {
    word: 'Developmental',
    dicDef: 'of or relating to or constituting development',
    hintDef: 'Third-world economies are <span style="text-decoration: line-through; font-weight: bold;">ever-growing.</span>',
    language: 'en'
  },
  '107': {
    word: 'Malinger',
    dicDef: 'avoid responsibilities and duties, e.g., by pretending to be ill',
    hintDef: 'They only <span style="text-decoration: line-through; font-weight: bold;">avoid responsibilities and duties</span> in the office.',
    language: 'en'
  },
  '108': {
    word: 'Emergent',
    dicDef: 'coming into existence',
    hintDef: 'The blockchain is still a <span style="text-decoration: line-through; font-weight: bold;">developing</span> technology',
    language: 'en'
  },
  '109': {
    word: 'Hubris',
    dicDef: 'overbearing pride or presumption',
    hintDef: 'His <span style="text-decoration: line-through; font-weight: bold;">excessive pride</span> cost him.',
    language: 'en'
  },
  '110': {
    word: 'Epiphany',
    dicDef: 'a divine manifestation',
    hintDef: 'I had a <span style="text-decoration: line-through; font-weight: bold;">revelation</span> that women preferred them.',
    language: 'en'
  },
  '111': {
    word: 'Ostracize',
    dicDef: 'avoid speaking to or dealing with',
    hintDef: 'They decided to <span style="text-decoration: line-through; font-weight: bold;">exclude</span> him because of his radical political beliefs.',
    language: 'en'
  },
  '112': {
    word: 'Epitaph',
    dicDef: 'an inscription on a tombstone or monument in memory of the person buried there',
    hintDef: 'He recommended using this as his <span style="text-decoration: line-through; font-weight: bold;">memorial.</span>',
    language: 'en'
  },
  '113': {
    word: 'Heresy',
    dicDef: 'a belief that rejects the orthodox tenets of a religion',
    hintDef: 'He was preaching dangerous <span style="text-decoration: line-through; font-weight: bold;">unfounded beliefs.</span>',
    language: 'en'
  },
  '114': {
    word: 'Elan',
    dicDef: 'enthusiastic and assured vigor and liveliness',
    hintDef: 'Great <span style="text-decoration: line-through; font-weight: bold;">liveliness</span> marked the performance.',
    language: 'en'
  },
  '115': {
    word: 'Minimalist',
    dicDef: 'advocating minimal reforms (as in government or politics)',
    hintDef: 'Peter is a <span style="text-decoration: line-through; font-weight: bold;">conservative.</span>',
    language: 'en'
  },
  '116': {
    word: 'Unrequited',
    dicDef: 'not returned in kind',
    hintDef: 'Her call went <span style="text-decoration: line-through; font-weight: bold;">unanswered.</span>',
    language: 'en'
  },
  '117': {
    word: 'Syntax',
    dicDef: 'the grammatical arrangement of words in sentences',
    hintDef: 'His speech has a good <span style="text-decoration: line-through; font-weight: bold;">sentence structure.</span>',
    language: 'en'
  },
  '118': {
    word: 'Ephemeral',
    dicDef: 'enduring a very short time',
    hintDef: 'Their visit was <span style="text-decoration: line-through; font-weight: bold;">short-lived.</span>',
    language: 'en'
  },
  '119': {
    word: 'Infinitesimal',
    dicDef: 'infinitely or immeasurably small',
    hintDef: 'Her contribution was <span style="text-decoration: line-through; font-weight: bold;">extremely small.</span>',
    language: 'en'
  },
  '120': {
    word: 'Scintillating',
    dicDef: 'brilliantly clever',
    hintDef: 'The <span style="text-decoration: line-through; font-weight: bold;">glittery</span> stars',
    language: 'en'
  },
  '121': {
    word: 'Equivocate',
    dicDef: 'be deliberately ambiguous or unclear in order to mislead or withhold information',
    hintDef: 'Sean continued to be <span style="text-decoration: line-through; font-weight: bold;">evasive</span> when the police persisted in their questioning.',
    language: 'en'
  },
  '122': {
    word: 'Equanimity',
    dicDef: 'steadiness of mind under stress',
    hintDef: 'The driver exhibited <span style="text-decoration: line-through; font-weight: bold;">calmness</span> amid the accident.',
    language: 'en'
  },
  '123': {
    word: 'Euphemism',
    dicDef: 'an inoffensive expression that is substituted for one that is considered offensive',
    hintDef: 'He used a <span style="text-decoration: line-through; font-weight: bold;">polite term</span> to describe his ignorance.',
    language: 'en'
  },
  '124': {
    word: 'Nominal',
    dicDef: "insignificantly small; a matter of form only (`tokenish' is informal)",
    hintDef: 'They offered the service at a <span style="text-decoration: line-through; font-weight: bold;">minimal</span> amount.',
    language: 'en'
  },
  '125': {
    word: 'Enigma',
    dicDef: 'something that baffles understanding and cannot be explained',
    hintDef: 'John is one of the <span style="text-decoration: line-through; font-weight: bold;">greatest mysteries</span> of our time.',
    language: 'en'
  },
  '126': {
    word: 'Ennui',
    dicDef: 'the feeling of being bored by something tedious',
    hintDef: 'The countryside is full of <span style="text-decoration: line-through; font-weight: bold;">boredom.</span>',
    language: 'en'
  },
  '127': {
    word: 'Erudite',
    dicDef: 'having or showing profound knowledge',
    hintDef: 'The session is <span style="text-decoration: line-through; font-weight: bold;">excellent in knowledge</span> indeed.',
    language: 'en'
  },
  '128': {
    word: 'Pedagogy',
    dicDef: 'the profession of a teacher',
    hintDef: 'A <span style="text-decoration: line-through; font-weight: bold;">combination of theory and practicals</span> enhance skills uptake.',
    language: 'en'
  },
  '129': {
    word: 'Holistic',
    dicDef: 'emphasizing the organic or functional relation between parts and the whole',
    hintDef: 'Computer science imparts <span style="text-decoration: line-through; font-weight: bold;">comprehensive</span> IT skills.',
    language: 'en'
  },
  '130': {
    word: 'Metaphor',
    dicDef: 'a figure of speech in which an expression is used to refer to something that it does not literally denote in order to suggest a similarity',
    hintDef: 'A dove is a <span style="text-decoration: line-through; font-weight: bold;">symbol of</span> peace.',
    language: 'en'
  },
  '131': {
    word: 'Perfunctory',
    dicDef: 'as a formality only',
    hintDef: 'He gave him an <span style="text-decoration: line-through; font-weight: bold;">uninterested</span> handshake.',
    language: 'en'
  },
  '132': {
    word: 'Induction',
    dicDef: 'the act of starting something for the first time; introducing something new',
    hintDef: '<span style="text-decoration: line-through; font-weight: bold;">Initiation</span> to adulthood is marked by the end of puberty.',
    language: 'en'
  },
  '133': {
    word: 'Homonym',
    dicDef: 'two words are homonyms if they are pronounced or spelled the same way but have different meanings',
    hintDef: 'Choir and quire are <span style="text-decoration: line-through; font-weight: bold;">different in meaning but similar in pronunciation.</span>',
    language: 'en'
  },
  '134': {
    word: 'Incongruous',
    dicDef: 'lacking in harmony or compatibility or appropriateness',
    hintDef: 'Her shoes were <span style="text-decoration: line-through; font-weight: bold;">unsuitable</span> for the event.',
    language: 'en'
  },
  '135': {
    word: 'Epitome',
    dicDef: 'a brief abstract (as of an article or book)',
    hintDef: 'Her fashion style is the <span style="text-decoration: line-through; font-weight: bold;">definitive example</span> of elegance',
    language: 'en'
  },
  '136': {
    word: 'Fastidious',
    dicDef: 'giving and careful attention to detail; hard to please; excessively concerned with cleanliness',
    hintDef: 'She was <span style="text-decoration: line-through; font-weight: bold;">too choosy</span> to do anything that might get her dirty.',
    language: 'en'
  },
  '137': {
    word: 'Idyllic',
    dicDef: 'excellent and delightful in all respects',
    hintDef: 'The village is situated in a <span style="text-decoration: line-through; font-weight: bold;">peaceful</span> setting',
    language: 'en'
  },
  '138': {
    word: 'Norms',
    dicDef: 'a standard or model or pattern regarded as typical',
    hintDef: 'The rainfall pattern has <span style="text-decoration: line-through; font-weight: bold;">become predictable.</span>',
    language: 'en'
  },
  '139': {
    word: 'Hedonist',
    dicDef: 'someone motivated by desires for sensual pleasures',
    hintDef: 'She is a <span style="text-decoration: line-through; font-weight: bold;">pleasure seeker.</span>',
    language: 'en'
  },
  '140': {
    word: 'Indelicate',
    dicDef: 'in violation of good taste even verging on the indecent',
    hintDef: 'The audience booed his <span style="text-decoration: line-through; font-weight: bold;">unbecoming</span> act on the dais.',
    language: 'en'
  },
  '141': {
    word: 'Vile',
    dicDef: 'morally reprehensible',
    hintDef: 'She has an <span style="text-decoration: line-through; font-weight: bold;">extremely unpleasant</span> temper.',
    language: 'en'
  },
  '142': {
    word: 'Paraphrase',
    dicDef: 'rewording for the purpose of clarification',
    hintDef: 'Let everybody <span style="text-decoration: line-through; font-weight: bold;">use their words to write</span> the paragraph.',
    language: 'en'
  },
  '143': {
    word: 'Plethora',
    dicDef: 'extreme excess',
    hintDef: 'Monday had <span style="text-decoration: line-through; font-weight: bold;">too many</span> activities.',
    language: 'en'
  },
  '144': {
    word: 'Pedantic',
    dicDef: 'marked by a narrow focus on or display of learning especially its trivial aspects',
    hintDef: 'The other students said he acted annoyingly and <span style="text-decoration: line-through; font-weight: bold;">excessively concerned.</span>',
    language: 'en'
  },
  '145': {
    word: 'Suave',
    dicDef: 'smoothly agreeable and courteous with a degree of sophistication',
    hintDef: 'All the waiters were <span style="text-decoration: line-through; font-weight: bold;">well mannered</span>',
    language: 'en'
  },
  '146': {
    word: 'Sycophant',
    dicDef: 'a person who tries to please someone in order to gain a personal advantage',
    hintDef: 'She actually tried to take advantage over her peers by giving favors, like a <span style="text-decoration: line-through; font-weight: bold;">self-serving person</span>.',
    language: 'en'
  },
  '147': {
    word: 'Non sequitur',
    dicDef: '(logic) a conclusion that does not follow from the premises',
    hintDef: 'The <span style="text-decoration: line-through; font-weight: bold;">nonsensical</span> reply he gave causes chaos.',
    language: 'en'
  },
  '148': {
    word: 'Preposition',
    dicDef: 'a function word that combines with a noun or pronoun or noun phrase to form a prepositional phrase that can have an adverbial or adjectival relation to some other word',
    hintDef: 'She taught us the <span style="text-decoration: line-through; font-weight: bold;">function words.</span>',
    language: 'en'
  },
  '149': {
    word: 'Vernacular',
    dicDef: 'the everyday speech of the people (as distinguished from literary language)',
    hintDef: 'Your <span style="text-decoration: line-through; font-weight: bold;">dialect</span> is so attractive. ',
    language: 'en'
  },
  '150': {
    word: 'Superfluous',
    dicDef: 'serving no useful purpose; having no excuse for being',
    hintDef: 'Her help was <span style="text-decoration: line-through; font-weight: bold;">unneeded</span> that day.',
    language: 'en'
  },
  '151': {
    word: 'Vocational',
    dicDef: 'of or relation to a vocation or occupation; especially providing or undergoing training in special skills',
    hintDef: `The <span style="text-decoration: line-through; font-weight: bold;">school's</span> building collapsed.`,
    language: 'en'
  },
  '152': {
    word: 'Precocious',
    dicDef: 'characterized by or characteristic of exceptionally early development or maturity (especially in mental aptitude)',
    hintDef: 'She is an <span style="text-decoration: line-through; font-weight: bold;">intelligent</span> child.',
    language: 'en'
  },
  '153': {
    word: 'Phonological',
    dicDef: 'of or relating to phonology',
    hintDef: 'The school event was <span style="text-decoration: line-through; font-weight: bold;">related to some languages.</span>',
    language: 'en'
  },
  '154': {
    word: 'Obfuscate',
    dicDef: 'make obscure or unclear',
    hintDef: 'Editing the statement will <span style="text-decoration: line-through; font-weight: bold;">complicate</span> the story.',
    language: 'en'
  },
  '155': {
    word: 'Perusal',
    dicDef: 'reading carefully with intent to remember',
    hintDef: '<span style="text-decoration: line-through; font-weight: bold;">Read</span> every instruction please. ',
    language: 'en'
  },
  '156': {
    word: 'Untenable',
    dicDef: '(of theories etc) incapable of being defended or justified',
    hintDef: 'His argument is <span style="text-decoration: line-through; font-weight: bold;">not logical</span>',
    language: 'en'
  },
  '157': {
    word: 'Panacea',
    dicDef: 'hypothetical remedy for all ills or diseases; once sought by the alchemists',
    hintDef: 'Technology is not a <span style="text-decoration: line-through; font-weight: bold;">universal remedy</span> for all our problems',
    language: 'en'
  },
  '158': {
    word: 'Glib',
    dicDef: 'artfully persuasive in speech',
    hintDef: 'The preacher is <span style="text-decoration: line-through; font-weight: bold;">smooth-tongued</span>',
    language: 'en'
  },
  '159': {
    word: 'Onomatopoeia',
    dicDef: 'using words that imitate the sound they denote',
    hintDef: 'They learned <span style="text-decoration: line-through; font-weight: bold;">words that came from their associated sounds.</span>',
    language: 'en'
  },
  '160': {
    word: 'Philistine',
    dicDef: 'a person who is uninterested in intellectual pursuits',
    hintDef: 'This <span style="text-decoration: line-through; font-weight: bold;">anti-intellectual</span> boy is hers. ',
    language: 'en'
  },
  '161': {
    word: 'Virtual',
    dicDef: 'having the effect but not the actual form of what is specified',
    hintDef: 'All their conversations were <span style="text-decoration: line-through; font-weight: bold;">through the computer.</span>',
    language: 'en'
  },
  '162': {
    word: 'Various',
    dicDef: 'of many different kinds purposefully arranged but lacking any uniformity',
    hintDef: 'She has <span style="text-decoration: line-through; font-weight: bold;">many different</span> types of dresses',
    language: 'en'
  },
  '163': {
    word: 'Tirade',
    dicDef: 'a speech of violent denunciation',
    hintDef: 'He went into a <span style="text-decoration: line-through; font-weight: bold;">verbal onslaught</span> about the failures of the school administration.',
    language: 'en'
  },
  '164': {
    word: 'Proprietary',
    dicDef: 'protected by trademark or patent or copyright; made or produced or distributed by one having exclusive rights',
    hintDef: 'The investors have an <span style="text-decoration: line-through; font-weight: bold;">exclusive</span> interest in the land.',
    language: 'en'
  },
  '165': {
    word: 'Tryst',
    dicDef: 'a date; usually with a member of the opposite sex',
    hintDef: 'They broke up because of that <span style="text-decoration: line-through; font-weight: bold;">romantic meeting.</span>',
    language: 'en'
  },
  '166': {
    word: 'Rubric',
    dicDef: 'established rule or custom, a guideline',
    hintDef: 'Every organization has its <span style="text-decoration: line-through; font-weight: bold;">statement of purpose.</span>',
    language: 'en'
  },
  '167': {
    word: 'Tete-a-tete',
    dicDef: 'a private conversation between two people',
    hintDef: 'I just wound up your <span style="text-decoration: line-through; font-weight: bold;">private conversation</span> with the journalist.',
    language: 'en'
  },
  '168': {
    word: 'Stoic',
    dicDef: 'pertaining to stoicism or its followers',
    hintDef: 'The man is <span style="text-decoration: line-through; font-weight: bold;">longsuffering.</span>',
    language: 'en'
  },



  ///////////////////// JAPANESE 
  // japanese need css strikethrough via spans because unicode doesn't allow
  "169": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "170": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "171": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????????????????????????????</h3>`,
    "dicDef": "????????????????????????",
    "language": "jp"
  },
  "172": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????",
    "language": "jp"
  },
  "173": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????",
    "language": "jp"
  },
  "174": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????????????????</h3>`,
    "dicDef": "???????????????????????????",
    "language": "jp"
  },
  "175": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "176": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>?????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "177": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????12???<span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????",
    "language": "jp"
  },
  "178": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>????????????????????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "179": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>??????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????",
    "language": "jp"
  },
  "180": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>????????????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "181": {
    "word": "???",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "182": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>?????????????????????</h3>`,
    "dicDef": "??????????????????????????????",
    "language": "jp"
  },
  "183": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>??????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "184": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "185": {
    "word": "???",
    "hintDef": `<h3 class="kanji-hint">?????????????????????<span style="text-decoration: line-through; font-weight: bold;">???</span>??????????????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "186": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>?????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "187": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>?????????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????",
    "language": "jp"
  },
  "188": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????",
    "language": "jp"
  },
  "189": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>??????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "190": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint">???????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>????????????????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????",
    "language": "jp"
  },
  "191": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "192": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">???????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>??????</h3>`,
    "dicDef": "????????????????????????",
    "language": "jp"
  },
  "193": {
    "word": "???",
    "hintDef": `<h3 class="kanji-hint">??????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "194": {
    "word": "???????????????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????????????????</span>???</h3>`,
    "dicDef": "???????????????????????????????????????????????????",
    "language": "jp"
  },
  "195": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "196": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????",
    "language": "jp"
  },
  "197": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>??????????????????????????????????????????</h3>`,
    "dicDef": "2???????????????????????????????????????????????????",
    "language": "jp"
  },
  "198": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "199": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">???????????????</span>?????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "200": {
    "word": "?????????????????????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????????????????</span></h3>`,
    "dicDef": "?????????????????????????????????????????????",
    "language": "jp"
  },
  "201": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>?????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "202": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????",
    "language": "jp"
  },
  "203": {
    "word": "???",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???????????????</h3>`,
    "dicDef": "???????????????????????????",
    "language": "jp"
  },
  "204": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???????????????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "205": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "206": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">??????</span>??????????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????",
    "language": "jp"
  },
  "207": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">???????????????</span>?????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????",
    "language": "jp"
  },
  "208": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>????????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????",
    "language": "jp"
  },
  "209": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "210": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>?????????????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "211": {
    "word": "???????????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">????????????????????????</span>???????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "212": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>??????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "213": {
    "word": "??????????????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">????????????????????????</span>????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "214": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "215": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "216": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">????????????</span>?????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "217": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "218": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">???????????????</span>???????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "219": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">??????</span>??????????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????",
    "language": "jp"
  },
  "220": {
    "word": "???",
    "hintDef": `<h3 class="kanji-hint">???????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????",
    "language": "jp"
  },
  "221": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">???????????????</span>???????????????????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "222": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "223": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????",
    "language": "jp"
  },
  "224": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????<span style="text-decoration: line-through; font-weight: bold;">???????????????</span>???????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????",
    "language": "jp"
  },
  "225": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????</h3>`,
    "dicDef": "???????????????????????????",
    "language": "jp"
  },
  "226": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>??????????????????</h3>`,
    "dicDef": "????????????????????????????????????",
    "language": "jp"
  },
  "227": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????",
    "language": "jp"
  },
  "228": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "229": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">???????????????</span>??????????????????????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "230": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????",
    "language": "jp"
  },
  "231": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>??????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "232": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????????????????</span>????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "233": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "234": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>??????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "235": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????????????????</span>?????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "236": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">????????????</span>????????????????????????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "237": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "238": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "239": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">???????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "240": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????</h3>`,
    "dicDef": "???????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "241": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>????????????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????",
    "language": "jp"
  },
  "242": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "243": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "244": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>??????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "245": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>?????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "246": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????",
    "language": "jp"
  },
  "247": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "248": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "249": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>??????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "250": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????</span>?????????????????????????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "251": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "252": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>??????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "253": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">???????????????</span>???????????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "254": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">???????????????</span>?????????????????????????????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "255": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">??????</span>???????????????????????????????????????????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????????????????",
    "language": "jp"
  },
  "256": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },
  "257": {
    "word": "???????????????",
    "hintDef": `<h3 class="kanji-hint">??????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???</h3>`,
    "dicDef": "???????????????????????????????????????????????????",
    "language": "jp"
  },
  "258": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">???????????????</span>?????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????????????????????????????????????????????????????",
    "language": "jp"
  },
  "259": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">?????????????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????",
    "language": "jp"
  },
  "260": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>????????????????????????</h3>`,
    "dicDef": "?????????????????????????????????",
    "language": "jp"
  },
  "261": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">???????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????</h3>`,
    "dicDef": "???????????????????????????????????????",
    "language": "jp"
  },
  "262": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">?????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>???????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????",
    "language": "jp"
  },
  "263": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">??????</span>?????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "264": {
    "word": "????????????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">???????????????</span>?????????????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????????????????",
    "language": "jp"
  },
  "265": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint"><span style="text-decoration: line-through; font-weight: bold;">?????????????????????</span>???????????????????????????</h3>`,
    "dicDef": "????????????????????????????????????",
    "language": "jp"
  },
  "266": {
    "word": "??????",
    "hintDef": `<h3 class="kanji-hint">??????????????????<span style="text-decoration: line-through; font-weight: bold;">?????????</span>???????????????????????????</h3>`,
    "dicDef": "??????????????????????????????????????????",
    "language": "jp"
  },
  "267": {
    "word": "?????????",
    "hintDef": `<h3 class="kanji-hint">????????????????????????<span style="text-decoration: line-through; font-weight: bold;">????????????</span>?????????????????????</h3>`,
    "dicDef": "????????????????????????????????????????????????",
    "language": "jp"
  },


  //////// SPANISH

    '268': {
    word: 'Cumbre',
    dicDef: 'pico de una colina',
    hintDef: 'No fue f??cil subir a la <span style="text-decoration: line-through; font-weight: bold;">cima</span>',
    language: 'es'
  },
  '269': {
    word: 'Enfurecer',
    dicDef: 'poner furioso',
    hintDef: 'La mentira me hace <span style="text-decoration: line-through; font-weight: bold;">enojar</span>',
    language: 'es'
  },
  '270': {
    word: 'Escoger',
    dicDef: 'buscar y reunir',
    hintDef: 'Hay varias opciones, alguna debes <span style="text-decoration: line-through; font-weight: bold;">elegir</span>',
    language: 'es'
  },
  '271': {
    word: 'Tranquilizar',
    hintDef: 'aminorar la intensidad de alguien o algo o <span style="text-decoration: line-through; font-weight: bold;">calmar</span>',
    dicDef: 'Est??s molesto, te debes calmar',
    language: 'es'
  },
  '272': {
    word: 'Arrojar',
    dicDef: 'ocasionar',
    hintDef: 'Usa la pelota, la puedes <span style="text-decoration: line-through; font-weight: bold;">lanzar</span>',
    language: 'es'
  },
  '273': {
    word: 'Pericia',
    dicDef: 'Pr??ctica o habilidad en una ciencia o arte.',
    hintDef: 'Puede ganar porque tiene la <span style="text-decoration: line-through; font-weight: bold;">habilidad</span>',
    language: 'es'
  },
  '274': {
    word: 'Contento',
    dicDef: 'que experimenta o manifiesta sentir placer',
    hintDef: 'Sonr??o porque estoy <span style="text-decoration: line-through; font-weight: bold;">alegre</span>',
    language: 'es'
  },
  '275': {
    word: 'Economizar',
    dicDef: 'gastar con moderaci??n , evitar el malgasto',
    hintDef: 'Gastas mucho, debes <span style="text-decoration: line-through; font-weight: bold;">ahorrar</span>',
    language: 'es'
  },
  '276': {
    word: 'Danzar',
    dicDef: 'moverse de una manera graciosa y r??tmica',
    hintDef: 'Ya estamos en la fiesta, podemos <span style="text-decoration: line-through; font-weight: bold;">bailar</span>',
    language: 'es'
  },
  '277': {
    word: 'Arribar',
    dicDef: 'hacer su llegada los trenes',
    hintDef: 'Hasta la cima puedes <span style="text-decoration: line-through; font-weight: bold;">llegar</span>',
    language: 'es'
  },
  '278': {
    word: 'Advertir',
    dicDef: 'hacer referencia',
    hintDef: 'Est??s triste, lo puedo <span style="text-decoration: line-through; font-weight: bold;">notar</span>',
    language: 'es'
  },
  '279': {
    word: 'Dividir',
    dicDef: 'hacer una divisi??n o separaci??n',
    hintDef: 'Ese pan lo tienes que <span style="text-decoration: line-through; font-weight: bold;">partir</span>',
    language: 'es'
  },
  '280': {
    word: 'Apariencia',
    dicDef: 'visual apariencia de algo o alguien',
    hintDef: 'Tienes una hermosa <span style="text-decoration: line-through; font-weight: bold;">figura</span>',
    language: 'es'
  },
  '281': {
    word: 'Comprender',
    dicDef: 'entender',
    hintDef: 'Los n??meros no son f??ciles de <span style="text-decoration: line-through; font-weight: bold;">entender</span>',
    language: 'es'
  },
  '282': {
    word: 'Factible',
    dicDef: 'Que se puede llevar a cabo con los medios de los que se dispone y las circunstancias en las que se est??.',
    hintDef: 'S??, todo el proyecto es <span style="text-decoration: line-through; font-weight: bold;">posible</span>',
    language: 'es'
  },
  '283': {
    word: 'Norma',
    dicDef: 'algo considerado como un ejemplo normativo',
    hintDef: 'No puedes estar aqu??, es la nueva <span style="text-decoration: line-through; font-weight: bold;">regla</span>',
    language: 'es'
  },
  '284': {
    word: 'Frugal',
    dicDef: 'cuidadoso y diligente en el uso de recursos',
    hintDef: 'Por mi dieta, tuve una cena <span style="text-decoration: line-through; font-weight: bold;">moderada</span>',
    language: 'es'
  },
  '285': {
    word: 'Sanar',
    dicDef: 'proporcionar una cura devolver la salud de nuevo',
    hintDef: 'Tu herida pronto se podr?? <span style="text-decoration: line-through; font-weight: bold;">curar</span>',
    language: 'es'
  },
  '286': {
    word: 'Labor',
    dicDef: 'labor de aguja decorativa',
    hintDef: 'Agradecemos al maestro por su <span style="text-decoration: line-through; font-weight: bold;">trabajo</span>',
    language: 'es'
  },
  '287': {
    word: 'Fallecer',
    dicDef: 'morir',
    hintDef: 'Si no mejoro puedo <span style="text-decoration: line-through; font-weight: bold;">morir</span>',
    language: 'es'
  },
  '288': {
    word: 'Monarca',
    dicDef: 'del sexo femenino soberana gobernante',
    hintDef: 'En el trono se sienta el <span style="text-decoration: line-through; font-weight: bold;">rey</span>',
    language: 'es'
  },
  '289': {
    word: 'Contienda',
    dicDef: 'acto de competir para obtener beneficios o ganar un premio',
    hintDef: 'Ellos entrenan para la <span style="text-decoration: line-through; font-weight: bold;">pelea</span>',
    language: 'es'
  },
  '290': {
    word: 'Docente',
    dicDef: 'profesor de una universidad',
    hintDef: 'La clase la ense??ar?? el <span style="text-decoration: line-through; font-weight: bold;">maestro</span>',
    language: 'es'
  },
  '291': {
    word: 'Habitar',
    dicDef: 'habitar o vivir en un lugar',
    hintDef: 'En cualquier ciudad puedo <span style="text-decoration: line-through; font-weight: bold;">vivir</span>',
    language: 'es'
  },
  '292': {
    word: 'Contemplar',
    dicDef: 'mirar atentamente',
    hintDef: 'Amo tus ojos, no los dejo de <span style="text-decoration: line-through; font-weight: bold;">mirar</span>',
    language: 'es'
  },
  '293': {
    word: 'Hurtar',
    dicDef: 'largarse con las pertenencias de otros',
    hintDef: 'Anoche me intentaron <span style="text-decoration: line-through; font-weight: bold;">robar</span>',
    language: 'es'
  },
  '294': {
    word: 'Tomar',
    dicDef: 'llegar a poseer algo concreto o abstracto',
    hintDef: 'Dime de qu?? bebida debo <span style="text-decoration: line-through; font-weight: bold;">beber</span>',
    language: 'es'
  },
  '295': {
    word: 'Regresar',
    dicDef: 'traer de regreso al punto de partida',
    hintDef: 'Se fue de la escuela, pero quiere <span style="text-decoration: line-through; font-weight: bold;">volver</span>',
    language: 'es'
  },
  '296': {
    word: 'Designar',
    dicDef: 'decretar o designar de antemano',
    hintDef: 'Un heredero se debe <span style="text-decoration: line-through; font-weight: bold;">nombrar</span>',
    language: 'es'
  },
  '297': {
    word: 'Adquirir',
    dicDef: 'llegar a poseer algo concreto o abstracto',
    hintDef: 'Es mi auto, finalmente lo pude <span style="text-decoration: line-through; font-weight: bold;">comprar</span>',
    language: 'es'
  },
  '298': {
    word: 'Entonar',
    dicDef: 'recitar con entonaci??n musical recitar como un canto o un salmo',
    hintDef: 'Dime qu?? melod??a debo <span style="text-decoration: line-through; font-weight: bold;">cantar</span>',
    language: 'es'
  },
  '299': {
    word: 'Restar',
    dicDef: 'hacer una substracci??n',
    hintDef: 'Quedan muchos, los debes <span style="text-decoration: line-through; font-weight: bold;">quitar</span>',
    language: 'es'
  },
  '300': {
    word: 'Atender',
    dicDef: 'dar tratamiento m??dico',
    hintDef: 'Si ella te habla procura <span style="text-decoration: line-through; font-weight: bold;">escuchar</span>',
    language: 'es'
  },
  '301': {
    word: 'Inquietud',
    dicDef: 'la caracter??stica de parecer inc??modo',
    hintDef: 'Las deudas me llenan de <span style="text-decoration: line-through; font-weight: bold;">preocupaci??n</span>',
    language: 'es'
  },
  '302': {
    word: 'Estridente',
    dicDef: 'Que es considerablemente insistente en ser escuchado',
    hintDef: 'En la fiesta la m??sica era <span style="text-decoration: line-through; font-weight: bold;">ruidosa</span>',
    language: 'es'
  },
  '303': {
    word: 'Sitio',
    dicDef: 'un lugar mental abstracto',
    hintDef: 'Ya estoy aqu??, este es el <span style="text-decoration: line-through; font-weight: bold;">lugar</span>',
    language: 'es'
  },
  '304': {
    word: 'Alumbrar',
    dicDef: 'venir al mundo',
    hintDef: 'Usa la linterna para <span style="text-decoration: line-through; font-weight: bold;">iluminar</span>',
    language: 'es'
  },
  '305': {
    word: 'Sencillo',
    dicDef: 'que no es elaborado o con mucho detalle sencillo',
    hintDef: 'Aprender espa??ol es muy <span style="text-decoration: line-through; font-weight: bold;">f??cil</span>',
    language: 'es'
  },
  '306': {
    word: 'Cancelar',
    dicDef: 'elaborar y emitir',
    hintDef: 'Tienes muchas deudas, las debes <span style="text-decoration: line-through; font-weight: bold;">pagar</span>',
    language: 'es'
  },
  '307': {
    word: 'Zanjar',
    dicDef: 'cortar o tajar profundamente en algo',
    hintDef: 'Este asunto lo tenemos que <span style="text-decoration: line-through; font-weight: bold;">resolver</span>',
    language: 'es'
  },
  '308': {
    word: 'Contorno',
    dicDef: 'cualquier atributo espacial ( especialmente cuando se define por la silueta )',
    hintDef: 'No ve??a su cuerpo, solo su <span style="text-decoration: line-through; font-weight: bold;">silueta</span>',
    language: 'es'
  },
  '309': {
    word: 'Detener',
    dicDef: 'evitar la ocurrencia de algo evitar que algo suceda',
    hintDef: 'Al viento no lo puedes <span style="text-decoration: line-through; font-weight: bold;">parar</span>',
    language: 'es'
  },
  '310': {
    word: 'Sopor??fera',
    dicDef: 'que deprime el esp??ritu',
    hintDef: 'Me dorm??, la pel??cula era <span style="text-decoration: line-through; font-weight: bold;">aburrida</span>',
    language: 'es'
  },
  '311': {
    word: 'Mullida',
    dicDef: 'dicho de una pendiente topogr??fica que no es empinado o abrupto',
    hintDef: 'Dorm?? en una cama <span style="text-decoration: line-through; font-weight: bold;">suave</span>',
    language: 'es'
  },
  '312': {
    word: 'Cabalgar',
    dicDef: 'colocar o comenzar',
    hintDef: 'Un caballo dif??cil de <span style="text-decoration: line-through; font-weight: bold;">montar</span>',
    language: 'es'
  },
  '313': {
    word: 'Desanimado',
    dicDef: 'que no experimenta o inspira alegr??a',
    hintDef: 'Pedro llora mucho, est?? <span style="text-decoration: line-through; font-weight: bold;">triste</span>',
    language: 'es'
  },
  '314': {
    word: '??spera',
    dicDef: 'la m??s externa ( y m??s dura ) de las tres meninges',
    hintDef: 'La tela de mi vestido es <span style="text-decoration: line-through; font-weight: bold;">dura</span>',
    language: 'es'
  },
  '315': {
    word: 'Leal',
    dicDef: 'Que est?? conforme a los hechos y por lo tanto digno de fe',
    hintDef: 'Mi perro es muy <span style="text-decoration: line-through; font-weight: bold;">fiel</span>',
    language: 'es'
  },
  '316': {
    word: 'Sanci??n',
    dicDef: 'Pena pecuniaria emitida a un transgresor (por una violaci??n del C??digo de Circulaci??n)',
    hintDef: 'Por actuar mal recibiste una <span style="text-decoration: line-through; font-weight: bold;">multa</span>',
    language: 'es'
  },
  '317': {
    word: 'Jam??s',
    dicDef: 'no en absoluto desde luego que no no en ninguna circunstancia',
    hintDef: 'No comer?? vegetales <span style="text-decoration: line-through; font-weight: bold;">nunca</span>',
    language: 'es'
  },
  '318': {
    word: 'Pulcra',
    dicDef: 'librarse de obstrucciones',
    hintDef: 'Su cocina est?? <span style="text-decoration: line-through; font-weight: bold;">limpia</span>',
    language: 'es'
  },
  '319': {
    word: 'Id??nticos',
    dicDef: 'una persona que est?? en pie de igualdad con otros en un grupo',
    hintDef: 'Tu padre y t?? son <span style="text-decoration: line-through; font-weight: bold;">iguales</span>',
    language: 'es'
  },
  '320': {
    word: 'P??nico',
    dicDef: 'emoci??n profunda inspirada por una deidad',
    hintDef: 'La oscuridad me da <span style="text-decoration: line-through; font-weight: bold;">miedo</span>',
    language: 'es'
  },
  '321': {
    word: 'Monto',
    dicDef: 'cantidad de dinero necesaria para comprar algo',
    hintDef: 'Debes pagar $100, ese es el <span style="text-decoration: line-through; font-weight: bold;">precio</span>',
    language: 'es'
  },
  '322': {
    word: 'A??adir',
    dicDef: 'poner en o sobre algo',
    hintDef: 'Necesito una palabra, la debo <span style="text-decoration: line-through; font-weight: bold;">agregar</span>',
    language: 'es'
  },
  '323': {
    word: 'Realizar',
    dicDef: 'hacer , formular , o derivar mentalmente',
    hintDef: 'Todo el trabajo se puede <span style="text-decoration: line-through; font-weight: bold;">hacer</span>',
    language: 'es'
  },
  '324': {
    word: 'Inc??gnita',
    dicDef: 'problema dif??cil de resolver',
    hintDef: 'Sus palabras son una <span style="text-decoration: line-through; font-weight: bold;">adivinanza</span>',
    language: 'es'
  },
  '325': {
    word: 'Erudito',
    dicDef: 'Que tiene mucha experiencia y habilidad en alguna actividad.',
    hintDef: 'En temas cint??ficos es un <span style="text-decoration: line-through; font-weight: bold;">experto</span>',
    language: 'es'
  },
  '326': {
    word: 'Orar',
    dicDef: 'dirigirse a Dios decir una oraci??n',
    hintDef: 'En la iglesia puedes <span style="text-decoration: line-through; font-weight: bold;">rezar</span>',
    language: 'es'
  },
  '327': {
    word: 'Fragmentos',
    dicDef: 'pedacitos , astillas y fragmentos',
    hintDef: 'Se rompi?? en varios <span style="text-decoration: line-through; font-weight: bold;">pedazos</span>',
    language: 'es'
  }
}


// assign words to different language packs
Object.keys(wordData).forEach(element => {

  // PAWN PACK
  if (parseInt(element) < 28) {
    wordsAndDefinitions1.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions1.definitions.push(wordData[element].hintDef)
  }

  // BISHOP PACK
  if (parseInt(element) >= 28 && parseInt(element) < 56) {
    wordsAndDefinitions2.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions2.definitions.push(wordData[element].hintDef)
  }

  // KNIGHT PACK
  if (parseInt(element) >= 56 && parseInt(element) < 84) {
    wordsAndDefinitions3.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions3.definitions.push(wordData[element].hintDef)
  }

  // ROOK PACK
  if (parseInt(element) >= 84 && parseInt(element) < 112) {
    wordsAndDefinitions4.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions4.definitions.push(wordData[element].hintDef)
  }

  // QUEEN PACK
  if (parseInt(element) >= 112 && parseInt(element) < 140) {
    wordsAndDefinitions5.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions5.definitions.push(wordData[element].hintDef)
  }

  // KING PACK
  if (parseInt(element) >= 140 && parseInt(element) < 168) {
    wordsAndDefinitions6.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions6.definitions.push(wordData[element].hintDef)
  }

  // JAPANESE
  if (wordData[element].language === "jp") {
    wordsAndDefinitions7.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions7.definitions.push(wordData[element].hintDef)
  }

  // SPANISH
  if (wordData[element].language === "es") {
    wordsAndDefinitions8.words.push(wordData[element].word.toLowerCase())
    wordsAndDefinitions8.definitions.push(wordData[element].hintDef)
  }

})


let timeToPatch = 1;
let requestsPerSecond = 1;

let abuseList = [];
let blockList = [];
// save IPs of those triggered alarm level red
function saveAbuserIP(ip) {
  // check if abuser already exists first
  if (abuseList.filter(e => e.ip === ip).length > 0) {
    /* abuseList contains the element therfor abuser already exists */
  } else {
    const abuser = new Object();
    abuser.ip = `${ip}`;
    abuser.dateOfAbuse = `${new Date()}`;
    abuser.mostRecentAbuse;
    abuser.numOfAbuses = 0;
    abuseList.push(abuser);
  }
}

// update IPs of those who repeatedly triggered alarm level red
function checkIP (ip) {
  abuseList.forEach(element => {
    if (element.ip === ip) {
      element.numOfAbuses++;
      element.mostRecentAbuse = `${new Date()}`;
    }
  })
}

// returns true if abuser needs to hindered at patch request
function checkBlock(ip) {
  let block = false;
  // check abuseList for users with over 500 abuses
  abuseList.forEach(element => {
    if (element.ip === ip && element.numOfAbuses >= 500) {
      // check if abuser already exists first
      if (blockList.filter(e => e.ip === ip).length > 0) {
        /* blockList contains the element therfor abuser already exists */
        block = true;
      } else {
        blockList.push(element);
        block = true;
      }
    }
  })
  if (block === true) {
    return true;
  } else if (block === false) {
    return false;
  }
}

// handle requests per second
let rpsChecker = setInterval(() => {
  if (requestsPerSecond >= 9) {  //alarm level red;
    timeToPatch = 3000;
  } else {                    // alarm level green;
    timeToPatch = 1;
  }
}, 10);
rpsChecker;

// reset requests per second
let rpsResetter = setInterval(() => {
  requestsPerSecond = 1;
}, 1000);


// abuse report every 15 mins.
setInterval(() => {
  console.log(' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ABUSE LIST:');
  console.log(abuseList.sort((a, b) => (a.numOfAbuses > b.numOfAbuses ? -1 : 1)));
  console.log(' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BLOCK LIST:');
  console.log(blockList.sort((a, b) => (a.numOfAbuses > b.numOfAbuses ? -1 : 1)))
}, 900000);

const limiter = rateLimit({
	windowMs: 1000, // 1 second
	max: 50, // Limit each IP to 50 requests per `window` (here, per 1 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Rate limit exceeded. Please slow down.'
})

const apiLimiter = rateLimit({
	windowMs: 10000, // 10 second
	max: 20, // Limit each IP to 5 requests per `window` (here, per 10 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Rate limit exceeded. Please slow down.'
})

let allUsers;

//////////////////////////Authenticanion via auth0 service
const { auth, requiresAuth } = require('express-openid-connect');

const { check, validationResult} = require('express-validator');
const { response } = require('express');
///////////// MIDDLEWARE
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: 'https://vocaddy.eu.auth0.com/',
    baseURL: 'http://localhost:3000/',
    clientID: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    idpLogout: true,
  }),
);

//  serves all files in that Client directory to "/"
app.use(express.static('Client', { maxAge: '1d' }))

// parse incoming data as JSON
app.use(express.json({limit: '500mb'}))

app.use(bodyParser.json());

// Parses urlencoded webhooks from paddle to JSON with keys sorted alphabetically ascending and values as strings
app.use(bodyParser.urlencoded({ extended: true }));

app.use(timeout('5s'));


// start server
app.listen(port, () => {
  console.log('listening on port ' + port);
})

//check and send to client if user is logged in
app.get('/isLoggedin', limiter, (req, res) => {
  let isLoggedIn = false;
  req.oidc.isAuthenticated() ? isLoggedIn = true : isLoggedIn = false;
  res.json(isLoggedIn);
})


// serve words and definitions to client
app.get('/wordsAndDefinitions1', (req,res)=> {
  res.json(wordsAndDefinitions1);
});

// serve words and definitions to client
app.get('/wordsAndDefinitions2', requiresAuth(), (req,res)=> {
  res.json(wordsAndDefinitions2);
});

// serve words and definitions to client
app.get('/wordsAndDefinitions3', requiresAuth(), (req,res)=> {
  res.json(wordsAndDefinitions3);
});

// serve words and definitions to client
app.get('/wordsAndDefinitions4', requiresAuth(), (req,res)=> {
  res.json(wordsAndDefinitions4);
});


// serve words and definitions to client
app.get('/wordsAndDefinitions5', requiresAuth(), (req,res)=> {
  res.json(wordsAndDefinitions5);
});


// serve words and definitions to client
app.get('/wordsAndDefinitions6', requiresAuth(), (req,res)=> {
  res.json(wordsAndDefinitions6);
});

// serve words and definitions to client
app.get('/wordsAndDefinitions7', requiresAuth(), (req,res)=> {
  res.json(wordsAndDefinitions7);
});

// serve words and definitions to client
app.get('/wordsAndDefinitions8', requiresAuth(), (req,res)=> {
  res.json(wordsAndDefinitions8);
});


// There are two types of definitions, ones for hints and dictionary explanations
app.get('/dictionaryWordsAndDefinitions', (req,res)=> {
  res.json(wordData);
});


// need to get access token first
var token =''
var getToken = {
    method: 'POST',
    url: 'https://vocaddy.eu.auth0.com/oauth/token/',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: 'https://vocaddy.eu.auth0.com/api/v2/'
    })
};
axios.request(getToken).then((response)=> {
  token = response.data.access_token
}).catch(err => {
  console.log(err);
});

// get current userPic
app.get('/userPic', limiter, (req,res) => {
  let userID = req.oidc.user.sub;
  // go through all users and find user who made request
  allUsers.forEach(element => {
    if (element.user_id === userID) {
      res.json(element.picture);
    }
  })
})

// get current userEmail
app.get('/userEmail', limiter, (req,res) => {
  let userID = req.oidc.user.sub;
  // go through all users and find user who made request
  allUsers.forEach(element => {
    if (element.user_id === userID) {
      res.json(element.email);
    }
  })
})

// get current userID
app.get('/userID', limiter, (req,res) => {
  res.json(req.oidc.user.sub);
})

// get current metadata
app.get('/userMetadata', limiter, (req,res)=> {
  let userID = req.oidc.user.sub;
  // go through all users and find user who made request
  allUsers.forEach(element => {
    if (element.user_id === userID) {
      res.json(element.app_metadata);
    }
  })
})

// add metadata to user
app.patch('/user', apiLimiter, (req, res) => {
  let userID = req.oidc.user.sub
  var updateUser = {
    method: 'PATCH',
    url: `https://vocaddy.eu.auth0.com/api/v2/users/${userID}`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
    data: { "app_metadata": req.body }
  };

  const clientIP = requestIp.getClientIp(req);
  // disallow blocked users from impacting RPS
  if (checkBlock(clientIP) === false) {
    requestsPerSecond++
  }
  if (requestsPerSecond >= 9) {
    console.log('IP is: ' + clientIP);
    console.log('ALARM RED');
    console.log('timeToPatch: ' + timeToPatch);
    checkIP(clientIP);
    saveAbuserIP(clientIP);
  }

  // standard timeout time is 1ms at (alarm level green)
  setTimeout(() => {
    // check if abuser needs to be blocked from request
    if (checkBlock(clientIP) === false) {
      axios.request(updateUser)
        .then((response) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({blocked: true});  
    }
  }, timeToPatch);
})




// CRON job reducing user competence (every 24hrs)
cron.schedule('0 0 0 * * *', () => {
  // get all users
  var options = {
    method: 'GET',
    url: 'https://vocaddy.eu.auth0.com/api/v2/users',
    headers: {authorization: `Bearer ${token}`}
  };
  
  axios.request(options)
    .then((response) => {
      allUsers = response.data;
    })
    // apply changes
    .then(() => {
      //PATCH every user by going through them all with a loop
      allUsers.forEach(element => {
        if (element.app_metadata.competence !== 0) {
        var user = element.user_id;
        var currentUserCompetence = element.app_metadata.competence;
        var currentUserLevel = element.app_metadata.level;
        // decide what to PATCH to based on current competence
        var newCompetence = currentUserCompetence - 1;
        var newLevel = currentUserLevel - 1;
        let updateUser;
        if (newCompetence === 0) {
          updateUser = {
            method: 'PATCH',
            url: `https://vocaddy.eu.auth0.com/api/v2/users/${user}`,
            headers: {'content-type': 'application/json', authorization: `Bearer ${token}`},
            data: { "app_metadata" : {"competence": newCompetence, "level": newLevel, "vocabulary": {}, "completedGames": 0} } 
            };
        
        } else {
          updateUser = {
            method: 'PATCH',
            url: `https://vocaddy.eu.auth0.com/api/v2/users/${user}`,
            headers: {'content-type': 'application/json', authorization: `Bearer ${token}`},
            data: { "app_metadata" : {"competence": newCompetence} } 
            };
        }
      
        axios.request(updateUser).then((response) =>{
            if (newCompetence === 2) {
              sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "Your competency decreased by 33%!", "body": `Re-fill it now on the dashboard page.`}));
            } else if (newCompetence === 1) {
              sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "Your competency decreased by 66%!", "body": `Re-fill it immediately or you'll lose a level.`}));
            } else if (newCompetence === 0) {
              sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "You've lost your vocabulary cards."}));
              sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "You fell one level!", "body": `because your competency dropped to zero!`}));
            } 
          }).catch((err) =>{
            console.log(err);
          });
        }
      })
    })
    .catch(function (error) {
      console.error(error);
    });
}, {
  scheduled: true,
  timezone: "America/New_York"
});








// CRON job deducting Level from user for competence at 0 (every 24hrs)
cron.schedule('0 0 0 * * *', () => {
  // get all users
  var options = {
    method: 'GET',
    url: 'https://vocaddy.eu.auth0.com/api/v2/users',
    headers: {authorization: `Bearer ${token}`}
  };
  
  axios.request(options)
    .then((response) => {
      allUsers = response.data;
    })
    // apply changes
    .then(() => {
      //PATCH every user by going through them all with a loop
      allUsers.forEach(element => {
        let subscription;
        if (element.app_metadata.subscription === undefined) {
          subscription = undefined;
        } else subscription = element.app_metadata.subscription;
        if (element.app_metadata.competence === 0 && element.app_metadata.level !== 1) {
        var user = element.user_id;
        var currentLevel = element.app_metadata.level;
        // decide what to PATCH to based on current competence
        var newLevel = currentLevel - 1;
        var updateUser = {
          method: 'PATCH',
          url: `https://vocaddy.eu.auth0.com/api/v2/users/${user}`,
          headers: {'content-type': 'application/json', authorization: `Bearer ${token}`},
          data: { "app_metadata" : {"level": newLevel} } 
          };
      
        axios.request(updateUser).then((response) =>{
            sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "You've lost another level!", "body": `for leaving your competence at zero. Fill up now!`}));
          }).catch((err) =>{
            console.log(err);
          });
        }
        let displayProbability = Math.floor(Math.random() * 8);
        if (element.app_metadata.competence === 0 && element.app_metadata.level === 1 && displayProbability === 4 && subscription === undefined) {
            // user is not premium and error is thrown due to "element.app_metadata.subscription" not existing
            sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "Account Banning", "body": `Due to your inactivity, we are thinking about permanently closing your account. We must disqualify those who are not committed to achieving utmost brilliance.`}));
        }
      })
    })
    .catch(function (error) {
      console.error(error);
    });
}, {
  scheduled: true,
  timezone: "Australia/Melbourne"
});




// CRON job resetting todayPlayedGames of user to allow to play again (every 24hrs)
cron.schedule('0 0 0 * * *', () => {
  // get all users
  var options = {
    method: 'GET',
    url: 'https://vocaddy.eu.auth0.com/api/v2/users',
    headers: {authorization: `Bearer ${token}`}
  };
  
  axios.request(options)
    .then((response) => {
      allUsers = response.data;
    })
    // apply changes
    .then(() => {
      //PATCH every user by going through them all with a loop
      allUsers.forEach(element => {
        let subscription;
        if (element.app_metadata.subscription === undefined) {
          subscription = undefined;
        } else subscription = element.app_metadata.subscription;
        if (element.app_metadata.todayPlayedGames !== 0 && subscription === undefined) {
        var user = element.user_id;
        var updateUser = {
          method: 'PATCH',
          url: `https://vocaddy.eu.auth0.com/api/v2/users/${user}`,
          headers: {'content-type': 'application/json', authorization: `Bearer ${token}`},
          data: { "app_metadata" : {"todayPlayedGames": 0} } 
          };
      
        axios.request(updateUser).then((response) =>{
            sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "Free games unlocked!", "body": `Today's 2 free games are now available to you. Play now!`}));
          }).catch((err) =>{
            console.log(err);
          });
        }
      })
    })
    .catch(function (error) {
      console.error(error);
    });
}, {
  scheduled: true,
  timezone: "Asia/Tokyo"
});









// CRON job giving out challenges to users at random (every 24hrs)
cron.schedule('0 0 0 * * *', () => {
  // get all users
  var options = {
    method: 'GET',
    url: 'https://vocaddy.eu.auth0.com/api/v2/users',
    headers: { authorization: `Bearer ${token}` }
  };

  axios.request(options)
    .then((response) => {
      allUsers = response.data;
    })
    // apply changes
    .then(() => {
      //PATCH every user by going through them all with a loop
      allUsers.forEach(element => {
        let challenges;
        if (element.app_metadata.challenges === undefined) {
          challenges = undefined;
        } else challenges = element.app_metadata.challenges;
        //send notification if user already has some challenges completed
        if (challenges !== undefined) {
          let completedStatus = false;
          let userchallenges = element.app_metadata.challenges;
          Object.keys(userchallenges).forEach(el => {
            if (element.app_metadata.challenges[el].challenge.status === 'complete') {
              completedStatus = true;
            }
          })
          if (completedStatus === true) {
            sendNotification(element.app_metadata.notificationSub, JSON.stringify({"title": "You've completed challenges.", "body": `Claim rewards now!`}));
          }
        }
        let challengeProbability = Math.floor(Math.random() * 10);

        if (challengeProbability === 3) {
            const user = element.user_id;
            let stars = element.app_metadata.stars;
            let level = element.app_metadata.level;
            let highscore = element.app_metadata.highscore;

            //randomize player
            const player = getRandomInt(1, 12);
            let playerName;
            let playerImage;
            let playerLevel = getRandomInt(6, 10);
            let starReward = getRandomInt(stars / 25, stars / 15);

            //set name
            switch (player) {
              case 1:
                playerName = 'Olivia'
                break;
              case 2:
                playerName = 'Davis'
                break;
              case 3:
                playerName = 'Aleksandar'
                break;
              case 4:
                playerName = 'Abeiku'
                break;
              case 5:
                playerName = 'Carlos'
                break;
              case 6:
                playerName = 'Bryan'
                break;
              case 7:
                playerName = 'Julian'
                break;
              case 8:
                playerName = 'Emily'
                break;
              case 9:
                playerName = 'Michael'
                break;
              case 10:
                playerName = 'Anderson'
                break;
              case 11:
                playerName = 'Henry'
                break;
              case 12:
                playerName = 'Jordan'
                break;
            }
            //set image
            playerImage = `/Images/Players/${player}.jpg`

            //set challenge
            let challengeRandomizer = getRandomInt(1, 3);
            let challengeTitle;
            let challengeValue;

            switch (challengeRandomizer) {
              case 1:
                challengeTitle = 'Achieve a score of';
                challengeValue = getRandomInt(highscore - highscore / 2, highscore * 2);
                break;
              case 2:
                challengeTitle = 'Reach level';
                if (level !== 10) {
                  challengeValue = getRandomInt(level + 1, 10);
                } else {
                  challengeTitle = 'Achieve a score of';
                  challengeValue = getRandomInt(highscore - highscore / 2, highscore * 2);
                }
                break;
              case 3:
                challengeTitle = 'Collect Star Amount:';
                challengeValue = getRandomInt(stars * 1.5, stars * 2);
                starReward = getRandomInt(stars * 2.5, stars * 4);
                break;
            }

          let newChallenges = {};
          if (challenges !== undefined) {
            newChallenges = element.app_metadata.challenges;
          }
            Object.assign(newChallenges, {
              [playerName]: {
                "challenge": {
                  "title": challengeTitle,
                  "value": challengeValue
                },
                "level": playerLevel,
                "starReward": starReward,
                "profilePic": playerImage
              }
            })
          
          

            //Patch Player Object
            updateUser = {
              method: 'PATCH',
              url: `https://vocaddy.eu.auth0.com/api/v2/users/${user}`,
              headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
              data: { "app_metadata": { "challenges": newChallenges } }
            };

            //only if challenge player does not already exist
            if (challenges !== undefined) {
              if (([playerName][0] in Object.keys(element.app_metadata.challenges)) === false) {
                setTimeout(() => {
                  axios.request(updateUser).then((response) => {
                    sendNotification(element.app_metadata.notificationSub, JSON.stringify({ "title":  `You've received a challenge!`, "body": `from ${[playerName]}: ${challengeTitle} ${challengeValue} for a ${starReward} Star Reward.` }));
                  }).catch((err) => {
                    console.log(err);
                  });
                  //random to about half a day
                }, getRandomInt(23200000, 73200000))
              }
            } else {
              setTimeout(() => {
                axios.request(updateUser).then((response) => {
                  sendNotification(element.app_metadata.notificationSub, JSON.stringify({ "title":  `You've received a challenge!`, "body": `from ${[playerName]}: ${challengeTitle} ${challengeValue} for a ${starReward} Star Reward.` }));
                }).catch((err) => {
                  console.log(err);
                });
                //random to about half a day
              }, getRandomInt(23200000, 73200000))
            }

          
        }
      })
    
    })
    .catch((err) => {
      console.log(err)
      //do nothing
    });
}, {
  scheduled: true,
  timezone: "Europe/Berlin"
});












function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


// updating allUser variable (every 0.5 seconds hrs)
let userUpdater = setInterval(() => {
  // get all users
  var options = {
    method: 'GET',
    url: 'https://vocaddy.eu.auth0.com/api/v2/users',
    headers: {authorization: `Bearer ${token}`}
  };
  
  axios.request(options)
    .then((response) => {
      allUsers = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}, 500);
userUpdater;



let vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
}

push.setVapidDetails(
  'mailto:INSERT HERE',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);


// has to have some value in the beginning for the rest to run
let sub = {
  "endpoint": "INSERT HERE",
  "expirationTime": null,
  "keys": {
    "p256dh": "INSERT HERE",
    "auth": "INSERT HERE"
  }
};

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
  if (subscription === null) {
      console.log("No subscribers yet.");
  } else {
      push.sendNotification(subscription, dataToSend);
  }
}



// respond with impressum page
app.get('/impressum', (req, res)=> {
  res.sendFile('impressum.html', { root: "./Client" });
})

// respond with help page
app.get('/help', (req, res)=> {
  res.sendFile('help.html', { root: "./Client" });
})

// respond with about page
app.get('/about', (req, res)=> {
  res.sendFile('about.html', { root: "./Client" });
})

// respond with about page
app.get('/privacypolicy', (req, res)=> {
  res.sendFile('privacypolicy.html', { root: "./Client" });
})

// respond with terms of service page
app.get('/terms', (req, res)=> {
  res.sendFile('terms.html', { root: "./Client" });
})

// respond with terms of service page
app.get('/wiederufsbelehrung', (req, res)=> {
  res.sendFile('wiederufsbelehrung.html', { root: "./Client" });
})


// respond with success page
app.get('/success', (req, res)=> {
  res.sendFile('success.html', { root: "./Client" });
})

// respond with vocabulary page
app.get('/cards', (req, res)=> {
  res.sendFile('cards.html', { root: "./Client/cards" });
})

// respond with challenges page
app.get('/challenges', (req, res)=> {
  res.sendFile('challenges.html', { root: "./Client/challenges" });
})


// respond with consent page
app.get('/credits', (req, res)=> {
  res.sendFile('credits.html', { root: "./Client" });
})


// respond with date today
app.get('/serverDate', (req,res)=> {
  let serverDate = {"date": undefined};
  serverDate.date = new Date();

  res.json(serverDate);
});







/* !!!!!!!!!!!!!!!!!!!!!!!!!!        PADDLE CHECKOUT       !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  */ 


// Webhook request handling
app.post("/paddle", (req, res) => {
  if (validateWebhook(req.body)) {
    const requestIP = requestIp.getClientIp(req);
    // !!!!!!!!! using Production IPs
    if (requestIP === '34.232.58.13' || requestIP === '34.195.105.136' || requestIP === '34.237.3.244' || requestIP === '35.155.119.135' || requestIP === '52.11.166.252' || requestIP === '34.212.5.7') {

      if (req.body.alert_name === 'subscription_created') {
        // save subscription data and to that users app_metadata;

        const passthrough = JSON.parse(req.body.passthrough);
        var updateUser = {
          method: 'PATCH',
          url: `https://vocaddy.eu.auth0.com/api/v2/users/${passthrough.user_id}`,
          headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
          data: {
            "app_metadata": {
              "subscription": {
                "status": req.body.status,
                "subscription_id": req.body.subscription_id,
                "next_bill_date": req.body.next_bill_date,
                "cancel_url": req.body.cancel_url,
                "update_url": req.body.update_url
              },
              "languagePacks": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
              ]
            }
          }
        };
        axios.request(updateUser)
          .then((response) => {
            res.status(200).end();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });
          
      } else if (req.body.alert_name === 'subscription_updated') {

        const passthrough = JSON.parse(req.body.passthrough);
        var updateUser = {
          method: 'PATCH',
          url: `https://vocaddy.eu.auth0.com/api/v2/users/${passthrough.user_id}`,
          headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
          data: { 
            "app_metadata": { "subscription": {
              "status": req.body.status,
              "subscription_id": req.body.subscription_id,
              "next_bill_date": req.body.next_bill_date,
              "cancel_url": req.body.cancel_url,
              "update_url": req.body.update_url
              }
            }
          }
        };
        axios.request(updateUser)
          .then((response) => {
            res.status(200).end();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });

      
      } else if (req.body.alert_name === 'subscription_cancelled') {

        const passthrough = JSON.parse(req.body.passthrough);
        var updateUser = {
          method: 'PATCH',
          url: `https://vocaddy.eu.auth0.com/api/v2/users/${passthrough.user_id}`,
          headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
          data: {
            "app_metadata": {
              "subscription": {
                "status": "cancelled",
                "subscription_id": req.body.subscription_id,
                "next_bill_date": undefined,
                "cancel_url": req.body.cancel_url,
                "update_url": req.body.update_url,
                "cancellation_effective_date": req.body.cancellation_effective_date
              }
            }
          }
        };
        axios.request(updateUser)
          .then((response) => {
            res.status(200).end();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });

      } else if (req.body.alert_name === 'subscription_payment_failed') {

        const passthrough = JSON.parse(req.body.passthrough);
        var updateUser = {
          method: 'PATCH',
          url: `https://vocaddy.eu.auth0.com/api/v2/users/${passthrough.user_id}`,
          headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
          data: {
            "app_metadata": {
              "subscription": {
                "status": req.body.status,
                "subscription_id": req.body.subscription_id,
                "next_bill_date": req.body.next_bill_date,
                "cancel_url": req.body.cancel_url,
                "update_url": req.body.update_url
              }
            }
          }
        };
        axios.request(updateUser)
          .then((response) => {
            res.status(200).end();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });

      } else if (req.body.alert_name === 'subscription_payment_refunded') {

        const passthrough = JSON.parse(req.body.passthrough);
        var updateUser = {
          method: 'PATCH',
          url: `https://vocaddy.eu.auth0.com/api/v2/users/${passthrough.user_id}`,
          headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
          data: {
            "app_metadata": {
              "subscription": {
                "status": "refunded",
                "subscription_id": req.body.subscription_id,
                "next_bill_date": undefined,
                "cancel_url": req.body.cancel_url,
                "update_url": req.body.update_url
              }
            }
          }
        };
        axios.request(updateUser)
          .then((response) => {
            res.status(200).end();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });

      } else res.status(404).end();


    } else {
      res.status(403).end() 
    }
  } else {
    res.sendStatus(403);
  }
})


// Public key from your paddle dashboard
const pubKey = process.env.PADDLE_HOOK_PUBLIC_KEY;

function ksort(obj){
    const keys = Object.keys(obj).sort();
    let sortedObj = {};
    for (let i in keys) {
      sortedObj[keys[i]] = obj[keys[i]];
    }
    return sortedObj;
}

function validateWebhook(jsonObj) {
    // Grab p_signature
    const mySig = Buffer.from(jsonObj.p_signature, 'base64');
    // Remove p_signature from object - not included in array of fields used in verification.
    delete jsonObj.p_signature;
    // Need to sort array by key in ascending order
    jsonObj = ksort(jsonObj);
    for (let property in jsonObj) {
        if (jsonObj.hasOwnProperty(property) && (typeof jsonObj[property]) !== "string") {
            if (Array.isArray(jsonObj[property])) { // is it an array
                jsonObj[property] = jsonObj[property].toString();
            } else { //if its not an array and not a string, then it is a JSON obj
                jsonObj[property] = JSON.stringify(jsonObj[property]);
            }
        }
    }
    // Serialise remaining fields of jsonObj
    const serialized = Serialize.serialize(jsonObj);
    // verify the serialized array against the signature using SHA1 with your public key.
    const verifier = crypto.createVerify('sha1');
    verifier.update(serialized);
    verifier.end();

    const verification = verifier.verify(pubKey, mySig);
    // Used in response if statement
    return verification;
}




